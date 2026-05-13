import type { ReactNode } from 'react';

/** `reel` = full preview (follow, audio, rail). `homePreview` = home strip (center play, brand + caption). */
export type ReelPreviewCardVariant = 'reel' | 'homePreview';

export interface ReelPreviewCardProps {
  /** Display name next to avatar (e.g. brand / creator). */
  creatorName: string;
  /** Optional two-line caption shown bottom-left. */
  caption?: string;
  /** Shown next to music icon (default: Original audio). */
  audioLabel?: string;
  likeCountLabel: string;
  shareCountLabel: string;
  /** When true, bookmark renders filled (saved state). */
  isSaved?: boolean;
  onPressFollow?: () => void;
  onPressLike?: () => void;
  onPressShare?: () => void;
  onPressSave?: () => void;
  /** Replace placeholder media (e.g. `<Video />` or `<Image />`). */
  media?: ReactNode;
  /** Defaults to `reel`. */
  variant?: ReelPreviewCardVariant;
  /** Fixed width for horizontal carousels. */
  cardWidth?: number;
  /** Home preview: center play control. */
  onPressPlay?: () => void;
}
