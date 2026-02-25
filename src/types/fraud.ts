// Risk levels for fraud detection
export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

// Supported languages
export type SupportedLanguage = 'english' | 'hindi' | 'telugu' | 'mixed';

// Analysis result from the detection service
export interface AnalysisResult {
  riskLevel: RiskLevel;
  label?: RiskLevel; // ✅ ADD THIS
  confidenceScore: number;
  explanation: string;
  detectedPatterns: string[];
  language: SupportedLanguage;
  ruleScore: number;
  mlScore?: number;
  safetyTips: string[];
}


// User model
export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

// Auth state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Message analysis record
export interface MessageAnalysis {
  id: string;
  userId: string;
  riskLevel: RiskLevel;
  confidenceScore: number;
  explanation: string;
  timestamp: Date;
}

// Fraud patterns for rule-based detection
export interface FraudPattern {
  keyword: string;
  language: SupportedLanguage;
  severity: 'low' | 'medium' | 'high';
  category: 'urgency' | 'otp' | 'upi' | 'url' | 'financial' | 'delivery';
}

// API request/response types
export interface AnalyzeRequest {
  message: string;
  userId?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}
