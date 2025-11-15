import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, Users, Package, AlertTriangle, CheckCircle, Play, Pause } from 'lucide-react';
import { Vehicle } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface CameraFeedProps {
  vehicles: Vehicle[];
}

export default function CameraFeed({ vehicles }: CameraFeedProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!selectedVehicle || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulate camera feed with animated detection boxes
    const drawCameraFeed = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid overlay
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Simulate detection based on vehicle type
      if (selectedVehicle.type === 'bus' && selectedVehicle.passengerCount) {
        // Draw passenger detection boxes
        const passengerCount = selectedVehicle.passengerCount;
        const maxPassengers = selectedVehicle.maxPassengers || 50;
        const isOvercrowded = passengerCount > maxPassengers;

        // Simulate detected passengers
        const numBoxes = Math.min(20, passengerCount); // Show up to 20 boxes
        for (let i = 0; i < numBoxes; i++) {
          const x = 50 + (i % 5) * 120;
          const y = 80 + Math.floor(i / 5) * 100;
          const width = 80;
          const height = 90;

          ctx.strokeStyle = isOvercrowded ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          // Label
          ctx.fillStyle = isOvercrowded ? '#ef4444' : '#22c55e';
          ctx.fillRect(x, y - 20, width, 20);
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px monospace';
          ctx.fillText(`P${i + 1}`, x + 5, y - 5);
        }

        // Draw counter
        ctx.fillStyle = isOvercrowded ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
        ctx.fillRect(10, 10, 200, 60);
        ctx.strokeStyle = isOvercrowded ? '#ef4444' : '#22c55e';
        ctx.strokeRect(10, 10, 200, 60);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px monospace';
        ctx.fillText(`Passengers: ${passengerCount}`, 20, 35);
        ctx.fillText(`Max: ${maxPassengers}`, 20, 55);

      } else {
        // Draw cargo detection
        const isOverloaded = selectedVehicle.currentWeight > selectedVehicle.maxWeight;
        
        // Draw cargo area
        const cargoX = 150;
        const cargoY = 100;
        const cargoWidth = 400;
        const cargoHeight = 250;

        ctx.strokeStyle = isOverloaded ? 'rgba(239, 68, 68, 0.8)' : 'rgba(34, 197, 94, 0.8)';
        ctx.lineWidth = 3;
        ctx.strokeRect(cargoX, cargoY, cargoWidth, cargoHeight);

        // Draw cargo boxes
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 2; j++) {
            const boxX = cargoX + 30 + i * 120;
            const boxY = cargoY + 30 + j * 110;
            ctx.strokeStyle = isOverloaded ? 'rgba(239, 68, 68, 0.6)' : 'rgba(34, 197, 94, 0.6)';
            ctx.strokeRect(boxX, boxY, 90, 90);
          }
        }

        // Weight indicator
        ctx.fillStyle = isOverloaded ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)';
        ctx.fillRect(10, 10, 250, 80);
        ctx.strokeStyle = isOverloaded ? '#ef4444' : '#22c55e';
        ctx.strokeRect(10, 10, 250, 80);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px monospace';
        ctx.fillText(`Weight: ${(selectedVehicle.currentWeight / 1000).toFixed(1)}t`, 20, 35);
        ctx.fillText(`Max: ${(selectedVehicle.maxWeight / 1000).toFixed(1)}t`, 20, 60);

        // Cargo type
        ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.fillRect(10, 100, 200, 40);
        ctx.strokeStyle = '#06b6d4';
        ctx.strokeRect(10, 100, 200, 40);
        ctx.fillStyle = '#06b6d4';
        ctx.font = '14px monospace';
        ctx.fillText(`Type: ${selectedVehicle.cargoType || 'Unknown'}`, 20, 125);
      }

      // Timestamp
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(canvas.width - 220, canvas.height - 40, 210, 30);
      ctx.fillStyle = '#06b6d4';
      ctx.font = '12px monospace';
      ctx.fillText(new Date().toLocaleString(), canvas.width - 210, canvas.height - 18);

      // AI Status
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, canvas.height - 40, 150, 30);
      ctx.fillStyle = '#22c55e';
      ctx.fillText('AI: ANALYZING...', 20, canvas.height - 18);
    };

    let animationId: number;
    const animate = () => {
      if (isAnalyzing) {
        drawCameraFeed();
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [selectedVehicle, isAnalyzing]);

  const violationVehicles = vehicles.filter(v => v.status === 'violation' || v.status === 'warning');

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Main Camera Feed */}
      <Card className="lg:col-span-2 bg-gray-900 border-cyan-500/30 p-0 overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 border-b border-cyan-500/30 flex items-center justify-between">
          <div>
            <h3 className="text-lg text-cyan-400">AI Vision Surveillance</h3>
            <p className="text-sm text-gray-400">YOLOv8 Real-time Detection</p>
          </div>
          <Button
            size="sm"
            onClick={() => setIsAnalyzing(!isAnalyzing)}
            className={isAnalyzing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
          >
            {isAnalyzing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAnalyzing ? 'Pause' : 'Resume'}
          </Button>
        </div>

        {selectedVehicle ? (
          <div className="p-4 bg-black">
            <canvas
              ref={canvasRef}
              width={700}
              height={400}
              className="w-full border border-cyan-500/30 rounded"
            />
            
            {/* Detection Info */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Card className="bg-gray-800 border-cyan-500/20 p-3">
                <div className="text-xs text-gray-400 mb-1">Vehicle</div>
                <div className="text-lg text-cyan-400">{selectedVehicle.number}</div>
              </Card>
              <Card className="bg-gray-800 border-cyan-500/20 p-3">
                <div className="text-xs text-gray-400 mb-1">Detection Type</div>
                <div className="text-lg text-cyan-400">
                  {selectedVehicle.type === 'bus' ? 'Passenger Count' : 'Cargo Weight'}
                </div>
              </Card>
              <Card className="bg-gray-800 border-cyan-500/20 p-3">
                <div className="text-xs text-gray-400 mb-1">Status</div>
                <div className={`text-lg ${
                  selectedVehicle.status === 'safe' ? 'text-green-400' :
                  selectedVehicle.status === 'warning' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {selectedVehicle.status.toUpperCase()}
                </div>
              </Card>
            </div>

            {/* Alert Message */}
            {selectedVehicle.status === 'violation' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-red-500/20 border border-red-500 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>VIOLATION DETECTED - Alert sent to authorities</span>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Select a vehicle from the list to view camera feed</p>
          </div>
        )}
      </Card>

      {/* Vehicle List */}
      <Card className="bg-gray-900 border-cyan-500/30 p-4">
        <h3 className="text-lg text-cyan-400 mb-4">Active Cameras</h3>
        
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {violationVehicles.length > 0 ? (
            violationVehicles.map(vehicle => (
              <motion.div
                key={vehicle.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedVehicle?.id === vehicle.id
                    ? 'bg-cyan-500/20 border-cyan-500'
                    : 'bg-gray-800 border-gray-700 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">{vehicle.number}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    vehicle.status === 'violation' ? 'bg-red-500 animate-pulse' :
                    'bg-yellow-500 animate-pulse'
                  }`} />
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  {vehicle.type === 'bus' ? (
                    <>
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">
                        {vehicle.passengerCount}/{vehicle.maxPassengers} passengers
                      </span>
                    </>
                  ) : (
                    <>
                      <Package className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400">
                        {(vehicle.currentWeight / 1000).toFixed(1)}/{(vehicle.maxWeight / 1000).toFixed(1)}t
                      </span>
                    </>
                  )}
                </div>

                {vehicle.status === 'violation' && (
                  <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Violation Detected
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">All vehicles compliant</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
