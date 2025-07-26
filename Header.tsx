// src/components/layout/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToIndex: Record<'/' | '/detailed', number> = {
    '/': 0,
    '/detailed': 1,
  };
  const indexToPath = Object.keys(pathToIndex) as Array<'/' | '/exectuive' | '/detailed'>;

  const [value, setValue] = React.useState(pathToIndex[location.pathname as '/' | '/detailed'] || 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(indexToPath[newValue]);
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Z-Dashboard
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
          sx={{
            ml: "auto", // Align Tabs to the right
            "& .MuiTab-root": {
              color: "#ffffff !important",
            },
            "& .Mui-selected": {
              color: "#ffffff !important",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          <Tab label="Home" {...a11yProps(0)} />
          {/* <Tab label="Summary" {...a11yProps(1)} /> */}
          <Tab label="Summary" {...a11yProps(1)} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
