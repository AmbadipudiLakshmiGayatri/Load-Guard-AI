import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, MapPin, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Vehicle } from '../types';

interface CheckpointCameraProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
}

export default function CheckpointCamera({ isOpen, onClose, vehicles }: CheckpointCameraProps) {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>('North Zone Checkpoint');

  const checkpoints = [
    { name: 'North Zone Checkpoint', location: 'NH-44 North', region: 'North Zone', active: true },
    { name: 'East Zone Checkpoint', location: 'Ring Road East', region: 'East Zone', active: true },
    { name: 'West Zone Checkpoint', location: 'Outer Ring Road', region: 'West Zone', active: true },
    { name: 'South Zone Checkpoint', location: 'Inner Ring Road', region: 'South Zone', active: true },
  ];

  const checkpoint = checkpoints.find(c => c.name === selectedCheckpoint);
  const regionVehicles = vehicles.filter(v => v.region === checkpoint?.region);
  const violatingVehicles = regionVehicles.filter(v => v.status === 'violation' || v.status === 'warning');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-cyan-400 flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Live Checkpoint Cameras
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Checkpoint Selection */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-sm text-gray-400 mb-3">Select Checkpoint</h3>
            {checkpoints.map((cp) => (
              <motion.div
                key={cp.name}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCheckpoint(cp.name)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCheckpoint === cp.name
                    ? 'bg-cyan-500/20 border-cyan-500'
                    : 'bg-gray-800 border-gray-700 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-200">{cp.region}</span>
                  </div>
                  {cp.active && (
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
                <div className="text-xs text-gray-400">{cp.location}</div>
              </motion.div>
            ))}

            {/* Statistics */}
            <Card className="bg-gray-800 border-cyan-500/30 p-4 mt-4">
              <h4 className="text-sm text-cyan-400 mb-3">Checkpoint Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicles Passing:</span>
                  <span className="text-gray-200">{regionVehicles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Violations:</span>
                  <span className="text-red-400">{violatingVehicles.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Compliance:</span>
                  <span className="text-green-400">
                    {regionVehicles.length > 0
                      ? ((1 - violatingVehicles.length / regionVehicles.length) * 100).toFixed(0)
                      : 100}%
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Camera Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-black border-cyan-500/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg text-cyan-400">{selectedCheckpoint}</h3>
                  <p className="text-sm text-gray-400">{checkpoint?.location}</p>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                  LIVE
                </Badge>
              </div>

              {/* Simulated Camera View */}
              <div className="relative w-full h-96 bg-gray-950 rounded-lg overflow-hidden border border-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                
                {/* Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Camera Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 rounded px-3 py-2 text-xs">
                  <div className="text-cyan-400 mb-1">CHECKPOINT CAM-{checkpoints.findIndex(c => c.name === selectedCheckpoint) + 1}</div>
                  <div className="text-gray-400">{new Date().toLocaleString()}</div>
                </div>

                {/* Detection Boxes for Vehicles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-cyan-400/50 mx-auto mb-3" />
                    <div className="text-gray-400 text-sm">
                      Monitoring {regionVehicles.length} vehicles in region
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 left-4 bg-black/70 rounded px-3 py-2">
                  <div className="text-xs text-green-400">AI DETECTION: ACTIVE</div>
                </div>

                {/* Alert Overlay */}
                {violatingVehicles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4 bg-red-500/20 border-2 border-red-500 rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">{violatingVehicles.length} Violation(s) Detected</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Detected Vehicles */}
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                <h4 className="text-sm text-gray-400">Detected Vehicles</h4>
                {regionVehicles.slice(0, 5).map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`flex items-center justify-between p-2 rounded ${
                      vehicle.status === 'violation' || vehicle.status === 'warning'
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {vehicle.status === 'violation' || vehicle.status === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      <div>
                        <div className="text-sm text-gray-200">{vehicle.number}</div>
                        <div className="text-xs text-gray-500">{vehicle.type.toUpperCase()}</div>
                      </div>
                    </div>
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
                      {vehicle.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
