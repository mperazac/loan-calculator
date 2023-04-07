import * as React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Card as TremorCard, Text, Metric, Title } from '@tremor/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

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
      <div className="flex gap-3">
        <Title className='flex items-center gap-2 text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light'>
          {label}
        </Title>
        {tooltip && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <InformationCircleIcon className='w-5 h-5' />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-black text-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
                  sideOffset={5}
                >
                  {tooltip}
                  <Tooltip.Arrow className='fill-white' />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>
      <Metric className='text-lg xl:text-2xl'>{value}</Metric>
      {renderSubtext()}
    </TremorCard>
  );
};

export default Card;
