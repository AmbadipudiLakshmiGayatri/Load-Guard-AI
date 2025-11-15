import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Lock, CheckCircle, AlertTriangle, Scale, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { BlockchainEntry } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface BlockchainLogProps {
  entries: BlockchainEntry[];
}

export default function BlockchainLog({ entries }: BlockchainLogProps) {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const eventIcons = {
    weight_check: <Scale className="w-4 h-4" />,
    alert: <AlertTriangle className="w-4 h-4" />,
    cargo_verification: <Camera className="w-4 h-4" />,
    violation: <AlertTriangle className="w-4 h-4" />,
  };

  const eventColors = {
    weight_check: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
    alert: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
    cargo_verification: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
    violation: 'border-red-500/50 bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <Database className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-cyan-400 mb-1">Blockchain Ledger</h2>
            <p className="text-gray-400">Immutable, tamper-proof record of all transport events</p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-cyan-400">{entries.length}</div>
            <div className="text-sm text-gray-400">Total Entries</div>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <InfoCard
          icon={<Scale className="w-6 h-6" />}
          label="Weight Checks"
          value={entries.filter(e => e.eventType === 'weight_check').length}
          color="cyan"
        />
        <InfoCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Alerts"
          value={entries.filter(e => e.eventType === 'alert').length}
          color="yellow"
        />
        <InfoCard
          icon={<Camera className="w-6 h-6" />}
          label="Cargo Verifications"
          value={entries.filter(e => e.eventType === 'cargo_verification').length}
          color="blue"
        />
        <InfoCard
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Violations"
          value={entries.filter(e => e.eventType === 'violation').length}
          color="red"
        />
      </div>

      {/* Blockchain Visualization */}
      <Card className="bg-gray-900 border-cyan-500/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-green-400" />
          <h3 className="text-lg text-gray-200">Blockchain Chain</h3>
          <Badge variant="outline" className="ml-auto border-green-500 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </div>

        <div className="space-y-3">
          {entries.slice(0, 20).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className={`bg-gray-800 border p-4 cursor-pointer hover:border-cyan-500/50 transition-all ${
                eventColors[entry.eventType]
              }`}
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      {eventIcons[entry.eventType]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{entry.eventType.replace('_', ' ').toUpperCase()}</span>
                        <Badge variant="outline" className="text-xs">{entry.vehicleId}</Badge>
                      </div>
                      <div className="text-xs text-gray-400">
                        {entry.timestamp.toLocaleString()}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-400 mb-1">Block Hash</div>
                      <div className="text-xs font-mono text-cyan-400">
                        {entry.hash.substring(0, 8)}...{entry.hash.substring(entry.hash.length - 8)}
                      </div>
                    </div>

                    {expandedEntry === entry.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedEntry === entry.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 mb-1">Block ID</div>
                        <div className="font-mono text-xs text-gray-200">{entry.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Previous Hash</div>
                        <div className="font-mono text-xs text-gray-200">
                          {entry.previousHash.substring(0, 16)}...
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400 mb-1">Data</div>
                        <div className="bg-gray-900 rounded p-2 font-mono text-xs text-gray-200 overflow-x-auto">
                          {JSON.stringify(entry.data, null, 2)}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400 mb-1">Full Hash</div>
                        <div className="bg-gray-900 rounded p-2 font-mono text-xs text-green-400 break-all">
                          {entry.hash}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Block verified and secured in distributed ledger</span>
                    </div>
                  </motion.div>
                )}
              </Card>

              {/* Chain Connector */}
              {index < entries.slice(0, 20).length - 1 && (
                <div className="flex justify-center my-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-cyan-500/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {entries.length > 20 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing 20 of {entries.length} entries
          </div>
        )}
      </Card>

      {/* Blockchain Info */}
      <Card className="bg-gray-900 border-cyan-500/30 p-6">
        <h3 className="text-lg text-cyan-400 mb-4">Blockchain Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FeatureItem
            icon={<Lock className="w-5 h-5 text-green-400" />}
            title="Tamper-Proof"
            description="Each block is cryptographically linked to the previous block, making it impossible to alter historical records"
          />
          <FeatureItem
            icon={<CheckCircle className="w-5 h-5 text-cyan-400" />}
            title="Transparent"
            description="All stakeholders can audit the complete history of weight checks, alerts, and violations"
          />
          <FeatureItem
            icon={<Database className="w-5 h-5 text-blue-400" />}
            title="Distributed"
            description="Data is replicated across multiple nodes, ensuring no single point of failure"
          />
          <FeatureItem
            icon={<AlertTriangle className="w-5 h-5 text-yellow-400" />}
            title="Corruption-Free"
            description="Immutable records prevent data manipulation and ensure accountability"
          />
        </div>
      </Card>
    </div>
  );
}

function InfoCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: number;
  color: 'cyan' | 'yellow' | 'blue' | 'red';
}) {
  const colors = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
    yellow: 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
    blue: 'from-blue-500/10 to-blue-500/5 border-blue-500/30 text-blue-400',
    red: 'from-red-500/10 to-red-500/5 border-red-500/30 text-red-400',
  };

  return (
    <Card className={`bg-gradient-to-br border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-400 mb-1">{label}</div>
          <div className="text-2xl">{value}</div>
        </div>
        <div className="opacity-50">{icon}</div>
      </div>
    </Card>
  );
}

function FeatureItem({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-200 mb-1">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
