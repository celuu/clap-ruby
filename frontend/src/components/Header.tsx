import { Box, HStack, VStack, Text, Button, Icon, Badge, Tag } from '@chakra-ui/react';
import { AddIcon, SunIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { weatherService } from '../services/weatherService';
import { Profile, Weather } from '../types';
import { getWeatherIcon } from '../utils/weatherIcons'
import { getProfile } from '../services/userService';

type HeaderProps = {
  userName: string | null
}

export const Header = ({userName}: HeaderProps) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    weatherService.getCurrentWeather().then((data: Weather) => setWeather(data));
  }, []);

  const weatherIcon = getWeatherIcon(weather?.description || 'sunny');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const todayPST = new Date(today);
  todayPST.setHours(0, 0, 0, 0);

  const targetDate = new Date('2026-07-20T00:00:00-07:00'); // July 20, 2026 midnight PST

  const countDownToJuly20 = Math.ceil(
    (targetDate.getTime() - todayPST.getTime()) / (1000 * 60 * 60 * 24)
  );
  const startOfYear = new Date(todayPST.getFullYear(), 0, 1);
  const dayOfTheYear =
    Math.floor((todayPST.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Box w="full" bg="white" borderBottom="1px" borderColor="gray.200" px={8} py={6}>
      <HStack justify="space-between" align="center">
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="3xl" fontWeight="bold">
            {getGreeting()}, {userName}
          </Text>
          <Text fontSize="md" color="gray.500">
            {today} - {countDownToJuly20} days to July 20th - Day {dayOfTheYear} / 365 (
            {((dayOfTheYear / 365) * 100).toFixed(2)}% complete)
          </Text>
        </VStack>

        <HStack spacing={2}>
          <Tag
            bg="gray.50"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            px={4}
            py={2}
          >
            <VStack>
              <HStack spacing={2}>
                <Icon as={weatherIcon.icon} color={weatherIcon.color} boxSize={5} />
                <Text fontSize="md" color="gray.800" fontWeight="bold">
                  {weather?.temperature}°F
                </Text>
                <Text fontSize="md" color="gray.500">
                  {weather?.description}
                </Text>
              </HStack>
              <Text fontSize="xs" color="gray.500">
                Dublin, CA
              </Text>
            </VStack>
          </Tag>
          <Button
            leftIcon={<Icon as={AddIcon} />}
            colorScheme="brand"
            size="lg"
            px={8}
            borderRadius="xl"
          >
            Quick Log
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
