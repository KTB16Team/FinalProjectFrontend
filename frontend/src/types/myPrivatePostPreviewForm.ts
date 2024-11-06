export interface MyPrivatePostPreviewForm {
  privatePostId: number;
  title: string;
  contentPreview: string;
  originType: 'VOICE' | 'TEXT' | 'CHAT';
  createdAt: string;
  published: boolean;
}

export interface MyPrivatePostForm {
  privatePostId: number;
  title: string;
  summaryAi: string;
  stancePlaintiff: string;
  stanceDefendant: string;
  judgement: string;
  faultRatePlaintiff: number;
  faultRateDefendant: number;
  published: boolean;
}