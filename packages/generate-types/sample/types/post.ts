import { MicroCMSRelation, MicroCMSImage } from './microcms-schema';

export type Post = {
  /**
   * カテゴリー
   */
  category: MicroCMSRelation<unknown | null>
  /**
   * タイトル
   */
  title: string
  /**
   * 内容
   */
  contents?: (PostCustomFieldRichEditor | PostCustomFieldHtml | PostCustomFieldMarkdown | PostCustomFieldImage)[]
  /**
   * カバー画像
   */
  coverImage?: MicroCMSImage
  /**
   * 関連お知らせ
   */
  relatedPosts?: MicroCMSRelation<unknown | null>[]
}

export type PostCustomFieldRichEditor = {
  /**
   * fieldId
   */
  fieldId: 'richEditor'
  /**
   * リッチエディタ
   */
  content: string
}

export type PostCustomFieldHtml = {
  /**
   * fieldId
   */
  fieldId: 'html'
  /**
   * HTML
   */
  content: string
}

export type PostCustomFieldMarkdown = {
  /**
   * fieldId
   */
  fieldId: 'markdown'
  /**
   * Markdown
   */
  content: string
}

export type PostCustomFieldImage = {
  /**
   * fieldId
   */
  fieldId: 'image'
  /**
   * 代替えテキスト
   */
  alt?: string
  /**
   * 画像
   */
  image: MicroCMSImage
}

