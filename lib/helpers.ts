import { BadgeProps } from '@/types/loan';
import { round } from './math.utils';

export function getBadgeProps(data: {
  difference: number;
  percentage: number;
}): BadgeProps {
  if (data.difference > 0) {
    return {
      deltaType: 'moderateDecrease',
      isIncreasePositive: false,
      size: 'xs',
      value: `${round(data.percentage * 100)}%`,
    };
  }
}
