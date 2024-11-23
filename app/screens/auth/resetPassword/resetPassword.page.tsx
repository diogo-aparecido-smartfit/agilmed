import Text from "@/components/Text/Text";
import * as S from "./resetPassword.style";
import Button from "@/components/Button/Button";
import { Controller } from "react-hook-form";
import { useResetPasswordController } from "./resetPassword.controller";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BasicInput from "@/components/BasicInput/BasicInput";

export default function ResetPasswordPage() {
  const params = useLocalSearchParams();
  const {
    control,
    isButtonDisabled,
    isLoading,
    onSubmit,
    handleSubmit,
    formValues,
  } = useResetPasswordController();

  console.log(isLoading);

  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer keyboardShouldPersistTaps="always">
        <Text fontSize="2xl" textAlign="center" fontWeight="700">
          Resetar senha
        </Text>
        <S.FormContainer>
          <Controller
            name="typed_password"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(rawText) => onChange(rawText)}
                label="Senha"
                placeholder="Digite sua nova senha"
                keyboardType="default"
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(rawText) => onChange(rawText)}
                label="Senha"
                placeholder="Digite sua nova senha novamente"
                keyboardType="default"
                autoCapitalize="none"
              />
            )}
          />
          <Button
            disabled={isButtonDisabled}
            isLoading={isLoading}
            onPress={() =>
              handleSubmit(() =>
                onSubmit({
                  document: params.document as string,
                  password_confirm: formValues.password_confirm,
                  typed_password: formValues.typed_password,
                })
              )()
            }
            text="Continuar"
          />
        </S.FormContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
