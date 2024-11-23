import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("Insira um email válido").optional(),
  cpf: yup.string().optional(),
  phone: yup.string().optional(),
  password: yup.string().optional(),
});
