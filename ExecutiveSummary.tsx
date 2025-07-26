import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  Card,
  Typography,
} from "@mui/material";
import { Edit, Save, Cancel, Download } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from "react-redux";
import { updateBriefSummary } from "../../features/analysis/analysisSlice";

interface ReportDisplayProps {
  summary: string;
}

const ExecutiveSummary: React.FC<ReportDisplayProps> = ({ summary }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateBriefSummary(editedSummary));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  return (
    <Box>
      <Card sx={{ margin: "1%" }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Executive Summary
          </Typography>

          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
              {!isEditing ? (
                <Tooltip title="Edit Report">
                  <IconButton onClick={() => setIsEditing(true)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Tooltip title="Save Changes">
                    <IconButton onClick={handleSave}>
                      <Save />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton onClick={handleCancel}>
                      <Cancel />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>

            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={10}
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                variant="outlined"
              />
            ) : (
              
              <Typography style={{ whiteSpace: 'pre-wrap' }}>
                {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {summary}
                </ReactMarkdown> */}
                {summary}
              </Typography>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ExecutiveSummary;
