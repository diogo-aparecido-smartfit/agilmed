import { SwaggerDefinition } from "swagger-jsdoc";

export const swaggerOptions: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários",
    description: "Documentação da API de gerenciamento de usuários",
    version: "1.0.0",
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID único do usuário",
          },
          full_name: {
            type: "string",
            description: "Nome completo do usuário",
          },
          birthdate: {
            type: "string",
            format: "date",
            description: "Data de nascimento do usuário",
          },
          cpf: {
            type: "string",
            description: "CPF do usuário",
          },
          address: {
            type: "string",
            description: "Endereço do usuário",
          },
          city: {
            type: "string",
            description: "Cidade do usuário",
          },
          state: {
            type: "string",
            description: "Estado do usuário",
          },
          phone: {
            type: "string",
            description: "Número de telefone do usuário",
          },
          email: {
            type: "string",
            description: "E-mail do usuário",
          },
          password: {
            type: "string",
            description: "Senha do usuário",
          },
          gender: {
            type: "string",
            description: "Gênero do usuário",
          },
          blood_type: {
            type: "string",
            description: "Tipo sanguíneo do usuário",
          },
          allergies: {
            type: "string",
            description: "Alergias do usuário",
          },
          medical_history: {
            type: "string",
            description: "Histórico médico do usuário",
          },
          verificationCode: {
            type: "string",
            description: "Código de verificação enviado ao usuário",
          },
          isVerified: {
            type: "boolean",
            description: "Se o usuário foi verificado ou não",
          },
          profile_picture_url: {
            type: "string",
            description: "URL da foto do perfil do usuário",
          },
          chatbot_user_id: {
            type: "string",
            description: "ID do usuário no chatbot",
          },
        },
      },
    },
  },
};
