import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme
import theme from './theme';

// Layout components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import EventsListPage from './pages/events/EventsListPage';
import EventDetailsPage from './pages/events/EventDetailsPage';
import EventCreatePage from './pages/events/EventCreatePage';
import EventEditPage from './pages/events/EventEditPage';
import RegistrationsPage from './pages/registrations/RegistrationsPage';
import QueueManagementPage from './pages/queue/QueueManagementPage';
import AttendeeQueuePage from './pages/queue/AttendeeQueuePage';
import PhotosPage from './pages/photos/PhotosPage';
import MerchandisePage from './pages/merchandise/MerchandisePage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Redux
import { useAppSelector } from './hooks/redux';
import { selectIsAuthenticated } from './redux/slices/authSlice';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
          <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Events */}
              <Route path="/events" element={<EventsListPage />} />
              <Route path="/events/create" element={<EventCreatePage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/events/:id/edit" element={<EventEditPage />} />
              
              {/* Registrations */}
              <Route path="/registrations" element={<RegistrationsPage />} />
              
              {/* Queue */}
              <Route path="/queue/:eventId" element={<QueueManagementPage />} />
              <Route path="/attendee-queue/:registrationId" element={<AttendeeQueuePage />} />
              
              {/* Photos */}
              <Route path="/photos/:eventId" element={<PhotosPage />} />
              
              {/* Merchandise */}
              <Route path="/merchandise/:eventId" element={<MerchandisePage />} />
              
              {/* Profile */}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          
          {/* Not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;