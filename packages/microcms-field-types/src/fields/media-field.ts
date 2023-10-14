/** 画像 */
export type MicroCMSMediaField = {
  fieldId: string;
  name: string;
  kind: "media";
  description?: string;
  required?: boolean;
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
};