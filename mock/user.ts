// mock数据 (mock与vite.config.ts)
//用户信息数据,函数createUserList()返回用户信息
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式,post向服务器发送,get向服务器获取
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            // createUserList():上面定义的函数,find():数组方法,查找满足提供的测试函数条件的第一个元素
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                // **原本mock**
                // return { code: 201, data: { message: '账号或者密码不正确' } }
                // **修改后与真实接口统一mock**
                return { code: 201, data: '账号或者密码不正确' }
            }
            //如果有返回成功信息
            const { token } = checkUser
            // **原本mock**
            // return { code: 200, data: { token } }
            // **修改后与真实接口统一mock**
            return { code: 200, data: token }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',//请求方式,post向服务器发送,get向服务器获取
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含，通过token验证
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                // **原本mock**
                // return { code: 201, data: { message: '获取用户信息失败' } }
                // **修改后与真实接口统一mock**
                return { code: 201, message: '获取用户信息失败' }
            }
            //如果有返回成功信息
            // **原本mock**
            // return { code: 200, data: {checkUser} }
            // **修改后与真实接口统一mock**
            return { code: 200, data:  checkUser  }
        },
    },
    // 退出登录接口
    {
        url: '/api/user/logout',// 请求地址
        method: 'post',// 请求方式
        response: () => {
            // 退出登录通常不需要检查用户状态，因为用户在发起请求时已经通过了身份验证
            // 返回一个成功响应，表示用户已成功退出登录
            return {
                code: 200,
                message: '退出登录成功'
            }
        },
    },
]