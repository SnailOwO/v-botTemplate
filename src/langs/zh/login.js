const login = {
    page: {
        username: '用户名',
        password: '密码',
        login: '登录',
        register: '加入V-bot',
        getActiveCode: '获取邀请码',
        code: '邀请码',
        loginWay: {
            normal: '账户',
            code: '邀请码'
        },
        loginMethod: '登录方式',
        registerDialog: {
            title: '注册',
            account: '请输入您的账号',
            registerPwd: '请输入您的密码',
            repeatPwd: '请再次输入您的密码',
            email: '请输入您的邮箱',
            phone: '请输入您的手机号（非必填）',
            preStep: '上一步',
            confirm: '确认',
            firstStep: '注册账号',
            secondStep: '填写密码',
            thirdStep: '确认邮箱',
            fourthStep: '其他信息'
        },
        activeCodeDialog: {
            title: '获取邀请码',
            simple: 'simple',
            middle: 'middle',
            hard: 'hard',
            firstStep: '难度选择',
            secondStep: 'demo生成',
            thirdStep: '开始表演',
            fourthStep: '作答',
            fifthStep: '结果',
            confirm: '确认',
            countDown: '倒计时：'
        }
    },
    info: {
        //登录
        usernameIsEmpty: '请填写您的用户名',
        pwdIsEmpty: '密码不能为空哦',
        codeIsEmpty: '请输入您的邀请码',
        //注册
        accountIsEmpty: '用户名不能为空',
        accountLengthIllegal: '用户名不能超过32位字符',
        pwdIsEmpty: '密码不能为空',
        twicePwdIsWrong: '两次密码不一致',
        emailIsEmpty: '邮箱不能为空',
        emailIsIllegal: '邮箱格式不合法',
        phoneIsIllegal: '非法的手机号',
        //滑稽雨activeCode
        illegalDifficulty: '非法难度选择',
        rememberEmoji: '请记住当前表情:',
        questtion: '问，demo表情总共出现几次？',
        answer: '请填写数字',
        illegalAnswer: '请填写相应的数值',
        unableToSuspend: 'Time Out,当前无法暂停',
        unableToContinue: 'Time Out,当前无法继续',
        suspendInterval: '暂停间隔必须在1s以上',
    }
}
export default login