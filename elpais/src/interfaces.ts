export  interface Post {//La ruta no da el atributo alt de las imagenes
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  category: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: {
      24: string;
      48: string;
      96: string;
    };
    meta: any[];
    _links: {
      self: { href: string }[];
      collection: { href: string }[];
    };
  };
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  media: string;
  meta: {
    _mi_skip_tracking: boolean;
    _monsterinsights_sitenote_active: boolean;
    _monsterinsights_sitenote_note: string;
    _monsterinsights_sitenote_category: number;
    footnotes: string;
  };
  categories: number[];
  tags: any[];
  _links: {
    self: { href: string }[];
    collection: { href: string }[];
    about: { href: string }[];
    author: { embeddable: boolean; href: string }[];
    replies: { embeddable: boolean; href: string }[];
    versionHistory: { count: number; href: string }[];
    predecessorVersion: { id: number; href: string }[];
    wp: {
      featuredmedia: { embeddable: boolean; href: string }[];
      attachment: { href: string }[];
      term: { taxonomy: string; embeddable: boolean; href: string }[];
    };
  };
}

export interface Category {
  category_post: string;
}
