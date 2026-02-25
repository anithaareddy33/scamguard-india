import { Phone, MessageSquare, CreditCard, Link, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const tips = [
  {
    icon: CreditCard,
    title: 'Never Share OTP/PIN',
    description: 'Banks and UPI apps never ask for OTP, PIN, or CVV. Legitimate services generate these for you.',
    color: 'scam',
  },
  {
    icon: Link,
    title: 'Avoid Suspicious Links',
    description: 'Don\'t click shortened URLs (bit.ly, tinyurl). Verify links before clicking by checking the domain.',
    color: 'suspicious',
  },
  {
    icon: Phone,
    title: 'Verify Caller Identity',
    description: 'Call your bank directly using the number on your card. Don\'t use numbers from SMS or emails.',
    color: 'safe',
  },
  {
    icon: MessageSquare,
    title: 'Report Suspicious Messages',
    description: 'Forward spam SMS to 1909 (TRAI). Report cyber fraud at cybercrime.gov.in or call 1930.',
    color: 'primary',
  },
  {
    icon: AlertTriangle,
    title: 'Beware of Urgency',
    description: 'Scammers create panic. Real banks give you time. Don\'t rush financial decisions.',
    color: 'suspicious',
  },
  {
    icon: Shield,
    title: 'Enable 2FA Everywhere',
    description: 'Turn on two-factor authentication for all banking and UPI apps for extra security.',
    color: 'safe',
  },
];

const colorClasses = {
  safe: 'bg-safe/10 text-safe border-safe/20',
  suspicious: 'bg-suspicious/10 text-suspicious border-suspicious/20',
  scam: 'bg-scam/10 text-scam border-scam/20',
  primary: 'bg-primary/10 text-primary border-primary/20',
};

export function SafetyTips() {
  return (
    <section id="safety" className="py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Safe Online
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential tips to protect yourself from UPI scams, phishing, and digital fraud in India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border ${colorClasses[tip.color as keyof typeof colorClasses]} mb-4 group-hover:scale-110 transition-transform`}>
                <tip.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="rounded-2xl gradient-primary p-6 md:p-8 text-primary-foreground text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Been Scammed? Act Fast!
            </h3>
            <p className="text-primary-foreground/90 mb-4">
              Report immediately to recover your money
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Phone className="h-4 w-4" />
                <span>Cyber Crime: <strong>1930</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Link className="h-4 w-4" />
                <span><strong>cybercrime.gov.in</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <MessageSquare className="h-4 w-4" />
                <span>SMS Spam: <strong>1909</strong></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
