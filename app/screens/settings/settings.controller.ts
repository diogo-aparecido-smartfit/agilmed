import { RootState } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { schema } from "./settings.schema";
import { updateUserRequest } from "@/store/slices/user.slice";
import { IUpdateUserData } from "@/types/types";

export const useSettingsController = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading, error } = useSelector((state: RootState) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: async (data, context, options) => {
      return yupResolver(schema)(data, context, options);
    },
  });

  const onSubmit = async ({ ...formData }: IUpdateUserData) => {
    dispatch(updateUserRequest({ ...formData, id: user?.id }));
  };

  const formValues = watch();

  return {
    loading,
    error,
    handleSubmit,
    onSubmit,
    control,
    formValues,
  };
};
