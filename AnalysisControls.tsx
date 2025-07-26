import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAnalysis } from "../../hooks/useAnalysis";

const AnalysisControls: React.FC = () => {
  const {
    selectedProduct,
    loading,
    error,
    data,
    handleProductChange,
    handleAnalyze,
  } = useAnalysis();

  return (
    <Box sx={{ p: 3 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Product</InputLabel>
        <Select
          value={selectedProduct}
          onChange={handleProductChange}
          label="Product"
        >
          <MenuItem value="TM">TM</MenuItem>
          <MenuItem value="WST">WST</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleAnalyze}
        disabled={loading}
        fullWidth
        sx={{ mb: 2 }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {error}
        </Typography>
      )}

      {!loading && !error && data && (
        <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
          Report generated successfully!
        </Typography>
      )}
    </Box>
  );
};

export default AnalysisControls;
