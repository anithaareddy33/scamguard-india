import { useState } from 'react';
import { Send, Loader2, AlertTriangle, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeMessage } from '@/lib/fraudDetection';
import { AnalysisResult } from '@/types/fraud';
import { RiskResultCard } from './RiskResultCard';

export function MessageAnalyzer() {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

 const handleAnalyze = async () => {
  console.log("Analyze button clicked"); // ✅ MUST appear in console

  if (!message.trim()) return;

  setIsAnalyzing(true);
  setResult(null);

  try {
    // Optional delay (you can keep it)
    await new Promise(resolve => setTimeout(resolve, 800));

    const analysisResult = await analyzeMessage(message);

    console.log("AI RESULT:", analysisResult); // ✅ MUST appear

    setResult({
      ...analysisResult,
      riskLevel: analysisResult.label ?? analysisResult.riskLevel,
    });
  } catch (error) {
    console.error("Analyze failed:", error);
  } finally {
    setIsAnalyzing(false);
  }
};


  const handleClear = () => {
    setMessage('');
    setResult(null);
  };

  const exampleMessages = [
    {
      label: 'English Scam',
      text: 'Congratulations! You won Rs. 50 Lakh in KBC lottery! Send OTP to claim prize immediately. Your UPI: winner@ybl. Click bit.ly/claim-now',
    },
    {
      label: 'Hindi Scam',
      text: 'जल्दी करें! आपके खाते में 10 लाख रुपये जमा हैं। अभी OTP भेजें: 1234। आपका KYC अपडेट तुरंत करें वरना खाता बंद हो जाएगा।',
    },
    {
      label: 'Telugu Mixed',
      text: 'మీకు 5 లక్షల prize వచ్చింది! వెంటనే OTP share చేయండి. Click here: bit.ly/telugu-prize UPI: winner@paytm',
    },
    {
      label: 'Safe Message',
      text: 'Hi! Your Swiggy order #12345 has been delivered. Enjoy your meal! Rate your experience on the app.',
    },
  ];

  return (
    <section id="analyzer" className="py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Analyze Suspicious Messages
            </h2>
            <p className="text-muted-foreground">
              Paste any SMS, WhatsApp, or UPI message to check for fraud indicators
            </p>
          </div>

          {/* Message Input Card */}
          <motion.div 
            className="glass-card rounded-2xl p-6 md:p-8"
            layout
          >
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste your suspicious message here...&#10;&#10;उदाहरण: संदिग्ध संदेश यहां पेस्ट करें...&#10;&#10;ఉదాహరణ: అనుమానాస్పద సందేశాన్ని ఇక్కడ పేస్ట్ చేయండి..."
                className="min-h-[160px] text-base resize-none bg-muted/50 border-none focus-visible:ring-primary/50 pr-12"
                disabled={isAnalyzing}
              />
              {message && (
                <button
                  onClick={handleClear}
                  className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Clear message"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Example Messages */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Try:</span>
              {exampleMessages.map((example) => (
                <button
                  key={example.label}
                  onClick={() => setMessage(example.text)}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                >
                  {example.label}
                </button>
              ))}
            </div>

            {/* Analyze Button */}
            <div className="mt-6">
              <Button
                onClick={handleAnalyze}
                disabled={!message.trim() || isAnalyzing}
                variant="hero"
                size="xl"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Analyze Message
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="mt-8"
              >
                <RiskResultCard result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
