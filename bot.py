import os
import logging
import re
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Токен из переменных окружения
TOKEN = os.environ.get("TELEGRAM_TOKEN")
LOG_CHAT_ID = os.environ.get("LOG_CHAT_ID")

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
    truck_match = re.search(r'(тент|реф|рефрижератор|площадка|контейнер)', text, re.IGNORECASE)
    if truck_match:
        result['truck'] = truck_match.group(0)
    # Дата
    date_match = re.search(r'(\d{1,2}\s+(?:янв|фев|мар|апр|мая|июн|июл|авг|сен|окт|ноя|дек))', text, re.IGNORECASE)
    if date_match:
        result['date'] = date_match.group(0)
    return result if result else None

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Бот для парсинга грузовых заявок запущен.")

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not update.message or not update.message.text or update.message.text.startswith('/'):
        return
    
    text = update.message.text
    chat_id = update.effective_chat.id
    message_id = update.message.message_id
    
    parsed = parse_load_request(text)
    if not parsed:
        return
    
    # Формируем карточку
    card_text = f"📦 **Новая заявка**\n"
    card_text += f"Маршрут: {parsed.get('from', '?')} → {parsed.get('to', '?')}\n"
    if 'weight' in parsed:
        card_text += f"Вес: {parsed['weight']}\n"
    if 'truck' in parsed:
        card_text += f"Транспорт: {parsed['truck']}\n"
    if 'date' in parsed:
        card_text += f"Дата: {parsed['date']}\n"
    
    # Отправляем в лог-чат, если он задан
    if LOG_CHAT_ID:
        try:
            await context.bot.send_message(chat_id=LOG_CHAT_ID, text=card_text)
        except Exception as e:
            logger.error(f"Ошибка отправки: {e}")

def main():
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.run_polling()

if __name__ == '__main__':
    main()
if __name__ == '__main__':
    main()
