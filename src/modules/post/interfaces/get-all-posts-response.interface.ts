import { Post } from '../post.schema';

export interface GetAllPostResponse {
  cursor: string;
  data: Post[];
}
