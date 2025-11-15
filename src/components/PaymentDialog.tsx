import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  IndianRupee,
  CheckCircle,
  QrCode,
  ArrowRight,
  Download
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Language, translations } from '../utils/translations';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  language: Language;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';

export default function PaymentDialog({ isOpen, onClose, amount, language }: PaymentDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const t = translations[language];

  const paymentMethods = [
    { 
      id: 'upi' as PaymentMethod, 
      name: t.upiPayment, 
      icon: <Smartphone className="w-6 h-6" />,
      color: 'from-green-500/20 to-emerald-500/20 border-green-500/30'
    },
    { 
      id: 'card' as PaymentMethod, 
      name: t.cardPayment, 
      icon: <CreditCard className="w-6 h-6" />,
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
    },
    { 
      id: 'netbanking' as PaymentMethod, 
      name: t.netBanking, 
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-purple-500/20 to-violet-500/20 border-purple-500/30'
    },
    { 
      id: 'wallet' as PaymentMethod, 
      name: t.wallet, 
      icon: <Wallet className="w-6 h-6" />,
      color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
    },
    { 
      id: 'cash' as PaymentMethod, 
      name: t.cashAtRTO, 
      icon: <IndianRupee className="w-6 h-6" />,
      color: 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
    },
  ];

  const handlePayment = () => {
    setProcessing(true);
    const txnId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setTransactionId(txnId);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 3000);
  };

  const handleClose = () => {
    setSelectedMethod(null);
    setProcessing(false);
    setSuccess(false);
    setTransactionId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-cyan-400 flex items-center gap-2">
            <IndianRupee className="w-6 h-6" />
            {t.finePayment}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-16 h-16 text-green-400" />
              </motion.div>
              <h3 className="text-3xl text-green-400 mb-2">{t.paymentSuccess}</h3>
              <p className="text-gray-400 mb-6">{t.receiptGenerated}</p>

              <Card className="bg-gray-800 border-cyan-500/30 p-6 max-w-md mx-auto text-left">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.transactionId}:</span>
                    <span className="text-cyan-400 font-mono">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.fine}:</span>
                    <span className="text-green-400">₹{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.date}:</span>
                    <span className="text-gray-200">{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t.status}:</span>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {t.paymentSuccess}
                    </Badge>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3 justify-center mt-6">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-gray-950">
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadReceipt}
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  {t.close}
                </Button>
              </div>
            </motion.div>
          ) : processing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6 border-4 border-cyan-500 border-t-transparent rounded-full"
              />
              <h3 className="text-2xl text-cyan-400 mb-2">{t.paymentProcessing}</h3>
              <p className="text-gray-400 mb-6">{t.transactionId}: {transactionId}</p>
              <Progress value={66} className="w-64 mx-auto h-2 [&>div]:bg-cyan-500" />
            </motion.div>
          ) : !selectedMethod ? (
            <motion.div
              key="select-method"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Amount Display */}
              <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30 p-6 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">{t.totalFines}</div>
                  <div className="text-5xl text-red-400 mb-2">₹{amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{t.pendingPayment}</div>
                </div>
              </Card>

              {/* Payment Methods */}
              <h3 className="text-lg text-gray-300 mb-4">{t.selectPaymentMethod}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={() => setSelectedMethod(method.id)}
                      className={`bg-gradient-to-br ${method.color} p-4 cursor-pointer hover:shadow-lg transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-cyan-400">{method.icon}</div>
                        <div className="flex-1">
                          <div className="text-gray-200">{method.name}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-cyan-400" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="payment-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedMethod(null)}
                className="mb-4"
              >
                ← {t.selectPaymentMethod}
              </Button>

              <Card className="bg-gray-800 border-cyan-500/30 p-6">
                {selectedMethod === 'upi' && <UPIPayment t={t} amount={amount} onPay={handlePayment} />}
                {selectedMethod === 'card' && <CardPayment t={t} amount={amount} onPay={handlePayment} />}
                {selectedMethod === 'netbanking' && <NetBankingPayment t={t} amount={amount} onPay={handlePayment} />}
                {selectedMethod === 'wallet' && <WalletPayment t={t} amount={amount} onPay={handlePayment} />}
                {selectedMethod === 'cash' && <CashPayment t={t} amount={amount} />}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function UPIPayment({ t, amount, onPay }: any) {
  const [upiId, setUpiId] = useState('');

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-400 mb-4">{t.upiPayment}</h3>
      
      <div>
        <label className="text-sm text-gray-400 mb-2 block">{t.enterUpiId}</label>
        <Input
          placeholder={t.upiIdPlaceholder}
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="bg-gray-900 border-cyan-500/30"
        />
      </div>

      <div className="text-center py-6">
        <div className="text-sm text-gray-400 mb-3">{t.scanQrCode}</div>
        <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
          <QrCode className="w-32 h-32 text-gray-900" />
        </div>
        <div className="text-xs text-gray-500 mt-3">Scan with any UPI app</div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">{t.fine}:</span>
          <span className="text-cyan-400">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <Button
        onClick={onPay}
        disabled={!upiId}
        className="w-full bg-green-500 hover:bg-green-600 text-white"
      >
        {t.payNow} ₹{amount.toLocaleString()}
      </Button>
    </div>
  );
}

function CardPayment({ t, amount, onPay }: any) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-400 mb-4">{t.cardPayment}</h3>
      
      <div>
        <label className="text-sm text-gray-400 mb-2 block">{t.cardNumber}</label>
        <Input
          placeholder={t.cardNumberPlaceholder}
          className="bg-gray-900 border-cyan-500/30"
          maxLength={19}
        />
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">{t.cardholderName}</label>
        <Input
          placeholder="Name on card"
          className="bg-gray-900 border-cyan-500/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">{t.expiryDate}</label>
          <Input
            placeholder={t.expiryPlaceholder}
            className="bg-gray-900 border-cyan-500/30"
            maxLength={5}
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">{t.cvv}</label>
          <Input
            type="password"
            placeholder={t.cvvPlaceholder}
            className="bg-gray-900 border-cyan-500/30"
            maxLength={3}
          />
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">{t.fine}:</span>
          <span className="text-cyan-400">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <Button
        onClick={onPay}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        {t.payNow} ₹{amount.toLocaleString()}
      </Button>
    </div>
  );
}

function NetBankingPayment({ t, amount, onPay }: any) {
  const banks = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'PNB', 'Bank of Baroda'];

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-400 mb-4">{t.netBanking}</h3>
      
      <div>
        <label className="text-sm text-gray-400 mb-2 block">{t.selectBank}</label>
        <Input
          placeholder={t.searchBank}
          className="bg-gray-900 border-cyan-500/30 mb-3"
        />
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {banks.map(bank => (
            <Button
              key={bank}
              variant="outline"
              className="justify-start"
            >
              <Building2 className="w-4 h-4 mr-2" />
              {bank}
            </Button>
          ))}
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">{t.fine}:</span>
          <span className="text-cyan-400">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <Button
        onClick={onPay}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white"
      >
        {t.proceedToBank}
      </Button>
    </div>
  );
}

function WalletPayment({ t, amount, onPay }: any) {
  const wallets = [
    { name: 'Paytm', balance: 5420 },
    { name: 'PhonePe', balance: 2150 },
    { name: 'Google Pay', balance: 8900 },
    { name: 'Amazon Pay', balance: 1250 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-400 mb-4">{t.wallet}</h3>
      
      <div>
        <label className="text-sm text-gray-400 mb-2 block">{t.selectWallet}</label>
        <div className="space-y-2">
          {wallets.map(wallet => (
            <Card key={wallet.name} className="bg-gray-900 border-gray-700 p-3 hover:border-cyan-500/50 cursor-pointer transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-gray-200">{wallet.name}</div>
                    <div className="text-xs text-gray-500">{t.walletBalance}: ₹{wallet.balance}</div>
                  </div>
                </div>
                {wallet.balance >= amount && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">{t.fine}:</span>
          <span className="text-cyan-400">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <Button
        onClick={onPay}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
      >
        {t.payNow} ₹{amount.toLocaleString()}
      </Button>
    </div>
  );
}

function CashPayment({ t, amount }: any) {
  const rtoOffices = [
    { name: 'RTO North Zone', address: 'Transport Bhavan, NH-44' },
    { name: 'RTO East Zone', address: 'Ring Road Complex' },
    { name: 'RTO West Zone', address: 'Outer Ring Road' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-cyan-400 mb-4">{t.cashAtRTO}</h3>
      
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4 text-sm text-yellow-400">
        <div className="mb-3">Visit any RTO office to pay in cash:</div>
        <div className="space-y-2">
          {rtoOffices.map(office => (
            <div key={office.name} className="bg-gray-900/50 rounded p-2">
              <div className="text-gray-200">{office.name}</div>
              <div className="text-xs text-gray-400">{office.address}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">{t.fine}:</span>
          <span className="text-cyan-400">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center">
        Bring your vehicle registration documents for payment verification
      </div>
    </div>
  );
}
