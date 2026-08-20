import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generatePoseData, generateMultipleSessionPoses, analyzeFixPoseImage, INITIAL_LIBRARY_POSES } from '../src/services/aiPoseService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PoseMate Express API Server', version: '2.0.0' });
});

// Feature 1: AI Pose Generator Route
app.post('/api/poses/generate', (req, res) => {
  try {
    const inputs = req.body;
    const pose = generatePoseData(inputs);
    res.json({ success: true, data: pose });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate pose' });
  }
});

// Feature 17: Generate Multiple Poses (Full Photo Session)
app.post('/api/poses/session', (req, res) => {
  try {
    const { inputs, count } = req.body;
    const poses = generateMultipleSessionPoses(inputs, count || 10);
    res.json({ success: true, data: poses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to generate photo session' });
  }
});

// Feature 20: Pose Library Route
app.get('/api/poses/library', (req, res) => {
  res.json({ success: true, data: INITIAL_LIBRARY_POSES });
});

// Feature 21: Fix My Pose AI Analysis Route
app.post('/api/poses/fix-pose', (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image URL or base64 is required' });
    }
    const analysis = analyzeFixPoseImage(imageUrl);
    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to analyze pose image' });
  }
});

app.listen(PORT, () => {
  console.log(`PoseMate Express API backend running on http://localhost:${PORT}`);
});
