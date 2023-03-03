import * as React from 'react';
import { Card as FlowbiteCard, Tooltip } from 'flowbite-react';

interface ICardProps {
  label: string;
  tooltip?: string;
  value: string;
}

const Card: React.FunctionComponent<ICardProps> = props => {
  const { label, tooltip, value } = props;
  return (
    <FlowbiteCard className='w-60'>
      <h5 className='text-sm font-bold text-gray-700 tracking-tight  dark:text-white uppercase inline-flex gap-4'>
        {label}{' '}
        {tooltip && (
          <Tooltip content={tooltip}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
              />
            </svg>
          </Tooltip>
        )}
      </h5>
      <p className='text-2xl text-gray-900 dark:text-gray-400'>{value}</p>
    </FlowbiteCard>
  );
};

export default Card;
