import {defineStore} from "pinia";


interface UserObj {
  id: Number,
  address: String,
  bio: String,
  city: String,
  date_of_birth: Date,
  Profile_image: String,
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  street: String,
  workshop: String,
  zip: String,
  points: Number,

}


export interface AppState{
  user: UserObj | undefined
  session_valid: boolean
}

const state = (): AppState => ({
  user: undefined,
  session_valid: false
})


const getters = {
  getUser :(state: AppState) => () => {
    return state.user
  },
  getSessionValid :(state: AppState) => () => {
    return state.session_valid
  }
}

const actions = {
  updateSessionValid(val: Boolean){
    this.session_valid = val
  },
  updateUserObj(val: UserObj){
    this.user = val
  }
}

export const useAppStore = defineStore('appStore', {
  state,
  getters,
  actions
})
