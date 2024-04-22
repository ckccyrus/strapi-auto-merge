// /**
//  * A set of functions called "actions" for `preview-action-controller`
//  */

// import Util from "../../../lib/Util";

// export default {
//     // ---- update preview status ----
//     async updatePreviewStatus(ctx) {
//         if (!ctx.request.params.name) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing branch name for updating preview status!!!");
//         }

//         // if (!ctx.request.query.updating || !ctx.request.query.status || !ctx.request.query.success) {
//         //     return Util.ErrorMessage.generateMessage(ctx, "Missing params for updating preview status!!!");
//         // }

//         const _targetBranch = ctx.request.params.name;
//         const _previewStatus = {
//             isUpdating: ctx.request.query.updating,
//             isSuccess: ctx.request.query.success,
//             status: ctx.request.query.status
//         };

//         try {
//             const _result = await strapi.service('api::branch.preview-action').updatePreviewStatus(_targetBranch, _previewStatus);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- update preview commit ----
//     async updatePreviewCommit(ctx) {
//         if (!ctx.request.params.name) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing branch name for updating preview commit!!!");
//         }

//         // if (!ctx.request.query.newCommit || !ctx.request.query.newCommitMessage) {
//         //     return Util.ErrorMessage.generateMessage(ctx, "Missing params for updating preview commit!!!");
//         // }

//         const _targetBranch = ctx.request.params.name;
//         const _previewCommit = {
//             mergeCommit: ctx.request.query.mergeCommit,
//             newPreviewCommit: ctx.request.query.newPreviewCommit,
//             newPreviewCommitMessage: ctx.request.query.newPreviewCommitMessage,
//             newPreviewCommitDate: ctx.request.query.newPreviewCommitDate
//         };

//         try {
//             const _result = await strapi.service('api::branch.preview-action').updatePreviewCommit(_targetBranch, _previewCommit);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- build preview ----
//     async buildPreview(ctx) {
//         if (!ctx.request.params.name || Object.keys(ctx.request.body).length == 0) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for building preview!!!");
//         }

//         const _targetBranch = ctx.request.params.name;
//         const _data = ctx.request.body;

//         try {
//             const _result = await strapi.service('api::branch.preview-action').buildPreview(_targetBranch, _data);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
// };

import { Checker, RequestService } from "../../../lib/Utils";

export default () => {
    const _serviceName = strapi.config.get("microservice").serviceName;

    const updatePreviewStatus = async ($ctx: any) => {
        const _targetBranch = $ctx.request.query.target;
        const _previewStatus = {
            updating: $ctx.request.query.updating,
            success: $ctx.request.query.success,
            status: $ctx.request.query.status
        };

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            $ctx.body = await strapi.service('api::branch.preview-action').updatePreviewStatus(_targetBranch, _previewStatus);
        })
    }
    const updatePreviewCommit = async ($ctx: any) => {
        const _targetBranch = $ctx.request.query.target;
        const _previewCommit = {
            mergeCommit: $ctx.request.query.mergeCommit,
            newPreviewCommit: $ctx.request.query.newPreviewCommit,
            newPreviewCommitMessage: $ctx.request.query.newPreviewCommitMessage,
            newPreviewCommitDate: $ctx.request.query.newPreviewCommitDate
        };

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            $ctx.body = await strapi.service('api::branch.preview-action').updatePreviewCommit(_targetBranch, _previewCommit);
        })
    }
    const buildPreview = async ($ctx: any) => {
        const _data = $ctx.request.body;
        const _targetBranch = $ctx.request.query.target;

        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_targetBranch);
            Checker.checkObjectHasProperties(_data);
            $ctx.body = await strapi.service('api::branch.preview-action').buildPreview(_targetBranch, _data);
        })
    }

    return {
        updatePreviewStatus,
        updatePreviewCommit,
        buildPreview
    }
}