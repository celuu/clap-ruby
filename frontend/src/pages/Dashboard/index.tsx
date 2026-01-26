import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  Text,
  Icon,
  Textarea,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { StatCard } from '../../components/StatCard';
import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { ScheduleItem } from '../../components/ScheduleItem';
import { HabitItem } from '../../components/HabitItem';
import { getProfile } from '../../services/userService';
import { useEffect, useState } from 'react';
import { Profile } from '../../types';
import { UserModal } from '../Login/UserModal';

// Custom icons as components
const FireIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 2C12.5 2 9.5 5.5 9.5 9.5C9.5 11.71 11.29 13.5 13.5 13.5C15.71 13.5 17.5 11.71 17.5 9.5C17.5 7.5 15.5 4 15.5 4C16 6 16.5 6.5 16.5 8.5C16.5 10.16 15.16 11.5 13.5 11.5C11.84 11.5 10.5 10.16 10.5 8.5C10.5 6.5 12.5 2 12.5 2M11 17.5C11 18.88 9.88 20 8.5 20C7.12 20 6 18.88 6 17.5C6 16.5 7 15 7 15C7 15.5 7.5 16 8 16C8.55 16 9 15.55 9 15C9 14.5 8.5 13.5 8.5 13.5C10.21 14.5 11 15.71 11 17.5Z" />
  </Icon>
);

const ClockIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z" />
  </Icon>
);

const DumbbellIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z" />
  </Icon>
);

const BookIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.59 22.5,21.59C22.75,21.59 23,21.34 23,21.09V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V6.5C10.55,5.4 8.45,5 6.5,5Z" />
  </Icon>
);

const TargetIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
  </Icon>
);

export const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (!profile) {
          setProfile(null)
        } else {
          setProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
      {!profile && <UserModal isOpen={isOpen} onClose={onClose} />}

      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Top Stats Grid */}
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem>
              <StatCard
                label="Habit Streak"
                value="12 Days"
                icon={<FireIcon />}
                iconColor="orange.500"
              />
            </GridItem>
            <GridItem>
              <StatCard
                label="Next Event"
                value="10:00 AM"
                icon={<ClockIcon />}
                iconColor="blue.500"
              />
            </GridItem>
            <GridItem>
              <StatCard
                label="Workouts"
                value="4/5 week"
                icon={<DumbbellIcon />}
                iconColor="green.500"
              />
            </GridItem>
          </Grid>

          {/* Main Content Grid */}
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {/* Daily Schedule */}
            <GridItem>
              <Card>
                <SectionHeader
                  icon={CalendarIcon}
                  title="Daily Schedule"
                  iconColor="blue.500"
                  action={{
                    label: 'View All',
                    onClick: () => console.log('View all schedule'),
                  }}
                />
                <VStack spacing={0} align="stretch" divider={<Divider />}>
                  <ScheduleItem
                    time="08:00 AM"
                    title="Morning Routine"
                    category="HEALTH"
                    categoryColor="green.500"
                  />
                  <ScheduleItem
                    time="10:00 AM"
                    title="Deep Work Session"
                    category="WORK"
                    categoryColor="blue.500"
                  />
                  <ScheduleItem
                    time="01:00 PM"
                    title="Gym - Leg Day"
                    category="FITNESS"
                    categoryColor="orange.500"
                  />
                </VStack>
              </Card>
            </GridItem>

            {/* Habit Tracking */}
            <GridItem>
              <Card>
                <SectionHeader icon={TargetIcon} title="Habit Tracking" iconColor="green.500" />
                <Box mb={2}>
                  <Text fontSize="sm" color="gray.500" mb={4}>
                    60% Complete
                  </Text>
                </Box>
                <VStack spacing={2} align="stretch">
                  <HabitItem label="Meditate (10m)" isCompleted />
                  <HabitItem label="Read 20 Pages" isCompleted />
                  <HabitItem label="No Sugar" />
                  <HabitItem label="Hydrate 3L" />
                </VStack>
              </Card>
            </GridItem>

            {/* Workout Plan */}
            <GridItem>
              <Card>
                <SectionHeader icon={DumbbellIcon} title="Workout Plan" iconColor="orange.500" />
                <Box bg="gray.900" borderRadius="lg" p={6} color="white">
                  <Text fontSize="xs" fontWeight="semibold" color="gray.400" mb={2}>
                    TODAY'S WORKOUT
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Leg Day Power
                  </Text>
                </Box>
              </Card>
            </GridItem>

            {/* Daily Journal */}
            <GridItem>
              <Card>
                <SectionHeader icon={BookIcon} title="Daily Journal" iconColor="orange.400" />
                <Textarea
                  placeholder="What's on your mind today?"
                  size="lg"
                  minH="150px"
                  border="none"
                  p={0}
                  _focus={{ border: 'none', boxShadow: 'none' }}
                  _placeholder={{ color: 'gray.400' }}
                />
              </Card>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </>
  );
};
