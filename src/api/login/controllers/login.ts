/**
 * A set of functions called "actions" for `login`
 */

import Util from "../../../lib/Util";

export default {
    getAuth: async (ctx) => {
        if (!ctx.request.query.user) {
            // ctx.body = "Missing user for getAuth!!!";
            return Util.respond({ message: "Missing user for getAuth!!!" });
        }

        const _user = ctx.request.query.user;

        try {
            const _result = await strapi.service('api::login.login').getAuth(_user);
            ctx.body = _result;
        } catch (err) {
            return Util.ErrorMessage.generateMessage(ctx, err);
        }
    }
};
