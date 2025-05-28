import { containerClient } from "../config/azure";
import { sequelize } from "../config/database";
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
    if (file) {
      const user = await this.userRepository.getUserById(id);

      if (user?.profile_picture_url) {
        await this.deleteProfileImageFromAzure(user.profile_picture_url);
      }

      const profileImageUrl = await this.uploadProfileImageToAzure(file);

      data.profile_picture_url = profileImageUrl;

      console.log(JSON.stringify(data));
    }

    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
  }

  async getAllUsers(filters?: any) {
    return this.userRepository.getAllUsers(filters);
  }

  private async uploadProfileImageToAzure(
    file: Express.Multer.File
  ): Promise<string> {
    try {
      const fileName = `${new Date().toISOString()}-${formatFileName(
        file.originalname
      )}`;

      const blobClient = containerClient.getBlockBlobClient(fileName);

      const uploadBlobResponse = await blobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });

      console.log(uploadBlobResponse);

      const publicUrl = blobClient.url;
      return publicUrl;
    } catch (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error}`);
    }
  }

  private async deleteProfileImageFromAzure(
    profileImageUrl: string
  ): Promise<void> {
    try {
      const blobClient = containerClient.getBlobClient(profileImageUrl);
      await blobClient.deleteIfExists();
    } catch (error) {
      console.error("Erro ao deletar a imagem do Azure:", error);
    }
  }
}
