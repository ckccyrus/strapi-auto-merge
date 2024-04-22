/**
 * custom live-pause-status router
 */

export default {
    routes: [
        {
            method: 'GET',
            path: '/live-pause-status',
            handler: 'database-crud-controller.getLivePauseStatus'
        },
        {
            method: 'PUT',
            path: '/live-pause-status/update',
            handler: 'live-pause-status.updateLivePauseStatus'
        },
        {
            method: 'GET',
            path: '/automerge/getLivePauseStatus',
            handler: 'database-crud-controller.getLivePauseStatus'
        },
        {
            method: 'PUT',
            path: '/automerge/updateLivePauseStatus',
            handler: 'live-pause-status.updateLivePauseStatus'
        }
    ]
}
