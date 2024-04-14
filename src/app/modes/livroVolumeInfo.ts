import { Item } from './interfaces';

export class LivroVolumeInfo {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: string;

  constructor(item: Item) {
    const { volumeInfo } = item;

    Object.assign(this, {
      ...volumeInfo,
      thumbnail: volumeInfo?.imageLinks?.thumbnail
    });
  }
};
