import { Container, VStack, HStack, Text, Grid, Box, FormControl, FormLabel, Input, Textarea, Center, Button, Card, useToast } from '@chakra-ui/react';
import { useState, useMemo, useEffect } from "react";
import Calendar from 'react-calendar';
import './calendar.css';
import { useForm } from "react-hook-form";
import { upsertHighLow, getHighLowByDate } from '../../services/highLowService';

  type HighLowFormData = {
    high_content: string;
    low_content: string;
  }

export const HighLow = () => {
    const toast = useToast();
    const [dateSelected, setDateSelected] = useState<Date>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, reset, watch} = useForm<HighLowFormData>({
      defaultValues: {
        high_content: '',
        low_content: '',
      }
    });

    const formData = watch();

  const highPlaceholders = [
    "What made you happy today?",
    "What went well today?",
    "What did you achieve today?",
    "What did you learn today?",
    "What did you discover today?",
    "What did you create today?",
    "What did you build today?",
  ];

  const lowPlaceholders = [
    "What could have been better today?",
    "What made you frustrated today?",
    "What made you stressed today?",
    "What was challenging today?",
    "What was difficult today?",
  ];

  const todayKey = new Date().toISOString().split('T')[0];
  
  const getDailyPlaceholder = (type: 'high' | 'low', placeholders: string[]) => {
    const storageKey = `${type}Placeholder_${todayKey}`;
    const stored = localStorage.getItem(storageKey);
    
    if (stored) {
      return stored;
    }
    
    const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    localStorage.setItem(storageKey, randomPlaceholder);
    return randomPlaceholder;
  };

  const randomHighPlaceholder = useMemo(() => getDailyPlaceholder('high', highPlaceholders), [todayKey]);
  const randomLowPlaceholder = useMemo(() => getDailyPlaceholder('low', lowPlaceholders), [todayKey]);
  
  useEffect(() => {
    const loadHighLow = async () => {
      try {
        const dateString = dateSelected.toISOString().split('T')[0];
        const existingEntry = await getHighLowByDate(dateString);
        
        if (existingEntry) {
          reset({
            high_content: existingEntry.high_content,
            low_content: existingEntry.low_content,
          });
        } else {
          reset({
            high_content: '',
            low_content: '',
          });
        }
      } catch (error: any) {
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        toast({
          title: 'Error loading entry',
          description: error.message || 'This might be an RLS policy issue. Check console for details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    
    loadHighLow();
  }, [dateSelected, reset, toast]);



  const onSubmit = async (data: HighLowFormData) => {
    setIsLoading(true);
    try {
      const dateString = dateSelected.toISOString().split('T')[0];
      await upsertHighLow({
        high_content: data.high_content,
        low_content: data.low_content,
        date: dateString
      });
      toast({
        title: 'Saved!',
        description: 'Your high and low have been saved.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving high/low:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your high and low.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onSubmit)();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleSubmit, onSubmit]);
  
  return (
    <>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <VStack spacing={2} align="stretch">
              <Text fontSize="2xl" fontWeight="bold">
                Daily High Low
              </Text>
              <Text fontSize="md" color="gray.500" fontWeight="bold">
                Reflect on one win and one challenge each day.
              </Text>
            </VStack>
          </HStack>
          <Card>
            <Center>
              <Calendar
                onChange={(date) => setDateSelected(date as Date)}
                value={dateSelected}
                tileDisabled={({ date, view }) => {
                  if (view !== 'month') return false;

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const tileDate = new Date(date);
                  tileDate.setHours(0, 0, 0, 0);

                  return tileDate > today;
                }}
              />
            </Center>
          </Card>
          <Card>
            <Text fontSize="2xl" fontWeight="bold">
              {dateSelected.toLocaleString('default', { month: 'long' })} {dateSelected.getDate()},{' '}
              {dateSelected.getFullYear()}
            </Text>
            <Text>{dateSelected.toLocaleDateString('en-US', { weekday: 'long' })}</Text>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: 30 }}>
              <HStack spacing={4}>
                <VStack spacing={2} width="50%">
                  <FormControl isInvalid={!!errors.high_content}>
                    <FormLabel>🌟 High of the day</FormLabel>
                    <Textarea
                      {...register('high_content', { required: true })}
                      height="100px"
                      placeholder={randomHighPlaceholder}
                      resize="none"
                    />
                  </FormControl>
                </VStack>
                <VStack spacing={2} width="50%">
                  <FormControl isInvalid={!!errors.low_content}>
                    <FormLabel>🌙 Low of the day</FormLabel>
                    <Textarea
                      {...register('low_content', { required: true })}
                      height="100px"
                      placeholder={randomLowPlaceholder}
                      resize="none"
                    />
                  </FormControl>
                </VStack>
              </HStack>
              <Button
                marginTop={8}
                width="100%"
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                loadingText="Saving..."
              >
                Save (Cmd + Enter)
              </Button>
            </form>
          </Card>
        </VStack>
      </Container>
    </>
  );
};