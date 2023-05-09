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
      )
    },

    fetchUser(){
      axiosInstance.get('/api/user').then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
