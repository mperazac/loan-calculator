import * as React from 'react';
import { Card as FlowbiteCard } from 'flowbite-react';

interface ICardProps {
  label: string;
  tooltip?: string;
  value: string;
}

const Card: React.FunctionComponent<ICardProps> = props => {
  const { label, tooltip, value } = props;
  return (
    <FlowbiteCard className='w-60'>
      <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase'>
        {label}
      </h5>
      <p className='text-2xl text-gray-900 dark:text-gray-400'>{value}</p>
    </FlowbiteCard>
  );
};

export default Card;
