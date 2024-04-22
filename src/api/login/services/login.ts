/**
 * login service
 */

export default () => ({
    async getAuth($user) {
        return await strapi.plugins['users-permissions'].services.jwt.issue({
            id: 2,
            username: $user,
        })
    }
});
