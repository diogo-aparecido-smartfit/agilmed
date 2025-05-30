import { containerClient } from "../config/azure";
import { User, UserCreationAttributes } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { formatFileName } from "../utils";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: UserCreationAttributes) {
    return this.userRepository.createUser(data);
  }

  async getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmailOrCpf(identifier: string) {
    return this.userRepository.findByEmailOrCpf(identifier);
  }

  async updateUser(
    id: number,
    data: Partial<User>,
    file?: Express.Multer.File
  ) {
    try {
      if (file) {
        const user = await this.userRepository.getUserById(id);

        if (user?.profile_picture_url) {
          await this.deleteProfileImageFromAzure(user.profile_picture_url);
        }

        const profileImageUrl = await this.uploadProfileImageToAzure(file);
        data.profile_picture_url = profileImageUrl;
      }

      const updatedUser = await this.userRepository.updateUser(id, data);

      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser.toJSON();
        return userWithoutPassword;
      }

      return null;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.getUserById(id);

      if (user?.profile_picture_url) {
        await this.deleteProfileImageFromAzure(user.profile_picture_url);
      }

      return await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  }

  async getAllUsers(filters?: any) {
    const users = await this.userRepository.getAllUsers(filters);

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  }

  private async uploadProfileImageToAzure(
    file: Express.Multer.File
  ): Promise<string> {
    try {
      const fileName = `${new Date().toISOString()}-${formatFileName(
        file.originalname
      )}`;

      const blobClient = containerClient.getBlockBlobClient(fileName);

      await blobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });

      return blobClient.url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw new Error(`Erro ao fazer upload da imagem: ${error}`);
    }
  }

  private async deleteProfileImageFromAzure(
    profileImageUrl: string
  ): Promise<void> {
    try {
      // Extrair o nome do arquivo da URL
      const urlParts = profileImageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Deletar o arquivo
      const blobClient = containerClient.getBlockBlobClient(fileName);
      await blobClient.delete();

      console.log(`Imagem ${fileName} deletada com sucesso`);
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      // Não lançar erro aqui para não interromper a exclusão do usuário
    }
  }
}
