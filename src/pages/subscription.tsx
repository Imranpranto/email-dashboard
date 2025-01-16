import React, { useState } from 'react';
import {
  Bell,
  Eye,
  Key,
  Shield,
  Smartphone,
  Webhook,
  X,
  Check,
  Copy,
  RefreshCw,
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'security',
      title: 'Security alerts',
      description:
        'Get notified about security events like new device sign-ins',
      enabled: true,
    },
    {
      id: 'updates',
      title: 'Product updates',
      description: 'Receive updates about new features and improvements',
      enabled: true,
    },
    {
      id: 'marketing',
      title: 'Marketing emails',
      description: 'Get the best deals and stay updated with our newsletter',
      enabled: false,
    },
  ]);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk_live_example_key_123456789');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="p-8 ml-64">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Security
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Authenticator App
                    </p>
                    <p className="text-sm text-gray-500">
                      Protect your account with 2FA
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            Notifications
          </h2>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Webhook className="w-5 h-5 text-indigo-600" />
            API Settings
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                API Key
              </h3>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value="sk_live_example_key_123456789"
                  readOnly
                  className="w-full pr-24 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                    title={showApiKey ? 'Hide API key' : 'Show API key'}
                  >
                    {showApiKey ? (
                      <X className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleCopyApiKey}
                    className="p-1 text-gray-400 hover:text-indigo-600"
                    title="Copy API key"
                  >
                    {apiKeyCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    className="p-1 text-gray-400 hover:text-indigo-600"
                    title="Regenerate API key"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Use this key to authenticate API requests. Keep it secure and
                never share it publicly.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Webhook URL
              </h3>
              <input
                type="url"
                placeholder="https://your-domain.com/webhook"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                We'll send event notifications to this URL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
