import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, AlertCircle, Camera, Database, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import MapView from './MapView';
import ViolationAlerts from './ViolationAlerts';
import BlockchainLog from './BlockchainLog';
import CameraFeed from './CameraFeed';
import AnalyticsDashboard from './AnalyticsDashboard';
import RewardSystem from './RewardSystem';
import { Vehicle, Violation, BlockchainEntry } from '../types';
import { 
  generateInitialVehicles, 
  updateVehiclePositions, 
  simulateWeightChange,
  simulatePassengerChange,
  detectViolation,
  createBlockchainEntry,
  playAlertSound
} from '../utils/vehicleSimulation';

interface DashboardProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'driver' | 'police') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [blockchainLog, setBlockchainLog] = useState<BlockchainEntry[]>([]);
  const [activeTab, setActiveTab] = useState('map');

  useEffect(() => {
    // Initialize vehicles
    const initialVehicles = generateInitialVehicles();
    setVehicles(initialVehicles);

    // Create initial blockchain entries
    const initialEntries = initialVehicles.map((v, i) => 
      createBlockchainEntry(
        v.id,
        'weight_check',
        { weight: v.currentWeight, maxWeight: v.maxWeight },
        i === 0 ? '0000000000000000' : `prev${i}`
      )
    );
    setBlockchainLog(initialEntries);

    // Update vehicle positions every 3 seconds
    const positionInterval = setInterval(() => {
      setVehicles(prev => updateVehiclePositions(prev));
    }, 3000);

    // Simulate weight/passenger changes every 5 seconds
    const simulationInterval = setInterval(() => {
      setVehicles(prev => {
        return prev.map(vehicle => {
          // Randomly choose to simulate weight or passenger change
          if (Math.random() > 0.7) {
            if (vehicle.type === 'bus' && Math.random() > 0.5) {
              return simulatePassengerChange(vehicle);
            } else {
              return simulateWeightChange(vehicle);
            }
          }
          return vehicle;
        });
      });
    }, 5000);

    // Check for violations every 2 seconds
    const violationInterval = setInterval(() => {
      setVehicles(prev => {
        const newViolations: Violation[] = [];
        const newBlockchainEntries: BlockchainEntry[] = [];

        prev.forEach(vehicle => {
          const violation = detectViolation(vehicle);
          if (violation && !violations.find(v => 
            v.vehicleId === vehicle.id && 
            v.timestamp.getTime() > Date.now() - 10000
          )) {
            newViolations.push(violation);
            playAlertSound('violation');

            // Add blockchain entry
            const lastHash = blockchainLog[blockchainLog.length - 1]?.hash || '0000000000000000';
            const entry = createBlockchainEntry(
              vehicle.id,
              'violation',
              { violation: violation.type, severity: violation.severity, fine: violation.fine },
              lastHash
            );
            newBlockchainEntries.push(entry);
          } else if (vehicle.warnings === 1 && vehicle.status === 'warning') {
            playAlertSound('warning');
          }
        });

        if (newViolations.length > 0) {
          setViolations(v => [...newViolations, ...v].slice(0, 50));
        }
        if (newBlockchainEntries.length > 0) {
          setBlockchainLog(log => [...newBlockchainEntries, ...log].slice(0, 100));
        }

        return prev;
      });
    }, 2000);

    return () => {
      clearInterval(positionInterval);
      clearInterval(simulationInterval);
      clearInterval(violationInterval);
    };
  }, []);

  const safeVehicles = vehicles.filter(v => v.status === 'safe').length;
  const warningVehicles = vehicles.filter(v => v.status === 'warning').length;
  const violationVehicles = vehicles.filter(v => v.status === 'violation').length;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-cyan-500/30 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate('landing')}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl text-cyan-400">LoadGuardian Control Center</h1>
              <p className="text-sm text-gray-400">Real-time Transport Compliance Monitoring</p>
            </div>
          </div>
          <div className="flex gap-4">
            <StatBadge label="Safe" value={safeVehicles} color="green" />
            <StatBadge label="Warning" value={warningVehicles} color="yellow" />
            <StatBadge label="Violation" value={violationVehicles} color="red" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-cyan-500/30">
            <TabsTrigger value="map" className="data-[state=active]:bg-cyan-500/20">
              <MapPin className="w-4 h-4 mr-2" />
              Live Map
            </TabsTrigger>
            <TabsTrigger value="violations" className="data-[state=active]:bg-cyan-500/20">
              <AlertCircle className="w-4 h-4 mr-2" />
              Violations
            </TabsTrigger>
            <TabsTrigger value="camera" className="data-[state=active]:bg-cyan-500/20">
              <Camera className="w-4 h-4 mr-2" />
              Camera Feeds
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-cyan-500/20">
              <Database className="w-4 h-4 mr-2" />
              Blockchain Log
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-500/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-cyan-500/20">
              <Award className="w-4 h-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-4">
            <MapView vehicles={vehicles} violations={violations} />
          </TabsContent>

          <TabsContent value="violations" className="mt-4">
            <ViolationAlerts violations={violations} vehicles={vehicles} />
          </TabsContent>

          <TabsContent value="camera" className="mt-4">
            <CameraFeed vehicles={vehicles} />
          </TabsContent>

          <TabsContent value="blockchain" className="mt-4">
            <BlockchainLog entries={blockchainLog} />
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <AnalyticsDashboard vehicles={vehicles} violations={violations} />
          </TabsContent>

          <TabsContent value="rewards" className="mt-4">
            <RewardSystem vehicles={vehicles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: number; color: 'green' | 'yellow' | 'red' }) {
  const colors = {
    green: 'bg-green-500/20 border-green-500 text-green-400',
    yellow: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    red: 'bg-red-500/20 border-red-500 text-red-400',
  };

  return (
    <div className={`px-4 py-2 rounded-lg border ${colors[color]}`}>
      <div className="text-xs opacity-80">{label}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}
