const petInitialState = {
    name: '',
    age: '',
    gender: '',
    weight: '',
    breed: '',
    color: ''
}

const userReducer = (state = petInitialState, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS':
            return {
                ...state
            }

        case 'CREATE_USER':
            return {
                ...state
            }
        case 'UPDATE_USER':
            return {
                ...state
            }
        case 'DELETE_USER':
            return {
                ...state
            }


        default:
            return {};
    }
}

export default userReducer