import { ShieldCheck, ShieldAlert, AlertTriangle, Globe, Info, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalysisResult, RiskLevel } from '@/types/fraud';
import { Progress } from '@/components/ui/progress';

interface RiskResultCardProps {
  result: AnalysisResult;
}

const riskConfig = {
  SAFE: {
    icon: ShieldCheck,
    label: 'Safe',
    className: 'risk-safe',
    bgClassName: 'bg-safe-muted',
    textClassName: 'text-safe',
    borderClassName: 'border-safe/30',
  },
  SUSPICIOUS: {
    icon: AlertTriangle,
    label: 'Suspicious',
    className: 'risk-suspicious',
    bgClassName: 'bg-suspicious-muted',
    textClassName: 'text-suspicious',
    borderClassName: 'border-suspicious/30',
  },
  SCAM: {
    icon: ShieldAlert,
    label: 'Scam Detected',
    className: 'risk-scam',
    bgClassName: 'bg-scam-muted',
    textClassName: 'text-scam',
    borderClassName: 'border-scam/30',
  },
};

const languageLabels = {
  english: '🇬🇧 English',
  hindi: '🇮🇳 Hindi',
  telugu: '🇮🇳 Telugu',
  mixed: '🌐 Mixed Language',
};

export function RiskResultCard({ result }: RiskResultCardProps) {
  const config = result?.riskLevel
  ? riskConfig[result.riskLevel as keyof typeof riskConfig]
  : null;

if (!config) {
  return null; // prevents white screen
}

const Icon = config.icon;


  return (
    <div className="space-y-6">
      {/* Main Risk Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`relative overflow-hidden rounded-2xl ${config.className} p-6 md:p-8 text-white`}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <Icon className="h-8 w-8" />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">{config.label}</h3>
                <p className="text-white/80 text-sm mt-1">
                  {languageLabels[result.language]}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold">{result.confidenceScore}%</div>
              <div className="text-white/80 text-sm">Confidence</div>
            </div>
          </div>

          {/* Explanation */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-white/90 leading-relaxed"
          >
            {result.explanation}
          </motion.p>

          {/* Score Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-between text-sm text-white/80 mb-2">
              <span>Risk Score</span>
              <span>{result.ruleScore}/100</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.ruleScore}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Detected Patterns */}
      {result.detectedPatterns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl border ${config.borderClassName} ${config.bgClassName} p-6`}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`h-5 w-5 ${config.textClassName}`} />
            <h4 className="font-semibold">Detected Patterns</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.detectedPatterns.map((pattern, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgClassName} ${config.textClassName} border ${config.borderClassName}`}
              >
                <XCircle className="h-3 w-3" />
                {pattern}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Safety Recommendations</h4>
        </div>
        <ul className="space-y-3">
          {result.safetyTips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-safe shrink-0" />
              <span>{tip}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
