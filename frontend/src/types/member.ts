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
  profileImageUrl: string;
  point: number;
}

export interface UpdateNicknameForm {
  newNickname: string;
}

export interface PostProfileImageMetaDataRequest {
  filename: string;
  key: string;
  extension: string;
  prefix: string;
}

export interface GetProfilePreSignedUrlForm {
  filename: string;
}