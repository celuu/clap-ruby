import { getProfile } from '../services/userService';
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';

interface NavItemProps {
  icon: any;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, isActive = false, onClick }: NavItemProps) => {
  const activeBg = useColorModeValue('brand.50', 'brand.900');
  const activeColor = useColorModeValue('brand.500', 'brand.200');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <HStack
      w="full"
      px={4}
      py={3}
      borderRadius="lg"
      cursor="pointer"
      bg={isActive ? activeBg : 'transparent'}
      color={isActive ? activeColor : 'gray.600'}
      _hover={{ bg: isActive ? activeBg : hoverBg }}
      transition="all 0.2s"
      onClick={onClick}
    >
      <Icon as={icon} boxSize={5} />
      <Text fontWeight={isActive ? 'semibold' : 'medium'} fontSize="md">
        {label}
      </Text>
    </HStack>
  );
};

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if(!profile) {
          setUserName("girlie")
        } else {
          setUserName(profile.first_name)
        }
   
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <Box
      w="280px"
      h="100vh"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      position="fixed"
      left={0}
      top={0}
      overflowY="auto"
    >
      <VStack spacing={6} align="stretch" p={6} h="full">
        {/* Logo */}
        <HStack spacing={3} mb={4}>
          <Box bg="brand.500" borderRadius="lg" p={2}>
            <Icon viewBox="0 0 24 24" boxSize={6} color="white">
              <path
                fill="currentColor"
                d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
              />
            </Icon>
          </Box>
          <Text fontSize="2xl" fontWeight="bold">
            LifeOS
          </Text>
        </HStack>

        {/* Navigation */}
        <VStack spacing={2} align="stretch" flex={1}>
          {children}
        </VStack>

        <Divider />

        {/* User Profile */}
        <HStack spacing={3} cursor="pointer" p={2} borderRadius="lg" _hover={{ bg: 'gray.100' }}>
          <Avatar size="sm" name="Alex Johnson" bg="brand.500" />
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="sm" fontWeight="semibold">
              {userName}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Premium Member
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

Sidebar.NavItem = NavItem;
