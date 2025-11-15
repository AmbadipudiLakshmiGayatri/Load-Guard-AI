import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Scale,
  Users,
  Navigation,
  Award,
  BookOpen,
  Languages,
  IndianRupee,
  FileText,
  Clock,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  generateInitialVehicles, 
  simulateWeightChange, 
  simulatePassengerChange,
  playAlertSound,
  detectViolation
} from '../utils/vehicleSimulation';
import { Vehicle, Violation } from '../types';
import { Language, translations } from '../utils/translations';
import PaymentDialog from './PaymentDialog';

interface DriverAppProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'driver' | 'police') => void;
}

export default function DriverApp({ onNavigate }: DriverAppProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [drivingScore, setDrivingScore] = useState(85);
  const [language, setLanguage] = useState<Language>('en');
  const [violations, setViolations] = useState<Violation[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicle');

  const t = translations[language];

  useEffect(() => {
    // Initialize with a random vehicle
    const vehicles = generateInitialVehicles();
    const selectedVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
    setVehicle(selectedVehicle);

    // Generate sample violations for the vehicle
    const sampleViolations: Violation[] = [];
    if (selectedVehicle.yearlyViolations > 0) {
      for (let i = 0; i < selectedVehicle.yearlyViolations; i++) {
        const violation = detectViolation(selectedVehicle);
        if (violation) {
          sampleViolations.push({
            ...violation,
            id: `VIO${Date.now()}${i}`,
            timestamp: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000),
          });
        }
      }
    }
    setViolations(sampleViolations);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVehicle(prev => {
        if (!prev) return null;
        
        // Randomly update weight or passengers
        const updated = prev.type === 'bus' && Math.random() > 0.5
          ? simulatePassengerChange(prev)
          : simulateWeightChange(prev);

        // Play alerts
        if (updated.warnings > 0 && updated.warnings !== prev.warnings && audioEnabled) {
          playAlertSound(updated.status === 'violation' ? 'violation' : 'warning');
        }

        // Update driving score
        if (updated.status === 'violation') {
          setDrivingScore(s => Math.max(0, s - 5));
        } else if (updated.status === 'safe') {
          setDrivingScore(s => Math.min(100, s + 1));
        }

        return updated;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [audioEnabled]);

  if (!vehicle) return null;

  const isOverloaded = vehicle.currentWeight > vehicle.maxWeight;
  const isOvercrowded = vehicle.passengerCount && vehicle.maxPassengers && vehicle.passengerCount > vehicle.maxPassengers;
  const loadPercentage = (vehicle.currentWeight / vehicle.maxWeight) * 100;
  const passengerPercentage = vehicle.passengerCount && vehicle.maxPassengers 
    ? (vehicle.passengerCount / vehicle.maxPassengers) * 100 
    : 0;

  const pendingViolations = violations.filter(v => v.status === 'pending' || v.status === 'offloading_required');
  const totalFines = pendingViolations.reduce((sum, v) => sum + v.fine, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
      {/* Header */}
      <header className="bg-gray-900/90 backdrop-blur border-b border-cyan-500/30 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate('landing')}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.backToDashboard}
            </Button>
            <div>
              <h1 className="text-xl text-cyan-400">{t.driverCompanion}</h1>
              <p className="text-sm text-gray-400">{vehicle.number}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-cyan-400" />
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-32 bg-gray-900 border-cyan-500/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-cyan-500/30">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="icon"
              className={audioEnabled ? 'border-cyan-500' : 'border-gray-600'}
            >
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-4">
        {/* Alert Banner */}
        {vehicle.warnings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-4 border-2 ${
              vehicle.status === 'violation'
                ? 'bg-red-500/20 border-red-500'
                : 'bg-yellow-500/20 border-yellow-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className={`w-8 h-8 ${
                vehicle.status === 'violation' ? 'text-red-400' : 'text-yellow-400'
              } animate-pulse`} />
              <div className="flex-1">
                <div className={`text-lg mb-1 ${
                  vehicle.status === 'violation' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {t.warningLevel}: {vehicle.warnings}/2
                </div>
                <p className="text-sm text-gray-200">
                  {isOverloaded && `${t.reduceLoad}: ${((vehicle.currentWeight - vehicle.maxWeight) / 1000).toFixed(1)} tons`}
                  {isOvercrowded && `${t.vehicleDetained}: ${vehicle.passengerCount! - vehicle.maxPassengers!} excess passengers`}
                </p>
              </div>
            </div>
            {vehicle.warnings >= 2 && (
              <div className="mt-3 bg-red-600/30 rounded p-3 text-red-200 text-sm">
                🚨 {t.nextViolation}
              </div>
            )}
          </motion.div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-cyan-500/30">
            <TabsTrigger value="vehicle" className="data-[state=active]:bg-cyan-500/20">
              <Navigation className="w-4 h-4 mr-2" />
              {t.myVehicle}
            </TabsTrigger>
            <TabsTrigger value="violations" className="data-[state=active]:bg-cyan-500/20">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t.violations}
            </TabsTrigger>
            <TabsTrigger value="payments" className="data-[state=active]:bg-cyan-500/20">
              <IndianRupee className="w-4 h-4 mr-2" />
              {t.payments}
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-cyan-500/20">
              <Award className="w-4 h-4 mr-2" />
              {t.rewards}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vehicle" className="mt-4 space-y-4">
            {/* Vehicle Status */}
            <Card className="bg-gray-900 border-cyan-500/30 p-6">
              <h3 className="text-lg text-cyan-400 mb-4">{t.vehicleStatus}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">{t.vehicleNumber}:</span>
                  <span className="text-gray-200 ml-2">{vehicle.number}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t.driverName}:</span>
                  <span className="text-gray-200 ml-2">{vehicle.driver}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t.vehicleType}:</span>
                  <span className="text-gray-200 ml-2">{vehicle.type.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-gray-400">{t.route}:</span>
                  <span className="text-gray-200 ml-2">{vehicle.route}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between p-3 bg-gray-800 rounded">
                <span className="text-gray-400">{t.currentStatus}:</span>
                <Badge
                  variant="outline"
                  className={
                    vehicle.status === 'violation'
                      ? 'border-red-500 text-red-400'
                      : vehicle.status === 'warning'
                      ? 'border-yellow-500 text-yellow-400'
                      : 'border-green-500 text-green-400'
                  }
                >
                  {t[vehicle.status as keyof typeof t] || vehicle.status.toUpperCase()}
                </Badge>
              </div>
            </Card>

            {/* Load/Passenger Monitor */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-cyan-500/30 p-6">
                {vehicle.type === 'bus' ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-lg text-cyan-400">{t.passengerCount}</h3>
                      </div>
                      <Badge variant="outline" className={
                        isOvercrowded ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'
                      }>
                        {vehicle.passengerCount}/{vehicle.maxPassengers}
                      </Badge>
                    </div>
                    <div className="text-5xl text-center mb-4 text-cyan-400">
                      {vehicle.passengerCount}
                    </div>
                    <Progress 
                      value={passengerPercentage} 
                      className={`h-3 ${isOvercrowded ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                    />
                    <div className="text-sm text-gray-400 mt-2 text-center">
                      {passengerPercentage.toFixed(1)}% {t.loadPercentage.toLowerCase()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Scale className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-lg text-cyan-400">{t.currentLoad}</h3>
                      </div>
                      <Badge variant="outline" className={
                        isOverloaded ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'
                      }>
                        {(vehicle.currentWeight / 1000).toFixed(1)}t / {(vehicle.maxWeight / 1000).toFixed(1)}t
                      </Badge>
                    </div>
                    <div className="text-5xl text-center mb-4 text-cyan-400">
                      {(vehicle.currentWeight / 1000).toFixed(1)} <span className="text-2xl">tons</span>
                    </div>
                    <Progress 
                      value={loadPercentage} 
                      className={`h-3 ${isOverloaded ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                    />
                    <div className="text-sm text-gray-400 mt-2 text-center">
                      {loadPercentage.toFixed(1)}% {t.loadPercentage.toLowerCase()}
                    </div>
                  </>
                )}
              </Card>

              {/* Driving Score */}
              <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-lg text-cyan-400">Driving Score</h3>
                </div>
                <div className="text-5xl text-center mb-4 text-cyan-400">
                  {drivingScore}
                </div>
                <Progress value={drivingScore} className="h-3 [&>div]:bg-cyan-500" />
                <div className="text-sm text-gray-400 mt-4 text-center">
                  {drivingScore >= 80 ? '✅ Excellent' : drivingScore >= 60 ? '⚠️ Good' : '❌ Needs Improvement'}
                </div>
              </Card>
            </div>

            {/* Tips */}
            <Card className="bg-gray-900 border-cyan-500/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg text-cyan-400">{t.drivingTips}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span>{t.tip1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span>{t.tip2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span>{t.tip3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                  <span>{t.tip4}</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="violations" className="mt-4 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30 p-4">
                <div className="text-sm text-gray-400 mb-1">{t.yearlyViolations}</div>
                <div className="text-3xl text-red-400">{vehicle.yearlyViolations}</div>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30 p-4">
                <div className="text-sm text-gray-400 mb-1">{t.totalFines}</div>
                <div className="text-3xl text-yellow-400">₹{violations.reduce((sum, v) => sum + v.fine, 0).toLocaleString()}</div>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 p-4">
                <div className="text-sm text-gray-400 mb-1">{t.pendingPayment}</div>
                <div className="text-3xl text-orange-400">₹{totalFines.toLocaleString()}</div>
              </Card>
            </div>

            {violations.length === 0 ? (
              <Card className="bg-gray-900 border-cyan-500/30 p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-gray-400">{t.noViolations}</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {violations.map((violation) => (
                  <Card key={violation.id} className="bg-gray-900 border-red-500/30 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-gray-200">{t[violation.type as keyof typeof t]}</span>
                          <Badge
                            variant="outline"
                            className="border-red-500 text-red-400 text-xs"
                          >
                            {t[violation.severity as keyof typeof t]}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{violation.details}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {violation.timestamp.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {violation.location.lat.toFixed(2)}, {violation.location.lng.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl text-red-400">₹{violation.fine.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{t.fine}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="mt-4 space-y-4">
            <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30 p-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">{t.pendingPayment}</div>
                <div className="text-5xl text-red-400 mb-4">₹{totalFines.toLocaleString()}</div>
                <Button
                  onClick={() => setShowPayment(true)}
                  disabled={totalFines === 0}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <IndianRupee className="w-4 h-4 mr-2" />
                  {t.payNow}
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-900 border-cyan-500/30 p-6">
              <h3 className="text-lg text-cyan-400 mb-4">{t.paymentMethods}</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                  <div className="w-10 h-10 bg-green-500/20 rounded flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-gray-200">{t.upiPayment}</div>
                    <div className="text-xs text-gray-500">Instant payment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                  <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-gray-200">{t.cardPayment}</div>
                    <div className="text-xs text-gray-500">Secure checkout</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                  <div className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-gray-200">{t.netBanking}</div>
                    <div className="text-xs text-gray-500">All major banks</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded">
                  <div className="w-10 h-10 bg-orange-500/20 rounded flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-gray-200">{t.wallet}</div>
                    <div className="text-xs text-gray-500">Paytm, PhonePe, GPay</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="mt-4 space-y-4">
            <Card className={`bg-gradient-to-br ${
              vehicle.yearlyViolations < 5
                ? 'from-green-500/20 to-emerald-500/20 border-green-500/30'
                : 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
            } p-6`}>
              <div className="flex items-center gap-3 mb-4">
                <Award className={`w-12 h-12 ${vehicle.yearlyViolations < 5 ? 'text-green-400' : 'text-gray-400'}`} />
                <div>
                  <h3 className="text-xl text-gray-200">{t.rewardProgram}</h3>
                  <p className="text-sm text-gray-400">{t.eligibility}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded p-4">
                  <div className="text-sm text-gray-400 mb-1">{t.violationsThisYear}</div>
                  <div className="text-3xl text-gray-200">{vehicle.yearlyViolations}</div>
                </div>
                <div className="bg-gray-900/50 rounded p-4">
                  <div className="text-sm text-gray-400 mb-1">{t.eligibility}</div>
                  <Badge
                    variant="outline"
                    className={vehicle.yearlyViolations < 5 ? 'border-green-500 text-green-400' : 'border-gray-500 text-gray-400'}
                  >
                    {vehicle.yearlyViolations < 5 ? t.eligibleForReward : t.notEligible}
                  </Badge>
                </div>
                <div className="bg-gray-900/50 rounded p-4">
                  <div className="text-sm text-gray-400 mb-1">{t.fuelCredit}</div>
                  <div className="text-3xl text-green-400">₹{vehicle.rewardPoints}</div>
                </div>
              </div>

              {vehicle.yearlyViolations < 5 ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded p-4 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-green-400 mb-2">{t.congratulations}</p>
                  <p className="text-sm text-gray-400">{t.keepDriving}</p>
                </div>
              ) : (
                <div className="bg-gray-800/50 border border-gray-700 rounded p-4 text-center">
                  <p className="text-gray-400 mb-2">{t.keepDriving}</p>
                </div>
              )}
            </Card>

            <Card className="bg-gray-900 border-cyan-500/30 p-6">
              <h4 className="text-cyan-400 mb-3">{t.criteriaTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>{t.criteria1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>{t.criteria2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>{t.criteria3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>{t.criteria4}</span>
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <PaymentDialog
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={totalFines}
        language={language}
      />
    </div>
  );
}
