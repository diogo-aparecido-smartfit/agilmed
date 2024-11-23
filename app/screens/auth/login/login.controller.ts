import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./login.schema";
import { router } from "expo-router";

export function useLoginController() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      document: "",
    },
    resolver: async (data, context, options) => {
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async ({ document }: { document: string }) => {
    router.push({
      pathname: "/(auth)/password",
      params: {
        document,
      },
    });
  };

  const formValues = watch();

  return {
    handleSubmit,
    onSubmit,
    errors,
    control,
    formValues,
  };
}
