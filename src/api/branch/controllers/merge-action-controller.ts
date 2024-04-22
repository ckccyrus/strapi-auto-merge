// /**
//  * A set of functions called "actions" for `merge-action-controller`
//  */

// import Util from "../../../lib/Util";

// export default {
//     // ---- merge start ----
//     async mergeStart(ctx) {
//         if (!ctx.request.query.root) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing root for trigger merge start!!!");
//         }

//         const _rootBranch = ctx.request.query.root;

//         try {
//             const _result = await strapi.service('api::branch.merge-action').mergeStart(_rootBranch);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- merge success ----
//     async mergeSuccess(ctx) {
//         if (!ctx.request.query.parent || !ctx.request.query.target) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for trigger merge success!!!");
//         }

//         const _parent = ctx.request.query.parent;
//         const _target = ctx.request.query.target;

//         try {
//             const _result = await strapi.service('api::branch.merge-action').mergeSuccess(_parent, _target);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
//     // ---- merge success ----
//     async mergeFail(ctx) {
//         if (!ctx.request.query.parent || !ctx.request.query.target) {
//             return Util.ErrorMessage.generateMessage(ctx, "Missing params for trigger merge fail!!!");
//         }

//         const _parent = ctx.request.query.parent;
//         const _target = ctx.request.query.target;
//         const _failMessage = ctx.request.query.failMessage;

//         try {
//             const _result = await strapi.service('api::branch.merge-action').mergeFail(_parent, _target, _failMessage);
//             ctx.body = _result;
//         } catch (err) {
//             return Util.ErrorMessage.generateMessage(ctx, err);
//         }
//     },
// };

import { Checker, RequestService } from "../../../lib/Utils"

export default () => {
    const _serviceName: string = strapi.config.get("microservice").serviceName;

    const mergeStart = async ($ctx: any) => {
        const _rootBranch = $ctx.request.query.root;
        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_rootBranch);
            $ctx.body = await strapi.service('api::branch.merge-action').mergeStart(_rootBranch);
        })
    }

    const mergeSuccess = async ($ctx: any) => {
        const _parent = $ctx.request.query.parent;
        const _target = $ctx.request.query.target;
        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_parent);
            Checker.checkHasValue<string>(_target);
            $ctx.body = await strapi.service('api::branch.merge-action').mergeSuccess(_parent, _target);
        })
    }

    const mergeFail = async ($ctx: any) => {
        const _parent = $ctx.request.query.parent;
        const _target = $ctx.request.query.target;
        const _failMessage = $ctx.request.query.failMessage;
        await RequestService($ctx, _serviceName, async () => {
            Checker.checkHasValue<string>(_parent);
            Checker.checkHasValue<string>(_target);
            $ctx.body = await strapi.service('api::branch.merge-action').mergeFail(_parent, _target, _failMessage);
        })
    }


    return {
        mergeStart,
        mergeSuccess,
        mergeFail
    }
}