import React from 'react';
import { Box } from '@mui/material';




// OLD VISUALIZATION DISPLAY FOR IMAGES - DEPRECATED



interface VisualizationDisplayProps {
  visualizations: string[]; // Array of base64 strings
}

const VisualizationDisplay: React.FC<VisualizationDisplayProps> = ({ visualizations }) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {visualizations.map((viz, index) => (
        <Box
          key={index}
          sx={{
            flex: "1 1 calc(25% - 16px)",
            maxWidth: "calc(25% - 16px)",
            mb: 2,
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            src={`data:image/png;base64,${viz}`}
            alt={`Visualization ${index + 1}`}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default VisualizationDisplay;
