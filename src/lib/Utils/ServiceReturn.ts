import { Logger, RespondErrorType } from "."

const ServiceReturn = async ($serviceName: string, callback: Function) => {
    try {
        return await callback();
    } catch (err) {
        throw new Error(err)
    }
}

export default ServiceReturn;