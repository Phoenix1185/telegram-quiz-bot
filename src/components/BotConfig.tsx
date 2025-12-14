import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, Check, X, Settings } from 'lucide-react';

interface BotConfigProps {
  onConfigured: (token: string, webhookUrl: string) => void;
}

export default function BotConfig({ onConfigured }: BotConfigProps) {
  const [botToken, setBotToken] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleTestConnection = async () => {
    if (!botToken) {
      setStatus('error');
      setMessage('Please enter your bot token');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      // Test bot token validity
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
      const data = await response.json();

      if (data.ok) {
        setStatus('success');
        setMessage(`✅ Connected to @${data.result.username}`);
        
        // If webhook URL is provided, test it
        if (webhookUrl) {
          const webhookResponse = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: webhookUrl })
          });
          
          const webhookData = await webhookResponse.json();
          if (webhookData.ok) {
            setMessage(`✅ Bot @${data.result.username} connected and webhook set!`);
          } else {
            setMessage(`⚠️ Bot connected but webhook failed: ${webhookData.description}`);
          }
        }
      } else {
        setStatus('error');
        setMessage(`❌ Invalid bot token: ${data.description}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('❌ Failed to connect to Telegram API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = () => {
    if (botToken && status === 'success') {
      onConfigured(botToken, webhookUrl);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Connect Your Telegram Bot</CardTitle>
        <CardDescription>
          Enter your bot token to connect this quiz generator to Telegram
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="botToken" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Bot Token
          </Label>
          <Input
            id="botToken"
            type="password"
            placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            className="font-mono"
          />
          <p className="text-sm text-muted-foreground">
            Get your token from @BotFather on Telegram
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
          <Input
            id="webhookUrl"
            type="url"
            placeholder="https://your-app.koyeb.app/api/telegram"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your deployed app URL + /api/telegram endpoint
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg flex items-center gap-2 ${
            status === 'success' ? 'bg-green-50 text-green-700' : 
            status === 'error' ? 'bg-red-50 text-red-700' : 
            'bg-blue-50 text-blue-700'
          }`}>
            {status === 'success' && <Check className="w-4 h-4" />}
            {status === 'error' && <X className="w-4 h-4" />}
            {status === 'idle' && <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
            <span className="text-sm">{message}</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            onClick={handleTestConnection} 
            disabled={!botToken || isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              'Test Connection'
            )}
          </Button>
          
          <Button 
            onClick={handleSaveConfig}
            disabled={status !== 'success'}
            variant="outline"
          >
            Save & Continue
          </Button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">📋 Setup Instructions:</h4>
          <ol className="text-sm space-y-1 text-gray-600">
            <li>1. Open Telegram and search for <code>@BotFather</code></li>
            <li>2. Send <code>/newbot</code> and follow the prompts</li>
            <li>3. Copy the bot token BotFather gives you</li>
            <li>4. Paste the token above and test connection</li>
            <li>5. Deploy your app to get webhook URL</li>
            <li>6. Set webhook to receive messages</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}