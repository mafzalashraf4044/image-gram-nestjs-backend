/// <reference types="multer" />
declare class CreatePostDTO {
    title: string;
    caption: string;
    image: Express.Multer.File;
}
export default CreatePostDTO;
