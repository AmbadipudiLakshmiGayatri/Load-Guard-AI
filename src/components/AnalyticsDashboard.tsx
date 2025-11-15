import { useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Vehicle, Violation } from '../types';
import { Card } from './ui/card';

interface AnalyticsDashboardProps {
  vehicles: Vehicle[];
  violations: Violation[];
}

export default function AnalyticsDashboard({ vehicles, violations }: AnalyticsDashboardProps) {
  const analytics = useMemo(() => {
    // Vehicle status distribution
    const statusData = [
      { name: 'Safe', value: vehicles.filter(v => v.status === 'safe').length, color: '#22c55e' },
      { name: 'Warning', value: vehicles.filter(v => v.status === 'warning').length, color: '#eab308' },
      { name: 'Violation', value: vehicles.filter(v => v.status === 'violation').length, color: '#ef4444' },
    ];

    // Violation types
    const violationTypes = [
      { name: 'Overload', value: violations.filter(v => v.type === 'overload').length },
      { name: 'Overcrowd', value: violations.filter(v => v.type === 'overcrowd').length },
      { name: 'Cargo Tamper', value: violations.filter(v => v.type === 'cargo_tamper').length },
      { name: 'Extreme', value: violations.filter(v => v.type === 'extreme_violation').length },
    ];

    // Hourly violations (simulated)
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      violations: Math.floor(Math.random() * 10),
    }));

    // Fine collection
    const totalFines = violations.reduce((sum, v) => sum + v.fine, 0);
    const averageFine = violations.length > 0 ? totalFines / violations.length : 0;

    // Vehicle type distribution
    const vehicleTypeData = [
      { name: 'Truck', value: vehicles.filter(v => v.type === 'truck').length },
      { name: 'Bus', value: vehicles.filter(v => v.type === 'bus').length },
      { name: 'Lorry', value: vehicles.filter(v => v.type === 'lorry').length },
    ];

    return {
      statusData,
      violationTypes,
      hourlyData,
      totalFines,
      averageFine,
      vehicleTypeData,
    };
  }, [vehicles, violations]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Activity className="w-8 h-8" />}
          label="Total Vehicles"
          value={vehicles.length}
          trend="+12%"
          trendUp={true}
          color="cyan"
        />
        <MetricCard
          icon={<TrendingUp className="w-8 h-8" />}
          label="Violations Today"
          value={violations.length}
          trend="-8%"
          trendUp={false}
          color="red"
        />
        <MetricCard
          icon={<DollarSign className="w-8 h-8" />}
          label="Total Fines"
          value={`₹${(analytics.totalFines / 1000).toFixed(0)}K`}
          trend="+15%"
          trendUp={true}
          color="green"
        />
        <MetricCard
          icon={<TrendingDown className="w-8 h-8" />}
          label="Avg Fine/Violation"
          value={`₹${(analytics.averageFine / 1000).toFixed(1)}K`}
          trend="+3%"
          trendUp={true}
          color="yellow"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Vehicle Status Distribution */}
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h3 className="text-lg text-cyan-400 mb-4">Vehicle Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Violation Types */}
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h3 className="text-lg text-cyan-400 mb-4">Violation Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.violationTypes}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #06b6d4' }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly Violations Trend */}
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h3 className="text-lg text-cyan-400 mb-4">Violations by Hour (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="#6b7280" interval={2} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #06b6d4' }}
              />
              <Line 
                type="monotone" 
                dataKey="violations" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Vehicle Type Distribution */}
        <Card className="bg-gray-900 border-cyan-500/30 p-6">
          <h3 className="text-lg text-cyan-400 mb-4">Fleet Composition</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.vehicleTypeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="name" type="category" stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #06b6d4' }}
              />
              <Bar dataKey="value" fill="#22c55e" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 p-6">
        <h3 className="text-lg text-cyan-400 mb-4">AI-Powered Insights</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <InsightCard
            title="Peak Violation Hours"
            value="14:00 - 18:00"
            description="Most violations occur during afternoon rush hours"
            color="red"
          />
          <InsightCard
            title="Compliance Rate"
            value={`${((vehicles.filter(v => v.status === 'safe').length / vehicles.length) * 100).toFixed(1)}%`}
            description="Overall fleet compliance with regulations"
            color="green"
          />
          <InsightCard
            title="Avg Response Time"
            value="2.3 min"
            description="Average time from detection to alert dispatch"
            color="cyan"
          />
        </div>
      </Card>
    </div>
  );
}

function MetricCard({ 
  icon, 
  label, 
  value, 
  trend, 
  trendUp, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  trend: string; 
  trendUp: boolean;
  color: 'cyan' | 'red' | 'green' | 'yellow';
}) {
  const colors = {
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
    red: 'from-red-500/10 to-red-500/5 border-red-500/30 text-red-400',
    green: 'from-green-500/10 to-green-500/5 border-green-500/30 text-green-400',
    yellow: 'from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`bg-gradient-to-br border p-6 ${colors[color]}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="opacity-70">{icon}</div>
          <div className={`text-sm flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trend}
          </div>
        </div>
        <div className="text-3xl mb-1">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
      </Card>
    </motion.div>
  );
}

function InsightCard({ 
  title, 
  value, 
  description, 
  color 
}: { 
  title: string; 
  value: string; 
  description: string;
  color: 'red' | 'green' | 'cyan';
}) {
  const colors = {
    red: 'text-red-400',
    green: 'text-green-400',
    cyan: 'text-cyan-400',
  };

  return (
    <div className="bg-gray-900/50 rounded-lg p-4">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className={`text-2xl mb-2 ${colors[color]}`}>{value}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}
