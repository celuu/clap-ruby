import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CardProps extends BoxProps {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({ children, hover = false, ...props }: CardProps) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="sm"
      p={6}
      transition="all 0.2s"
      _hover={hover ? { boxShadow: 'md', transform: 'translateY(-2px)' } : {}}
      {...props}
    >
      {children}
    </Box>
  );
};
