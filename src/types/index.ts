export interface Vehicle {
  id: string;
  number: string;
  type: 'truck' | 'bus' | 'lorry';
  driver: string;
  currentWeight: number;
  maxWeight: number;
  passengerCount?: number;
  maxPassengers?: number;
  position: { lat: number; lng: number };
  speed: number;
  route: string;
  region: string;
  status: 'safe' | 'warning' | 'violation' | 'detained';
  warnings: number;
  cargoType?: string;
  lastUpdate: Date;
  yearlyViolations: number;
  rewardPoints: number;
  canMove: boolean;
}

export interface Violation {
  id: string;
  vehicleId: string;
  vehicleNumber: string;
  type: 'overload' | 'overcrowd' | 'cargo_tamper' | 'extreme_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  location: { lat: number; lng: number };
  details: string;
  fine: number;
  status: 'pending' | 'under_review' | 'resolved' | 'pending_seizure' | 'detained' | 'offloading_required';
  evidence?: {
    weight?: number;
    passengerCount?: number;
    imageUrl?: string;
  };
  requiresOffloading?: boolean;
  permitSuspended?: boolean;
  detainedUntil?: Date;
}

export interface BlockchainEntry {
  id: string;
  timestamp: Date;
  vehicleId: string;
  eventType: 'weight_check' | 'alert' | 'cargo_verification' | 'violation';
  data: any;
  hash: string;
  previousHash: string;
}

export interface Alert {
  id: string;
  vehicleId: string;
  message: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  timestamp: Date;
  read: boolean;
}
