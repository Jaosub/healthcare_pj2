import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patients.js';
import authRoutes from './routes/auth.js';
import encountersRouter from './routes/encounters.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/login', authRoutes);
app.use('/api/encounters', encountersRouter);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
