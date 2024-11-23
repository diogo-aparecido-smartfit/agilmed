import { Controller } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { useLoginController } from "./login.controller";
import * as S from "./login.style";
import { router } from "expo-router";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import Input from "@/components/Input/Input";

export default function LoginPage() {
  const { control, errors, formValues, handleSubmit, onSubmit } =
    useLoginController();

  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer keyboardShouldPersistTaps="always">
        <Text fontSize="2xl" textAlign="center" fontWeight="700">
          Entrar
        </Text>
        <S.FormContainer>
          <Controller
            name="document"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                onChangeText={(_, rawText) => onChange(rawText)}
                label="CPF"
                placeholder="Digite seu CPF"
                mask="999.999.999-99"
                keyboardType="numeric"
              />
            )}
          />
          <Button
            disabled={
              Object.keys(errors).length > 0 || formValues.document.length < 11
            }
            onPress={() => handleSubmit(onSubmit)()}
            text="Continuar"
          />
          <S.RegisterButton onPress={() => router.push("/(auth)/register")}>
            <Text color="description" textAlign="center" fontSize="sm">
              Não é cliente AgilMed?{" "}
              <Text fontWeight="700" fontSize="sm">
                Seja agora mesmo
              </Text>
            </Text>
          </S.RegisterButton>
        </S.FormContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
