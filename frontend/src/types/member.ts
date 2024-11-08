export interface DeleteMemberForm {
  password: string;
}

export interface UpdatePasswordForm {
  password: string;
  newPassword: string;
}

export interface GetProfileForm {
  nickname: string;
  email: string;
  profileImage: string;
}

export interface UpdateNicknameForm {
  newNickname: string;
}