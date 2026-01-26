import { deleteHabit } from '../../services/habitService';
import { Habit, HabitCompletion } from '@/types';
import { VStack, Text, Card, HStack, IconButton, Icon } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';


type SingleHabitProps = {
  habit: Habit;
}

export const SingleHabit = ({ habit }: SingleHabitProps) => {


  const handleDeleteHabit = async () => {
    await deleteHabit(habit.id);
  };
  return (
    <Card bgColor="white" borderRadius="lg" p={4} boxShadow="md" border="1px solid #e2e8f0">
      <VStack spacing={2} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            {habit.label.toUpperCase()}
          </Text>

          <IconButton bgColor="gray.200" size="sm" aria-label="Delete Habit" icon={<Icon as={BsThreeDotsVertical as any} />} onClick={handleDeleteHabit} />
        </HStack>
        <Text fontSize="md" color="gray.500" fontWeight="bold">
          Weekly Target: {habit.weekly_target}
        </Text>
      </VStack>
    </Card>
  );
};
