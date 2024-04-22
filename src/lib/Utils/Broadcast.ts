
import { Logger, Request } from ".";

const Broadcast = async ($message: string) => {
    const _microServiceConfig = strapi.config.get('microservice');
    
    const config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: _microServiceConfig.broadcastServer + '/gateway/api/sse/broadcast',
        data: {
            message: $message,
        },
        auth: {
            username: "",
            password: ""
        }
    };
    
    await Request(config);
}

export default Broadcast;