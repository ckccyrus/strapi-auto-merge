// /**
//  * database-crud service
//  */

// import Util from "../../../lib/Util";
// import timestamp from "time-stamp";

// export default () => ({
//     // ----------- find one branch data by name -----------
//     async findOneByName($branchName: any) {
//         Util.log("DEBUG::DatabaseCRUD [findOneByName] $branchName", $branchName);

//         if (!$branchName) { throw new Error("Missing params for finding branch!!!") }

//         const _entry = await strapi.db.query('api::branch.branch').findOne({
//             where: { Name: $branchName },
//             populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
//         });

//         if (!_entry) { //error handling
//             throw new Error(`${$branchName} does not exist!!!`);
//         }

//         return _entry;
//     },
//     // ----------- find one branch data with filter -----------
//     async findOneWithFilter($filter: any) {
//         Util.log("DEBUG::DatabaseCRUD [findOneWithFilter] $filter", $filter);

//         if (!$filter) { throw new Error("Missing params for finding branch with filter!!!") }

//         const _entry = await strapi.db.query('api::branch.branch').findOne({
//             where: $filter,
//             populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
//         });

//         if (!_entry) { //error handling
//             throw new Error(`Specific branch does not exist!!!`);
//         }

//         return _entry;
//     },
//     // ----------- find all branches data -----------
//     async findAllBranches() {
//         Util.log("DEBUG::DatabaseCRUD [findAllBranches]");

//         const _allBranches = await strapi.entityService.findMany('api::branch.branch', {
//             populate: '*'
//         })

//         if (!_allBranches) { //error handling
//             throw new Error(`findMany() is not available!!!`);
//         }

//         return _allBranches
//     },
//     // ----------- find one branch data with filter -----------
//     async findManyWithFilter($filter: any) {
//         Util.log("DEBUG::DatabaseCRUD [findManyWithFilter] $filter", $filter);

//         if (!$filter) { throw new Error("Missing params for finding branches with filter!!!") }

//         const _allBranches = await strapi.entityService.findMany('api::branch.branch', {
//             filters: $filter,
//             populate: '*'
//         })

//         if (!_allBranches) { //error handling
//             throw new Error(`findMany() is not available!!!`);
//         }
//         return _allBranches;
//     },
//     // ----------- find all children branches data by name-----------
//     async findAllChildren($parent) {
//         Util.log("DEBUG::DatabaseCRUD [findAllChildren] $parent", $parent);

//         const _allChildrenBranches = await strapi.entityService.findMany('api::branch.branch', {
//             fields: ['Name', 'id'],
//             filters: {
//                 Parent: $parent
//             }
//         })

//         if (!_allChildrenBranches) { //error handling
//             throw new Error(`findMany() is not available!!!`);
//         }

//         return _allChildrenBranches
//     },
//     // ----------- update one branch by name -----------
//     async updateByName($branchName, $data) {
//         Util.log('DEBUG::DatabaseCRUD [updateByName] $branchName', $branchName);
//         Util.log('DEBUG::DatabaseCRUD [updateByName] $data', $data);

//         if (!$branchName || !$data) { throw new Error("Missing params for updating branch!!!") }

//         const _self = this;
//         const _branchData = await _self.findOneByName($branchName);

//         if (!_branchData.id) { throw new Error(`${$branchName} does not exist!!!`) }

//         const _branchId = _branchData.id;
//         const _newData = { //only update the specific data (== append the new data to saved data)
//             ..._branchData,
//             ...$data,
//             'PreviewStatus': {
//                 ..._branchData.PreviewStatus,
//                 ...$data.PreviewStatus
//             },
//             'BuiltStatus': {
//                 ..._branchData.BuiltStatus,
//                 ...$data.BuiltStatus
//             },
//             'PreviewCommit': {
//                 ..._branchData.PreviewCommit,
//                 ...$data.PreviewCommit
//             }
//         }
//         if(!_newData.LaunchDate) _newData.LaunchDate = null; //reset date type
//         if(!_newData.ImplementationDate) _newData.ImplementationDate = null; //reset date type

//         Util.log('DEBUG::DatabaseCRUD [updateByName] _branchId', _branchId);
//         Util.log('DEBUG::DatabaseCRUD [updateByName] _newData', _newData);

//         try {
//             const _entry = await strapi.entityService.update('api::branch.branch', _branchId, {
//                 data: _newData,
//                 populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
//             })
//             return _entry;
//         } catch (e) {
//             throw new Error(`${$branchName} cannot be updated!!!`);;
//         }
//     },
//     // ----------- create a new branch -----------
//     async createBranch($data) {
//         Util.log('DEBUG::DatabaseCRUD [createBranch] $data', $data);

//         if (!$data) { throw new Error("Missing params for creating branch!!!") }

//         const _publishDate = { publishedAt: timestamp('YYYY-MM-DD HH:mm:ss') };
//         const _defaultComponentData = {
//             PreviewStatus: {
//                 IsUpdated: true,
//                 IsSuccess: true
//             },
//             PreviewCommit: {
//                 MergeCommit: "",
//             },
//             BuiltStatus: {
//                 IsBuilt: false,
//             },
//         }
//         const _combinedData = Object.assign($data, _defaultComponentData);
//         const _newData = Object.assign(_combinedData, _publishDate);

//         try {
//             const _entry = await strapi.entityService.create('api::branch.branch', {
//                 data: _newData,
//                 populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus'],
//             })
//             return _entry;
//         } catch (e) {
//             throw new Error(`${_newData.Name} cannot be created!!!`);
//         }
//     },
//     // ----------- delete one branch by name -----------
//     async deleteByName($branchName) {
//         Util.log('DEBUG::DatabaseCRUD [deleteByName] $branchName', $branchName);

//         if (!$branchName) { throw new Error("Missing params for deleting branch!!!") }

//         const _self = this;
//         const _branchData = await _self.findOneByName($branchName);

//         if (!_branchData.id) { throw new Error(`${$branchName} does not exist!!!`) }

//         const _branchId = _branchData.id;

//         try {
//             const _entry = await strapi.entityService.delete('api::branch.branch', _branchId);
//             return _entry;
//         } catch (e) {
//             throw new Error(`${$branchName} cannot be deleted!!!`);
//         }
//     }
// });

import timestamp from "time-stamp";
import { Checker, Logger, ServiceReturn } from "../../../lib/Utils";

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;

    const findOneByName = async ($branchName: string) => {
        Logger("[findOneByName] $branchName :>>", $branchName)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue<string>($branchName);
            const _entry = await strapi.db.query('api::branch.branch').findOne({
                where: { Name: $branchName },
                populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
            });
            if (!_entry) { //error handling
                throw new Error(`${$branchName} does not exist!!!`);
            }

            return _entry;
        })
    }

    const findOneWithFilter = async ($filter: any) => {
        Logger("[findOneWithFilter] $filter :>>", $filter)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkObjectHasProperties($filter);
            const _entry = await strapi.db.query('api::branch.branch').findOne({
                where: $filter,
                populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
            });
            Checker.checkHasValue(_entry);
            // if (!_entry) { //error handling
            //     throw new Error(`Specific branch does not exist!!!`);
            // }

            return _entry;
        })
    }

    const findAllBranches = async () => {
        Logger("[findAllBranches]")

        return await ServiceReturn(_serviceName, async () => {
            return await strapi.entityService.findMany('api::branch.branch', {
                populate: '*'
            })
        })
    }

    const findManyWithFilter = async ($filter: any) => {
        Logger("[findManyWithFilter] $filter :>>", $filter)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue($filter);
            return await strapi.entityService.findMany('api::branch.branch', {
                filters: $filter,
                populate: '*'
            })
        })
    }

    const findAllChildren = async ($parent: string) => {
        Logger("[findAllChildren] $parent :>>", $parent)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue($parent);
            return await strapi.entityService.findMany('api::branch.branch', {
                fields: ['Name', 'id'],
                filters: {
                    Parent: $parent
                }
            })
        })
    }

    const updateByName = async ($branchName: string, $data: any) => {
        Logger("[updateByName] $branchName :>>", $branchName, "$data :>>", $data)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue<string>($branchName);
            Checker.checkHasValue($data);
            const _branchData = await findOneByName($branchName);
            if (!_branchData.id) { throw new Error(`${$branchName} does not exist!!!`) }

            const _newData = { //only update the specific data (== append the new data to saved data)
                ..._branchData,
                ...$data,
                'PreviewStatus': {
                    ..._branchData.PreviewStatus,
                    ...$data.PreviewStatus
                },
                'BuiltStatus': {
                    ..._branchData.BuiltStatus,
                    ...$data.BuiltStatus
                },
                'PreviewCommit': {
                    ..._branchData.PreviewCommit,
                    ...$data.PreviewCommit
                }
            }

            if (!_newData.LaunchDate) _newData.LaunchDate = null; //reset date type
            if (!_newData.ImplementationDate) _newData.ImplementationDate = null; //reset date type

            return await strapi.entityService.update('api::branch.branch', _branchData.id, {
                data: _newData,
                populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus']
            })
        })
    }

    const createBranch = async ($data: any) => {
        Logger("[createBranch] $data :>>", $data)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue($data);

            const _publishDate = { publishedAt: timestamp('YYYY-MM-DD HH:mm:ss') };
            const _defaultComponentData = {
                PreviewStatus: {
                    IsUpdated: true,
                    IsSuccess: true
                },
                PreviewCommit: {
                    MergeCommit: "",
                },
                BuiltStatus: {
                    IsBuilt: false,
                },
            }
            const _combinedData = Object.assign($data, _defaultComponentData);
            const _newData = Object.assign(_combinedData, _publishDate);
            return await strapi.entityService.create('api::branch.branch', {
                data: _newData,
                populate: ['PreviewStatus', 'PreviewCommit', 'BuiltStatus'],
            })
        })
    }

    const deleteByName = async ($branchName: string) => {
        Logger("[createBranch] $branchName :>>", $branchName)

        return await ServiceReturn(_serviceName, async () => {
            Checker.checkHasValue($branchName);

            const _branchData = await findOneByName($branchName);
            if (!_branchData.id) { throw new Error(`${$branchName} does not exist!!!`) }
            return await strapi.entityService.delete('api::branch.branch', _branchData.id);
        })
    }


    return {
        findOneByName,
        findOneWithFilter,
        findAllBranches,
        findManyWithFilter,
        findAllChildren,
        updateByName,
        createBranch,
        deleteByName
    }
}