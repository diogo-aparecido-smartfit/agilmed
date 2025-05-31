import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    full_name: string;
    email: string;
    role: string;
  };
}

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "object") {
      req.user = {
        id: decoded.id,
        full_name: decoded.full_name,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
    return;
  }
}

export function isDoctor(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "doctor") {
    return res.status(403).json({
      message:
        "Acesso não autorizado. Apenas médicos podem acessar este recurso.",
    });
  }
  next();
}

export function isPatient(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "patient") {
    return res.status(403).json({
      message:
        "Acesso não autorizado. Apenas pacientes podem acessar este recurso.",
    });
  }
  next();
}

export function isAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}
