

const initialState = { loginToken:localStorage?.getItem('author_token')}


const token = (state=initialState,{type,payload})=>{
    switch (type) {
        case "UPDATE_TOKEN":
            return{loginToken:localStorage?.getItem('author_token')}
        case "CLEAR_TOKEN":
            return{loginToken:""}
        default:
            return state;
    }
}

export default token;

export const updateLoginToken = (new_token)=>{
    return{
        type:"UPDATE_TOKEN",
        payload:new_token
    }
}
export const clearLoginToken = (new_token)=>{
    return{
        type:"CLEAR_TOKEN",
        payload:new_token
    }
}

