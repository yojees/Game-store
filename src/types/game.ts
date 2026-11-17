export interface SystemSpecTier {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface SystemRequirements {
  minimum: SystemSpecTier;
  recommended: SystemSpecTier;
}

export interface GameItem {
  id: number;
  title: string;
  year: number;
  genre: string;
  image: string;
  description: string;
  downloadUrl: string;
  archivePassword?: string;
  developer?: string;
  systemRequirements?: SystemRequirements;
}

export type SortOption = 'recently-added' | 'a-z' | 'z-a';
