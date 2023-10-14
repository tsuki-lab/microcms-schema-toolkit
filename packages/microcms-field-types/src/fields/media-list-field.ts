/** 複数画像 */
export type MicroCMSMediaListField = {
  fieldId: string;
  name: string;
  kind: "mediaList";
  description?: string;
  required?: boolean;
  imageSizeValidation?: {
    imageSize: {
      width: number;
      height: number;
    };
  };
  /**
   * レイアウト
   * @default "HORIZONTAL_SCROLL"
   */
  mediaListLayout?: "HORIZONTAL_SCROLL" | "GRID_2" | "GRID_3" | "GRID_4";
};