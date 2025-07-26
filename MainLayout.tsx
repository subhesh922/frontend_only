import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Header />
      <Box sx={{ mt: { xs: 7, sm: 8 } }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
