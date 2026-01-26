import { SunIcon } from '@chakra-ui/icons';
import {
  FaCloudRain,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaBolt,
  FaSnowflake,
  FaSmog,
} from 'react-icons/fa';

export const getWeatherIcon = (description: string): { icon: any; color: string } => {
  const desc = description.toLowerCase();

  if (desc.includes('clear') || desc.includes('sunny')) {
    return { icon: SunIcon, color: 'orange.400' };
  }
  if (desc.includes('cloud')) {
    return { icon: FaCloudSun, color: 'gray.400' };
  }
  if (desc.includes('rain') || desc.includes('drizzle')) {
    return { icon: FaCloudRain, color: 'blue.400' };
  }
  if (desc.includes('thunder') || desc.includes('storm')) {
    return { icon: FaBolt, color: 'yellow.500' };
  }
  if (desc.includes('snow')) {
    return { icon: FaSnowflake, color: 'cyan.300' };
  }
  if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
    return { icon: FaSmog, color: 'gray.500' };
  }

  return { icon: SunIcon, color: 'orange.400' };
};
