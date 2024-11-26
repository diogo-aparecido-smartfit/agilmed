import { supabase } from "../config/supabase";
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
        const { error: deleteError } = await supabase.storage
          .from("profile-images")
          .remove([user.profile_picture_url]);

        if (deleteError) {
          throw new Error(
            "Erro ao deletar a foto antiga: " + deleteError.message
          );
        }
      }

      const profileImageUrl = await this.uploadProfileImageToSupabase(file);

      data.profile_picture_url = profileImageUrl;

      console.log(JSON.stringify(data));
    }

    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  private async uploadProfileImageToSupabase(
    file: Express.Multer.File
  ): Promise<string> {
    try {
      const fileName = `${new Date().toISOString()}-${formatFileName(
        file.originalname
      )}`;

      const { data, error } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        throw new Error(
          `Erro ao enviar a imagem para o Supabase: ${error.message}`
        );
      }

      const publicUrl = supabase.storage
        .from("profile-images")
        .getPublicUrl(data.path);
      return publicUrl.data.publicUrl;
    } catch (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error}`);
    }
  }
}
