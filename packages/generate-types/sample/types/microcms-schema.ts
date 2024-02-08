/** microCMS contentId */
type MicroCMSContentId = {
  id: string;
}

/** microCMS content common date */
type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

/** microCMS image */
export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
}

/** microCMS list content common types */
type MicroCMSListContent = MicroCMSContentId & MicroCMSDate;

/** microCMS relation fields */
export type MicroCMSRelation<T> = T & MicroCMSListContent;
