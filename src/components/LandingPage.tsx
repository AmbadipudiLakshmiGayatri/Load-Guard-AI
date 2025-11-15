import { motion } from 'motion/react';
import { Truck, Shield, Camera, Database, AlertTriangle, Users } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'dashboard' | 'driver' | 'police') => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-cyan-400" />
          </div>
          <h1 className="text-6xl mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            LoadGuardian
          </h1>
          <p className="text-2xl text-cyan-300 mb-8">
            "Protecting Roads, Lives, and Laws with AI Precision."
          </p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI-Powered Smart Transport Compliance System using IoT sensors, AI vision, and blockchain 
            to monitor and prevent overloading, illegal cargo substitution, and passenger crowding.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={<Truck className="w-12 h-12" />}
            title="Smart Load Detection"
            description="IoT weight sensors with 2-stage warnings and automatic GPS alerts to authorities"
            delay={0.1}
          />
          <FeatureCard
            icon={<Camera className="w-12 h-12" />}
            title="AI Vision Surveillance"
            description="Real-time cargo verification and passenger counting using YOLOv8 AI"
            delay={0.2}
          />
          <FeatureCard
            icon={<Database className="w-12 h-12" />}
            title="Blockchain Logbook"
            description="Tamper-proof records of every weight entry, alert, and violation"
            delay={0.3}
          />
          <FeatureCard
            icon={<AlertTriangle className="w-12 h-12" />}
            title="Live Violation Analytics"
            description="Real-time map with vehicle tracking and automated fine calculation"
            delay={0.4}
          />
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Crowd Detection"
            description="Public transport safety mode with passenger count monitoring"
            delay={0.5}
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12" />}
            title="Emergency Integration"
            description="Instant alerts to police and RTO with vehicle image and GPS data"
            delay={0.6}
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={() => onNavigate('dashboard')}
            className="bg-cyan-500 hover:bg-cyan-600 text-gray-950 px-8 py-6 text-lg"
          >
            Launch Admin Dashboard
          </Button>
          <Button
            onClick={() => onNavigate('driver')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
          >
            Driver Companion App
          </Button>
          <Button
            onClick={() => onNavigate('police')}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg"
          >
            Police Control Center
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-4 gap-6 mt-16"
        >
          <StatCard number="24/7" label="Live Monitoring" />
          <StatCard number="100%" label="Transparency" />
          <StatCard number="0" label="Corruption Tolerance" />
          <StatCard number="∞" label="Lives Protected" />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/60 transition-all"
    >
      <div className="text-cyan-400 mb-4">{icon}</div>
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6 text-center">
      <div className="text-4xl text-cyan-400 mb-2">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
