import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import {
  Mail,
  Globe,
  CreditCard,
  RefreshCw,
  Zap,
  ShieldCheck,
  Gauge,
  ArrowUpRight,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Infrastructure Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time summary of your email infrastructure status
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Globe}
            title="Active Domains"
            value="2"
            description="1 Pending Verification"
            trend={{ value: 100, isPositive: true }}
          />
          <StatCard
            icon={Mail}
            title="Active Mailboxes"
            value="84"
            description="65 Warmed & Ready"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            icon={CreditCard}
            title="Current Package"
            value="Growth"
            description="16 mailboxes remaining"
          />
          <StatCard
            icon={RefreshCw}
            title="Warmup Status"
            value="19"
            description="Mailboxes warming up"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Warmup Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                Warmup Performance
              </h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                View Details
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-700">98%</div>
                <div className="text-sm text-green-600">Inbox Rate</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">95%</div>
                <div className="text-sm text-blue-600">Open Rate</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">92%</div>
                <div className="text-sm text-purple-600">Reply Rate</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Daily Warmup Progress
                </span>
                <span className="text-sm font-medium text-indigo-600">65%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                19 mailboxes are currently in warmup phase. Estimated
                completion: 7 days
              </p>
            </div>
          </div>

          {/* Quick Setup Guide */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Quick Setup Guide
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    1. Add Your Domain
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Start by adding and verifying your domain. This enables
                    secure email sending.
                  </p>
                  <a
                    href="/domains"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-2 inline-flex items-center gap-1"
                  >
                    Add Domain
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    2. Create Mailboxes
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Set up mailboxes for your verified domains. Each mailbox
                    includes automatic warmup.
                  </p>
                  <a
                    href="/mailboxes"
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-2 inline-flex items-center gap-1"
                  >
                    Create Mailbox
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    3. Monitor Performance
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your email warmup progress and maintain high
                    deliverability rates.
                  </p>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-2 inline-flex items-center gap-1">
                    View Analytics
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Done-for-you Services */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl p-6">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-white rounded-lg">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                Need help with setup?
              </h3>
              <p className="text-gray-600 mt-1">
                Our expert team can handle everything from A to Z - domain
                setup, email warmup, and integration with your favorite email
                tools.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow text-sm font-medium">
                  Get Started
                </button>
                <a
                  href="/help"
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
