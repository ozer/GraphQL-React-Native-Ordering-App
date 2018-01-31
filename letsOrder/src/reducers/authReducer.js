export const types = {
    AUTHTOKEN: 'AUTHTOKEN'
};


const initialState = {
    user : null,
    token : ''
};

export const auth = (state = initialState, action) => {

    const { user,token } = state;
    const { type,payload } = action;

    switch (type) {
        case types.AUTHTOKEN:
            return{
                ...state,   
                token : payload.token
            }
            break;    
        default:
            break;
    }

    return state;

}