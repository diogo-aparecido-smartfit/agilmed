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
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const user = await this.userService.getUserById(Number(req.params.id));
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
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
      } catch (error) {
        res.status(500).json({
          message: "Erro ao atualizar usuário",
          error: error,
        });
        console.error(error);
      }
    });
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    await this.userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  }

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
