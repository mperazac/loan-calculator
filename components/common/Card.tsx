import * as React from 'react';
import { Tooltip } from 'flowbite-react';
import { Card as TremorCard, Text, Metric, Title } from '@tremor/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface ICardProps {
  label: string;
  tooltip?: string;
  value: string;
  subText?: string | JSX.Element;
}

const Card: React.FunctionComponent<ICardProps> = props => {
  const { label, tooltip, value, subText } = props;

  function renderSubtext() {
    if (subText) {
      if (typeof subText === 'string') {
        return <Text className='mt-1'>{subText}</Text>;
      }
      return subText;
    }
    return null;
  }

  return (
    <TremorCard decoration='top' decorationColor='indigo'>
      <Title className='flex gap-2 items-center text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light'>
        {label}
      </Title>
      {tooltip && (
        <Tooltip content={tooltip}>
          <QuestionMarkCircleIcon className='h-5 w-5' />
        </Tooltip>
      )}
      <Metric className='text-lg lg:text-3xl'>{value}</Metric>
      {renderSubtext()}
    </TremorCard>
  );
};

export default Card;
