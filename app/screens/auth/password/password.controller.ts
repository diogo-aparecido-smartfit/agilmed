import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./password.schema";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "@/store/slices/auth.slice";
import { RootState } from "@/store";

export function usePasswordController() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  console.log(isLoading);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: async (data, context, options) => {
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async ({
    document,
    password,
  }: {
    document: string;
    password: string;
  }) => {
    dispatch(loginRequest({ identifier: document, password }));
  };

  const formValues = watch();

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return {
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
    control,
    formValues,
    togglePasswordVisibility,
    showPassword,
  };
}
