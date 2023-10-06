import { PostDocument } from '../post.schema';
export default interface GetAllPostResponse {
    cursor: string;
    data: PostDocument[];
}
