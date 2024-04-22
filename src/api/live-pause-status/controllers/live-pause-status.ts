/**
 * live-pause-status controller
 */

import { factories } from '@strapi/strapi'
import Util from '../../../lib/Util';
import { Broadcast } from '../../../lib/Utils';

export default factories.createCoreController('api::live-pause-status.live-pause-status', ({ strapi }): {} => ({
    async updateLivePauseStatus(ctx){
        if (!ctx.request.body) {
            return Util.ErrorMessage.generateMessage(ctx, "Missing body for updating live pause status!!!");
        }

        const _data = ctx.request.body;
        try {
            const _result = await strapi.service('api::live-pause-status.live-pause-status').updateLivePauseStatus(_data);
            ctx.body = _result;

            const _broadcastRes = {
                eventType:"livePauseStatus",
                data:_result
            }
            Broadcast(JSON.stringify(_broadcastRes));
        } catch (err) {
            return Util.ErrorMessage.generateMessage(ctx, err);
        }
    }
}));
