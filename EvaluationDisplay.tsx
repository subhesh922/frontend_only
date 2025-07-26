import {
  Card,
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";

interface Evalutation {
  evaluation: {
    data_accuracy: number;
    analysis_depth: number;
    clarity: number;
    total: number;
    text: string;
  };
}

const EvaluationDisplay: React.FC<Evalutation> = ({ evaluation }) => {
  if (evaluation !== null) {
    return (
      <Card sx={{ margin: "1%" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Evaluation
          </Typography>
          <TableContainer component={Box} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Criteria</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">Max</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Data Accuracy
                  </TableCell>
                  <TableCell align="right">
                    {evaluation.data_accuracy}
                  </TableCell>
                  <TableCell align="right">50</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Analysis Depth
                  </TableCell>
                  <TableCell align="right">
                    {evaluation.analysis_depth}
                  </TableCell>
                  <TableCell align="right">30</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Clarity
                  </TableCell>
                  <TableCell align="right">{evaluation.clarity}</TableCell>
                  <TableCell align="right">20</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {evaluation.total}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    100
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography sx={{ mt: 2 }}>
            {evaluation.text || "No additional evaluation notes available."}
          </Typography>
        </Box>
      </Card>
    );
  }
  return null;
};

export default EvaluationDisplay;
