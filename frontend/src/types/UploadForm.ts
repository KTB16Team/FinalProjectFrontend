export interface TextUploadForm {
  content: string;
}

export interface UploadFileToS3Form {
  file: File;
  preSignedUrl: string;
}

export interface GetPreSignedUrlRequest {
  filename: string;
  prefix: "IMAGE" | "AUDIO" | "TEXT";
}

export interface PostFileMetaDataRequest {
  filename: string;
  prefix: "IMAGE" | "AUDIO" | "TEXT";
  url: string;
  size: number;
  extension: string;
}