import { Logger, RespondErrorType } from "."
import { Context } from "koa";

const RequestService = async ($ctx: any, $serviceName: string, callback: Function) => {
    try {
        await callback();
    } catch (err) {
        const _stateCode = (err.response) ? err.response.status : err.status;
        const _errorType = RespondErrorType(_stateCode);

        // default error message
        let _message = "Internal Server Error (UNKNOW)";

        if (_stateCode) {
            _message = err.response.data.error.message;
        } else {
            if (err.message) {
                _message = err.message;
            }
        }
        Logger(`Error [micro-service.${$serviceName}]: `, _stateCode, _message);

        $ctx[_errorType](_message);
    }
}

export default RequestService;