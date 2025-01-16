import React, { useState } from 'react';
import { Mail, Plus, Search, RefreshCw, AlertCircle, Wand2, Eye, EyeOff, Copy, Check } from 'lucide-react';

interface Mailbox {
  id: string;
  email: string;
  domain: string;
  status: 'warming' | 'active' | 'suspended';
  createdAt: Date;
  lastActive?: Date;
}

interface Domain {
  id: string;
  name: string;
  status: 'active';
}

export default function MailboxesPage() {
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([
    {
      id: '1',
      email: 'info@example.com',
      domain: 'example.com',
      status: 'active',
      createdAt: new Date('2024-03-10'),
      lastActive: new Date(),
    },
  ]);

  const [activeDomains] = useState<Domain[]>([
    {
      id: '1',
      name: 'example.com',
      status: 'active',
    },
  ]);

  const [showAddMailbox, setShowAddMailbox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [newMailbox, setNewMailbox] = useState({
    username: '',
    password: '',
    domain: '',
  });

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(newMailbox.password);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2000);
  };

  const handleAddMailbox = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMailbox.username || !newMailbox.password || !newMailbox.domain) return;

    const mailbox: Mailbox = {
      id: Date.now().toString(),
      email: `${newMailbox.username}@${newMailbox.domain}`,
      domain: newMailbox.domain,
      status: 'warming',
      createdAt: new Date(),
    };

    setMailboxes([...mailboxes, mailbox]);
    setNewMailbox({ username: '', password: '', domain: '' });
    setShowAddMailbox(false);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    
    // Ensure at least one of each character type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
    password += '!@#$%^&*()_+'[Math.floor(Math.random() * 12)]; // Special
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setNewMailbox(prev => ({ ...prev, password }));
  };

  const getStatusBadgeClasses = (status: Mailbox['status']) => {
    switch (status) {
      case 'warming':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mailboxes</h1>
            <p className="text-gray-600 mt-1">
              Create and manage email mailboxes for your verified domains
            </p>
          </div>
          <button
            onClick={() => setShowAddMailbox(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-indigo-200"
          >
            <Plus className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add Mailbox
            </span>
          </button>
        </div>

        {showAddMailbox && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Mailbox</h2>
            {activeDomains.length === 0 ? (
              <div className="flex items-center gap-3 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p>You need at least one verified domain to create mailboxes.</p>
              </div>
            ) : (
              <form onSubmit={handleAddMailbox} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Username</span>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={newMailbox.username}
                        onChange={(e) => setNewMailbox({ ...newMailbox, username: e.target.value })}
                        placeholder="e.g., info, support, sales"
                        className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                        required
                      />
                    </div>
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Password</span>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newMailbox.password}
                        onChange={(e) => setNewMailbox({ ...newMailbox, password: e.target.value })}
                        placeholder="Enter a strong password"
                        className="w-full pl-4 pr-24 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-gray-400"
                        required
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {newMailbox.password && (
                          <>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                              title={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={handleCopyPassword}
                              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors relative"
                              title="Copy password"
                            >
                              {passwordCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              {passwordCopied && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded">
                                  Copied!
                                </span>
                              )}
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={generatePassword}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Generate strong password"
                        >
                          <Wand2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters long with uppercase, lowercase, numbers, and special characters
                    </p>
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Domain</span>
                    <div className="mt-1">
                      <select
                        value={newMailbox.domain}
                        onChange={(e) => setNewMailbox({ ...newMailbox, domain: e.target.value })}
                        className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-gray-900"
                        required
                      >
                        <option value="">Select a domain</option>
                        {activeDomains.map((domain) => (
                          <option key={domain.id} value={domain.name}>
                            {domain.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMailbox(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                  >
                    Create Mailbox
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Your Mailboxes</h2>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                title="Refresh status"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mailboxes..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mailboxes.map((mailbox) => (
              <div key={mailbox.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">{mailbox.email}</p>
                    <p className="text-sm text-gray-500">
                      Created {mailbox.createdAt.toLocaleDateString()}
                      {mailbox.lastActive && ` • Last active ${mailbox.lastActive.toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                    mailbox.status
                  )}`}
                >
                  {mailbox.status.charAt(0).toUpperCase() + mailbox.status.slice(1)}
                </span>
              </div>
            ))}
            {mailboxes.length === 0 && (
              <p className="py-4 text-gray-500 text-sm">No mailboxes created yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}