/**
 * A set of functions called "actions" for `branch-crud-controller`
 */

// import Util from "../../../lib/Util";

// export default {
//     // ---- find a branch by name ----
//     async findBranch(ctx) {
//         if (!ctx.request.params.name) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for finding branch!!!");
//         }
//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').findBranch(_targetBranch);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- add parent ----
//     async addParent(ctx) {
//         if (!ctx.request.params.name || Object.keys(ctx.request.body).length == 0) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for adding parent branch!!!");
//         }

//         const _data = ctx.request.body;
//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').addParent(_targetBranch, _data);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- add child ----
//     async addChild(ctx) {
//         if (!ctx.request.params.name || Object.keys(ctx.request.body).length == 0) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for adding child branch!!!");
//         }

//         const _data = ctx.request.body;
//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').addChild(_targetBranch, _data);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- add sibling ----
//     async addSibling(ctx) {
//         if (!ctx.request.params.name || Object.keys(ctx.request.body).length == 0) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for adding sibling branch!!!");
//         }

//         const _data = ctx.request.body;
//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').addSibling(_targetBranch, _data);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }

//     },
//     // ---- update branch ----
//     async updateBranch(ctx) {
//         if (!ctx.request.params.name || Object.keys(ctx.request.body).length == 0) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for updating branch!!!");
//         }

//         const _data = ctx.request.body;
//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').updateBranch(_targetBranch, _data);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- remove branch ----
//     async removeBranch(ctx) {
//         if (!ctx.request.params.name) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for deleting branch!!!");
//         }

//         const _targetBranch = ctx.request.params.name;

//         try {
//             const _result = await strapi.service('api::branch.branch-crud').removeBranch(_targetBranch);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
// };

import { Checker, RequestService } from "../../../lib/Utils";

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;
    const addParent = async ($ctx: any) => {
        const _data = $ctx.request.body;
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            Checker.checkObjectHasProperties(_data);
            $ctx.body = await strapi.service('api::branch.branch-crud').addParent(_targetBranch, _data);
        })
    }
    const addChild = async ($ctx: any) => {
        const _data = $ctx.request.body;
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            Checker.checkObjectHasProperties(_data);
            $ctx.body = await strapi.service('api::branch.branch-crud').addChild(_targetBranch, _data);
        })
    }
    const addSibling = async ($ctx: any) => {
        const _data = $ctx.request.body;
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            Checker.checkObjectHasProperties(_data);
            $ctx.body = await strapi.service('api::branch.branch-crud').addSibling(_targetBranch, _data);
        })
    }
    const updateBranch = async ($ctx: any) => {
        const _data = $ctx.request.body;
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            Checker.checkObjectHasProperties(_data);
            $ctx.body = await strapi.service('api::branch.branch-crud').updateBranch(_targetBranch, _data);
        })
    }
    const removeBranch = async ($ctx: any) => {
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            $ctx.body = await strapi.service('api::branch.branch-crud').removeBranch(_targetBranch);
        })
    }

    // ----------- Read only -----------
    const findBranch = async ($ctx: any) => {
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            $ctx.body = await strapi.service('api::branch.branch-crud').findBranch(_targetBranch);
        })
    }
    const getAllBranches = async ($ctx: any) => {
        await RequestService($ctx, _serviceName, async () => {
            $ctx.body = await strapi.service('api::branch.database-crud').findAllBranches();
        })
    }

    const getSortedBranches = async ($ctx: any) => {
        await RequestService($ctx, _serviceName, async () => {
            const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
            const ascendingOrder = getAscendingOrder(_allBranches);
            $ctx.body = ascendingOrder.map($eachBranch => $eachBranch.Name);
        })
    }
    const getAutomationBranches = async ($ctx: any) => {
        await RequestService($ctx, _serviceName, async () => {
            const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
            const ascendingOrder = getAscendingOrder(_allBranches);
            const _arr = [];

            ascendingOrder.forEach($eachBranch => {
                if($eachBranch.RunAutomation){
                    _arr.push($eachBranch.Name)
                }
            })
            $ctx.body = _arr;
        })
    }

    const getParentBranches = async ($ctx: any) => {
        await RequestService($ctx, _serviceName, async () => {
            const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
            const ascendingOrder = getAscendingOrder(_allBranches);
            $ctx.body = ascendingOrder.map(($eachBranch) => { return {Name: $eachBranch.Name, Parent: $eachBranch.Parent}});
        })
    }

    const getAllMergeFailRecords = async ($ctx: any) => {
        const _failState = { "State": "fail" };
        await RequestService($ctx, _serviceName, async () => {
            $ctx.body = await strapi.service('api::branch.database-crud').findManyWithFilter(_failState);
        })

    }

    const triggerMergeOnRoot = async ($ctx: any) => {
        await RequestService($ctx, _serviceName, async () => {
            await strapi.service('api::branch.branch-crud').triggerMergeOnRoot();
            $ctx.body = { data: "Success" };
        })
    }

    const getAscendingOrder = ($allBranches, $parent = null) => {
        const _result = [];
        for (const $eachBranch of $allBranches) {
            if ($eachBranch.Parent === $parent) {
                _result.push($eachBranch);
                const _children = getAscendingOrder($allBranches, $eachBranch.Name);
                _result.push(..._children);
            }
        }
        return _result;
    }

    return {
        addParent,
        addChild,
        addSibling,
        updateBranch,
        removeBranch,
        // ----------- Read only -----------
        findBranch,
        getAllBranches,
        getAutomationBranches,
        getSortedBranches,
        getParentBranches,
        getAllMergeFailRecords,
        triggerMergeOnRoot
    }
}