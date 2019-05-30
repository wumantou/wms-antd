export const login = (loginName) => {
    return {
        type: 'APP_LOGIN',
        loginName: loginName
    }
}
