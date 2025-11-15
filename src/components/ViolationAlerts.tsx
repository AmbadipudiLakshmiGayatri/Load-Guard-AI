import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Clock, MapPin, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Vehicle, Violation } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ViolationAlertsProps {
  violations: Violation[];
  vehicles: Vehicle[];
}

export default function ViolationAlerts({ violations, vehicles }: ViolationAlertsProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');

  const filteredViolations = violations.filter(v => {
    if (filter === 'all') return true;
    return v.status === filter || (filter === 'pending' && v.status !== 'resolved');
  });

  const totalFines = violations.reduce((sum, v) => sum + v.fine, 0);
  const pendingViolations = violations.filter(v => v.status === 'pending').length;
  const resolvedViolations = violations.filter(v => v.status === 'resolved').length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Violations</div>
              <div className="text-3xl text-red-400">{violations.length}</div>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Pending</div>
              <div className="text-3xl text-yellow-400">{pendingViolations}</div>
            </div>
            <Clock className="w-10 h-10 text-yellow-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Resolved</div>
              <div className="text-3xl text-green-400">{resolvedViolations}</div>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400 opacity-50" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Fines</div>
              <div className="text-3xl text-cyan-400">₹{(totalFines / 1000).toFixed(0)}K</div>
            </div>
            <DollarSign className="w-10 h-10 text-cyan-400 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-cyan-500/30 p-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
          >
            All ({violations.length})
          </Button>
          <Button
            onClick={() => setFilter('pending')}
            variant={filter === 'pending' ? 'default' : 'outline'}
            className={filter === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
          >
            Pending ({pendingViolations})
          </Button>
          <Button
            onClick={() => setFilter('resolved')}
            variant={filter === 'resolved' ? 'default' : 'outline'}
            className={filter === 'resolved' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Resolved ({resolvedViolations})
          </Button>
        </div>
      </Card>

      {/* Violations List */}
      <div className="space-y-3">
        {filteredViolations.length === 0 ? (
          <Card className="bg-gray-900 border-cyan-500/30 p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400 opacity-50" />
            <p className="text-gray-400">No violations in this category</p>
          </Card>
        ) : (
          filteredViolations.map((violation, index) => (
            <ViolationCard
              key={violation.id}
              violation={violation}
              vehicle={vehicles.find(v => v.id === violation.vehicleId)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ViolationCard({ violation, vehicle, index }: { 
  violation: Violation; 
  vehicle?: Vehicle;
  index: number;
}) {
  const [status, setStatus] = useState(violation.status);

  const severityColors = {
    low: 'border-yellow-500/50 bg-yellow-500/10',
    medium: 'border-orange-500/50 bg-orange-500/10',
    high: 'border-red-500/50 bg-red-500/10',
    critical: 'border-red-700/70 bg-red-700/20',
  };

  const typeLabels = {
    overload: 'Overload',
    overcrowd: 'Overcrowding',
    cargo_tamper: 'Cargo Tampering',
    extreme_violation: 'Extreme Violation',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`bg-gray-900 border p-4 ${severityColors[violation.severity]}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-5 h-5 ${
                violation.severity === 'critical' ? 'text-red-600' :
                violation.severity === 'high' ? 'text-red-500' :
                violation.severity === 'medium' ? 'text-orange-500' :
                'text-yellow-500'
              }`} />
              <span className="text-lg">{violation.vehicleNumber}</span>
              <Badge variant="outline" className="text-xs">
                {typeLabels[violation.type]}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  violation.severity === 'critical' ? 'border-red-600 text-red-600' :
                  violation.severity === 'high' ? 'border-red-500 text-red-500' :
                  violation.severity === 'medium' ? 'border-orange-500 text-orange-500' :
                  'border-yellow-500 text-yellow-500'
                }`}
              >
                {violation.severity.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-gray-300 mb-2">{violation.details}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {violation.timestamp.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {violation.location.lat.toFixed(4)}, {violation.location.lng.toFixed(4)}
              </div>
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-2xl text-red-400 mb-1">₹{violation.fine.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Fine Amount</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-700">
          <Button
            size="sm"
            variant="outline"
            className={`${status === 'under_review' ? 'bg-blue-500/20 border-blue-500' : ''}`}
            onClick={() => setStatus('under_review')}
          >
            Under Review
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`${status === 'resolved' ? 'bg-green-500/20 border-green-500' : ''}`}
            onClick={() => setStatus('resolved')}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Resolve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`${status === 'pending_seizure' ? 'bg-red-500/20 border-red-500' : ''}`}
            onClick={() => setStatus('pending_seizure')}
          >
            <XCircle className="w-4 h-4 mr-1" />
            Seizure
          </Button>
        </div>

        {status === 'pending_seizure' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3 bg-red-500/20 border border-red-500/50 rounded text-sm text-red-400"
          >
            🚨 Vehicle marked for seizure. Alert sent to enforcement team.
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
