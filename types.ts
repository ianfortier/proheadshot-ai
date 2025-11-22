export enum HeadshotStyle {
  PORTRA = 'Kodak Portra 400',
  CINESTILL = 'CineStill 800T',
  MONOCHROME = 'Ilford HP5',
  LIFESTYLE = 'Natural Lifestyle',
  DRAMATIC = 'Dramatic Chiaroscuro',
  FOUNDER = 'Tech Founder',
  OFFICE = 'Workspace',
  PHOTOBOOTH = 'Photo Booth'
}

export interface GeneratedImage {
  id: string;
  style: HeadshotStyle;
  imageUrl: string;
  isLoading: boolean;
  error?: string;
}

export interface StyleOption {
  id: HeadshotStyle;
  label: string;
  description: string;
  promptModifier: string;
}