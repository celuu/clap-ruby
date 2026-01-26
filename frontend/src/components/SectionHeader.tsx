import { HStack, Text, Icon, Button } from '@chakra-ui/react';

interface SectionHeaderProps {
  icon: any;
  title: string;
  iconColor?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const SectionHeader = ({
  icon,
  title,
  iconColor = 'blue.500',
  action,
}: SectionHeaderProps) => {
  return (
    <HStack justify="space-between" align="center" mb={4}>
      <HStack spacing={3}>
        <Icon as={icon} boxSize={6} color={iconColor} />
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </HStack>
      {action && (
        <Button variant="ghost" size="sm" color="brand.500" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </HStack>
  );
};
