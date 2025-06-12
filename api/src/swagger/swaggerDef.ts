import { SwaggerDefinition } from "swagger-jsdoc";

export const swaggerOptions: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "AgilMed API Docs",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
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
          email: {
            type: "string",
            description: "E-mail do usuário",
          },
          password: {
            type: "string",
            description: "Senha do usuário (hash)",
          },
          phone: {
            type: "string",
            description: "Número de telefone do usuário",
          },
          cpf: {
            type: "string",
            description: "CPF do usuário",
          },
          profile_picture_url: {
            type: "string",
            description: "URL da foto do perfil do usuário",
            nullable: true,
          },
          verificationCode: {
            type: "string",
            description: "Código de verificação enviado ao usuário",
            nullable: true,
          },
          isVerified: {
            type: "boolean",
            description: "Se o usuário foi verificado ou não",
            default: false,
          },
          role: {
            type: "string",
            enum: ["doctor", "patient", "admin"],
            description: "Função do usuário",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Data de criação do registro",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Data da última atualização do registro",
          },
        },
      },
      Doctor: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID único do médico",
          },
          user_id: {
            type: "integer",
            description: "ID de referência ao usuário",
          },
          specialty: {
            type: "string",
            description: "Especialidade médica",
          },
          crm: {
            type: "string",
            description: "Número do CRM do médico",
          },
          birthdate: {
            type: "string",
            format: "date",
            description: "Data de nascimento do médico",
          },
          address: {
            type: "string",
            description: "Endereço do médico",
          },
          city: {
            type: "string",
            description: "Cidade do médico",
          },
          state: {
            type: "string",
            description: "Estado do médico",
          },
          gender: {
            type: "string",
            description: "Gênero do médico",
          },
          bio: {
            type: "string",
            description: "Biografia/descrição do médico",
            nullable: true,
          },
          available_hours: {
            type: "string",
            description: "Horários disponíveis para consulta",
            nullable: true,
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Data de criação do registro",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Data da última atualização do registro",
          },
          user: {
            $ref: "#/components/schemas/User",
            description: "Dados do usuário relacionado",
          },
        },
      },
      Patient: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID único do paciente",
          },
          user_id: {
            type: "integer",
            description: "ID de referência ao usuário",
          },
          birthdate: {
            type: "string",
            format: "date",
            description: "Data de nascimento do paciente",
          },
          address: {
            type: "string",
            description: "Endereço do paciente",
          },
          city: {
            type: "string",
            description: "Cidade do paciente",
          },
          state: {
            type: "string",
            description: "Estado do paciente",
          },
          gender: {
            type: "string",
            description: "Gênero do paciente",
          },
          blood_type: {
            type: "string",
            description: "Tipo sanguíneo do paciente",
            nullable: true,
          },
          allergies: {
            type: "string",
            description: "Alergias do paciente",
            nullable: true,
          },
          medical_history: {
            type: "string",
            description: "Histórico médico do paciente",
            nullable: true,
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Data de criação do registro",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Data da última atualização do registro",
          },
          user: {
            $ref: "#/components/schemas/User",
            description: "Dados do usuário relacionado",
          },
        },
      },
      Appointment: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID único da consulta",
          },
          doctor_id: {
            type: "integer",
            description: "ID do médico responsável pela consulta",
          },
          patient_id: {
            type: "integer",
            description: "ID do paciente da consulta",
          },
          appointment_date: {
            type: "string",
            format: "date-time",
            description: "Data e hora da consulta",
          },
          reason: {
            type: "string",
            description: "Motivo da consulta",
          },
          status: {
            type: "string",
            description:
              "Status da consulta (pending, scheduled, completed, canceled)",
            default: "pending",
          },
          notes: {
            type: "string",
            description: "Observações adicionais sobre a consulta",
            nullable: true,
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Data de criação do registro",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "Data da última atualização do registro",
          },
          doctor: {
            $ref: "#/components/schemas/Doctor",
            description: "Dados do médico relacionado",
          },
          patient: {
            $ref: "#/components/schemas/Patient",
            description: "Dados do paciente relacionado",
          },
        },
      },
    },
  },
};
