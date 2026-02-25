import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MessageAnalyzer } from '@/components/MessageAnalyzer';
import { HowItWorks } from '@/components/HowItWorks';
import { SafetyTips } from '@/components/SafetyTips';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MessageAnalyzer />
        <HowItWorks />
        <SafetyTips />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
