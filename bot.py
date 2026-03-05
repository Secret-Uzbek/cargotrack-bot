import os
import logging
import re
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext, CallbackQueryHandler
from datetime import datetime

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Токен бота берётся из переменных окружения (Render их подставит)
TOKEN = os.environ.get("TELEGRAM_TOKEN")
# ID чата для логов (его нужно будет задать позже)
LOG_CHAT_ID = os.environ.get("LOG_CHAT_ID")

# Простейшая функция парсинга (можно улучшить)
def parse_load_request(text):
    result = {}
    # Маршрут: Город -> Город
    route_match = re.search(r'([А-Яа-яA-Za-z\s\-]+)\s*[->—–]\s*([А-Яа-яA-Za-z\s\-]+)', text)
    if route_match:
        result['from'] = route_match.group(1).strip()
        result['to'] = route_match.group(2).strip()
    # Вес: число + т/тонн
    weight_match = re.search(r'(\d+[.,]?\d*)\s*(?:т|тонн)', text, re.IGNORECASE)
    if weight_match:
        result['weight'] = weight_match.group(0)
    # Тип кузова
    truck_match = re.search(r'(тент|реф|рефрижератор|площадка|контейнер|изотерм)', text, re.IGNORECASE)
    if truck_match:
        result['truck'] = truck_match.group(0)
    # Дата (простая)
    date_match = re.search(r'(\d{1,2}\s+(?:янв|фев|мар|апр|мая|июн|июл|авг|сен|окт|ноя|дек))', text, re.IGNORECASE)
    if date_match:
        result['date'] = date_match.group(0)
    return result if result else None

async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Бот для парсинга грузовых заявок запущен. Добавьте меня в каналы и группы, где публикуются заявки.")

async def handle_message(update: Update, context: CallbackContext):
    # Игнорируем команды и сообщения без текста
    if not update.message or not update.message.text or update.message.text.startswith('/'):
        return
    
    text = update.message.text
    chat_id = update.effective_chat.id
    message_id = update.message.message_id
    chat_title = update.effective_chat.title or str(chat_id)
    
    # Пытаемся распарсить заявку
    parsed = parse_load_request(text)
    if not parsed:
        return  # Не похоже на заявку
    
    # Формируем карточку
    card_text = f"📦 **Новая заявка**\n"
    card_text += f"Источник: {chat_title}\n"
    card_text += f"Ссылка: https://t.me/c/{str(chat_id)[4:]}/{message_id}\n"
    card_text += f"**Маршрут**: {parsed.get('from', '?')} → {parsed.get('to', '?')}\n"
    if 'weight' in parsed:
        card_text += f"**Вес**: {parsed['weight']}\n"
    if 'truck' in parsed:
        card_text += f"**Транспорт**: {parsed['truck']}\n"
    if 'date' in parsed:
        card_text += f"**Дата**: {parsed['date']}\n"
    card_text += f"**Уверенность**: 0.7 (тестовая)\n"
    
    # Кнопки для действий (опционально)
    keyboard = [[
        InlineKeyboardButton("✅ Подтвердить", callback_data="confirm"),
        InlineKeyboardButton("❌ Пропустить", callback_data="skip")
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Отправляем карточку в лог-чат, если он задан
    if LOG_CHAT_ID:
        try:
            await context.bot.send_message(chat_id=LOG_CHAT_ID, text=card_text, parse_mode='Markdown', reply_markup=reply_markup)
        except Exception as e:
            logger.error(f"Не удалось отправить в лог-чат: {e}")

async def button_callback(update: Update, context: CallbackContext):
    query = update.callback_query
    await query.answer()
    if query.data == "confirm":
        await query.edit_message_text(text="✅ Заявка подтверждена")
    elif query.data == "skip":
        await query.edit_message_text(text="⏭ Заявка пропущена")

def main():
    # Создаём приложение
    application = Application.builder().token(TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_handler(CallbackQueryHandler(button_callback))
    
    # Запускаем бота
    application.run_polling()

if __name__ == '__main__':
    main()
