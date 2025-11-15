import { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Vehicle, Violation } from '../types';

interface DispatchUnitProps {
  isOpen: boolean;
  onClose: () => void;
  violation?: Violation;
  vehicle?: Vehicle;
}

export default function DispatchUnit({ isOpen, onClose, violation, vehicle }: DispatchUnitProps) {
  const [dispatching, setDispatching] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [eta, setEta] = useState(0);

  const handleDispatch = () => {
    setDispatching(true);
    const estimatedEta = 5 + Math.floor(Math.random() * 10);
    setEta(estimatedEta);
    
    setTimeout(() => {
      setDispatching(false);
      setDispatched(true);
    }, 2000);
  };

  const availableUnits = [
    { id: 'UNIT-01', name: 'Mobile Enforcement Unit 1', location: 'North Zone HQ', distance: 3.2, available: true },
    { id: 'UNIT-02', name: 'Mobile Enforcement Unit 2', location: 'East Zone Patrol', distance: 5.8, available: true },
    { id: 'UNIT-03', name: 'Mobile Enforcement Unit 3', location: 'South Zone Checkpoint', distance: 7.1, available: false },
    { id: 'UNIT-04', name: 'RTO Inspection Team', location: 'Central Office', distance: 4.5, available: true },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border-red-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-red-400 flex items-center gap-2">
            <Truck className="w-6 h-6" />
            Dispatch Enforcement Unit
          </DialogTitle>
        </DialogHeader>

        {dispatched ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6"
            >
              <Truck className="w-20 h-20 text-green-400" />
            </motion.div>
            <h3 className="text-2xl text-green-400 mb-2">Unit Dispatched!</h3>
            <p className="text-gray-400 mb-4">Enforcement unit is on the way</p>
            
            <Card className="bg-gray-800 border-cyan-500/30 p-6 text-left max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Unit ID:</span>
                  <span className="text-gray-200">UNIT-01</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ETA:</span>
                  <span className="text-cyan-400">{eta} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Status:</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    En Route
                  </Badge>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">Progress</div>
                  <Progress value={15} className="h-2 [&>div]:bg-green-500" />
                </div>
              </div>
            </Card>

            <Button
              onClick={() => {
                setDispatched(false);
                onClose();
              }}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-gray-950"
            >
              Close
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Violation Details */}
            {violation && vehicle && (
              <Card className="bg-red-500/10 border-red-500/30 p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg text-red-400 mb-1">Violation Alert</h3>
                    <p className="text-sm text-gray-400">{violation.vehicleNumber}</p>
                  </div>
                  <Badge variant="outline" className="border-red-500 text-red-400">
                    {violation.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300 mb-3">{violation.details}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{violation.location.lat.toFixed(4)}, {violation.location.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{violation.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Available Units */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm text-gray-400">Available Enforcement Units</h3>
              {availableUnits.map((unit) => (
                <Card
                  key={unit.id}
                  className={`bg-gray-800 border p-4 ${
                    unit.available ? 'border-cyan-500/30' : 'border-gray-700 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-cyan-400" />
                        <span className="text-gray-200">{unit.name}</span>
                        {unit.available ? (
                          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-gray-500 text-gray-500 text-xs">
                            On Duty
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{unit.location}</span>
                        </div>
                        <div className="text-gray-400 text-xs">
                          Distance: <span className="text-cyan-400">{unit.distance} km</span>
                        </div>
                      </div>
                    </div>
                    {unit.available && (
                      <Button
                        size="sm"
                        onClick={handleDispatch}
                        disabled={dispatching}
                        className="bg-red-500 hover:bg-red-600 text-white ml-4"
                      >
                        {dispatching ? 'Dispatching...' : 'Dispatch'}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Dispatch Instructions */}
            <Card className="bg-gray-800 border-cyan-500/30 p-4">
              <h4 className="text-cyan-400 mb-3">Dispatch Instructions</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>Unit will be equipped with weighing equipment and inspection tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>GPS coordinates and vehicle details will be shared with the unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <span>Unit has authority to detain vehicle until offloading compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span>ETA is approximate and depends on traffic conditions</span>
                </li>
              </ul>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
