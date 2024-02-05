const petInitialState = {
    name: '',
    age: '',
    gender: '',
    weight: '',
    breed: '',
    color: ''
}

const petReducer = (state = petInitialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PETS':
            console.log("GET_ALL_PETS",{...state})

            return {
                ...state
            }

        case 'CREATE_PET':
            console.log("CREATE_PET",{...state})

            return {
                ...state
            }
        case 'UPDATE_PET':
            console.log("UPDATE_PET",{...state})

            return {
                ...state
            }
        case 'DELETE_PET':
            console.log("DELETE_PET",{...state})

            return {
                ...state
            }


        default:
            return {};
    }
}

export default petReducer