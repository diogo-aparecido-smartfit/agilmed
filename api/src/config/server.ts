import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter from "../routes/user.routes";
import authRouter from "../routes/auth.routes";
import { connectDB } from "./database";
import { setupSwagger } from "./swagger";
import appointmentRouter from "../routes/appointment.routes";
import chatRouter from "../routes/chat.routes";
import patientRouter from "../routes/patient.routes";
import doctorRouter from "../routes/doctor.routes";
import medicalCentersRouter from "../routes/medical-centers.routes";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config(): Promise<void> {
    this.app.use(bodyParser.json());
    this.app.use(
      morgan((tokens, req, res) => {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ].join(" ");
      })
    );

    this.app.use("/api/medical-centers", medicalCentersRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/patients", patientRouter);
    this.app.use("/api/doctors", doctorRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/appointments", appointmentRouter);
    this.app.use("/api/chat", chatRouter);

    setupSwagger(this.app);
  }

  public async start(): Promise<void> {
    await connectDB();
    const PORT = Number(process.env.PORT) || 3000;

    this.app.listen(PORT, "0.0.0.0", () => {
      console.log(`🔥 Server running on http://0.0.0.0:${PORT}`);
    });
  }
}
