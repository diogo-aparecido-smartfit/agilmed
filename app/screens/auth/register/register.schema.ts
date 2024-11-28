import * as yup from "yup";

export const schema = yup.object().shape({
  full_name: yup.string().required("Campo 'Nome completo' é obrigatório"),
  cpf: yup.string().required("Campo 'CPF' é obrigatório"),
  email: yup.string().required("Campo 'Email' é obrigatório"),
  phone: yup.string().required("Campo 'Telefone' é obrigatório"),
  password: yup.string().required("Campo 'Senha' é obrigatório"),
  birthdate: yup.string().required("Campo 'Data de nascimento' é obrigatório"),
  address: yup.string().required("Campo 'Endereço' é obrigatório"),
  city: yup.string().required("Campo 'Cidade' é obrigatório"),
  state: yup.string().required("Campo 'Estado' é obrigatório"),
  gender: yup.string().required("Campo 'Sexo' é obrigatório"),
  blood_type: yup.string(),
  allergies: yup.string(),
  medical_history: yup
    .string()
});
