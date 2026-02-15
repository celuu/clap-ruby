import React from 'react';
import './styles/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './config/theme';

import { Dashboard } from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HabitTracker } from './pages/HabitTracker';
import { AppLayout } from './components/AppLayout';
import { HighLow } from './pages/HighLow';
import { LoginPage } from './pages/Login';
import { Kanban } from './pages/Kanban';
import { HIITTimer } from './pages/HIITTimer';
import { Timer } from './pages/HIITTimer/Timer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/play-timer" element={<Timer />}/>

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habit-tracker" element={<HabitTracker />} />
            <Route path="/high-low" element={<HighLow />} />
            <Route path="kanban" element={<Kanban />} />
            <Route path="timer" element={<HIITTimer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
