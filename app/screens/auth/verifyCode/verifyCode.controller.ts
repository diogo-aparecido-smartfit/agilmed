import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./verifyCode.schema";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { verifyCodeRequest } from "@/store/slices/auth.slice";

export function useVerifyCodeController() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  });

  const formValues = watch();

  const onSubmit = async ({
    document,
    code,
    typed_password,
  }: {
    document: string;
    code: string;
    typed_password?: string;
  }) => {
    dispatch(
      verifyCodeRequest({
        code: code,
        document: document,
        typed_password: typed_password,
        password_confirm: typed_password,
      })
    );
  };

  return {
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
    control,
    formValues,
  };
}
