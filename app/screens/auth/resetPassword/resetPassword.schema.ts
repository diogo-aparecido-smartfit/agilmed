import * as yup from "yup";

export const schema = yup.object().shape({
  typed_password: yup.string().required("Campo 'senha' é obrigatório"),
  password_confirm: yup.string().required("Campo 'senha' é obrigatório"),
});
