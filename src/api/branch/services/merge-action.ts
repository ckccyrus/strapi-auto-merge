// /**
//  * merge-action service
//  */

// import Util from "../../../lib/Util";

// export default () => ({
//     // ----------- merge start from a root branch -----------
//     async mergeStart($rootBranch) {
//         Util.log("DEBUG::merge-action [mergeStart] $rootBranch", $rootBranch);

//         if (!$rootBranch) { throw new Error(`Missing root for trigger merge start from ${$rootBranch}!!!`) }

//         const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
//         const _allSubBranches = await getSubBranches($rootBranch, _allBranches);
//         const _pendingState = { 'State': 'pending' };

//         for (let i = 0; i < _allSubBranches.length; i++) {
//             await strapi.service('api::branch.database-crud').updateByName(_allSubBranches[i], _pendingState);
//         }

//         return _allSubBranches;
//     },
//     // ----------- merge success to the target branch -----------
//     async mergeSuccess($parent, $target) {
//         Util.log("DEBUG::merge-action [mergeSuccess] $parent", $parent);
//         Util.log("DEBUG::merge-action [mergeSuccess] $target", $target);

//         if (!$parent || !$target) { throw new Error(`Missing params for trigger merge success from ${$parent} to ${$target}!!!`) }

//         const _filter = {
//             Name: $target,
//             Parent: $parent
//         }
//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneWithFilter(_filter);

//         if (_targetBranch) {
//             const _successState = { 'State': 'success' };
//             const _emptyMergeFailCommitMsg = { 'MergeFailCommitMessage': '' };
//             const _updatedTargetBranch = await strapi.service('api::branch.database-crud').updateByName($target, Object.assign(_successState, _emptyMergeFailCommitMsg));
//             return _updatedTargetBranch;
//         } else {
//             throw new Error(`${$target} does not exist!!!`);
//         }
//     },
//     // ----------- merge fail to the target branch -----------
//     async mergeFail($parent, $target, $failMessage) {
//         Util.log("DEBUG::merge-action [mergeFail] $parent", $parent);
//         Util.log("DEBUG::merge-action [mergeFail] $target", $target);
//         Util.log("DEBUG::merge-action [mergeFail] $failMessage", $failMessage);

//         if (!$parent || !$target) { throw new Error(`Missing params for trigger merge fail from ${$parent} to ${$target}!!!`) }

//         const _filter = {
//             Name: $target,
//             Parent: $parent
//         }
//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneWithFilter(_filter);

//         if (_targetBranch) {
//             const _successState = { 'State': 'fail' };
//             const _updatedMergeFailCommitMsg = ($failMessage) ? { 'MergeFailCommitMessage': $failMessage } : { 'MergeFailCommitMessage': '' };
//             const _updatedTargetBranch = await strapi.service('api::branch.database-crud').updateByName($target, Object.assign(_successState, _updatedMergeFailCommitMsg));
//             return _updatedTargetBranch;
//         } else {
//             throw new Error(`${$target} does not exist!!!`);
//         }
//     }
// });

// const getSubBranches = async function ($nodeName, $allBranches) {
//     const _children = [];

//     for (const $eachBranch of $allBranches) {
//         if ($eachBranch.Parent == $nodeName) {
//             _children.push($eachBranch.Name);
//             _children.push(...await getSubBranches($eachBranch.Name, $allBranches));
//         }
//     }

//     return _children;
// }

import { Checker, Logger, ServiceReturn } from "../../../lib/Utils";

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;

    const mergeStart = async ($rootBranch: string) => {
        Logger("[mergeStart] $rootBranch :>>", $rootBranch)

        return await ServiceReturn(_serviceName, async () => {
            const _pendingState = { 'State': 'pending' };
            const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
            const _allSubBranches = await getSubBranches($rootBranch, _allBranches);

            for (let i = 0; i < _allSubBranches.length; i++) {
                await strapi.service('api::branch.database-crud').updateByName(_allSubBranches[i], _pendingState);
            }

            return _allSubBranches;
        })
    }

    const mergeSuccess = async ($parent: string, $target: string) => {
        Logger("[mergeSuccess] $parent :>>", $parent, '$target :>>', $target);

        return await ServiceReturn(_serviceName, async () => {
            const _filter = { Name: $target, Parent: $parent };
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneWithFilter(_filter);

            if (_targetBranch) {
                const _successState = { 'State': 'success' };
                const _emptyMergeFailCommitMsg = { 'MergeFailCommitMessage': '' };
                return await strapi.service('api::branch.database-crud').updateByName($target, Object.assign(_successState, _emptyMergeFailCommitMsg));
            }
        })
    }

    const mergeFail = async ($parent: string, $target: string, $failMessage: string) => {
        Logger("[mergeSuccess] $parent :>>", $parent, '$target :>>', $target, '$failMessage :>>', $failMessage);

        return await ServiceReturn(_serviceName, async () => {
            const _filter = { Name: $target, Parent: $parent };
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneWithFilter(_filter);

            if (_targetBranch) {
                const _successState = { 'State': 'fail' };
                const _updatedMergeFailCommitMsg = ($failMessage) ? { 'MergeFailCommitMessage': $failMessage } : { 'MergeFailCommitMessage': '' };
                return await strapi.service('api::branch.database-crud').updateByName($target, Object.assign(_successState, _updatedMergeFailCommitMsg));
            }
        })
    }

    const getSubBranches = async function ($nodeName: string, $allBranches: any) {
        const _children = [];

        for (const $eachBranch of $allBranches) {
            if ($eachBranch.Parent == $nodeName) {
                _children.push($eachBranch.Name);
                _children.push(...await getSubBranches($eachBranch.Name, $allBranches));
            }
        }

        return _children;
    }


    return {
        mergeStart,
        mergeSuccess,
        mergeFail
    }
}