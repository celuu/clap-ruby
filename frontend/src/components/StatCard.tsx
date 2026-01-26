import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconColor?: string;
}

export const StatCard = ({ label, value, icon, iconColor = 'brand.500' }: StatCardProps) => {
  return (
    <Card hover>
      <HStack justify="space-between" align="center">
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium">
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </VStack>
        <Box fontSize="2xl" color={iconColor}>
          {icon}
        </Box>
      </HStack>
    </Card>
  );
};
