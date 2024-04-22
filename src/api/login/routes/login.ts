export default {
    routes: [
        {
            method: 'POST',
            path: '/login/getAuth',
            handler: 'login.getAuth',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
