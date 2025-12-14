import { useState, useEffect } from 'react';
import BotConfig from './components/BotConfig';
import TelegramChat from './components/TelegramChat';
import { Card, CardContent } from "../components/ui/card";
import { Settings, LogOut, Info } from 'lucide-react';

function App() {
  const [botToken, setBotToken] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  // Load saved configuration
  useEffect(() => {
    const savedToken = localStorage.getItem('telegram_bot_token');
    const savedWebhook = localStorage.getItem('telegram_webhook_url');
    
    if (savedToken) {
      setBotToken(savedToken);
      setWebhookUrl(savedWebhook);
      setIsConfigured(true);
    }
  }, []);

  const handleBotConfigured = (token: string, webhook: string) => {
    setBotToken(token);
    setWebhookUrl(webhook);
    setIsConfigured(true);
    
    // Save to localStorage
    localStorage.setItem('telegram_bot_token', token);
    localStorage.setItem('telegram_webhook_url', webhook);
  };

  const handleDisconnect = () => {
    setBotToken(null);
    setWebhookUrl(null);
    setIsConfigured(false);
    
    // Clear saved configuration
    localStorage.removeItem('telegram_bot_token');
    localStorage.removeItem('telegram_webhook_url');
  };

  const handleStartDemo = () => {
    setShowDemo(false);
    // Use a demo token
    setBotToken('demo_token_12345');
    setWebhookUrl('demo_webhook_url');
    setIsConfigured(true);
  };

  if (showDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Quiz Generator
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Experience a Telegram-style quiz bot in your browser
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">🎮 This is a Web Demo</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  This is a simulation of a Telegram bot interface. You can interact with it here in your browser - no actual Telegram bot setup required!
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleStartDemo}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">🚀 Try Demo Mode</h3>
                <p className="text-sm text-gray-600">
                  Start chatting immediately with the simulated bot
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowDemo(false)}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">⚙️ Configure Real Bot</h3>
                <p className="text-sm text-gray-600">
                  Connect your actual Telegram bot token
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-white rounded-lg p-6">
            <h3 className="font-semibold mb-4">✨ What You Can Try:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">🎯 Quiz Commands:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <code className="bg-gray-100 px-1 rounded">quiz space</code> - Space quiz</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">quiz history</code> - History quiz</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">topics</code> - All topics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">🎨 Fun Features:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <code className="bg-gray-100 px-1 rounded">photo</code> - Send images</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">inline</code> - Interactive buttons</li>
                  <li>• Send emojis like 👍, 🎉, 🚀</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Quiz Generator
            </h1>
            <p className="text-lg text-gray-600">
              Connect your Telegram bot to start generating AI-powered quizzes
            </p>
          </div>
          
          <BotConfig onConfigured={handleBotConfigured} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Quiz Generator</h1>
              <p className="text-sm text-gray-500">
                {botToken === 'demo_token_12345' ? 'Demo Mode' : 'Telegram Bot Connected'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {botToken === 'demo_token_12345' ? 'Exit Demo' : 'Disconnect Bot'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <TelegramChat botToken={botToken!} webhookUrl={webhookUrl!} />
          </div>
          
          {/* Bot Info Panel */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {botToken === 'demo_token_12345' ? 'Demo Mode' : 'Bot Configuration'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className="ml-2 text-green-600">● Active</span>
                  </div>
                  {botToken === 'demo_token_12345' ? (
                    <div>
                      <span className="text-gray-500">Mode:</span>
                      <span className="ml-2">Demo Simulation</span>
                    </div>
                  ) : (
                    <>
                      <div>
                        <span className="text-gray-500">Token:</span>
                        <span className="ml-2 font-mono text-xs">
                          {botToken?.substring(0, 10)}...
                        </span>
                      </div>
                      {webhookUrl && (
                        <div>
                          <span className="text-gray-500">Webhook:</span>
                          <span className="ml-2 text-xs break-all">
                            {webhookUrl}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Quick Commands</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><code className="bg-gray-100 px-1 rounded">/start</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">quiz [topic]</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">topics</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">engines</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">photo</code></div>
                  <div><code className="bg-gray-100 px-1 rounded">inline</code></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Supported Features</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>📝 Text messages</div>
                  <div>🖼️ Images & photos</div>
                  <div>📄 Documents</div>
                  <div>🎵 Audio files</div>
                  <div>🎬 Videos</div>
                  <div>🎭 GIFs</div>
                  <div>🎤 Voice messages</div>
                  <div>⌨️ Inline keyboards</div>
                  <div>😊 Emoji reactions</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;