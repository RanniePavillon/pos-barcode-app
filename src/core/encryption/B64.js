
export const b64 = (file) => {
    return new Promise(resolve => {
        let baseURL = '';
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            var solution = baseURL.split('base64,')[1];
            return resolve(solution);
        };
    });
};