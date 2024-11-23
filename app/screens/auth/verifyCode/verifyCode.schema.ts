import * as yup from "yup";

export const schema = yup.object().shape({
  code: yup
    .string()
    .length(4, "O código precisa ter 4 dígitos")
    .required("Campo 'código' é obrigatório"),
});
