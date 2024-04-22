/**
 * branch-crud service
 */

// import Util from "../../../lib/Util";

// export default () => ({
//     // ----------- find a branch by name -----------
//     async findBranch($targetBranch) {
//         Util.log("DEBUG::branch-crud [findBranch] $targetBranch", $targetBranch);

//         if (!$targetBranch) { throw new Error(`Missing params for finding ${$targetBranch}!!!`) }

//         try {
//             const _branch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//             return _branch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- add parent from a target -----------
//     async addParent($targetBranch, $data) {
//         Util.log("DEBUG::branch-crud [addParent] $targetBranch", $targetBranch);
//         Util.log("DEBUG::branch-crud [addParent] $data", $data);

//         if (!$targetBranch || !$data) { throw new Error(`Missing params for adding parent from ${$targetBranch}!!!`) }

//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//         const _targetBranchName = _targetBranch.Name;
//         const _targetBranchParent = _targetBranch.Parent;

//         try {
//             const _newParentBranch = await createNewBranchWithParent($data, _targetBranchParent);
//             const _newParentBranchName = _newParentBranch.Name;
//             const _updatedTargetBranch = await strapi.service('api::branch.database-crud').updateByName(_targetBranchName, { Parent: _newParentBranchName });
//             return _updatedTargetBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- add child from a target -----------
//     async addChild($targetBranch, $data) {
//         Util.log("DEBUG::branch-crud [addChild] $targetBranch", $targetBranch);
//         Util.log("DEBUG::branch-crud [addChild] $data", $data);

//         if (!$targetBranch || !$data) { throw new Error(`Missing params for adding child from ${$targetBranch}!!!`) }

//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//         const _targetBranchName = _targetBranch.Name;
//         const _targetBranchChildren = await getChildren(_targetBranchName);

//         try {
//             const _newChildBranch = await createNewBranchWithParent($data, _targetBranchName);
//             const _newChildBranchName = _newChildBranch.Name;
//             await updateTargetChildrenParent(_targetBranchChildren, _newChildBranchName);
//             return _newChildBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- add sibling from a target -----------
//     async addSibling($targetBranch, $data) {
//         Util.log("DEBUG::branch-crud [addSibling] $targetBranch", $targetBranch);
//         Util.log("DEBUG::branch-crud [addSibling] $data", $data);

//         if (!$targetBranch || !$data) { throw new Error(`Missing params for adding sibling from ${$targetBranch}!!!`) }

//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//         const _targetBranchParent = _targetBranch.Parent;

//         try {
//             const _newSiblingBranch = await createNewBranchWithParent($data, _targetBranchParent);
//             return _newSiblingBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- update branch by name -----------
//     async updateBranch($targetBranch, $data) {
//         Util.log("DEBUG::branch-crud [updateBranch] $targetBranch", $targetBranch);
//         Util.log("DEBUG::branch-crud [updateBranch] $data", $data);

//         if (!$targetBranch || !$data) { throw new Error(`Missing params for updating ${$targetBranch}!!!`) }

//         try {
//             const _updatedBranch = await strapi.service('api::branch.database-crud').updateByName($targetBranch, $data);
//             return _updatedBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- remove branch by name -----------
//     async removeBranch($targetBranch) {
//         Util.log("DEBUG::branch-crud [removeBranch] $targetBranch", $targetBranch);

//         if (!$targetBranch) { throw new Error(`Missing params for removing ${$targetBranch}!!!`) }

//         const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//         const _targetBranchName = _targetBranch.Name;
//         const _targetBranchParent = _targetBranch.Parent;
//         const _targetBranchState = _targetBranch.State;

//         if (_targetBranchState === 'fail') { throw new Error(`Cannot remove branch ${$targetBranch} in fail state!!!`) }

//         const _targetBranchChildren = await getChildren(_targetBranchName);

//         try {
//             await updateTargetChildrenParent(_targetBranchChildren, _targetBranchParent);
//             const _deletedBranch = await strapi.service('api::branch.database-crud').deleteByName(_targetBranchName);
//             return _deletedBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     }
// });

// const createNewBranchWithParent = async function ($branchData, $parent) {
//     const _newBranchData = Object.assign($branchData, { Parent: $parent });
//     const _newBranch = await strapi.service('api::branch.database-crud').createBranch(_newBranchData);

//     return _newBranch;
// }

// const getChildren = async function ($parent) {
//     const _result = await strapi.service('api::branch.database-crud').findAllChildren($parent);
//     return _result;
// }

// const updateTargetChildrenParent = async function ($targetBranchChildren, $parent) {
//     if ($targetBranchChildren.length === 0) return

//     for (let i = 0; i < $targetBranchChildren.length; i++) {
//         await strapi.service('api::branch.database-crud').updateByName($targetBranchChildren[i].Name, { Parent: $parent });
//     }
// }

import { Checker, Logger, Request, ServiceReturn } from "../../../lib/Utils";
import { parentData, childData, siblingData, updateBranchData } from "../../../types/branchData";

enum JenkinsAutoMergeLink {
    PROD = "http://frontend:11913dd31dfa64a46dc30a489150fe5572@192.168.1.216:9000/job/Auto-Merge/build/?token=1234567890"
}

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;
    const findBranch = async ($targetBranch: string) => {
        Logger("[findBranch] $targetBranch :>>", $targetBranch)

        return await ServiceReturn(_serviceName, async () => {
            return await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
        })
    }

    const addParent = async ($targetBranch: string, $data: parentData) => {
        Logger("[addParent] $targetBranch :>>", $targetBranch);

        return await ServiceReturn(_serviceName, async () => {
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
            const { Name: _targetBranchName, Parent: _targetBranchParent } = _targetBranch;

            const _newParentBranch = await createNewBranchWithParent($data, _targetBranchParent);
            const { Name: _newParentBranchName } = _newParentBranch;
            return await strapi.service('api::branch.database-crud').updateByName(_targetBranchName, { Parent: _newParentBranchName });
        })
    }

    const addChild = async ($targetBranch: string, $data: childData) => {
        Logger("[addChild] $targetBranch :>>", $targetBranch);

        return await ServiceReturn(_serviceName, async () => {
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
            const { Name: _targetBranchName } = _targetBranch;
            const _targetBranchChildren = await getChildren(_targetBranchName);

            const _newChildBranch = await createNewBranchWithParent($data, _targetBranchName);
            const { Name: _newChildBranchName } = _newChildBranch;
            await updateTargetChildrenParent(_targetBranchChildren, _newChildBranchName);
            return _newChildBranch;
        })
    }

    const addSibling = async ($targetBranch: string, $data: siblingData) => {
        Logger("[addSibling] $targetBranch :>>", $targetBranch);

        return await ServiceReturn(_serviceName, async () => {
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
            const { Parent: _targetBranchParent } = _targetBranch;

            return await createNewBranchWithParent($data, _targetBranchParent);
        })
    }

    const updateBranch = async ($targetBranch: string, $data: updateBranchData) => {
        Logger("[updateBranch] $targetBranch :>>", $targetBranch);

        return await ServiceReturn(_serviceName, async () => {
            return await strapi.service('api::branch.database-crud').updateByName($targetBranch, $data);
        })
    }

    const removeBranch = async ($targetBranch: string) => {
        Logger("[updateBranch] $targetBranch :>>", $targetBranch);

        return await ServiceReturn(_serviceName, async () => {
            const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
            const { Name, Parent, State } = _targetBranch;
            if (State === 'fail') { throw new Error(`Cannot remove branch ${$targetBranch} in fail state!!!`) }

            const _targetBranchChildren = await getChildren(Name);
            await updateTargetChildrenParent(_targetBranchChildren, Parent);
            return await strapi.service('api::branch.database-crud').deleteByName(Name);
        })
    }

    const triggerMergeOnRoot = async () => {
        const config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: JenkinsAutoMergeLink.PROD,
            auth: {
                username: 'frontend',
                password: 'frontenduser' // Bad password
            }
        };

        await Request(config)
    }

    const createNewBranchWithParent = async function ($branchData: any, $parent: string) {
        const _newBranchData = Object.assign($branchData, { Parent: $parent });
        return await strapi.service('api::branch.database-crud').createBranch(_newBranchData);
    }

    const getChildren = async function ($parent: string) {
        return await strapi.service('api::branch.database-crud').findAllChildren($parent);
    }

    const updateTargetChildrenParent = async function ($targetBranchChildren: any, $parent: string) {
        if ($targetBranchChildren.length === 0) return

        for (let i = 0; i < $targetBranchChildren.length; i++) {
            await strapi.service('api::branch.database-crud').updateByName($targetBranchChildren[i].Name, { Parent: $parent });
        }
    }

    return {
        findBranch,
        addParent,
        addChild,
        addSibling,
        updateBranch,
        removeBranch,
        triggerMergeOnRoot
    }
}