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
    <TremorCard className='max-w-xs mx-auto'>
      <Title className='flex gap-2 items-center'>
        {label}{' '}
        {tooltip && (
          <Tooltip content={tooltip}>
            <QuestionMarkCircleIcon className='h-5 w-5' />
          </Tooltip>
        )}
      </Title>
      <Metric>{value}</Metric>
      {renderSubtext()}
    </TremorCard>
  );
};

export default Card;
