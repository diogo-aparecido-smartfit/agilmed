import * as yup from "yup";

export const schema = yup.object().shape({
  document: yup
    .string()
    .min(11, "O documento precisa ser válido")
    .required("Campo 'CPF' é obrigatório"),
});
