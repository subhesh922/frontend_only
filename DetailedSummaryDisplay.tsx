import React from "react";
import {
  Box,
  Typography,
  Card,
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Button,
} from "@mui/material";
import ExecutiveSummary from "./ExecutiveSummary";
import VisualizationDisplay from "./VisualizationDisplay";
import { useAnalysis } from "../../hooks/useAnalysis";
import { updateBriefSummary } from "../../features/analysis/analysisSlice";
import EvaluationDisplay from "./EvaluationDisplay";
import Metrics from "./Metrics";
import ReactMarkdown from "react-markdown";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ChartDisplay from "./ChartDisplay";

const DetailedSummary: React.FC = () => {
  const { data, loading, error } = useAnalysis();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!data) {
    return <Typography>No data available.</Typography>;
  }

  const summary = data.brief_summary;
  const evaluationData = data.evaluation;
  const metrics = data.report;
  const chartData = data.visualization_json;

  const downloadPageAsPdf = async () => {
    const input = document.body;

    const canvas = await html2canvas(input, { scale: 2});
    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = canvas.width / 2;
    const pdfHeight = canvas.height / 2;

    const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    pdf.save('page.pdf');
  };


  return (
    <Box sx={{ p: 3 }}>
      <Button disableRipple onClick={downloadPageAsPdf}>Download PDF</Button>
      <ExecutiveSummary summary={summary}></ExecutiveSummary>
      <Card sx={{ margin: "1%" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Trend Analysis
          </Typography>
          {/* {JSON.stringify(chartData)} */}
          <ChartDisplay chartData={chartData} />
        </Box>
      </Card>
      <Metrics report={metrics}></Metrics>

      {/* <EvaluationDisplay evaluation={evaluationData}></EvaluationDisplay> */} 
    </Box>
  );
};

export default DetailedSummary;




// const chartData = {
//     "charts": [
//         {
//             "type": "bar",
//             "data": {
//                 "labels": ["45.1.15.0", "45.1.16.0", "45.1.17.0"],
//                 "datasets": [
//                     {
//                         "label": "Release Epics Total",
//                         "data": [11, 11, 19],
//                         "borderColor": "#36A2EB",
//                         "backgroundColor": "rgba(54, 162, 235, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Release Epics Open",
//                         "data": [0, 0, 0],
//                         "borderColor": "#FF6384",
//                         "backgroundColor": "rgba(255, 99, 132, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Release PIRs Total",
//                         "data": [0, 93, 108],
//                         "borderColor": "#4BC0C0",
//                         "backgroundColor": "rgba(75, 192, 192, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Release PIRs Open",
//                         "data": [0, 0, 0],
//                         "borderColor": "#FFCE56",
//                         "backgroundColor": "rgba(255, 206, 86, 0.2)",
//                         "fill": false
//                     }
//                 ]
//             },
//             "options": {
//                 "responsive": true,
//                 "plugins": {
//                     "legend": {
//                         "position": "top"
//                     },
//                     "title": {
//                         "display": true,
//                         "text": "Release Epics and PIRs"
//                     },
//                     "colors": {
//                         "forceOverride": true
//                     }
//                 },
//                 "scales": {
//                     "x": {
//                         "beginAtZero": true
//                     },
//                     "y": {
//                         "beginAtZero": true,
//                         "max": 120
//                     }
//                 }
//             }
//         },
//         {
//             "type": "line",
//             "data": {
//                 "labels": ["45.1.15.0", "45.1.16.0", "45.1.17.0"],
//                 "datasets": [
//                     {
//                         "label": "SFDC Defects Fixed ATLs",
//                         "data": [83, 88, 100],
//                         "borderColor": "#36A2EB",
//                         "backgroundColor": "rgba(54, 162, 235, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "SFDC Defects Fixed BTLs",
//                         "data": [26, 41, 26],
//                         "borderColor": "#FF6384",
//                         "backgroundColor": "rgba(255, 99, 132, 0.2)",
//                         "fill": false
//                     }
//                 ]
//             },
//             "options": {
//                 "responsive": true,
//                 "plugins": {
//                     "legend": {
//                         "position": "top"
//                     },
//                     "title": {
//                         "display": true,
//                         "text": "SFDC Defects Fixed"
//                     },
//                     "colors": {
//                         "forceOverride": true
//                     }
//                 },
//                 "scales": {
//                     "x": {
//                         "beginAtZero": true
//                     },
//                     "y": {
//                         "beginAtZero": true,
//                         "max": 120
//                     }
//                 }
//             }
//         },
//         {
//             "type": "bar",
//             "data": {
//                 "labels": ["45.1.15.0", "45.1.16.0", "45.1.17.0"],
//                 "datasets": [
//                     {
//                         "label": "System Test Metrics Total",
//                         "data": [287, 1017, 1250],
//                         "borderColor": "#36A2EB",
//                         "backgroundColor": "rgba(54, 162, 235, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "System Test Metrics Open",
//                         "data": [1, 2, 8],
//                         "borderColor": "#FF6384",
//                         "backgroundColor": "rgba(255, 99, 132, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Security Test Metrics Total",
//                         "data": [0, 0, 20],
//                         "borderColor": "#4BC0C0",
//                         "backgroundColor": "rgba(75, 192, 192, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Performance Test Metrics Total",
//                         "data": [0, 0, 12],
//                         "borderColor": "#FFCE56",
//                         "backgroundColor": "rgba(255, 206, 86, 0.2)",
//                         "fill": false
//                     }
//                 ]
//             },
//             "options": {
//                 "responsive": true,
//                 "plugins": {
//                     "legend": {
//                         "position": "top"
//                     },
//                     "title": {
//                         "display": true,
//                         "text": "System, Security and Performance Test Metrics"
//                     },
//                     "colors": {
//                         "forceOverride": true
//                     }
//                 },
//                 "scales": {
//                     "x": {
//                         "beginAtZero": true
//                     },
//                     "y": {
//                         "beginAtZero": true,
//                         "max": 1300
//                     }
//                 }
//             }
//         },
//         {
//             "type": "line",
//             "data": {
//                 "labels": ["45.1.15.0", "45.1.16.0", "45.1.17.0"],
//                 "datasets": [
//                     {
//                         "label": "Delivery Against Requirements Value",
//                         "data": [100, null, 100],
//                         "borderColor": "#36A2EB",
//                         "backgroundColor": "rgba(54, 162, 235, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "System Test Coverage Value",
//                         "data": [90, 96, 90],
//                         "borderColor": "#FF6384",
//                         "backgroundColor": "rgba(255, 99, 132, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "System Test Pass Rate Value",
//                         "data": [93, 92, 93],
//                         "borderColor": "#4BC0C0",
//                         "backgroundColor": "rgba(75, 192, 192, 0.2)",
//                         "fill": false
//                     }
//                 ]
//             },
//             "options": {
//                 "responsive": true,
//                 "plugins": {
//                     "legend": {
//                         "position": "top"
//                     },
//                     "title": {
//                         "display": true,
//                         "text": "Delivery, Test Coverage and Pass Rate"
//                     },
//                     "colors": {
//                         "forceOverride": true
//                     }
//                 },
//                 "scales": {
//                     "x": {
//                         "beginAtZero": true
//                     },
//                     "y": {
//                         "beginAtZero": true,
//                         "max": 110
//                     }
//                 }
//             }
//         },
//         {
//             "type": "line",
//             "data": {
//                 "labels": ["45.1.15.0", "45.1.16.0", "45.1.17.0"],
//                 "datasets": [
//                     {
//                         "label": "Unit Test Coverage Previous",
//                         "data": [20, 25, 20],
//                         "borderColor": "#36A2EB",
//                         "backgroundColor": "rgba(54, 162, 235, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Unit Test Coverage Current",
//                         "data": [25, 40, 25],
//                         "borderColor": "#FF6384",
//                         "backgroundColor": "rgba(255, 99, 132, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Automation Test Coverage Previous",
//                         "data": [50, 50, 50],
//                         "borderColor": "#4BC0C0",
//                         "backgroundColor": "rgba(75, 192, 192, 0.2)",
//                         "fill": false
//                     },
//                     {
//                         "label": "Automation Test Coverage Current",
//                         "data": [50, 60, 50],
//                         "borderColor": "#FFCE56",
//                         "backgroundColor": "rgba(255, 206, 86, 0.2)",
//                         "fill": false
//                     }
//                 ]
//             },
//             "options": {
//                 "responsive": true,
//                 "plugins": {
//                     "legend": {
//                         "position": "top"
//                     },
//                     "title": {
//                         "display": true,
//                         "text": "Unit and Automation Test Coverage"
//                     },
//                     "colors": {
//                         "forceOverride": true
//                     }
//                 },
//                 "scales": {
//                     "x": {
//                         "beginAtZero": true
//                     },
//                     "y": {
//                         "beginAtZero": true,
//                         "max": 70
//                     }
//                 }
//             }
//         }
//     ]
// }
