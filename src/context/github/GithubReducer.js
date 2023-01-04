const githubReducer = (state, action) => {
    switch(action.type) {
        case 'Get_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

export default githubReducer