export interface TextUploadForm {
  content: string;
}

export interface UploadFileToS3Form {
  file: File;
  preSignedUrl: string;
}

export interface GetPreSignedUrlRequest {
  filename: string;
  extension: string;
  prefix: "IMAGE" | "AUDIO" | "TEXT" | "PROFILE";
}

export interface PostFileMetaDataRequest {
  filename: string;
  key: string;
  extension: string;
  prefix: string;
}

