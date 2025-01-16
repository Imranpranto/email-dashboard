import React from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';

const actions = [
  {
    label: 'Add Mailbox',
    icon: Plus,
    onClick: () => console.log('Add mailbox'),
  },
  {
    label: 'Check Domain',
    icon: Search,
    onClick: () => console.log('Check domain'),
  },
  {
    label: 'Sync Status',
    icon: RefreshCw,
    onClick: () => console.log('Sync status'),
  },
];

export function QuickActions() {
  return (
    <div className="flex gap-4">
      {actions.map(({ label, icon: Icon, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-indigo-200"
        >
          <Icon className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700" />
          <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{label}</span>
        </button>
      ))}
    </div>
  );
}