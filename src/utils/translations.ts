export type Language = 'en' | 'hi' | 'te';

export const translations = {
  en: {
    // Header
    driverCompanion: 'LoadGuardian Driver Companion',
    selectLanguage: 'Select Language',
    backToDashboard: 'Back to Dashboard',
    
    // Tabs
    myVehicle: 'My Vehicle',
    violations: 'Violations',
    payments: 'Payments',
    rewards: 'Rewards',
    
    // Vehicle Status
    vehicleStatus: 'Vehicle Status',
    vehicleNumber: 'Vehicle Number',
    driverName: 'Driver Name',
    vehicleType: 'Vehicle Type',
    route: 'Route',
    currentStatus: 'Current Status',
    
    // Load Information
    loadInformation: 'Load Information',
    currentLoad: 'Current Load',
    maxCapacity: 'Max Capacity',
    loadPercentage: 'Load Percentage',
    passengerCount: 'Passenger Count',
    maxPassengers: 'Max Passengers',
    cargoType: 'Cargo Type',
    
    // Warnings
    warningLevel: 'Warning Level',
    warnings: 'Warnings',
    warningsIssued: 'warnings issued',
    noWarnings: 'No warnings - Good driving!',
    nextViolation: 'Next violation will trigger automatic police alert',
    
    // Status Messages
    safe: 'SAFE',
    warning: 'WARNING',
    violation: 'VIOLATION',
    detained: 'DETAINED',
    safeToOperate: 'Safe to Operate',
    reduceLoad: 'Reduce Load Immediately',
    vehicleDetained: 'Vehicle Detained',
    offloadingRequired: 'Offloading Required',
    
    // Violations
    yourViolations: 'Your Violations',
    noViolations: 'No violations recorded',
    yearlyViolations: 'Yearly Violations',
    totalFines: 'Total Fines',
    pendingPayment: 'Pending Payment',
    violationType: 'Violation Type',
    severity: 'Severity',
    fine: 'Fine',
    status: 'Status',
    location: 'Location',
    date: 'Date',
    
    // Violation Types
    overload: 'Overload',
    overcrowd: 'Overcrowding',
    cargo_tamper: 'Cargo Tampering',
    extreme_violation: 'Extreme Violation',
    
    // Severity
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
    
    // Payment
    finePayment: 'Fine Payment',
    paymentMethods: 'Payment Methods',
    selectPaymentMethod: 'Select Payment Method',
    upiPayment: 'UPI Payment',
    cardPayment: 'Debit/Credit Card',
    netBanking: 'Net Banking',
    wallet: 'Digital Wallet',
    cashAtRTO: 'Cash at RTO Office',
    payNow: 'Pay Now',
    paymentProcessing: 'Processing Payment...',
    paymentSuccess: 'Payment Successful!',
    paymentFailed: 'Payment Failed',
    receiptGenerated: 'Receipt has been generated',
    transactionId: 'Transaction ID',
    downloadReceipt: 'Download Receipt',
    
    // UPI Details
    enterUpiId: 'Enter UPI ID',
    upiIdPlaceholder: 'yourname@upi',
    scanQrCode: 'Or Scan QR Code',
    
    // Card Details
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    cardholderName: 'Cardholder Name',
    
    // Net Banking
    selectBank: 'Select Your Bank',
    searchBank: 'Search for bank...',
    proceedToBank: 'Proceed to Bank',
    
    // Wallet
    selectWallet: 'Select Wallet Provider',
    walletBalance: 'Wallet Balance',
    
    // Rewards
    rewardProgram: 'Annual Reward Program',
    eligibility: 'Eligibility',
    eligibleForReward: 'Eligible for Reward',
    notEligible: 'Not Eligible',
    rewardPoints: 'Reward Points',
    fuelCredit: 'Fuel Credit',
    violationsThisYear: 'Violations This Year',
    criteriaTitle: 'Reward Criteria',
    criteria1: 'Less than 5 violations in a year',
    criteria2: '₹500 fuel credit reward',
    criteria3: 'Redeemable at authorized fuel pumps',
    criteria4: 'Auto-credited to vehicle digital wallet',
    keepDriving: 'Keep driving safely to earn rewards!',
    congratulations: 'Congratulations! You qualify for rewards',
    
    // Actions
    close: 'Close',
    submit: 'Submit',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    
    // Tips
    drivingTips: 'Safe Driving Tips',
    tip1: 'Always check load weight before starting journey',
    tip2: 'Avoid overloading to prevent penalties',
    tip3: 'Follow traffic rules and speed limits',
    tip4: 'Regular vehicle maintenance is important',
  },
  
  hi: {
    // Header
    driverCompanion: 'लोडगार्डियन ड्राइवर साथी',
    selectLanguage: 'भाषा चुनें',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    
    // Tabs
    myVehicle: 'मेरा वाहन',
    violations: 'उल्लंघन',
    payments: 'भुगतान',
    rewards: 'पुरस्कार',
    
    // Vehicle Status
    vehicleStatus: 'वाहन की स्थिति',
    vehicleNumber: 'वाहन नंबर',
    driverName: 'ड्राइवर का नाम',
    vehicleType: 'वाहन का प्रकार',
    route: 'मार्ग',
    currentStatus: 'वर्तमान स्थिति',
    
    // Load Information
    loadInformation: 'भार जानकारी',
    currentLoad: 'वर्तमान भार',
    maxCapacity: 'अधिकतम क्षमता',
    loadPercentage: 'भार प्रतिशत',
    passengerCount: 'यात्री संख्या',
    maxPassengers: 'अधिकतम यात्री',
    cargoType: 'माल का प्रकार',
    
    // Warnings
    warningLevel: 'चेतावनी स्तर',
    warnings: 'चेतावनियां',
    warningsIssued: 'चेतावनियां जारी',
    noWarnings: 'कोई चेतावनी नहीं - अच्छा ड्राइविंग!',
    nextViolation: 'अगला उल्लंघन स्वचालित पुलिस अलर्ट ट्रिगर करेगा',
    
    // Status Messages
    safe: 'सुरक्षित',
    warning: 'चेतावनी',
    violation: 'उल्लंघन',
    detained: 'हिरासत में',
    safeToOperate: 'संचालन के लिए सुरक्षित',
    reduceLoad: 'तुरंत भार कम करें',
    vehicleDetained: 'वाहन हिरासत में',
    offloadingRequired: 'माल उतारना आवश्यक',
    
    // Violations
    yourViolations: 'आपके उल्लंघन',
    noViolations: 'कोई उल्लंघन दर्ज नहीं',
    yearlyViolations: 'वार्षिक उल्लंघन',
    totalFines: 'कुल जुर्माना',
    pendingPayment: 'लंबित भुगतान',
    violationType: 'उल्लंघन का प्रकार',
    severity: 'गंभीरता',
    fine: 'जुर्माना',
    status: 'स्थिति',
    location: 'स्थान',
    date: 'तारीख',
    
    // Violation Types
    overload: 'अधिक भार',
    overcrowd: 'भीड़भाड़',
    cargo_tamper: 'माल छेड़छाड़',
    extreme_violation: 'गंभीर उल्लंघन',
    
    // Severity
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    critical: 'गंभीर',
    
    // Payment
    finePayment: 'जुर्माना भुगतान',
    paymentMethods: 'भुगतान के तरीके',
    selectPaymentMethod: 'भुगतान विधि चुनें',
    upiPayment: 'UPI भुगतान',
    cardPayment: 'डेबिट/क्रेडिट कार्ड',
    netBanking: 'नेट बैंकिंग',
    wallet: 'डिजिटल वॉलेट',
    cashAtRTO: 'RTO कार्यालय में नकद',
    payNow: 'अब भुगतान करें',
    paymentProcessing: 'भुगतान प्रक्रिया में...',
    paymentSuccess: 'भुगतान सफल!',
    paymentFailed: 'भुगतान विफल',
    receiptGenerated: 'रसीद जेनरेट की गई है',
    transactionId: 'लेनदेन आईडी',
    downloadReceipt: 'रसीद डाउनलोड करें',
    
    // UPI Details
    enterUpiId: 'UPI ID दर्ज करें',
    upiIdPlaceholder: 'आपकानाम@upi',
    scanQrCode: 'या QR कोड स्कैन करें',
    
    // Card Details
    cardNumber: 'कार्ड नंबर',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'समाप्ति तिथि',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    cardholderName: 'कार्डधारक का नाम',
    
    // Net Banking
    selectBank: 'अपना बैंक चुनें',
    searchBank: 'बैंक खोजें...',
    proceedToBank: 'बैंक पर जाएं',
    
    // Wallet
    selectWallet: 'वॉलेट प्रदाता चुनें',
    walletBalance: 'वॉलेट बैलेंस',
    
    // Rewards
    rewardProgram: 'वार्षिक पुरस्कार कार्यक्रम',
    eligibility: 'पात्रता',
    eligibleForReward: 'पुरस्कार के लिए पात्र',
    notEligible: 'पात्र नहीं',
    rewardPoints: 'पुरस्कार अंक',
    fuelCredit: 'ईंधन क्रेडिट',
    violationsThisYear: 'इस वर्ष उल्लंघन',
    criteriaTitle: 'पुरस्कार मानदंड',
    criteria1: 'एक वर्ष में 5 से कम उल्लंघन',
    criteria2: '₹500 ईंधन क्रेडिट पुरस्कार',
    criteria3: 'अधिकृत ईंधन पंपों पर रिडीम करने योग्य',
    criteria4: 'वाहन डिजिटल वॉलेट में ऑटो-क्रेडिट',
    keepDriving: 'पुरस्कार अर्जित करने के लिए सुरक्षित रूप से ड्राइव करते रहें!',
    congratulations: 'बधाई हो! आप पुरस्कार के लिए योग्य हैं',
    
    // Actions
    close: 'बंद करें',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    continue: 'जारी रखें',
    
    // Tips
    drivingTips: 'सुरक्षित ड्राइविंग टिप्स',
    tip1: 'यात्रा शुरू करने से पहले हमेशा भार वजन की जांच करें',
    tip2: 'जुर्माने से बचने के लिए अधिक भार से बचें',
    tip3: 'यातायात नियमों और गति सीमा का पालन करें',
    tip4: 'नियमित वाहन रखरखाव महत्वपूर्ण है',
  },
  
  te: {
    // Header
    driverCompanion: 'లోడ్‌గార్డియన్ డ్రైవర్ సహాయకుడు',
    selectLanguage: 'భాషను ఎంచుకోండి',
    backToDashboard: 'డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి',
    
    // Tabs
    myVehicle: 'నా వాహనం',
    violations: 'ఉల్లంఘనలు',
    payments: 'చెల్లింపులు',
    rewards: 'బహుమతులు',
    
    // Vehicle Status
    vehicleStatus: 'వాహన స్థితి',
    vehicleNumber: 'వాహన నంబర్',
    driverName: 'డ్రైవర్ పేరు',
    vehicleType: 'వాహన రకం',
    route: 'మార్గం',
    currentStatus: 'ప్రస్తుత స్థితి',
    
    // Load Information
    loadInformation: 'లోడ్ సమాచారం',
    currentLoad: 'ప్రస్తుత లోడ్',
    maxCapacity: 'గరిష్ట సామర్థ్యం',
    loadPercentage: 'లోడ్ శాతం',
    passengerCount: 'ప్రయాణికుల సంఖ్య',
    maxPassengers: 'గరిష్ట ప్రయాణికులు',
    cargoType: 'కార్గో రకం',
    
    // Warnings
    warningLevel: 'హెచ్చరిక స్థాయి',
    warnings: 'హెచ్చరికలు',
    warningsIssued: 'హెచ్చరికలు జారీ చేయబడ్డాయి',
    noWarnings: 'హెచ్చరికలు లేవు - మంచి డ్రైవింగ్!',
    nextViolation: 'తదుపరి ఉల్లంఘన ఆటోమేటిక్ పోలీస్ హెచ్చరికను ప్రేరేపిస్తుంది',
    
    // Status Messages
    safe: 'సురక్షితం',
    warning: 'హెచ్చరిక',
    violation: 'ఉల్లంఘన',
    detained: 'నిర్బంధించబడింది',
    safeToOperate: 'నడపడానికి సురక్షితం',
    reduceLoad: 'వెంటనే లోడ్ తగ్గించండి',
    vehicleDetained: 'వాహనం నిర్బంధించబడింది',
    offloadingRequired: 'అన్‌లోడింగ్ అవసరం',
    
    // Violations
    yourViolations: 'మీ ఉల్లంఘనలు',
    noViolations: 'ఉల్లంఘనలు రికార్డ్ చేయబడలేదు',
    yearlyViolations: 'వార్షిక ఉల్లంఘనలు',
    totalFines: 'మొత్తం జరిమానాలు',
    pendingPayment: 'పెండింగ్ చెల్లింపు',
    violationType: 'ఉల్లంఘన రకం',
    severity: 'తీవ్రత',
    fine: 'జరిమానా',
    status: 'స్థితి',
    location: 'స్థానం',
    date: 'తేదీ',
    
    // Violation Types
    overload: 'అధిక లోడ్',
    overcrowd: 'రద్దీ',
    cargo_tamper: 'కార్గో తారుమారు',
    extreme_violation: 'తీవ్రమైన ఉల్లంఘన',
    
    // Severity
    low: 'తక్కువ',
    medium: 'మధ్యస్థ',
    high: 'అధిక',
    critical: 'క్లిష్టమైన',
    
    // Payment
    finePayment: 'జరిమానా చెల్లింపు',
    paymentMethods: 'చెల్లింపు పద్ధతులు',
    selectPaymentMethod: 'చెల్లింపు పద్ధతిని ఎంచుకోండి',
    upiPayment: 'UPI చెల్లింపు',
    cardPayment: 'డెబిట్/క్రెడిట్ కార్డ్',
    netBanking: 'నెట్ బ్యాంకింగ్',
    wallet: 'డిజిటల్ వాలెట్',
    cashAtRTO: 'RTO కార్యాలయంలో నగదు',
    payNow: 'ఇప్పుడు చెల్లించండి',
    paymentProcessing: 'చెల్లింపు ప్రాసెస్ అవుతోంది...',
    paymentSuccess: 'చెల్లింపు విజయవంతమైంది!',
    paymentFailed: 'చెల్లింపు విఫలమైంది',
    receiptGenerated: 'రసీదు జెనరేట్ చేయబడింది',
    transactionId: 'లావాదేవీ ID',
    downloadReceipt: 'రసీదును డౌన్‌లోడ్ చేయండి',
    
    // UPI Details
    enterUpiId: 'UPI ID నమోదు చేయండి',
    upiIdPlaceholder: 'మీపేరు@upi',
    scanQrCode: 'లేదా QR కోడ్ స్కాన్ చేయండి',
    
    // Card Details
    cardNumber: 'కార్డ్ నంబర్',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryDate: 'గడువు తేదీ',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '123',
    cardholderName: 'కార్డ్‌హోల్డర్ పేరు',
    
    // Net Banking
    selectBank: 'మీ బ్యాంక్‌ను ఎంచుకోండి',
    searchBank: 'బ్యాంక్ కోసం శోధించండి...',
    proceedToBank: 'బ్యాంక్‌కు వెళ్ళండి',
    
    // Wallet
    selectWallet: 'వాలెట్ ప్రొవైడర్‌ను ఎంచుకోండి',
    walletBalance: 'వాలెట్ బ్యాలెన్స్',
    
    // Rewards
    rewardProgram: 'వార్షిక బహుమతి కార్యక్రమం',
    eligibility: 'అర్హత',
    eligibleForReward: 'బహుమతికి అర్హులు',
    notEligible: 'అర్హత లేదు',
    rewardPoints: 'బహుమతి పాయింట్లు',
    fuelCredit: 'ఇంధన క్రెడిట్',
    violationsThisYear: 'ఈ సంవత్సరం ఉల్లంఘనలు',
    criteriaTitle: 'బహుమతి ప్రమాణాలు',
    criteria1: 'సంవత్సరంలో 5 కంటే తక్కువ ఉల్లంఘనలు',
    criteria2: '₹500 ఇంధన క్రెడిట్ బహుమతి',
    criteria3: 'అధికారిక ఇంధన పంపుల వద్ద రిడీమ్ చేయవచ్చు',
    criteria4: 'వాహన డిజిటల్ వాలెట్‌లో ఆటో-క్రెడిట్',
    keepDriving: 'బహుమతులు సంపాదించడానికి సురక్షితంగా డ్రైవింగ్ చేయండి!',
    congratulations: 'అభినందనలు! మీరు బహుమతులకు అర్హులు',
    
    // Actions
    close: 'మూసివేయండి',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    confirm: 'నిర్ధారించండి',
    continue: 'కొనసాగించండి',
    
    // Tips
    drivingTips: 'సురక్షిత డ్రైవింగ్ చిట్కాలు',
    tip1: 'ప్రయాణం ప్రారంభించే ముందు ఎల్లప్పుడూ లోడ్ బరువును తనిఖీ చేయండి',
    tip2: 'జరిమానాలను నివారించడానికి అధిక లోడ్ నుండి దూరంగా ఉండండి',
    tip3: 'ట్రాఫిక్ నియమాలు మరియు వేగ పరిమితులను అనుసరించండి',
    tip4: 'క్రమం తప్పకుండా వాహన నిర్వహణ ముఖ్యం',
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
