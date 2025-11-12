import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import {
  getUserInitial,
  getUserFullName,
  getUserEmail,
} from "@routly/lib/utils/user";
import { useRouter } from "expo-router";

const Header = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.View`
  width: ${theme.spacing.xl}px;
  height: ${theme.spacing.xl}px;
  border-radius: ${theme.radius.full}px;
  background-color: ${theme.colors.teal};
  align-items: center;
  justify-content: center;
`;

const AvatarText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
`;

const UserTextBlock = styled.View`
  flex: 1;
  margin-left: ${theme.spacing.xs}px;
`;

const Name = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
  color: ${theme.colors.black};
`;

const Email = styled.Text`
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const ButtonWrapper = styled.View`
  margin-top: ${theme.spacing.md}px;
  padding: 0 ${theme.spacing.sm}px;
`;

export default function ProfileHeader({ user }: { user: any }) {
  const router = useRouter();
  const userInitial = getUserInitial(user);
  const userFullName = getUserFullName(user);
  const userEmail = getUserEmail(user);

  return (
    <Header>
      <UserInfo>
        <Avatar>
          <AvatarText>{userInitial}</AvatarText>
        </Avatar>
        <UserTextBlock>
          <Name>{userFullName}</Name>
          <Email>{userEmail}</Email>
        </UserTextBlock>
      </UserInfo>

      <ButtonWrapper>
        <Button
          label="Edit Profile"
          color="teal"
          fullWidth
          onPress={() => router.push("/settings")}
        />
      </ButtonWrapper>
    </Header>
  );
}
