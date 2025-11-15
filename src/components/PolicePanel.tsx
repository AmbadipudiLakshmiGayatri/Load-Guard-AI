import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  CheckCircle,
  Clock,
  DollarSign,
  Camera,
  Bell,
  Truck
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import CheckpointCamera from './CheckpointCamera';
import RTOContactDialog from './RTOContactDialog';
import DispatchUnit from './DispatchUnit';
import { 
  generateInitialVehicles,
  detectViolation,
  playAlertSound 
} from '../utils/vehicleSimulation';
import { Vehicle, Violation } from '../types';

interface PolicePanelProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'driver' | 'police') => void;
}

export default function PolicePanel({ onNavigate }: PolicePanelProps) {
  const [alerts, setAlerts] = useState<Array<Violation & { vehicle: Vehicle }>>([]);
  const [activeTab, setActiveTab] = useState('active');
  const [newAlertCount, setNewAlertCount] = useState(0);
  const [showCameras, setShowCameras] = useState(false);
  const [showRTOContact, setShowRTOContact] = useState(false);
  const [dispatchData, setDispatchData] = useState<{ violation?: Violation; vehicle?: Vehicle } | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const initialVehicles = generateInitialVehicles();
    setVehicles(initialVehicles);
    
    // Generate initial alerts from violation vehicles
    const initialAlerts = initialVehicles
      .map(vehicle => {
        const violation = detectViolation(vehicle);
        return violation ? { ...violation, vehicle } : null;
      })
      .filter(Boolean) as Array<Violation & { vehicle: Vehicle }>;
    
    setAlerts(initialAlerts);
    setNewAlertCount(initialAlerts.length);

    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newVehicle = initialVehicles[Math.floor(Math.random() * initialVehicles.length)];
        const violation = detectViolation(newVehicle);
        
        if (violation) {
          const newAlert = { ...violation, vehicle: newVehicle };
          setAlerts(prev => [newAlert, ...prev].slice(0, 20));
          setNewAlertCount(c => c + 1);
          playAlertSound('violation');
        }
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const activeAlerts = alerts.filter(a => a.status === 'pending' || a.status === 'under_review');
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950/30 to-gray-950">
      {/* Header */}
      <header className="bg-gray-900/90 backdrop-blur border-b border-red-500/30 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate('landing')}
              variant="ghost"
              className="text-red-400 hover:text-red-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-400" />
              <div>
                <h1 className="text-xl text-red-400">Police Control Center</h1>
                <p className="text-sm text-gray-400">Transport Enforcement Division</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-red-400" />
              {newAlertCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs"
                >
                  {newAlertCount}
                </motion.div>
              )}
            </div>
            <Button
              onClick={() => setNewAlertCount(0)}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/20"
            >
              Clear Notifications
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-4">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard
            icon={<AlertTriangle className="w-8 h-8" />}
            label="Active Alerts"
            value={activeAlerts.length}
            color="red"
          />
          <StatCard
            icon={<Clock className="w-8 h-8" />}
            label="Pending Review"
            value={alerts.filter(a => a.status === 'under_review').length}
            color="yellow"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8" />}
            label="Resolved Today"
            value={resolvedAlerts.length}
            color="green"
          />
          <StatCard
            icon={<DollarSign className="w-8 h-8" />}
            label="Total Fines"
            value={`₹${(alerts.reduce((sum, a) => sum + a.fine, 0) / 1000).toFixed(0)}K`}
            color="cyan"
          />
        </div>

        {/* Alert Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-red-500/30">
            <TabsTrigger value="active" className="data-[state=active]:bg-red-500/20">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Active Alerts ({activeAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-green-500/20">
              <CheckCircle className="w-4 h-4 mr-2" />
              Resolved ({resolvedAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            <div className="space-y-3">
              {activeAlerts.length === 0 ? (
                <Card className="bg-gray-900 border-cyan-500/30 p-8 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400 opacity-50" />
                  <p className="text-gray-400">No active alerts at the moment</p>
                </Card>
              ) : (
                activeAlerts.map((alert, index) => (
                  <AlertCard 
                    key={alert.id} 
                    alert={alert} 
                    index={index}
                    onDispatch={() => setDispatchData({ violation: alert, vehicle: alert.vehicle })}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="mt-4">
            <div className="space-y-3">
              {resolvedAlerts.length === 0 ? (
                <Card className="bg-gray-900 border-cyan-500/30 p-8 text-center">
                  <p className="text-gray-400">No resolved alerts yet</p>
                </Card>
              ) : (
                resolvedAlerts.map((alert, index) => (
                  <AlertCard key={alert.id} alert={alert} index={index} resolved />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-red-500/30 p-6">
          <h3 className="text-lg text-red-400 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <Button 
              onClick={() => setShowRTOContact(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact RTO
            </Button>
            <Button 
              onClick={() => setShowCameras(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              View Live Cameras
            </Button>
            <Button 
              onClick={() => setDispatchData({})}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Truck className="w-4 h-4 mr-2" />
              Dispatch Unit
            </Button>
          </div>
        </Card>
      </div>

      {/* Dialogs */}
      <CheckpointCamera 
        isOpen={showCameras} 
        onClose={() => setShowCameras(false)}
        vehicles={vehicles}
      />
      <RTOContactDialog 
        isOpen={showRTOContact} 
        onClose={() => setShowRTOContact(false)}
      />
      <DispatchUnit
        isOpen={dispatchData !== null}
        onClose={() => setDispatchData(null)}
        violation={dispatchData?.violation}
        vehicle={dispatchData?.vehicle}
      />
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number;
  color: 'red' | 'yellow' | 'green' | 'cyan';
}) {
  const colors = {
    red: 'from-red-500/10 to-red-500/5 border-red-500/30 text-red-400',
    yellow: 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
    green: 'from-green-500/10 to-green-500/5 border-green-500/30 text-green-400',
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
  };

  return (
    <Card className={`bg-gradient-to-br border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="opacity-70">{icon}</div>
        <div className="text-3xl">{value}</div>
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </Card>
  );
}

function AlertCard({ 
  alert, 
  index, 
  resolved,
  onDispatch
}: { 
  alert: Violation & { vehicle: Vehicle }; 
  index: number;
  resolved?: boolean;
  onDispatch?: () => void;
}) {
  const [status, setStatus] = useState(alert.status);

  const severityColors = {
    low: 'border-yellow-500/50',
    medium: 'border-orange-500/50',
    high: 'border-red-500/50',
    critical: 'border-red-700/70',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`bg-gray-900 border-2 p-4 ${severityColors[alert.severity]} ${resolved ? 'opacity-60' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-6 h-6 ${
                alert.severity === 'critical' ? 'text-red-600 animate-pulse' :
                alert.severity === 'high' ? 'text-red-500' :
                alert.severity === 'medium' ? 'text-orange-500' :
                'text-yellow-500'
              }`} />
              <div>
                <div className="text-xl">{alert.vehicleNumber}</div>
                <div className="text-sm text-gray-400">{alert.vehicle.driver}</div>
              </div>
              <Badge variant="outline" className="ml-2 text-xs border-red-500 text-red-400">
                {alert.severity.toUpperCase()}
              </Badge>
            </div>

            <p className="text-sm text-gray-300 mb-3">{alert.details}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{alert.timestamp.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>Driver: +91-XXXXXXXXXX</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <DollarSign className="w-4 h-4" />
                <span>Fine: ₹{alert.fine.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="text-3xl text-red-400 mb-1">₹{(alert.fine / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-400">Penalty</div>
          </div>
        </div>

        {!resolved && (
          <div className="flex gap-2 pt-3 border-t border-gray-800">
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
              onClick={onDispatch}
              className="bg-red-500 hover:bg-red-600 text-white ml-auto"
            >
              <Truck className="w-4 h-4 mr-1" />
              Dispatch Unit
            </Button>
          </div>
        )}

        {status === 'resolved' && !resolved && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3 bg-green-500/20 border border-green-500/50 rounded text-sm text-green-400"
          >
            ✓ Alert resolved. Fine notice sent to driver.
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
