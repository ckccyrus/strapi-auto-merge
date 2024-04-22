interface axiosConfig {
    url: string;
    method: string;
    maxBodyLength: number;
    headers?: {
        [key: string]: string,
    },
    auth: {
        username: string,
        password: string
    }
}