const initState = {
    loginName: null
}

export default (state = initState, action) => {
    switch(action.type) {
        case 'APP_LOGIN':
            const loginName = action.loginName;
            return Object.assign({}, state, { loginName })
        default:
            return state
    }
}