import {
  AlertTriangle,
  CloudRain,
  MinusCircle,
  Sun,
  Wind,
} from 'react-feather';
import type { Emotion } from '../types/diary';

interface EmotionIconProps {
  emotion: Emotion;
  size?: number;
}

export function EmotionIcon({ emotion, size = 24 }: EmotionIconProps) {
  switch (emotion) {
    case 'happy':
      return <Sun size={size} aria-hidden="true" />;
    case 'sad':
      return <CloudRain size={size} aria-hidden="true" />;
    case 'calm':
      return <Wind size={size} aria-hidden="true" />;
    case 'angry':
      return <AlertTriangle size={size} aria-hidden="true" />;
    case 'neutral':
      return <MinusCircle size={size} aria-hidden="true" />;
    default:
      return <MinusCircle size={size} aria-hidden="true" />;
  }
}
