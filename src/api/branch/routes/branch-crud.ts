export default {
    routes: [
        {
            method: 'POST',
            path: '/branches/addParent',
            handler: 'branch-crud-controller.addParent'
        },
        {
            method: 'POST',
            path: '/branches/addChild',
            handler: 'branch-crud-controller.addChild'
        },
        {
            method: 'POST',
            path: '/branches/addSibling',
            handler: 'branch-crud-controller.addSibling'
        },
        {
            method: 'PUT',
            path: '/branches/updateBranch',
            handler: 'branch-crud-controller.updateBranch'
        },
        {
            method: 'DELETE',
            path: '/branches/removeBranch',
            handler: 'branch-crud-controller.removeBranch'
        },
        {
            method: 'GET',
            path: '/branches/findBranch',
            handler: 'branch-crud-controller.findBranch'
        },
        {
            method: 'GET',
            path: '/branches/getAllBranches',
            handler: 'branch-crud-controller.getAllBranches'
        },
        {
            method: 'GET',
            path: '/branches/get/auth_allBranches',
            handler: 'branch-crud-controller.getAllBranches'
        },
        {
            method: 'GET',
            path: '/branches/getSortedBranches',
            handler: 'branch-crud-controller.getSortedBranches'
        },
        {
            method: 'GET',
            path: '/branches/getAutomationBranches',
            handler: 'branch-crud-controller.getAutomationBranches'
        },
        {
            method: 'GET',
            path: '/branches/getParentBranches',
            handler: 'branch-crud-controller.getParentBranches'
        },
        {
            method: 'GET',
            path: '/branches/getAllMergeFailRecords',
            handler: 'branch-crud-controller.getAllMergeFailRecords'
        },
        {
            method: 'GET',
            path: '/branches/triggerMergeOnRoot',
            handler: 'branch-crud-controller.triggerMergeOnRoot'
        },
        {
            method: 'POST',
            path: '/automerge/addParent',
            handler: 'branch-crud-controller.addParent'
        },
        {
            method: 'POST',
            path: '/automerge/addChild',
            handler: 'branch-crud-controller.addChild'
        },
        {
            method: 'POST',
            path: '/automerge/addSibling',
            handler: 'branch-crud-controller.addSibling'
        },
        {
            method: 'PUT',
            path: '/automerge/updateBranch',
            handler: 'branch-crud-controller.updateBranch'
        },
        {
            method: 'DELETE',
            path: '/automerge/removeBranch',
            handler: 'branch-crud-controller.removeBranch'
        },
        {
            method: 'GET',
            path: '/automerge/findBranch',
            handler: 'branch-crud-controller.findBranch'
        },
        {
            method: 'GET',
            path: '/automerge/getAllBranches',
            handler: 'branch-crud-controller.getAllBranches'
        },
        {
            method: 'GET',
            path: '/automerge/get/auth_allBranches',
            handler: 'branch-crud-controller.getAllBranches'
        },
        {
            method: 'GET',
            path: '/automerge/getSortedBranches',
            handler: 'branch-crud-controller.getSortedBranches'
        },
        {
            method: 'GET',
            path: '/automerge/getAutomationBranches',
            handler: 'branch-crud-controller.getAutomationBranches'
        },
        {
            method: 'GET',
            path: '/automerge/getParentBranches',
            handler: 'branch-crud-controller.getParentBranches'
        },
        {
            method: 'GET',
            path: '/automerge/getAllMergeFailRecords',
            handler: 'branch-crud-controller.getAllMergeFailRecords'
        },
        {
            method: 'GET',
            path: '/automerge/triggerMergeOnRoot',
            handler: 'branch-crud-controller.triggerMergeOnRoot'
        }
    ]
}