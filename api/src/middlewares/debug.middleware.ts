import { Request, Response, NextFunction } from "express";

export const debugMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;

  res.json = function (body) {
    const truncatedBody = JSON.stringify(body).substring(0, 500);
    console.log(
      `🔍 Debug - Resposta: ${truncatedBody}${
        truncatedBody.length >= 500 ? "..." : ""
      }`
    );

    return originalJson.call(this, body);
  };

  console.log(`🔍 Debug - Requisição [${req.method}] ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    const truncatedBody = JSON.stringify(req.body).substring(0, 500);
    console.log(
      `🔍 Debug - Corpo: ${truncatedBody}${
        truncatedBody.length >= 500 ? "..." : ""
      }`
    );
  }

  next();
};
