import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Card,
  Typography,
} from "@mui/material";

interface MetricsProps {
  report: {
    Overview: string;
    "Metrics Summary": {
      release_scope_metrics: {
        "Release Epics": Array<{
          version: string;
          total: number;
          open: number;
          trend: string;
        }>;
        "Release PIRs": Array<{
          version: string;
          total: number;
          open: number;
          trend: string;
        }>;
        "SFDC DEFECTS FIXED (ATLs)": Array<{
          version: string;
          value: number;
          trend: string;
        }>;
        "SFDC DEFECTS FIXED (BTLs)": Array<{
          version: string;
          value: number;
          trend: string;
        }>;
      };
      critical_metrics: {
        "System / Solution Test Metrics (ATL)": Array<{
          version: string;
          total: number;
          open: number;
          risk_status: string;
          comments: string;
          trend: string;
        }>;
        "System / Solution Test Metrics (BTL)": Array<{}>;
        "Security Test Metrics (ATL)": Array<{}>;
        "Security Test Metrics (BTL)": Array<{}>;
        "Performance / Load Test Metrics (ATL)": Array<{}>;
        "Performance / Load Test Metrics (BTL)": Array<{}>;
      };
      health_trends: Array<{
        version: string;
        metric: string;
        criteria: string;
        previous: string;
        current: string;
        status: string;
        summary: string;
      }>;
    };
    "Key findings": string;
    Recommendations: string;
  };
}

type ReleaseEpicAndPIRKeys = "Release Epics" | "Release PIRs";
type SFDCDefectsKeys =
  | "SFDC DEFECTS FIXED (ATLs)"
  | "SFDC DEFECTS FIXED (BTLs)";
type CriticalMetricsKeys =
  | "System / Solution Test Metrics (ATL)"
  | "System / Solution Test Metrics (BTL)"
  | "Security Test Metrics (ATL)"
  | "Security Test Metrics (BTL)"
  | "Performance / Load Test Metrics (ATL)"
  | "Performance / Load Test Metrics (BTL)";

const Metrics: React.FC<MetricsProps> = ({ report }) => {
  const renderTable = (data: Array<any>, title: string) => {
    if (data.length === 0) return null;

    const columns = Object.keys(data[0]);

    return (
      <TableContainer component={Box}>
        <Table aria-label={`${title.toLowerCase()} table`}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column}>{item[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  if (report !== null) {
    return (
      <Box>
        <Card sx={{ margin: "1%" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Metrics
            </Typography>
            <Typography sx={{ mt: 2,  whiteSpace: 'pre-wrap'  }}>
              {report["Overview"] || "No overview available."}
            </Typography>

            {(
              Object.keys(
                report["Metrics Summary"].release_scope_metrics
              ) as ReleaseEpicAndPIRKeys[]
            )
              .filter(
                (category) =>
                  category === "Release Epics" || category === "Release PIRs"
              )
              .map((category) => (
                <React.Fragment key={category}>
                  <h4>{category}</h4>
                  {renderTable(
                    report["Metrics Summary"].release_scope_metrics[category],
                    category
                  )}
                </React.Fragment>
              ))}

            {(
              Object.keys(
                report["Metrics Summary"].release_scope_metrics
              ) as SFDCDefectsKeys[]
            )
              .filter(
                (category) =>
                  category === "SFDC DEFECTS FIXED (ATLs)" ||
                  category === "SFDC DEFECTS FIXED (BTLs)"
              )
              .map((category) => (
                <React.Fragment key={category}>
                  <h4>{category}</h4>
                  {renderTable(
                    report["Metrics Summary"].release_scope_metrics[category],
                    category
                  )}
                </React.Fragment>
              ))}

            {(
              Object.keys(
                report["Metrics Summary"].critical_metrics
              ) as CriticalMetricsKeys[]
            ).map((category) => (
              <React.Fragment key={category}>
                <h4>{category}</h4>
                {renderTable(
                  report["Metrics Summary"].critical_metrics[category],
                  category
                )}
              </React.Fragment>
            ))}

            <h4>Health Trends</h4>
            {renderTable(
              report["Metrics Summary"].health_trends,
              "Health Trends"
            )}
          </Box>
        </Card>
        <Card sx={{ margin: "1%" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Key Findings
            </Typography>
            <Typography>{report["Key findings"]}</Typography>
          </Box>
        </Card>

        <Card sx={{ margin: "1%" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Recommendations
            </Typography>
            <Typography>{report.Recommendations}</Typography>
          </Box>
        </Card>
      </Box>
    );
  }
  return null;
};

export default Metrics;
