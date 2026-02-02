import { Container, VStack, Text, Grid, Button, HStack, useDisclosure, Spinner, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SingleHabit } from './SingleHabit';
import { useGetHabits } from '../../services/habitService';
import { AddIcon } from '@chakra-ui/icons';
import { CreateHabitModal } from './CreateHabitModal';

export const HabitTracker = () => {
  const { habits, error, loading, execute } = useGetHabits();

  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    execute();
  }, [execute]);

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
            <CreateHabitModal isOpen={isOpen} onClose={onClose} onCreated={() => execute()} />
          </HStack>

          {error && (
            <Text color="red.500" bg="red.50" p={4} borderRadius="md">
              Error: {error}
            </Text>
          )}

          {loading ? (
            <Center py={8}>
              <Spinner size="xl" color="blue.500" />
            </Center>
          ) : (
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {habits.length === 0 && !error && (
                <Text color="gray.500">No habits yet. Create one to get started!</Text>
              )}
              {habits.map((habit) => (
                <SingleHabit key={habit.id} habit={habit} onDeleted={() => execute()} />
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </>
  );
};
