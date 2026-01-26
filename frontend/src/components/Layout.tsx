import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box ml="280px" minH="100vh" bg="gray.50">
      {children}
    </Box>
  );
};
