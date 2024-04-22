export default ({ env }) => ({
    "users-permissions": {
        config: {
            jwt: {
                expiresIn: '1h'
            }
        }
    },
    "content-versioning": {
        enabled: true,
    },
});
