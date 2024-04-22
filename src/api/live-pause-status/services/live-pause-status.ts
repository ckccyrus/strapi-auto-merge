/**
 * live-pause-status service
 */

import { factories } from '@strapi/strapi';
import Util from '../../../lib/Util';
import timestamp from 'time-stamp';

export default factories.createCoreService('api::live-pause-status.live-pause-status', ({ strapi }): {} => ({
    async updateLivePauseStatus($data){
        Util.log("DEBUG::live-pause-status [updateLivePauseState] $data", $data);

        if (!$data.user || !$data.status) { throw new Error(`Missing params for updating live pause status!!!`) }

        const _date = timestamp('YYYY-MM-DD HH:mm:ss');
    
        const _user = $data.user;
        const _status = $data.status;
        const _newData = {
            LastTriggerUser: _user,
            LastTriggerDate: _date,
            Status: _status,
        }

        try {
            const _result = await strapi.service('api::live-pause-status.database-crud').update(_newData);
            return _result;
        } catch (e) {
            throw new Error(e);
        }
    }
}));
