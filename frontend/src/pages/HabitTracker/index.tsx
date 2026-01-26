import { Container, VStack, Text, Grid, Button, HStack, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SingleHabit } from './SingleHabit';
import {  getHabits } from '../../services/habitService';
import { AddIcon } from '@chakra-ui/icons';
import { CreateHabitModal } from './CreateHabitModal';
import { Habit } from '@/types';

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch habits');
      }
    };
    fetchHabits();
  }, []);

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <VStack spacing={2} align="stretch">
              <Text fontSize="2xl" fontWeight="bold">
                Habit Tracker
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Build consistency! Win the day!
              </Text>
            </VStack>
            <Button onClick={onOpen} leftIcon={<AddIcon />}>
              Create Habit
            </Button>
            <CreateHabitModal isOpen={isOpen} onClose={onClose} onCreated={(habit: Habit) => setHabits([...habits, habit])} />
          </HStack>

          {error && (
            <Text color="red.500" bg="red.50" p={4} borderRadius="md">
              Error: {error}
              <br />
              <Text fontSize="sm" mt={2}>
                Check browser console for details. This is likely a Row Level Security (RLS) policy issue in Supabase.
              </Text>
            </Text>
          )}

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {habits.length === 0 && !error && (
              <Text color="gray.500">No habits yet. Create one to get started!</Text>
            )}
            {habits.map((habit) => (
              <SingleHabit key={habit.id} habit={habit} />
            ))}
          </Grid>
        </VStack>
      </Container>
    </>
  );
};
