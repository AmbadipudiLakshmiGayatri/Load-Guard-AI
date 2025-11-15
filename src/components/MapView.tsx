import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Truck, Bus, MapPin, Navigation, Filter } from 'lucide-react';
import { Vehicle, Violation } from '../types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface MapViewProps {
  vehicles: Vehicle[];
  violations: Violation[];
}

export default function MapView({ vehicles, violations }: MapViewProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const mapRef = useRef<HTMLDivElement>(null);

  const regions = ['all', ...Array.from(new Set(vehicles.map(v => v.region)))];
  const filteredVehicles = selectedRegion === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.region === selectedRegion);

  // Calculate map bounds
  const bounds = {
    minLat: 17.35,
    maxLat: 17.50,
    minLng: 78.30,
    maxLng: 78.55,
  };

  const convertToPixels = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    return { x: `${x}%`, y: `${y}%` };
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Map */}
      <Card className="lg:col-span-2 bg-gray-900 border-cyan-500/30 p-0 overflow-hidden">
        <div className="bg-gray-800 px-4 py-3 border-b border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-cyan-400">Live Vehicle Tracking Map</h3>
              <p className="text-sm text-gray-400">Real-time GPS monitoring - Hyderabad Region</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-40 bg-gray-900 border-cyan-500/30">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-cyan-500/30">
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div 
          ref={mapRef}
          className="relative w-full h-[600px] bg-gray-950"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          {/* Road lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="rgba(6, 182, 212, 0.3)" />
              </marker>
            </defs>
            {/* NH-44 North */}
            <line x1="20%" y1="90%" x2="80%" y2="10%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="3" markerEnd="url(#arrowhead)" />
            {/* Ring Road */}
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="3" markerEnd="url(#arrowhead)" />
            {/* Outer Ring Road */}
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="3" markerEnd="url(#arrowhead)" />
          </svg>

          {/* Violation markers */}
          {violations.slice(0, 10).map(violation => {
            const pos = convertToPixels(violation.location.lat, violation.location.lng);
            return (
              <motion.div
                key={violation.id}
                className="absolute"
                style={{ left: pos.x, top: pos.y }}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center border-2 border-red-500">
                    <MapPin className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Vehicle markers */}
          {filteredVehicles.map(vehicle => {
            const pos = convertToPixels(vehicle.position.lat, vehicle.position.lng);
            const statusColors = {
              safe: 'border-green-500 bg-green-500/20 text-green-400',
              warning: 'border-yellow-500 bg-yellow-500/20 text-yellow-400',
              violation: 'border-red-500 bg-red-500/20 text-red-400',
            };

            return (
              <motion.div
                key={vehicle.id}
                className="absolute cursor-pointer z-10"
                style={{ left: pos.x, top: pos.y }}
                animate={{ 
                  left: pos.x, 
                  top: pos.y,
                }}
                transition={{ duration: 2, ease: 'linear' }}
                onClick={() => setSelectedVehicle(vehicle)}
                whileHover={{ scale: 1.2 }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${statusColors[vehicle.status]}`}>
                    {vehicle.type === 'bus' ? (
                      <Bus className="w-5 h-5" />
                    ) : (
                      <Truck className="w-5 h-5" />
                    )}
                  </div>
                  {vehicle.status === 'violation' && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-gray-900/90 border border-cyan-500/30 rounded-lg p-3">
            <h4 className="text-sm text-cyan-400 mb-2">Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-300">Safe ({vehicles.filter(v => v.status === 'safe').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-300">Warning ({vehicles.filter(v => v.status === 'warning').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-300">Violation ({vehicles.filter(v => v.status === 'violation').length})</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Vehicle Details Panel */}
      <Card className="bg-gray-900 border-cyan-500/30 p-4">
        <h3 className="text-lg text-cyan-400 mb-4">Vehicle Details</h3>
        {selectedVehicle ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xl mb-1">{selectedVehicle.number}</div>
                <div className="text-sm text-gray-400">{selectedVehicle.driver}</div>
              </div>
              <div className={`px-3 py-1 rounded text-sm ${
                selectedVehicle.status === 'safe' ? 'bg-green-500/20 text-green-400' :
                selectedVehicle.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {selectedVehicle.status.toUpperCase()}
              </div>
            </div>

            <div className="space-y-2">
              <DetailRow label="Type" value={selectedVehicle.type.toUpperCase()} />
              <DetailRow label="Route" value={selectedVehicle.route} />
              <DetailRow 
                label="Speed" 
                value={`${selectedVehicle.speed.toFixed(1)} km/h`} 
              />
              
              {selectedVehicle.type === 'bus' && selectedVehicle.maxPassengers ? (
                <>
                  <DetailRow 
                    label="Passengers" 
                    value={`${selectedVehicle.passengerCount}/${selectedVehicle.maxPassengers}`}
                    highlight={selectedVehicle.passengerCount! > selectedVehicle.maxPassengers}
                  />
                  {selectedVehicle.passengerCount! > selectedVehicle.maxPassengers && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-2 text-sm text-red-400">
                      ⚠️ Overcrowding detected: {selectedVehicle.passengerCount! - selectedVehicle.maxPassengers} excess passengers
                    </div>
                  )}
                </>
              ) : (
                <>
                  <DetailRow 
                    label="Current Weight" 
                    value={`${(selectedVehicle.currentWeight / 1000).toFixed(1)} tons`}
                    highlight={selectedVehicle.currentWeight > selectedVehicle.maxWeight}
                  />
                  <DetailRow 
                    label="Max Weight" 
                    value={`${(selectedVehicle.maxWeight / 1000).toFixed(1)} tons`}
                  />
                  <DetailRow label="Cargo" value={selectedVehicle.cargoType || 'N/A'} />
                  {selectedVehicle.currentWeight > selectedVehicle.maxWeight && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-2 text-sm text-red-400">
                      ⚠️ Overload detected: {((selectedVehicle.currentWeight - selectedVehicle.maxWeight) / 1000).toFixed(1)} tons excess
                    </div>
                  )}
                </>
              )}

              <DetailRow 
                label="Warnings" 
                value={selectedVehicle.warnings.toString()}
                highlight={selectedVehicle.warnings > 0}
              />
              
              <DetailRow 
                label="GPS" 
                value={`${selectedVehicle.position.lat.toFixed(4)}, ${selectedVehicle.position.lng.toFixed(4)}`}
              />
            </div>

            {selectedVehicle.warnings >= 2 && (
              <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-3 mt-4">
                <div className="text-red-400 mb-2">🚨 ALERT SENT TO POLICE</div>
                <div className="text-sm text-gray-300">
                  Vehicle has exceeded warning threshold. Automatic alert dispatched to nearest police station with GPS coordinates and vehicle details.
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <Navigation className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Select a vehicle on the map to view details</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}:</span>
      <span className={highlight ? 'text-red-400' : 'text-gray-200'}>{value}</span>
    </div>
  );
}
