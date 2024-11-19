export interface Post {
  id: number;
  id_wordpress: number;
  date_wordpress: string; // Formato de fecha ISO
  date_gmt: string; // Formato de fecha ISO
  date_modified: string; // Formato de fecha ISO
  date_modified_gmt: string; // Formato de fecha ISO
  status_post: string; // Estado del post, ej. "publish"
  category_post: string; // Categoría del post, ej. "Noticiero"
  media_post: string; // URL de la imagen destacada
  title_post: string; // Título del post
  content_post: string; // Contenido HTML del post
  author_id: number; // ID del autor
  author_name: string; // Nombre del autor
  author_image: string; // URL del avatar del autor
}


export interface Category {
  category_post: string;
}
