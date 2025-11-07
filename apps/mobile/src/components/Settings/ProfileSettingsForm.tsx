"use client";

import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { useProfileSettings } from "@routly/lib/hooks/useProfileSettings";

const Wrapper = styled.View`
  flex-direction: column;
  gap: ${theme.spacing.lg}px;
`;

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.lg}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.md}px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const Row = styled.View`
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
`;

const StatusText = styled.Text<{ $type: "success" | "error" }>`
  color: ${({ $type }: { $type: any }) =>
    $type === "success" ? theme.colors.green : theme.colors.red};
  font-size: ${theme.typography.sm}px;
  text-align: center;
  margin-top: ${theme.spacing.xs}px;
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

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileStatus(null);

    const { error } = await updateProfile({
      full_name: fullName,
      email,
      avatar_url: avatarUrl,
    });

    if (error) {
      setProfileStatus({ type: "error", msg: "Failed to update profile" });
    } else {
      setProfileStatus({
        type: "success",
        msg: "Profile updated successfully",
      });
    }

    setSavingProfile(false);
  };

  const handleSavePassword = async () => {
    if (newPassword !== repeatPassword) {
      setPasswordStatus({ type: "error", msg: "Passwords do not match" });
      return;
    }

    setSavingPassword(true);
    setPasswordStatus(null);

    const { error } = await updatePassword(
      currentPassword,
      newPassword,
      repeatPassword
    );

    if (error) {
      setPasswordStatus({ type: "error", msg: "Failed to update password" });
    } else {
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
      <Card>
        <SectionTitle>Profile Information</SectionTitle>
        <InputField
          label="Full name"
          value={fullName}
          onChange={setFullName}
          placeholder="Your full name"
          disabled={loading || savingProfile}
        />
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="Your email address"
          disabled={loading || savingProfile}
        />
        <InputField
          label="Avatar URL"
          value={avatarUrl}
          onChange={setAvatarUrl}
          placeholder="Link to your profile image"
          disabled={loading || savingProfile}
        />
        <Button
          label={savingProfile ? "Saving..." : "Save changes"}
          color="teal"
          fullWidth
          onPress={handleSaveProfile}
          disabled={savingProfile}
        />
        {profileStatus && (
          <StatusText $type={profileStatus.type}>
            {profileStatus.msg}
          </StatusText>
        )}
      </Card>

      <Card>
        <SectionTitle>Change Password</SectionTitle>
        <Row>
          <InputField
            label="Current password"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
            disabled={savingPassword}
          />
          <InputField
            label="New password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            disabled={savingPassword}
          />
          <InputField
            label="Repeat new password"
            type="password"
            value={repeatPassword}
            onChange={setRepeatPassword}
            disabled={savingPassword}
          />
        </Row>
        <Button
          label={savingPassword ? "Updating..." : "Update password"}
          color="teal"
          fullWidth
          onPress={handleSavePassword}
          disabled={savingPassword}
        />
        {passwordStatus && (
          <StatusText $type={passwordStatus.type}>
            {passwordStatus.msg}
          </StatusText>
        )}
      </Card>
    </Wrapper>
  );
}
