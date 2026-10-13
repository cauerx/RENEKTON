export interface Matchup {
  id: string;
  champion: string;
  riotKey: string;
  avatarUrl: string;
  difficultyRaw: string;
  difficultyTier: string;
  difficultyScore: number;
  runes: string;
  startingItems: string;
  summoners: string;
  abilityMax: string;
  summary: string;
  detailedNotes: string;
  tips: string[];
  video: string;
}

export interface GuideMetadata {
  title: string;
  author: string;
  extractedAt: string;
  ddragonVersion: string;
  totalMatchups: number;
}

export interface IntroData {
  title: string;
  about: string;
  video: string;
  howToUse: string;
  socials: { platform: string; url: string }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SkinTierListData {
  title: string;
  notes: string;
  image: string;
}

export interface RuneSetup {
  title: string;
  description: string;
  image: string;
}

export interface RunesData {
  title: string;
  intro: string;
  video1: string;
  ptaVsConqTitle: string;
  ptaVsConqIntro: string;
  video2: string;
  ptaVsConqDetails: string;
  minorRunes: string;
  setupsIntro: string;
  setups: RuneSetup[];
}

export interface MechanicsData {
  title: string;
  intro: string;
  video: string;
  sections: any[];
}

export interface SummonersData {
  title: string;
  intro: string;
  spells: { name: string; description: string }[];
  summary: string;
}

export interface ItemBuild {
  title: string;
  description: string;
  image: string;
}

export interface ItemsData {
  title: string;
  intro: string;
  video: string;
  itemStarts: string;
  tierList: { tier: string; items: string }[];
  boots: string;
  builds: ItemBuild[];
}

export interface AbilitiesData {
  title: string;
  intro: string;
  level1Starts: string;
  topLaneStarts: string;
  midLaneStarts: string;
  maxOrderOverview: string;
  topLaneMaxRecommendations: string;
  midLaneMaxRecommendations: string;
}

export interface FuryData {
  title: string;
  intro: string;
  understanding: string;
  combosIntro: string;
  shortTrades: string;
  allIns: string;
  waysToMaintain: string;
  practiceMethods: string;
}

export interface GuideData {
  metadata: GuideMetadata;
  intro: IntroData;
  faq: FaqItem[];
  skinTierList: SkinTierListData;
  runes: RunesData;
  mechanics: MechanicsData;
  summoners: SummonersData;
  items: ItemsData;
  abilities: AbilitiesData;
  fury: FuryData;
  matchups: Matchup[];
}
