import "./config/redis";
import { App } from "./config/server";

const app = new App();
app.start();
