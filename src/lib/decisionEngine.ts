import { RiskLevel } from '@/types/fraud';

export function decideFinalRisk(
  ruleRisk: RiskLevel,
  mlRisk: RiskLevel,
  mlScore: number,
  aiRisk?: RiskLevel,
  urlThreat?: boolean
): RiskLevel {

  if (ruleRisk === 'SCAM') return 'SCAM';

  if (urlThreat) return 'SCAM';

  if (mlRisk === 'SCAM' && mlScore > 70) return 'SCAM';

  if (aiRisk === 'SCAM' && ruleRisk !== 'SAFE') return 'SCAM';

  if (ruleRisk === 'SUSPICIOUS' || mlRisk === 'SUSPICIOUS') {
    return 'SUSPICIOUS';
  }

  return 'SAFE';
}
