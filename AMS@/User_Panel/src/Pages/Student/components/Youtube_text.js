import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function Youtube_text() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value
    
    );

  return (
    <Box sx={{ maxWidth: 900, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One"  />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
        <Tab label="Item Seven" />
      </Tabs>
    </Box>
  );
}
