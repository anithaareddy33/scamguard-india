import { AnalysisResult, RiskLevel, SupportedLanguage } from '@/types/fraud';
import { FRAUD_PATTERNS, SUSPICIOUS_URL_PATTERNS, LANGUAGE_PATTERNS, SAFETY_TIPS } from './fraudPatterns';

// Call Python AI Service
async function callAI(text: string) {
  const res = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("AI Service not available");
  }

  return await res.json();
}


// Detect language of the message
export function detectLanguage(text: string): SupportedLanguage {
  const hasHindi = LANGUAGE_PATTERNS.hindi.test(text);
  const hasTelugu = LANGUAGE_PATTERNS.telugu.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  if ((hasHindi || hasTelugu) && hasEnglish) {
    return 'mixed';
  }
  if (hasTelugu) return 'telugu';
  if (hasHindi) return 'hindi';
  return 'english';
}

// Preprocess text for analysis
export function preprocessText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s\u0900-\u097F\u0C00-\u0C7F@./-]/g, ' ')
    .trim();
}

// Check for suspicious URLs
function checkSuspiciousUrls(text: string): { found: boolean; patterns: string[] } {
  const patterns: string[] = [];
  
  // Extract URLs
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
  const urls = text.match(urlRegex) || [];
  
  // Check each URL against suspicious patterns
  for (const url of urls) {
    for (const pattern of SUSPICIOUS_URL_PATTERNS) {
      if (pattern.test(url)) {
        patterns.push(`Suspicious URL detected: ${url}`);
        break;
      }
    }
  }

  // Check for URL shorteners in the text
  const lowerText = text.toLowerCase();
  if (lowerText.includes('bit.ly') || lowerText.includes('tinyurl')) {
    patterns.push('URL shortener detected - could hide malicious links');
  }

  return { found: patterns.length > 0, patterns };
}

// Analyze message for fraud patterns
export async function analyzeMessage(message: string): Promise<AnalysisResult> {
  const debugTrace: string[] = [];

  console.log("🔥 FRAUD LOGIC VERSION 999 EXECUTING");

  // 🟢 HARD SAFE: Legit login OTP (must be BEFORE rule engine)
const otpOnly =
  /\botp\b/i.test(message) &&
  !/(share|send|pay|transfer|give|verify|confirm)/i.test(message) &&
  !/(upi|bank|account|money|₹|rs|http|link)/i.test(message);

if (otpOnly) {
  return {
    riskLevel: 'SAFE',
    confidenceScore: 8,
    explanation:
      '✅ This is a legitimate OTP message for login or verification. No scam intent detected.',
    detectedPatterns: [],
    language: detectLanguage(message),
    ruleScore: 0,
    safetyTips: SAFETY_TIPS.SAFE,
  };
}

  // 🔒 Pre-check: block rule engine for non-financial messages
const financialIntentRegex =
  /(upi|pay|payment|account|bank|kyc|blocked|amount|rs|₹|money|reward|prize|lottery|cash|link|http)/i;

  const processedText = preprocessText(message);
  const language = detectLanguage(message);
  const detectedPatterns: string[] = [];
  
  let highSeverityCount = 0;
  let mediumSeverityCount = 0;
  let lowSeverityCount = 0;

  // Check against fraud patterns
  for (const pattern of FRAUD_PATTERNS) {
    const lowerText = processedText;
    const keyword = pattern.keyword.toLowerCase();
    
    if (lowerText.includes(keyword)) {
  debugTrace.push(`Rule match: ${pattern.category} -> "${pattern.keyword}"`);
      const patternDesc = `${pattern.category.toUpperCase()}: "${pattern.keyword}" detected`;
      if (!detectedPatterns.includes(patternDesc)) {
        detectedPatterns.push(patternDesc);
      }

      switch (pattern.severity) {
        case 'high':
          highSeverityCount++;
          break;
        case 'medium':
          mediumSeverityCount++;
          break;
        case 'low':
          lowSeverityCount++;
          break;
      }
    }
  }

  // Check for suspicious URLs
  const urlCheck = checkSuspiciousUrls(message);
  if (urlCheck.found) {
    detectedPatterns.push(...urlCheck.patterns);
    highSeverityCount += urlCheck.patterns.length;
  }

  // Check for phone number patterns
  const phonePattern = /(\+91|91|0)?[6-9]\d{9}/g;
  const phones = message.match(phonePattern);
  if (phones && phones.length > 0) {
    detectedPatterns.push(`Phone number(s) found: ${phones.length}`);
    lowSeverityCount++;
  }

  // Check for UPI ID patterns
  const upiPattern = /[a-zA-Z0-9._-]+@[a-zA-Z]+/g;
  const upiIds = message.match(upiPattern);
  if (upiIds && upiIds.length > 0) {
    detectedPatterns.push(`UPI ID(s) detected: ${upiIds.length}`);
    mediumSeverityCount++;
  }

  // Check for amount mentions
  const amountPattern = /₹?\s*\d{1,3}(,\d{3})*(\.\d{2})?|\d+\s*(lakh|crore|lakhs|crores|thousand)/gi;
  const amounts = message.match(amountPattern);
  if (amounts && amounts.length > 0) {
    detectedPatterns.push(`Money amount(s) mentioned: ${amounts.length}`);
    // Check for unrealistic amounts
    const text = message.toLowerCase();
    if (text.includes('crore') || text.includes('lakh')) {
      mediumSeverityCount++;
    }
  }

  const deliveryScamRegex =
  /(delivery|parcel|package|courier|address|attempted|returned)/i;

const hasSuspiciousLink = checkSuspiciousUrls(message).found;

if (deliveryScamRegex.test(message) && hasSuspiciousLink) {
  return {
    riskLevel: 'SCAM',
    confidenceScore: 85,
    explanation:
      '🚨 This message appears to be a fake delivery notification with a suspicious link. Such messages are commonly used for phishing.',
    detectedPatterns: ['Fake delivery notification', 'Suspicious link'],
    language,
    ruleScore: 80,
    safetyTips: SAFETY_TIPS.SCAM,
  };
}


  // Calculate rule score (0-100)
  const ruleScore = Math.min(100, 
    (highSeverityCount * 30) + 
    (mediumSeverityCount * 15) + 
    (lowSeverityCount * 5)
  );

  // Determine risk level
  // Determine risk level (improved safe floor)
let riskLevel: RiskLevel;

if (ruleScore >= 60 || highSeverityCount >= 2) {
  riskLevel = 'SCAM';
} 
else if (
  ruleScore >= 30 ||
  highSeverityCount === 1 ||
  mediumSeverityCount >= 2
) {
  riskLevel = 'SUSPICIOUS';
} 
else {
  riskLevel = 'SAFE';
}


  // Calculate confidence score
  const confidenceScore = Math.min(100, Math.round(
    ruleScore * 0.8 + 
    (detectedPatterns.length * 5)
  ));

  // Generate explanation
  let explanation = '';
  if (riskLevel === 'SCAM') {
    explanation = `⚠️ HIGH RISK DETECTED! This message contains ${highSeverityCount} high-severity and ${mediumSeverityCount} medium-severity fraud indicators. Common scam patterns were identified including ${detectedPatterns.slice(0, 3).join(', ')}.`;
  } else if (riskLevel === 'SUSPICIOUS') {
    explanation = `🔶 PROCEED WITH CAUTION. This message has some concerning elements. We detected ${detectedPatterns.length} potential warning signs. Verify through official channels before taking any action.`;
  } else {
    explanation = `✅ This message appears to be safe based on our analysis. No significant fraud patterns were detected. However, always exercise caution with financial matters.`;
  }

  // 🔍 TEMP DEBUG INFO (remove in production)
if (debugTrace.length > 0) {
  explanation += `\n\nDebug info:\n- ${debugTrace.join('\n- ')}`;
}

 // 🧠 Call AI ONLY for risky messages
let finalScore = confidenceScore;

if (riskLevel !== 'SAFE') {
  try {
    const aiResult = await callAI(message);

    // Use AI confidence ONLY for risky messages
    if (aiResult?.final_score) {
      finalScore = Math.round(aiResult.final_score * 100);
    }

    // AI may escalate to SCAM, never downgrade
    if (aiResult?.label === 'SCAM') {
      riskLevel = 'SCAM';
    }

  } catch (err) {
    console.error('AI error:', err);
  }
}

// 🚫 SAFE messages NEVER altered by AI
return {
  riskLevel,
  confidenceScore: finalScore,
  explanation,
  detectedPatterns,
  language,
  ruleScore,
  safetyTips: SAFETY_TIPS[riskLevel],
};
}