import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import {
  getUserInitial,
  getUserFullName,
  getUserEmail,
} from "@routly/lib/utils/user";
import { useRouter } from "next/navigation";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  background: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  ${theme.media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const Avatar = styled.div`
  width: ${theme.spacing.xxl};
  height: ${theme.spacing.xxl};
  border-radius: ${theme.radius.full};
  color: ${theme.colors.white};
  background-color: ${theme.colors.teal};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.xl};
  font-weight: 600;
`;

const Name = styled.h3`
  font-size: ${theme.typography.md};
  font-weight: 600;
  color: ${theme.colors.black};
`;

const Email = styled.p`
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const ButtonWrapper = styled.div`
  width: 100%;

  ${theme.media.md} {
    width: auto;
  }
`;

export default function ProfileHeader({ user }: { user: any }) {
  const userInitial = getUserInitial(user);
  const userFullName = getUserFullName(user);
  const userEmail = getUserEmail(user);
  const router = useRouter();

  return (
    <Header>
      <UserInfo>
        <Avatar>{userInitial}</Avatar>
        <div>
          <Name>{userFullName}</Name>
          <Email>{userEmail}</Email>
        </div>
      </UserInfo>

      <ButtonWrapper>
        <Button
          label="Edit Profile"
          color="teal"
          fullWidth
          onClick={() => router.push("/settings")}
        />
      </ButtonWrapper>
    </Header>
  );
}
