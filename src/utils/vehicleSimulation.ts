import { Vehicle, Violation, BlockchainEntry, Alert } from '../types';

// Simulated routes for vehicle movement with regions
const routes = [
  { name: 'NH-44 North', region: 'North Zone', path: [
    { lat: 17.4065, lng: 78.4772 },
    { lat: 17.4165, lng: 78.4872 },
    { lat: 17.4265, lng: 78.4972 },
    { lat: 17.4365, lng: 78.5072 },
    { lat: 17.4465, lng: 78.5172 },
  ]},
  { name: 'Ring Road East', region: 'East Zone', path: [
    { lat: 17.3850, lng: 78.4867 },
    { lat: 17.3950, lng: 78.4967 },
    { lat: 17.4050, lng: 78.5067 },
    { lat: 17.4150, lng: 78.5167 },
  ]},
  { name: 'Outer Ring Road', region: 'West Zone', path: [
    { lat: 17.4400, lng: 78.3489 },
    { lat: 17.4500, lng: 78.3589 },
    { lat: 17.4600, lng: 78.3689 },
    { lat: 17.4700, lng: 78.3789 },
  ]},
  { name: 'Inner Ring Road', region: 'South Zone', path: [
    { lat: 17.3700, lng: 78.4500 },
    { lat: 17.3800, lng: 78.4600 },
    { lat: 17.3900, lng: 78.4700 },
    { lat: 17.4000, lng: 78.4800 },
  ]},
];

export function generateInitialVehicles(): Vehicle[] {
  const vehicles: Vehicle[] = [];
  const types: ('truck' | 'bus' | 'lorry')[] = ['truck', 'bus', 'lorry'];
  
  for (let i = 0; i < 15; i++) {
    const type = types[i % 3];
    const route = routes[i % routes.length];
    const isBus = type === 'bus';
    const maxWeight = type === 'truck' ? 25000 : type === 'lorry' ? 18000 : 12000;
    const currentWeight = Math.random() > 0.5 ? maxWeight * (0.7 + Math.random() * 0.5) : maxWeight * (0.4 + Math.random() * 0.3);
    const maxPassengers = isBus ? 50 : undefined;
    const passengerCount = isBus ? Math.floor(Math.random() * 70) : undefined;
    const yearlyViolations = Math.floor(Math.random() * 8);
    
    let status: 'safe' | 'warning' | 'violation' | 'detained' = 'safe';
    let warnings = 0;
    let canMove = true;
    
    if (isBus && passengerCount && passengerCount > maxPassengers!) {
      warnings = passengerCount > maxPassengers! * 1.2 ? 2 : 1;
      status = warnings >= 2 ? 'violation' : 'warning';
      canMove = warnings < 2; // Can't move if violation detected
    } else if (currentWeight > maxWeight) {
      warnings = currentWeight > maxWeight * 1.15 ? 2 : 1;
      status = warnings >= 2 ? 'violation' : 'warning';
      canMove = warnings < 2; // Can't move if violation detected
    }
    
    vehicles.push({
      id: `VEH${String(i + 1).padStart(3, '0')}`,
      number: `TS${String(Math.floor(Math.random() * 10)).padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(1000 + Math.random() * 9000)}`,
      type,
      driver: `Driver ${String.fromCharCode(65 + i % 26)}${i + 1}`,
      currentWeight,
      maxWeight,
      passengerCount,
      maxPassengers,
      position: route.path[0],
      speed: canMove ? 40 + Math.random() * 40 : 0,
      route: route.name,
      region: route.region,
      status,
      warnings,
      cargoType: !isBus ? ['General Goods', 'Electronics', 'Textiles', 'Food Items', 'Construction Material'][i % 5] : undefined,
      lastUpdate: new Date(),
      yearlyViolations,
      rewardPoints: yearlyViolations < 5 ? 500 : 0,
      canMove,
    });
  }
  
  return vehicles;
}

export function updateVehiclePositions(vehicles: Vehicle[]): Vehicle[] {
  return vehicles.map(vehicle => {
    const route = routes.find(r => r.name === vehicle.route);
    if (!route) return vehicle;
    
    // Find current position in route
    const currentIndex = route.path.findIndex(
      p => p.lat === vehicle.position.lat && p.lng === vehicle.position.lng
    );
    
    // Move to next position or loop back
    const nextIndex = (currentIndex + 1) % route.path.length;
    const nextPosition = route.path[nextIndex];
    
    // Simulate speed variation
    const speedVariation = -5 + Math.random() * 10;
    const newSpeed = Math.max(20, Math.min(100, vehicle.speed + speedVariation));
    
    return {
      ...vehicle,
      position: nextPosition,
      speed: newSpeed,
      lastUpdate: new Date(),
    };
  });
}

export function simulateWeightChange(vehicle: Vehicle): Vehicle {
  // Small random weight fluctuations
  const weightChange = -200 + Math.random() * 400;
  const newWeight = Math.max(1000, vehicle.currentWeight + weightChange);
  
  let warnings = vehicle.warnings;
  let status: 'safe' | 'warning' | 'violation' = 'safe';
  
  if (newWeight > vehicle.maxWeight) {
    warnings = newWeight > vehicle.maxWeight * 1.15 ? Math.min(warnings + 1, 3) : 1;
    status = warnings >= 2 ? 'violation' : 'warning';
  } else {
    warnings = 0;
    status = 'safe';
  }
  
  return {
    ...vehicle,
    currentWeight: newWeight,
    warnings,
    status,
    lastUpdate: new Date(),
  };
}

export function simulatePassengerChange(vehicle: Vehicle): Vehicle {
  if (!vehicle.maxPassengers) return vehicle;
  
  // Random passenger changes
  const change = Math.floor(-5 + Math.random() * 10);
  const newCount = Math.max(10, Math.min(80, (vehicle.passengerCount || 40) + change));
  
  let warnings = vehicle.warnings;
  let status: 'safe' | 'warning' | 'violation' = 'safe';
  
  if (newCount > vehicle.maxPassengers) {
    warnings = newCount > vehicle.maxPassengers * 1.2 ? Math.min(warnings + 1, 3) : 1;
    status = warnings >= 2 ? 'violation' : 'warning';
  } else {
    warnings = 0;
    status = 'safe';
  }
  
  return {
    ...vehicle,
    passengerCount: newCount,
    warnings,
    status,
    lastUpdate: new Date(),
  };
}

export function calculateFine(violation: Violation): number {
  const baseFines = {
    overload: 20000, // Base fine as per Section 194 MV Act
    overcrowd: 0, // Will be calculated per passenger
    cargo_tamper: 100000,
    extreme_violation: 100000,
  };
  
  let fine = baseFines[violation.type];
  
  // For overloading - ₹2,000 per ton excess
  if (violation.type === 'overload' && violation.evidence?.weight) {
    const excessWeight = violation.evidence.weight; // Already in kg from detection
    const excessTons = excessWeight / 1000;
    fine = 20000 + (excessTons * 2000); // Base fine + ₹2,000 per ton
  }
  
  // For passenger overcrowding - ₹1,000 per extra passenger (Section 194A)
  if (violation.type === 'overcrowd' && violation.evidence?.passengerCount) {
    const excessPassengers = violation.evidence.passengerCount;
    fine = excessPassengers * 1000; // ₹1,000 per extra passenger
  }
  
  // Multiply by severity
  if (violation.severity === 'medium') fine *= 1.5;
  if (violation.severity === 'high') fine *= 2;
  if (violation.severity === 'critical') fine *= 2.5;
  
  return Math.round(fine);
}

export function generateBlockchainHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

export function createBlockchainEntry(
  vehicleId: string,
  eventType: BlockchainEntry['eventType'],
  data: any,
  previousHash: string
): BlockchainEntry {
  const timestamp = new Date();
  const entryData = JSON.stringify({ vehicleId, eventType, data, timestamp });
  const hash = generateBlockchainHash(entryData + previousHash);
  
  return {
    id: `BLOCK${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    vehicleId,
    eventType,
    data,
    hash,
    previousHash,
  };
}

export function detectViolation(vehicle: Vehicle): Violation | null {
  if (vehicle.status !== 'violation') return null;
  
  let type: Violation['type'] = 'overload';
  let severity: Violation['severity'] = 'medium';
  let details = '';
  let fine = 0;
  let requiresOffloading = false;
  let permitSuspended = false;
  
  if (vehicle.type === 'bus' && vehicle.passengerCount && vehicle.maxPassengers) {
    const excess = vehicle.passengerCount - vehicle.maxPassengers;
    type = 'overcrowd';
    severity = excess > vehicle.maxPassengers * 0.3 ? 'critical' : excess > vehicle.maxPassengers * 0.2 ? 'high' : 'medium';
    details = `Bus overcrowded with ${vehicle.passengerCount} passengers (max: ${vehicle.maxPassengers}). Excess: ${excess} passengers. Vehicle permit suspended as per Section 194A MV Act.`;
    requiresOffloading = true;
    permitSuspended = true;
  } else if (vehicle.currentWeight > vehicle.maxWeight) {
    const excess = vehicle.currentWeight - vehicle.maxWeight;
    const excessPercent = (excess / vehicle.maxWeight) * 100;
    const excessTons = excess / 1000;
    type = 'overload';
    severity = excessPercent > 20 ? 'critical' : excessPercent > 15 ? 'high' : 'medium';
    details = `Vehicle overloaded by ${excessTons.toFixed(2)} tons (${excessPercent.toFixed(1)}% over limit). Fine: ₹20,000 + ₹2,000/ton as per Section 194 MV Act. Vehicle detained until offloading.`;
    requiresOffloading = true;
  }
  
  const violation: Violation = {
    id: `VIO${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
    vehicleId: vehicle.id,
    vehicleNumber: vehicle.number,
    type,
    severity,
    timestamp: new Date(),
    location: vehicle.position,
    details,
    fine: 0,
    status: requiresOffloading ? 'offloading_required' : 'pending',
    evidence: {
      weight: type === 'overload' ? vehicle.currentWeight - vehicle.maxWeight : undefined,
      passengerCount: type === 'overcrowd' ? vehicle.passengerCount! - vehicle.maxPassengers! : undefined,
    },
    requiresOffloading,
    permitSuspended,
    detainedUntil: requiresOffloading ? new Date(Date.now() + 2 * 60 * 60 * 1000) : undefined, // 2 hours
  };
  
  violation.fine = calculateFine(violation);
  
  return violation;
}

export function playAlertSound(severity: 'warning' | 'violation') {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const frequency = severity === 'violation' ? 800 : 600;
  const duration = severity === 'violation' ? 0.3 : 0.2;
  const oscillations = severity === 'violation' ? 3 : 2;
  
  for (let i = 0; i < oscillations; i++) {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }, i * 400);
  }
}
