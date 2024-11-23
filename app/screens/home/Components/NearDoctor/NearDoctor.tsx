import Text from "@/components/Text/Text";
import * as S from "./style";
import { Clock, Hospital, Location, Star1 } from "iconsax-react-native";
import { Theme } from "@/config/theme";
import Avatar from "@/components/Avatar/Avatar";

interface NearDoctorProps {
  name: string;
  type: string;
  distance: string;
  rating: string;
  openAt: string;
}

const NearDoctor = ({
  distance,
  name,
  openAt,
  rating,
  type,
}: NearDoctorProps) => {
  return (
    <S.Container>
      <S.HeadingContainer>
        <Avatar uri={Hospital} size={46} />
        <S.DoctorInfoWrapper>
          <Text fontWeight="700">{name}</Text>
          <Text color="description" fontSize="sm" fontWeight="400">
            {type}
          </Text>
        </S.DoctorInfoWrapper>
        <S.DistanceContainer>
          <Location size={16} color={Theme.colors.description} />
          <Text
            textTransform="uppercase"
            color="description"
            fontSize="sm"
            fontWeight="400"
          >
            {distance}
          </Text>
        </S.DistanceContainer>
      </S.HeadingContainer>
      <S.Divider />
      <S.FooterContainer>
        <S.InfoWrapper>
          <Star1 color={Theme.colors.yellow} size={20} />
          <Text fontSize="xs" color="yellow">
            {rating}
          </Text>
        </S.InfoWrapper>
        <S.InfoWrapper>
          <Clock color={Theme.colors.mainColor} size={20} />
          <Text fontSize="xs" color="mainColor">
            Abre ás {openAt}
          </Text>
        </S.InfoWrapper>
      </S.FooterContainer>
    </S.Container>
  );
};

export default NearDoctor;
