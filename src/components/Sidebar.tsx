import React from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Mail,
  Settings, 
  CreditCard, 
  HelpCircle, 
  User,
  ChevronRight
} from 'lucide-react';
import { Link } from './ui/Link';
import { Favicon } from './ui/Logos';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Globe, label: 'Domains', href: '/domains', count: 2 },
  { icon: Mail, label: 'Mailboxes', href: '/mailboxes' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: CreditCard, label: 'Subscription', href: '/subscription' },
  { icon: HelpCircle, label: 'Help & FAQs', href: '/help' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6 flex flex-col shadow-lg">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Favicon />
        <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          COLDICP
        </span>
      </div>

      <nav className="flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {mainMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item-3d flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-white transition-colors" />
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.label}</span>
                {item.count && (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-600 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {item.count}
                  </span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item-3d flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-white transition-colors" />
              <span className="font-medium">{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}