export default {
    routes: [
        {
            method: 'PUT',
            path: '/branches/updatePreviewStatus',
            handler: 'preview-action-controller.updatePreviewStatus'
        },
        {
            method: 'PUT',
            path: '/branches/updatePreviewCommit',
            handler: 'preview-action-controller.updatePreviewCommit'
        },
        {
            method: 'POST',
            path: '/branches/buildPreview',
            handler: 'preview-action-controller.buildPreview'
        },
        {
            method: 'PUT',
            path: '/automerge/updatePreviewStatus',
            handler: 'preview-action-controller.updatePreviewStatus'
        },
        {
            method: 'PUT',
            path: '/automerge/updatePreviewCommit',
            handler: 'preview-action-controller.updatePreviewCommit'
        },
        {
            method: 'POST',
            path: '/automerge/buildPreview',
            handler: 'preview-action-controller.buildPreview'
        }
    ]
}