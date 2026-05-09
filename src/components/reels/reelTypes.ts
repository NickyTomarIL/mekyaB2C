import type { ReactNode } from 'react';

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
}
