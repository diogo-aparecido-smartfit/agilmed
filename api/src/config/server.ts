import express, { Application } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import chatbotRouter from "../routes/chatbot.routes";
import userRouter from "../routes/user.routes";
import authRouter from "../routes/auth.routes";
import { connectDB } from "./database";
import { setupSwagger } from "./swagger";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
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

    this.app.use("/api/chatbot", chatbotRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/auth", authRouter);

    setupSwagger(this.app);

    connectDB();
  }

  public start(): void {
    this.app.listen(3000, () => {
      console.log("🔥 Server running on http://localhost:3000");
    });
  }
}
