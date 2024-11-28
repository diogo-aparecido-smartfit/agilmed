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
    watch,
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

  const formValues = watch()

  const onSubmit = async (data: IRegisterUserData) => {
    const isoBirthdate = convertToISODate(data.birthdate);

    const payload = {
      ...data,
      birthdate: isoBirthdate,
    };

    dispatch(registerRequest(payload));
  };

  const filledFormValues = Boolean(formValues.full_name) && Boolean(formValues.cpf) && Boolean(formValues.birthdate) && Boolean(formValues.phone) && Boolean(formValues.email) && Boolean(formValues.password) && Boolean(formValues.address) && Boolean(formValues.city) && Boolean(formValues.state) && Boolean(formValues.gender)

  return {
    handleSubmit,
    onSubmit,
    isLoading,
    errors,
    control,
    formValues,
    filledFormValues
  };
}
