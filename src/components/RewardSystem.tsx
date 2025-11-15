import { motion } from 'motion/react';
import { Award, Gift, TrendingUp, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Vehicle } from '../types';

interface RewardSystemProps {
  vehicles: Vehicle[];
}

export default function RewardSystem({ vehicles }: RewardSystemProps) {
  const eligibleVehicles = vehicles.filter(v => v.yearlyViolations < 5);
  const totalRewards = eligibleVehicles.reduce((sum, v) => sum + v.rewardPoints, 0);

  return (
    <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
          <Award className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl text-green-400">Annual Reward Program</h3>
          <p className="text-sm text-gray-400">Compliance Incentive Scheme</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Eligible Vehicles</span>
          </div>
          <div className="text-3xl text-green-400">{eligibleVehicles.length}</div>
          <div className="text-xs text-gray-500 mt-1">
            Less than 5 violations/year
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Total Rewards</span>
          </div>
          <div className="text-3xl text-green-400">₹{totalRewards.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">
            Fuel credit distributed
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Compliance Rate</span>
          </div>
          <div className="text-3xl text-green-400">
            {((eligibleVehicles.length / vehicles.length) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Fleet compliance score
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
        <h4 className="text-sm text-green-400 mb-3">Reward Criteria</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>Vehicles with <span className="text-green-400">less than 5 violations</span> in a year qualify for rewards</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>Reward: <span className="text-green-400">₹500 fuel credit</span> redeemable at authorized pumps</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>Credits automatically credited to vehicle's digital wallet</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span>Encourages safe and compliant driving behavior</span>
          </li>
        </ul>
      </div>

      {/* Eligible Vehicles List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        <h4 className="text-sm text-gray-400 mb-2">Eligible Vehicles ({eligibleVehicles.length})</h4>
        {eligibleVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-900/50 rounded p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-200">{vehicle.number}</div>
                <div className="text-xs text-gray-500">
                  {vehicle.yearlyViolations} violations this year
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              ₹{vehicle.rewardPoints}
            </Badge>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
