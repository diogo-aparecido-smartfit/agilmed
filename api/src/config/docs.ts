import swaggerJSDoc from "swagger-jsdoc";
import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "../swagger/swaggerDef";
import { apiReference } from "@scalar/express-api-reference";

const options: swaggerJSDoc.Options = {
  definition: swaggerOptions,
  apis: ["./src/routes/*.ts", "./swagger/swaggerDef.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupScalar(app: Application) {
  app.get("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use(
    "/docs",
    apiReference({
      spec: swaggerSpec,
      title: "AgilMed API Reference",
      url: "/openapi.json",
      theme: {
        colorPrimary: "#3178C6",
        colorSecondary: "#4b6878",
      },
    })
  );
}
