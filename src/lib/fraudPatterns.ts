import { FraudPattern, SupportedLanguage } from '@/types/fraud';

// Comprehensive fraud patterns for Indian scam detection
export const FRAUD_PATTERNS: FraudPattern[] = [


  // URGENCY PATTERNS - English
  { keyword: 'urgent', language: 'english', severity: 'medium', category: 'urgency' },
  { keyword: 'immediately', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: 'expire', language: 'english', severity: 'medium', category: 'urgency' },
  { keyword: 'last chance', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: 'act now', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: 'limited time', language: 'english', severity: 'medium', category: 'urgency' },
  { keyword: 'hurry', language: 'english', severity: 'medium', category: 'urgency' },
  { keyword: 'deadline', language: 'english', severity: 'medium', category: 'urgency' },
  { keyword: 'suspended', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: 'blocked', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: 'account will be closed', language: 'english', severity: 'high', category: 'urgency' },
  { keyword: "delivery", language: "english", severity: "medium", category: "delivery" },
  {
    keyword: "package",
    language: "english",
    severity: "medium",
    category: "delivery"
  },
  {
    keyword: "parcel",
    language: "english",
    severity: "medium",
    category: "delivery"
  },
  {
    keyword: "address is unclear",
    language: "english",
    severity: "high",
    category: "delivery"
  },
  {
    keyword: "delivery attempted",
    language: "english",
    severity: "high",
    category: "delivery"
  },
  {
    keyword: "will be returned",
    language: "english",
    severity: "high",
    category: "delivery"
  },
  {
    keyword: "update it in time",
    language: "english",
    severity: "high",
    category: "urgency"
  }
  ,

  // URGENCY PATTERNS - Hindi
  { keyword: 'तुरंत', language: 'hindi', severity: 'high', category: 'urgency' },
  { keyword: 'जल्दी', language: 'hindi', severity: 'medium', category: 'urgency' },
  { keyword: 'अभी', language: 'hindi', severity: 'medium', category: 'urgency' },
  { keyword: 'फौरन', language: 'hindi', severity: 'high', category: 'urgency' },
  { keyword: 'आखिरी मौका', language: 'hindi', severity: 'high', category: 'urgency' },
  { keyword: 'समय सीमित', language: 'hindi', severity: 'medium', category: 'urgency' },

  // URGENCY PATTERNS - Telugu
  { keyword: 'వెంటనే', language: 'telugu', severity: 'high', category: 'urgency' },
  { keyword: 'త్వరగా', language: 'telugu', severity: 'medium', category: 'urgency' },
  { keyword: 'ఇప్పుడే', language: 'telugu', severity: 'medium', category: 'urgency' },
  { keyword: 'చివరి అవకాశం', language: 'telugu', severity: 'high', category: 'urgency' },

  // OTP/PIN PATTERNS - English
  { keyword: 'otp', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'pin', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'verification code', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'share your otp', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'send otp', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'enter otp', language: 'english', severity: 'medium', category: 'otp' },
  { keyword: 'cvv', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'password', language: 'english', severity: 'medium', category: 'otp' },
  { keyword: 'mpin', language: 'english', severity: 'high', category: 'otp' },
  { keyword: 'atm pin', language: 'english', severity: 'high', category: 'otp' },

  // OTP/PIN PATTERNS - Hindi
  { keyword: 'ओटीपी', language: 'hindi', severity: 'high', category: 'otp' },
  { keyword: 'पिन', language: 'hindi', severity: 'high', category: 'otp' },
  { keyword: 'कोड भेजें', language: 'hindi', severity: 'high', category: 'otp' },
  { keyword: 'पासवर्ड', language: 'hindi', severity: 'medium', category: 'otp' },

  // OTP/PIN PATTERNS - Telugu
  { keyword: 'ఓటీపీ', language: 'telugu', severity: 'high', category: 'otp' },
  { keyword: 'పిన్', language: 'telugu', severity: 'high', category: 'otp' },
  { keyword: 'కోడ్', language: 'telugu', severity: 'medium', category: 'otp' },

  // UPI PATTERNS - English
  { keyword: 'upi', language: 'english', severity: 'low', category: 'upi' },
  { keyword: 'collect request', language: 'english', severity: 'medium', category: 'upi' },
  { keyword: 'pay to receive', language: 'english', severity: 'high', category: 'upi' },
  { keyword: 'send money to receive', language: 'english', severity: 'high', category: 'upi' },
  { keyword: 'upi id', language: 'english', severity: 'low', category: 'upi' },
  { keyword: '@ybl', language: 'english', severity: 'low', category: 'upi' },
  { keyword: '@paytm', language: 'english', severity: 'low', category: 'upi' },
  { keyword: '@gpay', language: 'english', severity: 'low', category: 'upi' },
  { keyword: '@oksbi', language: 'english', severity: 'low', category: 'upi' },
  { keyword: 'cashback', language: 'english', severity: 'medium', category: 'upi' },
  { keyword: 'refund', language: 'english', severity: 'medium', category: 'upi' },
  { keyword: 'bonus credited', language: 'english', severity: 'high', category: 'upi' },

  // UPI PATTERNS - Hindi
  { keyword: 'यूपीआई', language: 'hindi', severity: 'low', category: 'upi' },
  { keyword: 'कलेक्ट रिक्वेस्ट', language: 'hindi', severity: 'medium', category: 'upi' },
  { keyword: 'पैसे भेजें पैसे पाएं', language: 'hindi', severity: 'high', category: 'upi' },
  { keyword: 'कैशबैक', language: 'hindi', severity: 'medium', category: 'upi' },
  { keyword: 'रिफंड', language: 'hindi', severity: 'medium', category: 'upi' },

  // FINANCIAL PATTERNS - English
  { keyword: 'lottery', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'prize', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'winner', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'won', language: 'english', severity: 'medium', category: 'financial' },
  { keyword: 'crore', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'lakh', language: 'english', severity: 'medium', category: 'financial' },
  { keyword: 'lakhs', language: 'english', severity: 'medium', category: 'financial' },
  { keyword: 'free gift', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'lucky draw', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'claim now', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'kyc update', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'kyc expired', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'bank account', language: 'english', severity: 'low', category: 'financial' },
  { keyword: 'credit card', language: 'english', severity: 'low', category: 'financial' },
  { keyword: 'loan approved', language: 'english', severity: 'high', category: 'financial' },
  { keyword: 'loan sanction', language: 'english', severity: 'high', category: 'financial' },

  // FINANCIAL PATTERNS - Hindi
  { keyword: 'लॉटरी', language: 'hindi', severity: 'high', category: 'financial' },
  { keyword: 'इनाम', language: 'hindi', severity: 'high', category: 'financial' },
  { keyword: 'विजेता', language: 'hindi', severity: 'high', category: 'financial' },
  { keyword: 'करोड़', language: 'hindi', severity: 'high', category: 'financial' },
  { keyword: 'लाख', language: 'hindi', severity: 'medium', category: 'financial' },
  { keyword: 'मुफ्त', language: 'hindi', severity: 'medium', category: 'financial' },
  { keyword: 'केवाईसी', language: 'hindi', severity: 'high', category: 'financial' },

  // FINANCIAL PATTERNS - Telugu
  { keyword: 'లాటరీ', language: 'telugu', severity: 'high', category: 'financial' },
  { keyword: 'బహుమతి', language: 'telugu', severity: 'high', category: 'financial' },
  { keyword: 'విజేత', language: 'telugu', severity: 'high', category: 'financial' },
  { keyword: 'కోట్లు', language: 'telugu', severity: 'high', category: 'financial' },
  { keyword: 'లక్షలు', language: 'telugu', severity: 'medium', category: 'financial' },

  // URL PATTERNS
  { keyword: 'bit.ly', language: 'english', severity: 'medium', category: 'url' },
  { keyword: 'tinyurl', language: 'english', severity: 'medium', category: 'url' },
  { keyword: 'click here', language: 'english', severity: 'medium', category: 'url' },
  { keyword: 'click this link', language: 'english', severity: 'medium', category: 'url' },
  { keyword: 'http://', language: 'english', severity: 'low', category: 'url' },
  { keyword: 'verify now', language: 'english', severity: 'medium', category: 'url' },
];

// Suspicious URL patterns (regex)
export const SUSPICIOUS_URL_PATTERNS = [
  /bit\.ly/i,
  /tinyurl\.com/i,
  /t\.co/i,
  /goo\.gl/i,
  /ow\.ly/i,
  /is\.gd/i,
  /buff\.ly/i,
  /adf\.ly/i,
  /rb\.gy/i,
  /cutt\.ly/i,
  /tiny\.cc/i,
  /short\.io/i,
  /rebrand\.ly/i,
  // Fake banking domains
  /sbi.*verify/i,
  /hdfc.*update/i,
  /icici.*kyc/i,
  /axis.*secure/i,
  /paytm.*claim/i,
  /phonepe.*win/i,
  /gpay.*prize/i,
  // Common scam TLDs
  /\.(xyz|top|work|click|club|online|site|fun|icu)$/i,
  /tinyurl/i,
  /\.click/i,
  /\.top/i,
  /\.xyz/i,
  /delivery.*\.com/i,
  /delhivery.*\.com/i,
  /track.*\.click/i,
  /update.*\.click/i
];

// Language detection patterns
export const LANGUAGE_PATTERNS = {
  hindi: /[\u0900-\u097F]/,
  telugu: /[\u0C00-\u0C7F]/,
  english: /^[a-zA-Z0-9\s.,!?'"()-]+$/,
};

// Safety tips based on risk level
export const SAFETY_TIPS = {
  SAFE: [
    'This message appears legitimate, but always stay vigilant.',
    'Never share OTP, PIN, or passwords with anyone.',
    'Verify sender identity through official channels.',
  ],
  SUSPICIOUS: [
    'Be cautious - this message has some concerning elements.',
    'Do NOT click on any links without verification.',
    'Contact the organization directly using official numbers.',
    'Never share OTP or sensitive details over messages.',
    'Report suspicious messages to your bank if they claim to be from them.',
  ],
  SCAM: [
    '🚨 HIGH RISK: Do NOT respond to this message!',
    'Block and report this number immediately.',
    'Never send money to claim prizes or refunds.',
    'No legitimate bank asks for OTP/PIN via SMS or WhatsApp.',
    'Report to Cyber Crime helpline: 1930 or cybercrime.gov.in',
    'Forward suspicious SMS to 1909 (TRAI DND)',
  ],
};
