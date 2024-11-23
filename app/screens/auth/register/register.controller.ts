import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schema } from "./register.schema";
import { IRegisterUserData } from "@/types/types";
import { convertToISODate } from "@/utils/utils";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "@/store/slices/auth.slice";

export function useRegisterController() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      birthdate: "",
      address: "",
      city: "",
      state: "",
      gender: "",
      blood_type: "",
      allergies: "",
      medical_history: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IRegisterUserData) => {
    const isoBirthdate = convertToISODate(data.birthdate);

    const payload = {
      ...data,
      birthdate: isoBirthdate,
    };

    dispatch(registerRequest(payload));
  };

  return {
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
    control,
  };
}
