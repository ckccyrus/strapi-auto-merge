/**
 * database-crud service
 */

import Util from "../../../lib/Util";

export default () => ({
    async findLivePauseStatus() {
        Util.log("DEBUG::DatabaseCRUD [findLivePauseStatus]");

        const _status = await strapi.entityService.findMany('api::live-pause-status.live-pause-status');

        if (!_status) { //error handling
            throw new Error(`find() is not available!!!`);
        }

        return _status;
    },
    async update($data) {
        Util.log("DEBUG::DatabaseCRUD [update] $data", $data);

        const _self = this;
        const _originalStatus = await _self.findLivePauseStatus();
        const _statusId = _originalStatus.id;

        const _newData = { //only update the specific data (== append the new data to saved data)
            ..._originalStatus,
            ...$data
        }

        try {
            const _entry = await strapi.entityService.update('api::live-pause-status.live-pause-status', _statusId, {
                data: _newData
            })
            return _entry;
        } catch (e) {
            throw new Error(`Live pause status cannot be updated!!!`);;
        }
    }
})