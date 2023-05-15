<template>
  <div>
      <input type="text" id="email" v-model="email">
      <input type="password" id="password" v-model="password">
      <button @click="login()">Login</button>
      <button @click="fetchUser()">Fetch User</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {useAppStore} from "@/store/store";

const store = useAppStore()
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})
export default {
  name: "Login.vue",

  data(){
    return {
      email: null,
      password: null,
    }
  },

  setup(){
    axiosInstance.get('/sanctum/csrf-cookie').then(response => {
      console.log(response)
    })
  },

  methods: {
    login(){
      axiosInstance.post('/api/login',
        {
          email: this.email,
          password: this.password
        },
      ).then((response) => {
          axiosInstance.get('/api/user')
            .then((response) => {
              console.log(response)
              const data = response.data
              store.updateSessionValid(true)
              const userobj = {
                id: data.id,
                address: data.address,
                bio: data.bio,
                city: data.city,
                date_of_birth: data.date_of_birth,
                Profile_image: data.image,
                first_name: data.firstname,
                last_name: data.lastname,
                email: data.email,
                phone: data.phone,
                street: data.street,
                workshop: data.workshop,
                zip: data.zip,

              }
              store.updateUserObj(userobj)
              router.push('/')

            })
        }
      )
    },
  }
}
</script>

<style scoped>

</style>
