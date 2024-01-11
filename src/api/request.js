
import axios from 'axios'; // 导入axios库
import config from '../config'; // 导入配置文件
import { ElMessage } from 'element-plus'; // 导入element-plus库
const NETWORK_ERROR = '网络请求异常，请稍后重试'; // 定义网络请求异常提示信息

// 创建axios实例
const service = axios.create({
    baseURL: config.baseApi, // 设置请求的基础URL
});

// 请求拦截器:作用时机是在发送请求之前
service.interceptors.request.use((req) => {
    return req; // 返回请求数据
});

// 响应拦截器:作用时机是在接收到响应数据之后，且在我们处理响应数据之前
service.interceptors.response.use((res) => {
    // 业务逻辑处理
    // const data = res.data;
    // console.log(res);
    const {code, data, msg} = res.data;

    if (code !== 200) {
        ElMessage.error(msg || NETWORK_ERROR); // 显示错误提示信息
        return Promise.reject(msg || NETWORK_ERROR); // 返回一个被拒绝的Promise对象
    }
    return data; // 返回响应数据
});

// 请求核心函数
function request(options) {
    options.method = options.method || 'get'; // 设置请求方法，默认为get
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data; // 将请求数据设置为params参数
    }
    let isMock = config.mock; // 是否使用模拟数据，默认为配置文件中的mock值
    // console.log(options.mock);
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock; // 如果请求参数中有mock字段，则使用请求参数中的mock值（就是再决定下是否使用mock，值还是t or f）
    }
    
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi; // 如果是生产环境，则使用配置文件中的baseApi作为请求的基础URL
    } else {
        // console.log(config.mockApi);
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi; // 否则根据isMock的值选择使用mockApi或baseApi作为请求的基础URL
    }
    // console.log(`Request URL: ${service.defaults.baseURL}${options.url}`);
    // console.log(options);
    return service(options); // 发起请求
}

export default request; // 导出request函数