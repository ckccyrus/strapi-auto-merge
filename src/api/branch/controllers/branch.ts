// /**
//  * branch controller
//  */

import { factories } from '@strapi/strapi';
// import Util from '../../../lib/Util';
export default factories.createCoreController('api::branch.branch');
// export default factories.createCoreController('api::branch.branch', ({ strapi }): {} => ({
//     // ----------- Actions -----------
//     // ---- get all branches ----
//     async getAllBranches(ctx) {
//         try {
//             // const _result = await strapi.service('api::branch.branch').getAllBranches();
//             // ctx.body = _result;
//             const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
//             ctx.body = _allBranches;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, "No branches exist or published!!!");
//         }
//     },
//     // ---- get sorted branches ----
//     async getSortedBranches(ctx) {
//         try {
//             // const _result = await strapi.service('api::branch.branch').getSortedBranch();
//             const _allBranches = await strapi.service('api::branch.database-crud').findAllBranches();
//             const ascendingOrder = getAscendingOrder(_allBranches);
//             ctx.body = ascendingOrder.map($eachBranch => $eachBranch.Name);
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, "No branches can be sorted!!!");
//         }
//     },
//     // ---- get all merge fail records ----
//     async getAllMergeFailRecords(ctx) {
//         const _failState = {
//             "State": "fail"
//         }

//         try {
//             // const _result = await strapi.service('api::branch.branch').getAllMergeFailRecords();
//             const _allMergeFailBranches = await strapi.service('api::branch.database-crud').findManyWithFilter(_failState);
//             ctx.body = _allMergeFailBranches;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- trigger auto merge on root ----
//     async triggerMergeOnRoot(ctx) {
//         try {
//             const _result = await strapi.service('api::branch.branch').triggerMergeOnRoot();
//             ctx.body = Util.respond({ message: "Success call to Jenkins", data: _result });
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     }
// }));

// const getAscendingOrder = ($allBranches, $parent = null) => {
//     const _result = [];
//     for (const $eachBranch of $allBranches) {
//         if ($eachBranch.Parent === $parent) {
//             _result.push($eachBranch);
//             const _children = getAscendingOrder($allBranches, $eachBranch.Name);
//             _result.push(..._children);
//         }
//     }

//     return _result;
// }