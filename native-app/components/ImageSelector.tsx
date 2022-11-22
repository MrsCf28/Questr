import { postImage } from '../utils/imgurApi';

export default async function uploadImage(
    image64: string
): Promise<string> {
    return postImage(image64)
        .then(data => {
            return data.data.link;
        })
        .catch(err => {
            return console.log(err);
        });
}
