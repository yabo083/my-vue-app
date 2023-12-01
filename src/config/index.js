// 当前环境
const env = 'dev'

const EnvConfig = {
    dev: {
        baseApi: 'http://localhost:8080',
        mockApi: 'https://www.fastmock.site/mock/0c1a0a1b7b1d6f9e1a3e8a6d1c9a9a9c/api'
    },
    test: {
        baseApi: '//test.futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/0c1a0a1b7b1d6f9e1a3e8a6d1c9a9a9c/api'
    },
    prod: {
        baseApi: '//futurefe.com/api',
        mockApi: 'https://www.fastmock.site/mock/0c1a0a1b7b1d6f9e1a3e8a6d1c9a9a9c/api'
    }
}

export default {
    env,
    mock: false,
    ...EnvConfig[env]
}