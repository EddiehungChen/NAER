import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './components/Layout';

// Mock Pages
import Login from './pages/Login';
import SystemManagement from './pages/SystemManagement';
import ClassManagement from './pages/ClassManagement';
import ExamBuilder from './pages/ExamBuilder';
import GradingResults from './pages/GradingResults';
import StudentDashboard from './pages/StudentDashboard';
import ExamTaking from './pages/ExamTaking';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

// Fallback component for undefined pages during development
const Placeholder = ({ title }) => <div className="p-8"><h1 className="text-2xl font-bold">{title} Page (Under Construction)</h1></div>;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            
            <Route path="system" element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <SystemManagement />
              </ProtectedRoute>
            } />
            
            <Route path="classes" element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ClassManagement />
              </ProtectedRoute>
            } />
            
            <Route path="exams" element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <ExamBuilder />
              </ProtectedRoute>
            } />
            
            <Route path="grading" element={
              <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                <GradingResults />
              </ProtectedRoute>
            } />

            <Route path="dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="exam/:id" element={
              <ProtectedRoute allowedRoles={['student']}>
                <ExamTaking />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
