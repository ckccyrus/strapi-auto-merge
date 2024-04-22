/**
 * A set of functions called "actions" for `database-crud-controller`
 */

import Util from "../../../lib/Util";

export default {
    getLivePauseStatus: async (ctx) => {
        try {
            const _result = await strapi.service('api::live-pause-status.database-crud').findLivePauseStatus();
            ctx.body = _result;
        } catch (err) {
            return Util.ErrorMessage.generateMessage(ctx, err);
        }
    }
};
