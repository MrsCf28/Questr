import { clientId } from "./imgurClientId";

export function postImage(image64: string) {
    const formdata = new FormData();
    formdata.append('image', image64);
    return fetch(`https://api.imgur.com/3/upload/`, {
        method: 'post',
        headers: {
            Authorization: clientId,
        },
        body: formdata,
    }).then(data => data.json());
}