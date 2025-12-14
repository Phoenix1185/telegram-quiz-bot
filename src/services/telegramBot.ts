// Complete Telegram Bot API Service with all features
export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  callback_query?: TelegramCallbackQuery;
  inline_query?: TelegramInlineQuery;
}

export interface TelegramMessage {
  message_id: number;
  from: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  photo?: TelegramPhoto[];
  document?: TelegramDocument;
  animation?: TelegramAnimation;
  audio?: TelegramAudio;
  video?: TelegramVideo;
  voice?: TelegramVoice;
  video_note?: TelegramVideoNote;
  caption?: string;
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramPhoto {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  width: number;
  height: number;
}

export interface TelegramInlineKeyboardMarkup {
  inline_keyboard: TelegramInlineKeyboardButton[][];
}

export interface TelegramInlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: TelegramWebAppInfo;
  login_url?: TelegramLoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: TelegramCallbackGame;
  pay?: boolean;
}

export interface TelegramCallbackQuery {
  id: string;
  from: TelegramUser;
  message?: TelegramMessage;
  data: string;
  inline_message_id?: string;
  chat_instance?: string;
}

export interface TelegramInlineQuery {
  id: string;
  from: TelegramUser;
  query: string;
  offset: string;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
}

export interface TelegramWebAppInfo {
  url: string;
}

export interface TelegramLoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}

export interface TelegramCallbackGame {
  user_score?: number;
  force?: boolean;
}

export interface TelegramDocument {
  file_id: string;
  file_unique_id: string;
  thumbnail?: TelegramPhoto;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramAnimation {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: TelegramPhoto;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramAudio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumbnail?: TelegramPhoto;
}

export interface TelegramVideo {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumbnail?: TelegramPhoto;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramVoice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

export interface TelegramVideoNote {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumbnail?: TelegramPhoto;
  file_size?: number;
}

class TelegramBotService {
  private botToken: string;
  private apiUrl: string;
  private webhookUrl: string;

  constructor(botToken: string, webhookUrl: string) {
    this.botToken = botToken;
    this.webhookUrl = webhookUrl;
    this.apiUrl = `https://api.telegram.org/bot${botToken}`;
  }

  // Set webhook with all allowed updates
  async setWebhook(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: this.webhookUrl,
          allowed_updates: [
            'message', 
            'edited_message', 
            'channel_post', 
            'edited_channel_post', 
            'inline_query', 
            'chosen_inline_result', 
            'callback_query', 
            'shipping_query', 
            'pre_checkout_query', 
            'poll', 
            'poll_answer', 
            'my_chat_member', 
            'chat_member', 
            'chat_join_request'
          ],
          drop_pending_updates: true
        })
      });
      
      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error('Failed to set webhook:', error);
      return false;
    }
  }

  // Send text message with full formatting
  async sendMessage(params: {
    chat_id: number;
    text: string;
    parse_mode?: 'HTML' | 'Markdown';
    reply_to_message_id?: number;
    disable_web_page_preview?: boolean;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  }

  // Send photo with caption
  async sendPhoto(params: {
    chat_id: number;
    photo: string; // file_id or URL
    caption?: string;
    parse_mode?: 'HTML' | 'Markdown';
    reply_to_message_id?: number;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send photo:', error);
      return null;
    }
  }

  // Send document
  async sendDocument(params: {
    chat_id: number;
    document: string;
    caption?: string;
    parse_mode?: 'HTML' | 'Markdown';
    reply_to_message_id?: number;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send document:', error);
      return null;
    }
  }

  // Send animation (GIF)
  async sendAnimation(params: {
    chat_id: number;
    animation: string;
    caption?: string;
    parse_mode?: 'HTML' | 'Markdown';
    reply_to_message_id?: number;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendAnimation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send animation:', error);
      return null;
    }
  }

  // Send audio
  async sendAudio(params: {
    chat_id: number;
    audio: string;
    caption?: string;
    parse_mode?: 'HTML' | 'Markdown';
    duration?: number;
    performer?: string;
    title?: string;
    reply_to_message_id?: number;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendAudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send audio:', error);
      return null;
    }
  }

  // Send video
  async sendVideo(params: {
    chat_id: number;
    video: string;
    caption?: string;
    parse_mode?: 'HTML' | 'Markdown';
    duration?: number;
    width?: number;
    height?: number;
    reply_to_message_id?: number;
    disable_notification?: boolean;
    reply_markup?: TelegramInlineKeyboardMarkup;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/sendVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send video:', error);
      return null;
    }
  }

  // Answer callback query
  async answerCallbackQuery(params: {
    callback_query_id: string;
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to answer callback query:', error);
      return null;
    }
  }

  // Answer inline query
  async answerInlineQuery(params: {
    inline_query_id: string;
    results: any[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    switch_pm_text?: string;
    switch_pm_parameter?: string;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/answerInlineQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      return await response.json();
    } catch (error) {
      console.error('Failed to answer inline query:', error);
      return null;
    }
  }

  // Get bot info
  async getBotInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/getMe`);
      const data = await response.json();
      return data.ok ? data.result : null;
    } catch (error) {
      console.error('Failed to get bot info:', error);
      return null;
    }
  }

  // Get chat info
  async getChat(chat_id: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/getChat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id })
      });
      
      const data = await response.json();
      return data.ok ? data.result : null;
    } catch (error) {
      console.error('Failed to get chat info:', error);
      return null;
    }
  }

  // Delete webhook
  async deleteWebhook(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/deleteWebhook`);
      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error('Failed to delete webhook:', error);
      return false;
    }
  }

  // Get webhook info
  async getWebhookInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/getWebhookInfo`);
      const data = await response.json();
      return data.ok ? data.result : null;
    } catch (error) {
      console.error('Failed to get webhook info:', error);
      return null;
    }
  }
}

export default TelegramBotService;