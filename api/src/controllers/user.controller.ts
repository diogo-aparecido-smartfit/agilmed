import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { upload } from "../middlewares/upload";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const user = await this.userService.createUser(data);

      const { password, ...userWithoutPassword } = user.toJSON();

      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      const { password, ...userWithoutPassword } = user.toJSON();

      res.json(userWithoutPassword);
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({
        message: "Erro ao buscar usuário",
        error: error.message,
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Erro ao enviar a imagem", error: err.message });
      }

      const { id } = req.params;
      const data = req.body;
      const file = req.file;

      try {
        const updatedUser = await this.userService.updateUser(
          Number(id),
          data,
          file
        );

        if (updatedUser) {
          return res.status(200).json(updatedUser);
        }

        res.status(404).json({ message: "Usuário não encontrado" });
      } catch (error: any) {
        res.status(500).json({
          message: "Erro ao atualizar usuário",
          error: error.message,
        });
        console.error(error);
      }
    });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.userService.deleteUser(Number(req.params.id));

      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({
        message: "Erro ao deletar usuário",
        error: error.message,
      });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const users = await this.userService.getAllUsers(filters);
      res.json(users);
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({
        message: "Erro ao listar usuários",
        error: error.message,
      });
    }
  }
}
