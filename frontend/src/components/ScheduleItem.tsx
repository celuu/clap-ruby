import { HStack, VStack, Text, Icon } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface ScheduleItemProps {
  time: string;
  title: string;
  category: string;
  categoryColor?: string;
  onClick?: () => void;
}

export const ScheduleItem = ({
  time,
  title,
  category,
  categoryColor = 'gray.500',
  onClick,
}: ScheduleItemProps) => {
  return (
    <HStack
      w="full"
      py={4}
      px={4}
      spacing={4}
      borderRadius="lg"
      cursor="pointer"
      _hover={{ bg: 'gray.50' }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Text fontSize="sm" color="gray.400" fontWeight="medium" minW="70px">
        {time}
      </Text>
      <VStack align="flex-start" spacing={1} flex={1}>
        <Text fontSize="md" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="xs" color={categoryColor} fontWeight="medium" textTransform="uppercase">
          {category}
        </Text>
      </VStack>
      <Icon as={ChevronRightIcon} color="gray.400" />
    </HStack>
  );
};
