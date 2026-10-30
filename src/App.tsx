import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { SpecialistProvider } from './store/SpecialistContext';
import { ThemeProvider } from './store/ThemeContext';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SpecialistProvider>
        <RouterProvider router={router} />
      </SpecialistProvider>
    </ThemeProvider>
  );
};

export default App;
