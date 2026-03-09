import { HStack, Text, Checkbox, Icon, useToast } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useCreateHabitCompletion } from '../services/habitService';
import { Habit } from '@/types';

interface HabitItemProps {
  habit: Habit;
  isDisabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const HabitItem = ({
  habit,
  isDisabled = false,
  onChange,
}: HabitItemProps) => {
  const { habitCompletion, error, loading, execute } = useCreateHabitCompletion();
const toast = useToast();
  const handleCreateHabitCompletion = async (habit_id: string) => {
    try {
      await execute({ habit_id: habit_id });
      if (habitCompletion) {
        toast({
          title: 'Success',
          description: 'Habit completion created successfully!',
          status: 'success',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Failed to create habit completion',
        status: 'error',
      });
  }
}
  return (
    <HStack
      w="full"
      py={3}
      px={4}
      spacing={4}
      borderRadius="lg"
      bg={habit.is_completed ? 'gray.50' : 'transparent'}
      opacity={isDisabled ? 0.5 : 1}
      transition="all 0.2s"
    >
      {habit.is_completed ? (
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
          isChecked={habit.is_completed}
          isDisabled={isDisabled}
          onChange={(e) => handleCreateHabitCompletion(habit.id)}
          colorScheme="green"
          size="lg"
          />
        )}
      <Text
        fontSize="md"
        fontWeight="medium"
        color={isDisabled ? 'gray.400' : 'gray.800'}
        textDecoration={habit.is_completed ? 'line-through' : 'none'}
        flex={1}
      >
        {habit.label}
      </Text>
    </HStack>
  );
};
