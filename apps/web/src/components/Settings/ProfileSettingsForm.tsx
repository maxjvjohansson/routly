"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "src/components/Button/Button";
import { InputField } from "src/components/InputField/InputField";
import { useProfileSettings } from "@routly/lib/hooks/useProfileSettings";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const FormCard = styled.form`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.typography.lg};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  ${theme.media.md} {
    flex-direction: row;
    gap: ${theme.spacing.md};

    & > div {
      flex: 1;
    }
  }
`;

const StatusText = styled.p<{ $type: "success" | "error" }>`
  color: ${({ $type }) =>
    $type === "success" ? theme.colors.green : theme.colors.red};
  font-size: ${theme.typography.sm};
  margin-top: ${theme.spacing.xs};
  text-align: center;
`;

export default function ProfileSettingsForm() {
  const { profile, loading, updateProfile, updatePassword } =
    useProfileSettings();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileStatus, setProfileStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  const pick = (v: any) => (v?.target ? v.target.value : v);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileStatus(null);
    const { error } = await updateProfile({
      full_name: fullName,
      email,
      avatar_url: avatarUrl,
    });
    if (error) setProfileStatus({ type: "error", msg: error });
    else
      setProfileStatus({
        type: "success",
        msg: "Profile updated successfully",
      });
    setSavingProfile(false);
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setPasswordStatus(null);
    const { error } = await updatePassword(
      currentPassword,
      newPassword,
      repeatPassword
    );
    if (error) setPasswordStatus({ type: "error", msg: error });
    else {
      setPasswordStatus({
        type: "success",
        msg: "Password updated successfully",
      });
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    }
    setSavingPassword(false);
  };

  return (
    <Wrapper>
      <FormCard onSubmit={handleSaveProfile}>
        <SectionTitle>Profile Information</SectionTitle>

        <InputField
          label="Full name"
          value={fullName}
          onChange={(v: any) => setFullName(pick(v))}
          placeholder="Your full name"
          disabled={loading || savingProfile}
        />
        <InputField
          label="Email"
          value={email}
          onChange={(v: any) => setEmail(pick(v))}
          placeholder="Your email address"
          disabled={loading || savingProfile}
        />
        <InputField
          label="Avatar URL"
          value={avatarUrl}
          onChange={(v: any) => setAvatarUrl(pick(v))}
          placeholder="Link to your profile image"
          disabled={loading || savingProfile}
        />

        <Button
          label={savingProfile ? "Saving..." : "Save changes"}
          color="teal"
          fullWidth
          type="submit"
          disabled={savingProfile}
        />
        <StatusText $type={profileStatus?.type || "success"}>
          {profileStatus?.msg || ""}
        </StatusText>
      </FormCard>

      <FormCard onSubmit={handleSavePassword}>
        <SectionTitle>Change Password</SectionTitle>
        <Row>
          <InputField
            label="Current password"
            type="password"
            value={currentPassword}
            onChange={(v: any) => setCurrentPassword(pick(v))}
            disabled={savingPassword}
          />
          <InputField
            label="New password"
            type="password"
            value={newPassword}
            onChange={(v: any) => setNewPassword(pick(v))}
            disabled={savingPassword}
          />
        </Row>
        <InputField
          label="Repeat new password"
          type="password"
          value={repeatPassword}
          onChange={(v: any) => setRepeatPassword(pick(v))}
          disabled={savingPassword}
        />

        <Button
          label={savingPassword ? "Updating..." : "Update password"}
          color="teal"
          fullWidth
          type="submit"
          disabled={savingPassword}
        />
        <StatusText $type={passwordStatus?.type || "success"}>
          {passwordStatus?.msg || ""}
        </StatusText>
      </FormCard>
    </Wrapper>
  );
}
