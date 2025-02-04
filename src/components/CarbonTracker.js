import React from "react";
import { Tabs, Tab, Box, Typography, Fade } from "@mui/material";
import { MapPin, Leaf, Star } from "lucide-react";

function TabPanel({ children, value, index }) {
  return (
    <Fade in={value === index} timeout={500}>
      <div hidden={value !== index}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </Fade>
  );
}

export default function CarbonTracker() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab icon={<MapPin />} label="Travel" />
        <Tab icon={<Leaf />} label="Energy" />
        <Tab icon={<Star />} label="Lifestyle" />
      </Tabs>

      {/* Travel Tab */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6">Travel</Typography>
        {/* Add input fields */}
      </TabPanel>

      {/* Energy Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6">Energy</Typography>
        {/* Add input fields */}
      </TabPanel>

      {/* Lifestyle Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6">Lifestyle</Typography>
        {/* Add input fields */}
      </TabPanel>
    </Box>
  );
}
