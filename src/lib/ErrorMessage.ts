const HtmlRespondType = {
    "400": 'badRequest',
    "401": 'unauthorized',
    "402": 'paymentRequired',
    "403": 'forbidden',
    "404": 'notFound',
    "405": 'methodNotAllowed',
    "406": 'notAcceptable',
    "407": 'proxyAuthenticationRequired',
    "408": 'requestTimeout',
    "409": 'conflict',
    "410": 'gone',
    "411": 'lengthRequired',
    "412": 'preconditionFailed',
    "413": 'payloadTooLarge',
    "414": 'uRITooLong',
    "415": 'unsupportedMediaType',
    "416": 'rangeNotSatisfiable',
    "417": 'expectationFailed',
    "418": 'imATeapot',
    "421": 'misdirectedRequest',
    "422": 'unprocessableEntity',
    "423": 'locked',
    "424": 'failedDependency',
    "425": 'tooEarly',
    "426": 'upgradeRequired',
    "428": 'preconditionRequired',
    "429": 'tooManyRequests',
    "431": 'requestHeaderFieldsTooLarge',
    "451": 'unavailableForLegalReasons',
    "500": 'internalServerError',
    "501": 'notImplemented',
    "502": 'badGateway',
    "503": 'serviceUnavailable',
    "504": 'gatewayTimeout',
    "505": 'hTTPVersionNotSupported',
    "506": 'variantAlsoNegotiates',
    "507": 'insufficientStorage',
    "508": 'loopDetected',
    "509": 'bandwidthLimitExceeded',
    "510": 'notExtended',
    "511": 'networkAuthenticationRequired',
}
const ErrorMessage = {
    getErrorType(stateCode) {
        // if type not found, default is 500 error
        var _errorType = HtmlRespondType[stateCode] || HtmlRespondType[500];
        return _errorType;
    },
    generateMessage($ctx, $err) {
        var _status = $err.status || $ctx.response.status;
        var _errorType = this.getErrorType(_status);

        $ctx[_errorType]($err.message, { "moreDetails": $err })
    },
}
export default ErrorMessage;