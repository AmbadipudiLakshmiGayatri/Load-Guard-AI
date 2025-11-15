import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './components/Dashboard';
import DriverApp from './components/DriverApp';
import PolicePanel from './components/PolicePanel';
import LandingPage from './components/LandingPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'driver' | 'police'>('landing');

  return (
    <div className="dark min-h-screen bg-gray-950 text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'driver' && <DriverApp onNavigate={setCurrentView} />}
          {currentView === 'police' && <PolicePanel onNavigate={setCurrentView} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
