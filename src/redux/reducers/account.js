/* eslint-disable import/no-anonymous-default-export */
export default (
    state = {
        profile: {
            "id"   : "",
            "name" : {
                "first_name": "",
                "last_name": ""
            },
            "email": "",
            "dosc": "",
            "cover": ""
        },
        collection: []
    }, 
    action
) => {
    const { type, payload, list } = action;
    switch( type ){
        case "ACCOUNT_PROFILE":
            state = { ...state, profile: payload }
            break;

        case "ACCOUNT_COLLECTION":
            state = { ...state, collection: list }
            break;

        default:
    }

    return state;
}