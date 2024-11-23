import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./resetPassword.schema";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { resetPasswordRequest } from "@/store/slices/auth.slice";

export function useResetPasswordController() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      typed_password: "",
      password_confirm: "",
    },
    resolver: async (data, context, options) => {
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async ({
    document,
    typed_password,
    password_confirm,
  }: {
    document: string;
    typed_password: string;
    password_confirm: string;
  }) => {
    dispatch(
      resetPasswordRequest({
        document: document,
        typed_password: password_confirm,
        password_confirm: password_confirm,
      })
    );
  };

  const formValues = watch();

  const isButtonDisabled =
    formValues.typed_password !== formValues.password_confirm ||
    formValues.typed_password.length < 1;

  return {
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
    control,
    formValues,
    isButtonDisabled,
  };
}
