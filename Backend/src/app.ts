import express from "express";
import authRoutes from "./routes/auth.routes";
import consultationRoutes from "./routes/consultation.routes";
import userRoutes from "./routes/user.routes"
import cors from 'cors'
import path from "path";


const app = express();
app.use(express.json());

app.use(cors())

app.use('/uploads/', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use("/auth", authRoutes);
app.use("/consultations", consultationRoutes);
app.use("/user", userRoutes);

export default app;