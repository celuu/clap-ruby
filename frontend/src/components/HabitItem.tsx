import { HStack, Text, Checkbox, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface HabitItemProps {
  label: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const HabitItem = ({
  label,
  isCompleted = false,
  isDisabled = false,
  onChange,
}: HabitItemProps) => {
  return (
    <HStack
      w="full"
      py={3}
      px={4}
      spacing={4}
      borderRadius="lg"
      bg={isCompleted ? 'gray.50' : 'transparent'}
      opacity={isDisabled ? 0.5 : 1}
      transition="all 0.2s"
    >
      {isCompleted ? (
        <HStack
          bg="green.500"
          borderRadius="md"
          p={1}
          minW="24px"
          minH="24px"
          justify="center"
          align="center"
        >
          <Icon as={CheckIcon} color="white" boxSize={3} />
        </HStack>
      ) : (
        <Checkbox
          isChecked={isCompleted}
          isDisabled={isDisabled}
          onChange={(e) => onChange?.(e.target.checked)}
          colorScheme="green"
          size="lg"
        />
      )}
      <Text
        fontSize="md"
        fontWeight="medium"
        color={isDisabled ? 'gray.400' : 'gray.800'}
        textDecoration={isCompleted ? 'line-through' : 'none'}
        flex={1}
      >
        {label}
      </Text>
    </HStack>
  );
};
