import Button from "@/components/Button/Button";
import * as S from "./style";

const Header = () => {
  return (
    <S.Container>
      <Button width="auto" isSecondary text="Cancelados" />
      <Button width="auto" text="Próximos agendamentos" />
      <Button width="auto" isSecondary text="Remarcados" />
    </S.Container>
  );
};

export default Header;
