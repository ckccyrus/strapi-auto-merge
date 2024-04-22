import axios from "axios";
import { Logger } from ".";

const Request = async ($config: axiosConfig) => {
    Logger('Request API:', $config.url);
    $config.maxBodyLength = Infinity;
    return await axios.request($config);;
}

export default Request;