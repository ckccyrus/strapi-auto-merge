// /**
//  * preview-action service
//  */

// import queryString from "query-string";
// import Util from "../../../lib/Util";
// import axios from "axios";

// enum JenkinsPreviewLink {
//     PROD = "http://frontend:a6f0cc6f3f69c94ffdf24d32c09876ac@192.168.1.216:9000/job/H5-workingCopy-Pipeline/buildWithParameters/?token=1234567890&",
//     DEV = "http://frontend:a6f0cc6f3f69c94ffdf24d32c09876ac@192.168.1.216:9000/job/DEV-working-copy/buildWithParameters/?token=1234567890&",
// }

// export default () => ({
//     // ----------- update preview status by name -----------
//     async updatePreviewStatus($targetBranch, $previewStatus) {
//         Util.log("DEBUG::PreviewAction [updatePreviewStatus] $targetBranch", $targetBranch);
//         Util.log("DEBUG::PreviewAction [updatePreviewStatus] $previewStatus", $previewStatus);

//         // if (!$targetBranch || !$previewStatus.isUpdating || !$previewStatus.isSuccess || !$previewStatus.status) { throw new Error(`Missing params for updating preview status ${$targetBranch}!!!`) }
//         if (!$targetBranch) { throw new Error(`Missing params for updating preview status ${$targetBranch}!!!`) }

//         const _data = {
//             'PreviewStatus': {
//                 'IsUpdating': $previewStatus.isUpdating,
//                 'IsSuccess': $previewStatus.isSuccess,
//                 'BuiltStatus': $previewStatus.status,
//             }
//         };

//         try {
//             const _updatedBranch = await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
//             return _updatedBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- update preview status by name -----------
//     async updatePreviewCommit($targetBranch, $previewCommit) {
//         Util.log("DEBUG::PreviewAction [updatePreviewCommit] $targetBranch", $targetBranch);
//         Util.log("DEBUG::PreviewAction [updatePreviewCommit] $previewCommit", $previewCommit);

//         // if (!$targetBranch || !$previewCommit.newCommit || !$previewCommit.newCommitMessage ) { throw new Error(`Missing params for updating preview commit ${$targetBranch}!!!`) }
//         if (!$targetBranch) { throw new Error(`Missing params for updating preview commit ${$targetBranch}!!!`) }

//         const _self = this;
//         const _data = {
//             'PreviewCommit': {
//                 'MergeCommit': $previewCommit.mergeCommit,
//                 'NewPreviewCommit': $previewCommit.newPreviewCommit,
//                 'NewCommitMessage': $previewCommit.newPreviewCommitMessage,
//                 'NewCommitDate': $previewCommit.newPreviewCommitDate
//             }
//         };

//         try {
//             const _updatedBranch = await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
//             await updatePreviewStatus($targetBranch);
//             return _updatedBranch;
//         } catch (e) {
//             throw new Error(e);
//         }
//     },
//     // ----------- build preview by name -----------
//     async buildPreview($targetBranch, $data) {
//         Util.log("DEBUG::PreviewAction [buildPreview] $targetBranch", $targetBranch);
//         Util.log("DEBUG::PreviewAction [buildPreview] $data", $data);

//         if (!$targetBranch || !$data) { throw new Error(`Missing params for building preview from ${$targetBranch}!!!`) }

//         const commit_before = $data.commit_before;
//         const commit_after = $data.commit_after;

//         const _newData = {
//             'PreviewStatus': {
//                 'IsUpdating': true,
//                 'BuiltStatus': 'waiting'
//             }
//         };

//         try {
//             await triggerPreview();
//             const _updatedBranch = await strapi.service('api::branch.database-crud').updateByName($targetBranch, _newData);
//             return _updatedBranch;
//         } catch (e) {
//             throw new Error(e);
//         }

//         async function triggerPreview() {
//             const _queryStringObj = {
//                 INPUT_BRANCH: $targetBranch,
//                 INPUT_COMMIT_BEFORE: commit_before,
//                 INPUT_COMMIT_AFTER: commit_after,
//             }
//             const _queryString = queryString.stringify(_queryStringObj);

//             for (const $eachType in JenkinsPreviewLink) {
//                 await axios.
//                     get(JenkinsPreviewLink[$eachType] + _queryString, {
//                         auth: {
//                             username: 'frontend',
//                             password: 'frontenduser' // Bad password
//                         }
//                     })
//             }
//         }
//     }
// });

// const updatePreviewStatus = async ($targetBranch) => {
//     const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
//     const _previewCommit = _targetBranch.PreviewCommit;
//     const _mergeCommit = _previewCommit.MergeCommit;
//     const _newPreviewCommit = _previewCommit.NewPreviewCommit;
//     const _isPreviewUpdated = (_mergeCommit === _newPreviewCommit) ? true : false;
//     const _data = {
//         'PreviewStatus': {
//             'IsUpdated': _isPreviewUpdated
//         }
//     }

//     try {
//         await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
//     } catch (e) {
//         throw new Error(e);
//     }
// }

import queryString from "query-string";
import { Checker, Logger, Request, ServiceReturn } from "../../../lib/Utils";
import { buildPreview, updatePreviewCommit, updatePreviewStatus } from "../../../types/previewData";

enum JenkinsPreviewLink {
    PROD = "http://frontend:a6f0cc6f3f69c94ffdf24d32c09876ac@192.168.1.216:9000/job/H5-workingCopy-Pipeline/buildWithParameters/?token=1234567890&",
    DEV = "http://frontend:a6f0cc6f3f69c94ffdf24d32c09876ac@192.168.1.216:9000/job/DEV-working-copy/buildWithParameters/?token=1234567890&",
}

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;
    const updatePreviewStatus = async ($targetBranch: string, $previewStatus: updatePreviewStatus) => {
        Logger("[updatePreviewStatus] $targetBranch :>>", $targetBranch, "$previewStatus :>>", $previewStatus);

        return await ServiceReturn(_serviceName, async () => {
            const _previewStatus = {
                'IsUpdating': $previewStatus.updating,
                'IsSuccess': $previewStatus.success,
                'BuiltStatus': $previewStatus.status,
            }
            Object.keys(_previewStatus).forEach(($eachKey) => {
                if (_previewStatus[$eachKey] === undefined) delete _previewStatus[$eachKey];
            })

            const _data = {
                'PreviewStatus': _previewStatus
            }
            return await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
        })
    }
    const updatePreviewCommit = async ($targetBranch: string, $previewCommit: updatePreviewCommit) => {
        Logger("[updatePreviewCommit] $targetBranch :>>", $targetBranch, "$previewCommit :>>", $previewCommit);

        return await ServiceReturn(_serviceName, async () => {
            const _previewCommit = {
                'MergeCommit': $previewCommit.mergeCommit,
                'NewPreviewCommit': $previewCommit.newPreviewCommit,
                'NewCommitMessage': $previewCommit.newPreviewCommitMessage,
                'NewCommitDate': $previewCommit.newPreviewCommitDate
            }
            Object.keys(_previewCommit).forEach(($eachKey) => {
                if (_previewCommit[$eachKey] === undefined) delete _previewCommit[$eachKey];
            })

            const _data = {
                'PreviewCommit': _previewCommit
            }
            const _updatedBranch = await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
            await updatePreviewUpdated($targetBranch);
            return _updatedBranch;
        })
    }
    const buildPreview = async ($targetBranch: string, $buildPreviewData: buildPreview) => {
        Logger("[buildPreview] $targetBranch :>>", $targetBranch, "$buildPreviewData :>>", $buildPreviewData);

        return await ServiceReturn(_serviceName, async () => {
            const _newData = {
                'PreviewStatus': {
                    'IsUpdating': true,
                    'BuiltStatus': 'waiting'
                }
            };

            await triggerPreview();
            return await strapi.service('api::branch.database-crud').updateByName($targetBranch, _newData);
        })

        async function triggerPreview() {
            const _queryStringObj = {
                INPUT_BRANCH: $targetBranch,
                INPUT_COMMIT_BEFORE: $buildPreviewData.commit_before,
                INPUT_COMMIT_AFTER: $buildPreviewData.commit_after,
            }
            const _queryString = queryString.stringify(_queryStringObj);

            for (const $eachType in JenkinsPreviewLink) {
                const config = {
                    method: 'GET',
                    maxBodyLength: Infinity,
                    url: JenkinsPreviewLink[$eachType] + _queryString,
                    auth: {
                        username: 'frontend',
                        password: 'frontenduser' // Bad password
                    }
                };

                await Request(config)
            }
        }
    }

    const updatePreviewUpdated = async ($targetBranch) => {
        const _targetBranch = await strapi.service('api::branch.database-crud').findOneByName($targetBranch);
        const _previewCommit = _targetBranch.PreviewCommit;
        const _mergeCommit = _previewCommit.MergeCommit;
        const _newPreviewCommit = _previewCommit.NewPreviewCommit;
        const _isPreviewUpdated = (_mergeCommit === _newPreviewCommit) ? true : false;
        const _data = {
            'PreviewStatus': {
                'IsUpdated': _isPreviewUpdated
            }
        }

        try {
            await strapi.service('api::branch.database-crud').updateByName($targetBranch, _data);
        } catch (e) {
            throw new Error(e);
        }
    }

    return {
        updatePreviewStatus,
        updatePreviewCommit,
        buildPreview
    }
}