import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Globe,
  Shield,
  Key,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';

interface FaqCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

const faqCategories: FaqCategory[] = [
  {
    id: 'getting-started',
    icon: Zap,
    title: 'Getting Started',
    description: 'Basic information about setting up and using COLDICP',
    faqs: [
      {
        question: 'How do I get started with COLDICP?',
        answer:
          'To get started, first create an account and verify your email. Then, add your first domain and follow the DNS verification process. Once verified, you can start creating mailboxes and managing your email infrastructure.',
      },
      {
        question: 'What are the system requirements?',
        answer:
          'COLDICP is a cloud-based solution that works with any modern web browser. There are no specific system requirements or software to install.',
      },
      {
        question: 'How long does domain verification take?',
        answer:
          'Domain verification typically takes 24-48 hours after adding the required DNS records. Some DNS providers may propagate changes faster, allowing for quicker verification.',
      },
      {
        question: 'Do you offer done-for-you setup services?',
        answer:
          'Yes! If you need done-for-you email setup services, just send a message for details. Our expert team will handle everything from A to Z and set up your infrastructure with Smartlead, Instantly, Lemlist, or any email sequencer and activate email warmup. Contact us at support@coldicp.com for assistance.',
      },
    ],
  },
  {
    id: 'domains',
    icon: Globe,
    title: 'Domain Management',
    description: 'Questions about domain setup and configuration',
    faqs: [
      {
        question: 'How do I add a new domain?',
        answer:
          'Navigate to the Domains page, click "Add Domain", and enter your domain name. You\'ll receive DNS records that need to be added to your domain\'s DNS settings for verification.',
      },
      {
        question: 'Can I use subdomains?',
        answer:
          'Yes, you can use subdomains for your email infrastructure. Add them the same way as regular domains and follow the verification process.',
      },
      {
        question: 'What DNS records are required?',
        answer:
          'Required DNS records include TXT records for domain verification, MX records for mail routing, and optional DKIM/SPF records for email authentication.',
      },
    ],
  },
  {
    id: 'mailboxes',
    icon: Mail,
    title: 'Mailbox Management',
    description: 'Information about mailbox creation and maintenance',
    faqs: [
      {
        question: 'How do I create a new mailbox?',
        answer:
          'Go to the Mailboxes page, click "Add Mailbox", select the domain, and provide the required information. The mailbox will be created instantly.',
      },
      {
        question: 'How many mailboxes can I create?',
        answer:
          'The number of mailboxes depends on your subscription plan. Check the Subscription page for your current limits and available upgrades.',
      },
    ],
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Security features and best practices',
    faqs: [
      {
        question: 'How secure are my mailboxes?',
        answer:
          'We use industry-standard encryption and security measures. All data is encrypted at rest and in transit, and we provide additional security features like 2FA.',
      },
      {
        question: 'What authentication methods are supported?',
        answer:
          'We support standard email authentication protocols including SPF, DKIM, and DMARC to ensure your emails are properly authenticated and delivered.',
      },
    ],
  },
  {
    id: 'api',
    icon: Key,
    title: 'API Access',
    description: 'Information about API integration and usage',
    faqs: [
      {
        question: 'How do I get an API key?',
        answer:
          'API keys can be generated in the Settings page under the API Settings section. Make sure to keep your API key secure and never share it publicly.',
      },
      {
        question: 'Is there a rate limit?',
        answer:
          'Yes, API rate limits vary by subscription plan. Check our API documentation for detailed information about limits and best practices.',
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories;

  return (
    <div className="p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Help & FAQs</h1>
            <p className="text-gray-600 mt-1">
              Find answers to common questions and learn how to use COLDICP
            </p>
          </div>
          <button
            onClick={() => (window.location.href = '#contact-support')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-indigo-200"
          >
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Contact Support
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-lg">
                    <category.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
                {expandedCategories.includes(category.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedCategories.includes(category.id) && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    {category.faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-base font-medium text-gray-900">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div
          id="contact-support"
          className="mt-12 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Still need help?
              </h3>
              <p className="text-gray-600">
                Our support team is available 24/7 to assist you.{' '}
                <a
                  href="mailto:support@coldicp.com"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
