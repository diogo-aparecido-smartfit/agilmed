import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../swagger/swaggerDef";

const options: swaggerJSDoc.Options = {
  definition: swaggerOptions,
  apis: ["./src/routes/*.ts", "./swagger/swaggerDef.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Application) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
