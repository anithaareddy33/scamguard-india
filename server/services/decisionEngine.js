import { checkUrlSafety } from "./safeBrowsing.js";

// extract URLs from message
function extractUrls(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  return text.match(urlRegex) || [];
}

export async function analyzeMessage(message) {
  const text = message.toLowerCase();
  let explanations = [];
  let riskScore = 0;

  // 🟢 HARD SAFE: Legit OTP messages
  const isLegitOtp =
    /\botp\b/.test(text) &&
    !/(share|send|pay|transfer|click|link)/.test(text);

  if (isLegitOtp) {
    return {
      riskLevel: "SAFE",
      confidenceScore: 5,
      explanation: ["Legitimate OTP message. No scam intent detected."]
    };
  }

  // 🔴 URGENCY + PAYMENT
  if (/(pay now|urgent|immediately|act now|blocked|suspended)/.test(text)) {
    riskScore += 30;
    explanations.push("Urgency language detected");
  }

  // 🔴 UPI / PAYMENT REQUEST
  if (/(upi|@upi|paytm|phonepe|gpay|rs|₹)/.test(text)) {
    riskScore += 30;
    explanations.push("Payment or UPI request detected");
  }

  // 🔴 OTP SHARING REQUEST
  if (/(share otp|send otp|confirm otp)/.test(text)) {
    riskScore += 40;
    explanations.push("OTP sharing request detected");
  }

  // 🔴 DELIVERY SCAM DETECTION
  if (/(delivery|parcel|shipment|courier)/.test(text)) {
    riskScore += 20;
    explanations.push("Delivery-related message");
  }

  // 🔴 URL SAFETY CHECK
  const urls = extractUrls(message);
  for (const url of urls) {
    const unsafe = await checkUrlSafety(url);
    if (unsafe) {
      riskScore += 60;
      explanations.push(`Malicious link detected: ${url}`);
    }
  }

  // 🧠 FINAL DECISION
  let riskLevel = "SAFE";

  if (riskScore >= 70) riskLevel = "SCAM";
  else if (riskScore >= 30) riskLevel = "SUSPICIOUS";

  return {
    riskLevel,
    confidenceScore: Math.min(100, riskScore),
    explanation: explanations.length
      ? explanations
      : ["No scam indicators found"]
  };
}
