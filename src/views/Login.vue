<template>
  <div>
      <input type="text" id="email" v-model="email">
      <input type="password" id="password" v-model="password">
      <button @click="login()">Login</button>
  </div>
</template>

<script>
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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
      console.log(this.email);
      console.log(this.password);
      axiosInstance.post('/api/login',
        {
          email: this.email,
          password: this.password
        },
      )
    }
  }
}
</script>

<style scoped>

</style>
