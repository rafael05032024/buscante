export interface Livro {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: string;
};

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  categories: string[];
  imageLinks: {
    thumbnail: string;
  };
  language: string;
  previewLink: string;
};

export interface Item {
  volumeInfo: VolumeInfo;
};

export interface LivrosResultado {
  items: Item[];
  totalItems: number;
};
