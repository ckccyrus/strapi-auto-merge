export default {
    routes: [
        {
            method: 'POST',
            path: '/branches/mergeStart',
            handler: 'merge-action-controller.mergeStart'
        },
        {
            method: 'POST',
            path: '/branches/mergeSuccess',
            handler: 'merge-action-controller.mergeSuccess'
        },
        {
            method: 'POST',
            path: '/branches/mergeFail',
            handler: 'merge-action-controller.mergeFail'
        },
        {
            method: 'POST',
            path: '/automerge/mergeStart',
            handler: 'merge-action-controller.mergeStart'
        },
        {
            method: 'POST',
            path: '/automerge/mergeSuccess',
            handler: 'merge-action-controller.mergeSuccess'
        },
        {
            method: 'POST',
            path: '/automerge/mergeFail',
            handler: 'merge-action-controller.mergeFail'
        }
    ]
}