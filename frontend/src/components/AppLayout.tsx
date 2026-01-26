import { Box, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { CalendarIcon } from '@chakra-ui/icons';
import { Sidebar } from './Sidebar';
import { Layout } from './Layout';
import { Header } from './Header';
import { getCurrentUser } from '../services/loginService';
import { getProfile } from '../services/userService';

// Custom icons
const TargetIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
  </Icon>
);

const BookIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.59 22.5,21.59C22.75,21.59 23,21.34 23,21.09V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,19.15 12,20V6.5C10.55,5.4 8.45,5 6.5,5Z" />
  </Icon>
);

const DumbbellIcon = () => (
  <Icon viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z" />
  </Icon>
);

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          navigate('/login');
        } else {
          const profile = await getProfile();
          setIsAuthenticated(true)
          if (!profile) {
            setUserName("girlie")
          } else {
            setUserName(profile.first_name);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);


  if (isAuthenticated === null) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {/* Sidebar - appears on all pages */}
      <Sidebar>
        <Sidebar.NavItem
          icon={CalendarIcon}
          label="Dashboard"
          isActive={location.pathname === '/dashboard'}
          onClick={() => navigate('/dashboard')}
        />
        <Sidebar.NavItem
          icon={TargetIcon}
          label="Habit Tracker"
          isActive={location.pathname === '/habit-tracker'}
          onClick={() => navigate('/habit-tracker')}
        />
        <Sidebar.NavItem
          icon={BookIcon}
          label="Daily High Low"
          isActive={location.pathname === '/high-low'}
          onClick={() => navigate('/high-low')}
        />
        {/* <Sidebar.NavItem
          icon={CalendarIcon}
          label="Daily Schedule"
          isActive={location.pathname === '/schedule'}
          onClick={() => navigate('/schedule')}
        />
        <Sidebar.NavItem
          icon={DumbbellIcon}
          label="Workout Plans"
          isActive={location.pathname === '/workouts'}
          onClick={() => navigate('/workouts')}
        /> */}
      </Sidebar>

      {/* Main Content - with Layout spacing */}
      <Layout>
        <Header userName={userName}  />
        <Outlet />
      </Layout>
    </Box>
  );
};
