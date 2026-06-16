/**
 * FSR Hub — Fractal Silk Route freight exchange
 * Cloudflare Worker: Telegram webhook + REST API
 * PLT trace embedded in every load record
 */

const VERSION = '1.0.0';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    try {
      // Telegram webhook
      if (path === '/telegram' && request.method === 'POST') {
        const update = await request.json();
        await handleTelegram(update, env);
        return new Response('ok', { headers: cors });
      }

      // REST API
      if (path === '/api/health') return json({ status: 'LIVE', version: VERSION }, cors);
      if (path === '/api/loads' && request.method === 'GET') return await apiGetLoads(url, env, cors);
      if (path === '/api/loads' && request.method === 'POST') return await apiPostLoad(request, env, cors);

      const m = path.match(/^\/api\/loads\/([A-Z0-9]+)\/accept$/);
      if (m && request.method === 'PUT') return await apiAcceptLoad(m[1], request, env, cors);

      return json({ error: 'not found' }, cors, 404);

    } catch (e) {
      console.error(e);
      return json({ error: e.message }, cors, 500);
    }
  }
};

// ── TELEGRAM HANDLER ────────────────────────────────────────────────────────

async function handleTelegram(update, env) {
  const msg = update.message || update.edited_message;
  if (!msg || !msg.text) return;

  const text = msg.text.trim();
  const chat_id = msg.chat.id;
  const user = msg.from;
  const username = user.username ? `@${user.username}` : user.first_name;

  if (text === '/start' || text === '/помощь' || text === '/help') {
    await tgSend(env, chat_id, HELP_TEXT);
    return;
  }

  if (text.startsWith('/груз') || text.startsWith('/load')) {
    await cmdPostLoad(text, chat_id, user, username, env);
    return;
  }

  if (text === '/грузы' || text === '/loads') {
    await cmdListLoads(chat_id, env);
    return;
  }

  if (text.startsWith('/принять') || text.startsWith('/accept')) {
    const id = text.split(/\s+/)[1];
    if (id) await cmdAcceptLoad(id.toUpperCase(), chat_id, user, username, env);
    else await tgSend(env, chat_id, '❌ Укажите номер груза. Пример: /принять FSR001');
    return;
  }

  if (text === '/мои' || text === '/my') {
    await cmdMyLoads(chat_id, user.id, env);
    return;
  }

  if (text.startsWith('/статус') || text.startsWith('/status')) {
    const id = text.split(/\s+/)[1];
    if (id) await cmdStatus(id.toUpperCase(), chat_id, env);
    else await tgSend(env, chat_id, '❌ Укажите номер. Пример: /статус FSR001');
    return;
  }

  // Try to parse free-form load posting
  const parsed = parseLoadText(text);
  if (parsed && parsed.from && parsed.to) {
    await cmdPostLoad(text, chat_id, user, username, env, parsed);
    return;
  }

  await tgSend(env, chat_id, '❓ Команда не распознана. Напишите /помощь');
}

// ── COMMANDS ─────────────────────────────────────────────────────────────────

async function cmdPostLoad(text, chat_id, user, username, env, parsedIn) {
  const parsed = parsedIn || parseLoadText(text);

  if (!parsed || !parsed.from || !parsed.to) {
    await tgSend(env, chat_id, `❌ Не могу распознать маршрут.\n\nПример:\n<code>Ташкент → Стамбул, 20 тонн, тент, 25 июня, $1200</code>`, 'HTML');
    return;
  }

  const id = genId();
  const now = new Date().toISOString();

  const plt = {
    nullo: 'load_post',
    psi: id,
    v_trace: `${parsed.from}→${parsed.to}`,
    h_inject: now,
    operator: user.id
  };

  await env.DB.prepare(`
    INSERT INTO loads (id, from_city, to_city, weight, truck_type, load_date, cargo_type, price, status, shipper_tg_id, shipper_name, created_at, plt_trace)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?, ?, ?)
  `).bind(
    id, parsed.from, parsed.to,
    parsed.weight || '?', parsed.truck || 'тент',
    parsed.date || '?', parsed.cargo || '?',
    parsed.price || '?',
    String(user.id), username,
    now, JSON.stringify(plt)
  ).run();

  await tgSend(env, chat_id, `✅ Груз размещён!\n\n🆔 <b>${id}</b>\n📍 ${parsed.from} → ${parsed.to}\n⚖️ ${parsed.weight || '?'}\n🚛 ${parsed.truck || 'тент'}\n📅 ${parsed.date || '?'}\n💵 ${parsed.price || 'договорная'}\n\nПеревозчики уже видят ваш груз. Ожидайте предложений.`, 'HTML');
}

async function cmdListLoads(chat_id, env) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM loads WHERE status = 'open' ORDER BY created_at DESC LIMIT 10`
  ).all();

  if (!results.length) {
    await tgSend(env, chat_id, '📭 Открытых грузов пока нет.\n\nРазместите свой: /груз');
    return;
  }

  let txt = `📦 <b>Открытые грузы (${results.length}):</b>\n\n`;
  for (const r of results) {
    txt += `🆔 <b>${r.id}</b> — ${r.from_city} → ${r.to_city}\n`;
    txt += `   ⚖️ ${r.weight} | 🚛 ${r.truck_type} | 📅 ${r.load_date} | 💵 ${r.price}\n`;
    txt += `   👤 ${r.shipper_name}\n\n`;
  }
  txt += `Принять груз: <code>/принять ID</code>`;

  await tgSend(env, chat_id, txt, 'HTML');
}

async function cmdAcceptLoad(id, chat_id, user, username, env) {
  const load = await env.DB.prepare(`SELECT * FROM loads WHERE id = ?`).bind(id).first();

  if (!load) {
    await tgSend(env, chat_id, `❌ Груз ${id} не найден.`);
    return;
  }
  if (load.status !== 'open') {
    await tgSend(env, chat_id, `⚠️ Груз ${id} уже ${load.status === 'accepted' ? 'принят' : 'закрыт'}.`);
    return;
  }
  if (String(load.shipper_tg_id) === String(user.id)) {
    await tgSend(env, chat_id, '❌ Нельзя принять собственный груз.');
    return;
  }

  await env.DB.prepare(
    `UPDATE loads SET status = 'accepted', carrier_tg_id = ?, carrier_name = ? WHERE id = ?`
  ).bind(String(user.id), username, id).run();

  // Notify carrier
  await tgSend(env, chat_id,
    `✅ Вы приняли груз <b>${id}</b>!\n\n📍 ${load.from_city} → ${load.to_city}\n⚖️ ${load.weight} | 🚛 ${load.truck_type}\n📅 ${load.load_date} | 💵 ${load.price}\n\n👤 Отправитель: ${load.shipper_name}\n\n🤝 Свяжитесь с отправителем для подтверждения деталей.`,
    'HTML'
  );

  // Notify shipper
  if (load.shipper_tg_id) {
    await tgSend(env, load.shipper_tg_id,
      `🎉 Ваш груз <b>${id}</b> принят!\n\n🚛 Перевозчик: ${username}\n📍 ${load.from_city} → ${load.to_city}\n\n✉️ Перевозчик с вами свяжется. Если не выходит на связь — напишите /статус ${id}`,
      'HTML'
    );
  }
}

async function cmdMyLoads(chat_id, tg_user_id, env) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM loads WHERE shipper_tg_id = ? ORDER BY created_at DESC LIMIT 10`
  ).bind(String(tg_user_id)).all();

  if (!results.length) {
    await tgSend(env, chat_id, '📭 У вас нет размещённых грузов.\n\nРазместить: /груз');
    return;
  }

  const statusEmoji = { open: '🟢', accepted: '🤝', done: '✅', cancelled: '❌' };
  let txt = `📋 <b>Ваши грузы:</b>\n\n`;
  for (const r of results) {
    txt += `${statusEmoji[r.status] || '⚪'} <b>${r.id}</b> — ${r.from_city} → ${r.to_city}\n`;
    txt += `   ${r.status === 'accepted' ? `Перевозчик: ${r.carrier_name || '?'}` : `${r.truck_type}, ${r.load_date}`}\n\n`;
  }
  await tgSend(env, chat_id, txt, 'HTML');
}

async function cmdStatus(id, chat_id, env) {
  const r = await env.DB.prepare(`SELECT * FROM loads WHERE id = ?`).bind(id).first();
  if (!r) {
    await tgSend(env, chat_id, `❌ Груз ${id} не найден.`);
    return;
  }
  const statusText = { open: '🟢 Ожидает перевозчика', accepted: '🤝 Принят', done: '✅ Выполнен', cancelled: '❌ Отменён' };
  await tgSend(env, chat_id,
    `📦 Груз <b>${id}</b>\n\n📍 ${r.from_city} → ${r.to_city}\n⚖️ ${r.weight} | 🚛 ${r.truck_type}\n📅 ${r.load_date} | 💵 ${r.price}\n\n${statusText[r.status] || r.status}${r.carrier_name ? `\n🚛 Перевозчик: ${r.carrier_name}` : ''}`,
    'HTML'
  );
}

// ── REST API ──────────────────────────────────────────────────────────────────

async function apiGetLoads(url, env, cors) {
  const status = url.searchParams.get('status') || 'open';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
  const { results } = await env.DB.prepare(
    `SELECT id, from_city, to_city, weight, truck_type, load_date, cargo_type, price, status, shipper_name, created_at
     FROM loads WHERE status = ? ORDER BY created_at DESC LIMIT ?`
  ).bind(status, limit).all();
  return json({ loads: results, count: results.length }, cors);
}

async function apiPostLoad(request, env, cors) {
  const body = await request.json();
  const { from, to, weight, truck, date, cargo, price, shipper_name } = body;
  if (!from || !to) return json({ error: 'from and to required' }, cors, 400);

  const id = genId();
  await env.DB.prepare(
    `INSERT INTO loads (id, from_city, to_city, weight, truck_type, load_date, cargo_type, price, status, shipper_tg_id, shipper_name, created_at, plt_trace)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open', 'api', ?, ?, ?)`
  ).bind(id, from, to, weight || '?', truck || 'тент', date || '?', cargo || '?', price || '?', shipper_name || 'web', new Date().toISOString(), '{}').run();

  return json({ id, status: 'created' }, cors);
}

async function apiAcceptLoad(id, request, env, cors) {
  const body = await request.json().catch(() => ({}));
  const load = await env.DB.prepare(`SELECT * FROM loads WHERE id = ?`).bind(id).first();
  if (!load) return json({ error: 'not found' }, cors, 404);
  if (load.status !== 'open') return json({ error: 'not available' }, cors, 409);

  await env.DB.prepare(
    `UPDATE loads SET status = 'accepted', carrier_tg_id = 'api', carrier_name = ? WHERE id = ?`
  ).bind(body.carrier_name || 'web', id).run();

  return json({ id, status: 'accepted' }, cors);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function parseLoadText(text) {
  const result = {};
  const t = text.replace(/^\/груз\s*/i, '').replace(/^\/load\s*/i, '');

  const route = t.match(/([А-Яа-яA-Za-zÄäÖöÜüß\s\-]+?)\s*[→\->—–]+\s*([А-Яа-яA-Za-zÄäÖöÜüß\s\-]+?)(?:,|$|\n)/);
  if (route) { result.from = route[1].trim(); result.to = route[2].trim(); }

  const weight = t.match(/(\d+[.,]?\d*)\s*(?:т|тонн|ton)/i);
  if (weight) result.weight = weight[0].trim();

  const truck = t.match(/(тент|реф|рефрижератор|площадка|контейнер|самосвал|цистерна|container|ref)/i);
  if (truck) result.truck = truck[0].toLowerCase();

  const date = t.match(/(\d{1,2}\s+(?:янв|фев|мар|апр|мая|июн|июл|авг|сен|окт|ноя|дек|\d{2})(?:\s+\d{4})?)/i);
  if (date) result.date = date[0];

  const price = t.match(/\$?\s*(\d[\d\s]*(?:[.,]\d+)?)\s*(?:\$|usd|у\.е|eur|€)?/i);
  if (price) result.price = price[0].trim();

  return result;
}

function genId() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const dt = `${d.getFullYear().toString().slice(2)}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
  const rnd = Math.floor(Math.random() * 9000) + 1000;
  return `FSR${dt}${rnd}`;
}

async function tgSend(env, chat_id, text, parse_mode) {
  const body = { chat_id: String(chat_id), text };
  if (parse_mode) body.parse_mode = parse_mode;
  await fetch(`https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

function json(data, headers, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

const HELP_TEXT = `🚛 <b>FSR Hub — Биржа грузов</b>

<b>Для отправителей:</b>
/груз Ташкент → Стамбул, 20 тонн, тент, 25 июня, $1200
  — разместить груз

/мои — мои грузы и их статус

<b>Для перевозчиков:</b>
/грузы — все открытые грузы

/принять FSR001 — принять груз

<b>Для всех:</b>
/статус FSR001 — статус конкретного груза
/помощь — это сообщение

──────────────────────
🌍 Коридор: CA → Iran → Turkey → EU
🔗 fractal-metascience.org`;
