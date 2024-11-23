import { useAuth } from "@/hooks/auth/use-auth";
import { IRegisterUserData } from "@/types";

export function useRegisterUsecase() {
  const { register } = useAuth();

  const doRegister = async (user: IRegisterUserData) => {
    await register(user);
  };

  return {
    doRegister,
  };
}
