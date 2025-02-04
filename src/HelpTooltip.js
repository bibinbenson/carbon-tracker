import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { Info } from '@mui/icons-material';

const HelpTooltip = ({ content }) => (
  <Tooltip 
    title={content}
    arrow
    componentsProps={{
      tooltip: {
        sx: {
          bgcolor: 'primary.main',
          '& .MuiTooltip-arrow': { color: 'primary.main' },
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.875rem'
        }
      }
    }}
  >
    <IconButton size="small">
      <Info fontSize="small" sx={{ color: 'primary.main' }} />
    </IconButton>
  </Tooltip>
);

export default HelpTooltip;
