import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Building2,
  MapPin,
  Phone,
  Globe,
  Clock,
  Shield,
  AlertCircle,
  Check,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Profile {
  id: string;
  display_name: string;
  company?: string;
  location?: string;
  phone?: string;
  website?: string;
  timezone: string;
}

interface Activity {
  id: string;
  type: 'login' | 'settings' | 'domain' | 'mailbox';
  description: string;
  date: Date;
}

const recentActivity: Activity[] = [
  {
    id: '1',
    type: 'login',
    description: 'Logged in from new device (Chrome on Windows)',
    date: new Date('2024-03-15T10:30:00'),
  },
  {
    id: '2',
    type: 'domain',
    description: 'Added new domain example.com',
    date: new Date('2024-03-14T15:45:00'),
  },
  {
    id: '3',
    type: 'mailbox',
    description: 'Created new mailbox info@example.com',
    date: new Date('2024-03-14T15:50:00'),
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      // Create a default profile using user data
      const defaultProfile: Profile = {
        id: user?.id || '',
        display_name: user?.email?.split('@')[0] || 'User',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      setProfile(defaultProfile);
    } catch (error) {
      console.error('Error setting up profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile || !user) return;

    try {
      setSaving(true);
      // In a real app, you would save to your backend here
      // For now, we just update the local state
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 ml-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your account information and preferences
            </p>
          </div>
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-indigo-200"
          >
            {isEditing ? (
              <Check className="w-4 h-4 text-indigo-600" />
            ) : (
              <User className="w-4 h-4 text-indigo-600" />
            )}
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {saving
                ? 'Saving...'
                : isEditing
                ? 'Save Changes'
                : 'Edit Profile'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile?.display_name || ''}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev
                              ? { ...prev, display_name: e.target.value }
                              : null
                          )
                        }
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled={true}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile?.company || ''}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, company: e.target.value } : null
                          )
                        }
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile?.location || ''}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, location: e.target.value } : null
                          )
                        }
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={profile?.phone || ''}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, phone: e.target.value } : null
                          )
                        }
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={profile?.website || ''}
                        onChange={(e) =>
                          setProfile((prev) =>
                            prev ? { ...prev, website: e.target.value } : null
                          )
                        }
                        disabled={!isEditing}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={profile?.timezone || 'UTC'}
                      onChange={(e) =>
                        setProfile((prev) =>
                          prev ? { ...prev, timezone: e.target.value } : null
                        )
                      }
                      disabled={!isEditing}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="America/New_York">
                        Eastern Time (ET)
                      </option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">
                        Pacific Time (PT)
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Security Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-700">
                      Email Verified
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">
                      2FA Not Enabled
                    </span>
                  </div>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Enable
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-lg">
                      <Clock className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.date.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
