export interface CreateNewArticleDto {
  title: string;
  description: string;
}
export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}
export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  email?: string;
}
export interface CreateCommentDto{
    text:string;
    articleId:number
} 
export interface UpdateCommentDto{
    text:string;
    
} 