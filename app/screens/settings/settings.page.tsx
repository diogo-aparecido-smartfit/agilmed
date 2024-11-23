import Avatar from "@/components/Avatar/Avatar";
import * as S from "./settings.style";
import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import Input from "@/components/Input/Input";
import EditButton from "./EditButton/EditButton";
import { StatusBar } from "expo-status-bar";
import { getFirstAndLastName } from "@/utils/utils";
import BasicInput from "@/components/BasicInput/BasicInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logoffRequest } from "@/store/slices/auth.slice";
import { router } from "expo-router";
import { useSettingsController } from "./settings.controller";
import { Controller } from "react-hook-form";

export default function SettingsPage() {
  const {
    control,
    error,
    formValues,
    handleSubmit,
    loading,
    onSubmit,
    imageUploadError,
    imageUploadLoading,
    handleImageChange,
  } = useSettingsController();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogoff = () => {
    dispatch(logoffRequest());
    router.replace("/(auth)/login");
  };

  return (
    <S.Container>
      <StatusBar style="dark" />
      <S.ContentContainer automaticallyAdjustKeyboardInsets>
        <S.AvatarContainer>
          <Avatar
            uri={user?.profile_picture_url ?? undefined}
            isLoading={imageUploadLoading}
            size={139}
          />
          <EditButton onChange={handleImageChange} />
        </S.AvatarContainer>
        <S.PersonalInfo>
          <Text color="black" fontSize="xl" fontWeight="600">
            {getFirstAndLastName(user?.full_name ?? "")}
          </Text>
          <Text fontSize="sm" color="description">
            {user?.city} - {user?.state}
          </Text>
        </S.PersonalInfo>

        <S.FormContainer>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(text) => onChange(text)}
                label="Email"
                placeholder="Digite seu email"
                defaultValue={user?.email}
                keyboardType="email-address"
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(text) => onChange(text)}
                label="CPF"
                placeholder="Digite seu CPF"
                defaultValue={user?.cpf}
                mask="999.999.999-99"
                keyboardType="number-pad"
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(text) => onChange(text)}
                label="Telefone"
                placeholder="Digite seu telefone"
                defaultValue={user?.phone}
                mask="+(99) 9 9999-9999"
                keyboardType="phone-pad"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <BasicInput
                onChangeText={(text) => onChange(text)}
                label="Senha"
                placeholder="Digite sua senha"
                value="teste123"
                secureTextEntry
              />
            )}
          />
        </S.FormContainer>
        <S.ButtonWrapper>
          <Button
            disabled={loading}
            isLoading={loading}
            borderRadius={12}
            text="Salvar"
            onPress={() => handleSubmit(() => onSubmit(formValues))()}
          />
          <Button
            outlined
            borderRadius={12}
            text="Deslogar"
            onPress={handleLogoff}
          />
        </S.ButtonWrapper>
      </S.ContentContainer>
    </S.Container>
  );
}
