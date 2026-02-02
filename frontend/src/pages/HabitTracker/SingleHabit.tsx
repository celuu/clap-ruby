import { useCreateHabitCompletion, useDeleteHabit } from '../../services/habitService';
import { Habit, HabitCompletion } from '@/types';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { VStack, Text, Card, HStack, IconButton, useToast, Checkbox } from '@chakra-ui/react';

type SingleHabitProps = {
  habit: Habit;
  onDeleted?: () => void;
}

export const SingleHabit = ({ habit, onDeleted }: SingleHabitProps) => {
  const { execute, error, loading } = useDeleteHabit();
  const {execute: createHabitCompletion, error: habitCompletionError, loading: habitCompletionLoading} = useCreateHabitCompletion();
  const toast = useToast();

  const handleDeleteHabit = async () => {
    try {
      await execute(habit.id);
      toast({
        title: 'Success',
        description: 'Habit deleted successfully!',
        status: 'success',
      });
      onDeleted?.();
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Failed to delete habit',
        status: 'error',
      });
    }
  };

  const handleCompleteHabit = async () => {
    try {
      await createHabitCompletion({habit_id: habit.id})
          toast({
        title: 'Success',
        description: 'Habit deleted successfully!',
        status: 'success',
      });
      onDeleted?.();
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Failed to delete habit',
        status: 'error',
      });
    }

  
  }
  return (
    <Card bgColor="white" borderRadius="lg" p={4} boxShadow="md" border="1px solid #e2e8f0" _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}>
      <VStack spacing={2} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            {habit.label.toUpperCase()}
          </Text>
          <HStack>
            <Checkbox isChecked={habit.is_completed} onChange={handleCompleteHabit} />

          <IconButton bgColor="gray.200" size="sm" aria-label="Delete Habit" icon={<SmallCloseIcon />} onClick={handleDeleteHabit} />
          </HStack>
        </HStack>
        <Text fontSize="md" color="gray.500" fontWeight="bold">
          Weekly Target: {habit.weekly_target}
        </Text>
      </VStack>
    </Card>
  );
};
