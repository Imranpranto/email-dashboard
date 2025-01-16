import React, { useState, useEffect } from 'react';
import {
  Globe,
  Plus,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Info,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Domain {
  id: string;
  user_id: string;
  name: string;
  status: 'active' | 'pending_verification' | 'pending_dns';
  verification_record: string | null;
  txt_verification_record?: string;
  txt_verification_checked_at?: string;
  spf_record?: string;
  dmarc_record?: string;
  mx_records?: string[];
  dkim_record?: string;
  dns_records?: boolean;
  created_at: string;
}

const generateVerificationRecord = () => {
  const random = Math.random().toString(36).substring(2, 15);
  return `coldicp-verify=${random}`;
};

export default function DomainsPage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [showDnsHelp, setShowDnsHelp] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<Record<string, any>>({});
  const [showVerificationDetails, setShowVerificationDetails] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const activeDomains = domains.filter((d) => d.status === 'active');
  const pendingDomains = domains.filter((d) => d.status.startsWith('pending_'));

  // Fetch domains on mount
  useEffect(() => {
    if (user) {
      fetchDomains();
    }
  }, [user]);

  // Fetch verification status for domains
  useEffect(() => {
    pendingDomains.forEach((domain) => {
      if (domain.status === 'pending_verification' && !verificationStatus[domain.id]) {
        fetchVerificationStatus(domain.id);
      }
    });
  }, [pendingDomains, verificationStatus]);

  const fetchVerificationStatus = async (domainId: string) => {
    try {
      // Simulate API call
      const mockStatus = {
        status: 'pending',
        verificationMessage: 'Verification in progress. Changes can take up to 24 hours to propagate.',
      };

      setVerificationStatus((prev) => ({
        ...prev,
        [domainId]: mockStatus,
      }));
    } catch (err) {
      console.error('Error fetching verification status:', err);
    }
  };

  const fetchDomains = async () => {
    try {
      setLoading(true);
      // Simulate API call with mock data
      const mockDomains: Domain[] = [
        {
          id: '1',
          user_id: user?.id || '',
          name: 'example.com',
          status: 'active',
          verification_record: null,
          created_at: new Date('2024-03-01').toISOString(),
        },
        {
          id: '2',
          user_id: user?.id || '',
          name: 'test.com',
          status: 'pending_verification',
          verification_record: generateVerificationRecord(),
          spf_record: 'v=spf1 include:_spf.coldicp.com ~all',
          dmarc_record: 'v=DMARC1; p=none; rua=mailto:dmarc@coldicp.com',
          mx_records: ['10 mx1.coldicp.com', '20 mx2.coldicp.com'],
          dkim_record: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...',
          created_at: new Date('2024-03-15').toISOString(),
        },
      ];
      setDomains(mockDomains);
    } catch (err) {
      console.error('Error fetching domains:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch domains');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRecord = (record: string) => {
    navigator.clipboard.writeText(record);
    setCopiedRecord(record);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const toggleDomainExpand = (domainId: string) => {
    setExpandedDomain(expandedDomain === domainId ? null : domainId);
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    try {
      setSubmitting(true);
      setError(null);

      // Simulate API call
      const newDomainRecord: Domain = {
        id: Math.random().toString(),
        user_id: user?.id || '',
        name: newDomain.toLowerCase(),
        status: 'pending_verification',
        verification_record: generateVerificationRecord(),
        spf_record: 'v=spf1 include:_spf.coldicp.com ~all',
        dmarc_record: 'v=DMARC1; p=none; rua=mailto:dmarc@coldicp.com',
        mx_records: ['10 mx1.coldicp.com', '20 mx2.coldicp.com'],
        dkim_record: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...',
        created_at: new Date().toISOString(),
      };

      setDomains((prev) => [...prev, newDomainRecord]);
      setVerificationStatus((prev) => ({
        ...prev,
        [newDomainRecord.id]: {
          preparationMessage: 'Please wait, we are preparing your domain verification...',
        },
      }));
      setNewDomain('');
      setShowAddDomain(false);
    } catch (err) {
      console.error('Error adding domain:', err);
      setError(err instanceof Error ? err.message : 'Failed to add domain');
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyDomain = async (domainId: string) => {
    try {
      // Show verification message first
      setVerificationStatus((prev) => ({
        ...prev,
        [domainId]: {
          ...prev[domainId],
          verificationMessage: 'Verification in progress. Changes can take up to 24 hours to propagate.',
        },
      }));

      // Simulate API call
      setDomains((prev) =>
        prev.map((domain) =>
          domain.id === domainId
            ? {
                ...domain,
                status: 'active',
                txt_verification_record: 'verified',
                txt_verification_checked_at: new Date().toISOString(),
              }
            : domain
        )
      );

      await fetchVerificationStatus(domainId);
    } catch (err) {
      console.error('Error verifying domain:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify domain');
    }
  };

  const handleShowVerificationDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call
      const mockVerificationRecords = [
        {
          domain_id: '1',
          status: 'verified',
          last_checked: new Date().toISOString(),
        },
      ];

      console.table(mockVerificationRecords);
      setShowVerificationDetails(!showVerificationDetails);
    } catch (err) {
      console.error('Error fetching verification records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch verification records');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Domain Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your email domains</p>
            <button
              onClick={handleShowVerificationDetails}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              {showVerificationDetails ? 'Hide' : 'Show'} Verification Details
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showVerificationDetails ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
          <button
            onClick={() => setShowAddDomain(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:border-indigo-200"
          >
            <Plus className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add Domain
            </span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {showAddDomain && (
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Domain</h2>
            <form onSubmit={handleAddDomain} className="flex gap-4">
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                placeholder="Enter domain name (e.g., example.com)"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                disabled={submitting}
              >
                {submitting ? 'Adding...' : 'Add Domain'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddDomain(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Active Domains ({activeDomains.length})
              </h2>
              <div className="divide-y divide-gray-100">
                {activeDomains.map((domain) => (
                  <div key={domain.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-900">{domain.name}</p>
                        <p className="text-sm text-gray-500">
                          Added {new Date(domain.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                ))}
                {activeDomains.length === 0 && (
                  <p className="py-4 text-gray-500 text-sm">No active domains yet</p>
                )}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                Pending Verification ({pendingDomains.length})
              </h2>
              <div className="divide-y divide-gray-100">
                {pendingDomains.map((domain) => (
                  <div key={domain.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-900">{domain.name}</p>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-500">
                            Added {new Date(domain.created_at).toLocaleDateString()}
                          </p>
                          {domain.status === 'pending_verification' && domain.verification_record && (
                            <div className="flex items-center gap-2"></div>
                          )}
                        </div>
                        <div className="mt-4 space-y-4">
                          {domain.status === 'pending_verification' && domain.verification_record && (
                            <div className="space-y-3">
                              {domain.verification_record === null ? (
                                <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                                  <span className="text-sm text-gray-600">
                                    Please wait, we are preparing something for you...
                                  </span>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-yellow-800 bg-yellow-50 px-2 py-1 rounded-full">
                                      Verification Required
                                    </span>
                                    <button
                                      onClick={() => handleCopyRecord(domain.verification_record!)}
                                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                                    >
                                      {copiedRecord === domain.verification_record ? (
                                        <>
                                          <Check className="w-3 h-3" />
                                          Copied
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3 h-3" />
                                          Copy Record
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 text-xs">
                                    <div className="text-center p-2 bg-gray-50 rounded">
                                      <div className="font-medium text-gray-600">Host</div>
                                      <div className="font-mono">@</div>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded">
                                      <div className="font-medium text-gray-600">TTL</div>
                                      <div className="font-mono">3600</div>
                                    </div>
                                    <div className="col-span-3 p-2 bg-gray-50 rounded">
                                      <div className="font-medium text-gray-600 mb-1">TXT Value</div>
                                      <div className="font-mono text-sm truncate">
                                        {domain.verification_record}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleVerifyDomain(domain.id)}
                                    className="w-full px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm font-medium"
                                    disabled={domain.txt_verification_record === 'verified'}
                                  >
                                    {domain.txt_verification_record === 'verified'
                                      ? 'Domain Verified'
                                      : 'Verify Domain'}
                                  </button>
                                </>
                              )}

                              {verificationStatus[domain.id]?.verificationMessage && (
                                <p className="mt-2 text-sm text-gray-600 text-center">
                                  {verificationStatus[domain.id].verificationMessage}
                                </p>
                              )}

                              {verificationStatus[domain.id]?.error_message && (
                                <p className="mt-2 text-sm text-red-600">
                                  Verification failed: {verificationStatus[domain.id].error_message}
                                </p>
                              )}
                            </div>
                          )}

                          {domain.status === 'pending_dns' && domain.dns_records && (
                            <button
                              onClick={() => toggleDomainExpand(domain.id)}
                              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group"
                            >
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    Step 2: Configure DNS Records
                                  </span>
                                  <span className="px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Required
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 text-left">
                                  Set up email authentication and routing
                                </p>
                              </div>
                              {expandedDomain === domain.id ? (
                                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                              )}
                            </button>
                          )}

                          {expandedDomain === domain.id && domain.dns_records && (
                            <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
                              {/* SPF Record */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-900">SPF Record</h4>
                                  <button
                                    onClick={() => handleCopyRecord(domain.spf_record!)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                    title="Copy record"
                                  >
                                    {copiedRecord === domain.spf_record ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                                <code className="block p-2 text-sm font-mono bg-gray-50 rounded border border-gray-200 text-gray-700">
                                  {domain.spf_record}
                                </code>
                              </div>

                              {/* DMARC Record */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-900">DMARC Record</h4>
                                  <button
                                    onClick={() => handleCopyRecord(domain.dmarc_record!)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                    title="Copy record"
                                  >
                                    {copiedRecord === domain.dmarc_record ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                                <code className="block p-2 text-sm font-mono bg-gray-50 rounded border border-gray-200 text-gray-700">
                                  {domain.dmarc_record}
                                </code>
                              </div>

                              {/* MX Records */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-900">MX Records</h4>
                                </div>
                                {domain.mx_records!.map((record, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between mb-2 last:mb-0"
                                  >
                                    <code className="p-2 text-sm font-mono bg-gray-50 rounded border border-gray-200 text-gray-700 flex-1">
                                      {record}
                                    </code>
                                    <button
                                      onClick={() => handleCopyRecord(record)}
                                      className="p-1 ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
                                      title="Copy record"
                                    >
                                      {copiedRecord === record ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {/* DKIM Record */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-gray-900">DKIM Record</h4>
                                  <button
                                    onClick={() => handleCopyRecord(domain.dkim_record!)}
                                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                                    title="Copy record"
                                  >
                                    {copiedRecord === domain.dkim_record ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                                <code className="block p-2 text-sm font-mono bg-gray-50 rounded border border-gray-200 text-gray-700">
                                  {domain.dkim_record}
                                </code>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {domain.status === 'pending_verification'
                        ? 'Verification Required'
                        : 'DNS Setup Required'}
                    </span>
                  </div>
                ))}
                {pendingDomains.length === 0 && (
                  <p className="py-4 text-gray-500 text-sm">No pending domains</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
