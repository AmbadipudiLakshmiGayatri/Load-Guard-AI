import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface RTOContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RTOContactDialog({ isOpen, onClose }: RTOContactDialogProps) {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  const rtoOffices = [
    {
      name: 'RTO North Zone',
      phone: '+91-40-2345-6789',
      email: 'rto.north@transport.gov.in',
      address: 'Transport Bhavan, NH-44, Hyderabad',
      available: true,
    },
    {
      name: 'RTO East Zone',
      phone: '+91-40-2345-6790',
      email: 'rto.east@transport.gov.in',
      address: 'Ring Road Complex, East Hyderabad',
      available: true,
    },
    {
      name: 'RTO West Zone',
      phone: '+91-40-2345-6791',
      email: 'rto.west@transport.gov.in',
      address: 'Outer Ring Road, West Hyderabad',
      available: false,
    },
    {
      name: 'RTO Control Center',
      phone: '+91-40-1800-TRANSPORT',
      email: 'control@transport.gov.in',
      address: 'Central Transport Command, Hyderabad',
      available: true,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-cyan-400 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Contact RTO Control Center
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* RTO Office Contacts */}
          <div className="space-y-3">
            <h3 className="text-sm text-gray-400 mb-3">RTO Office Contacts</h3>
            {rtoOffices.map((office) => (
              <Card
                key={office.name}
                className={`bg-gray-800 border p-4 ${
                  office.available ? 'border-cyan-500/30' : 'border-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-gray-200 mb-1">{office.name}</h4>
                    {office.available ? (
                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Available
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">Offline</div>
                    )}
                  </div>
                  {office.available && (
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-gray-950">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail className="w-3 h-3" />
                    <span className="text-xs">{office.email}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <MapPin className="w-3 h-3 mt-1" />
                    <span className="text-xs">{office.address}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Message Form */}
          <div>
            <h3 className="text-sm text-gray-400 mb-3">Send Alert Message</h3>
            <Card className="bg-gray-800 border-cyan-500/30 p-4">
              {sent ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl text-green-400 mb-2">Message Sent!</h4>
                  <p className="text-sm text-gray-400">RTO has been notified</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Priority Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPriority('low')}
                        className={priority === 'low' ? 'bg-yellow-500/20 border-yellow-500' : ''}
                      >
                        Low
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPriority('medium')}
                        className={priority === 'medium' ? 'bg-orange-500/20 border-orange-500' : ''}
                      >
                        Medium
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPriority('high')}
                        className={priority === 'high' ? 'bg-red-500/20 border-red-500' : ''}
                      >
                        High
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                    <Input
                      placeholder="e.g., Multiple violations on NH-44"
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Message</label>
                    <Textarea
                      placeholder="Describe the situation..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-gray-900 border-gray-700 min-h-32"
                    />
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-xs text-gray-400">
                    <strong className="text-cyan-400">Note:</strong> This message will be sent to all available RTO offices with GPS coordinates and current violation data.
                  </div>

                  <Button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-gray-950"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Alert to RTO
                  </Button>
                </div>
              )}
            </Card>

            {/* Emergency Hotline */}
            <Card className="bg-red-500/10 border-red-500/30 p-4 mt-4">
              <h4 className="text-red-400 mb-2">Emergency Hotline</h4>
              <div className="text-2xl text-red-400 mb-1">1800-TRANSPORT</div>
              <p className="text-xs text-gray-400">24/7 Emergency Response</p>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
