<template>
  <router-view />
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import {useAppStore} from "@/store/store";

const store = useAppStore();
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})


axiosInstance.get('/api/user')
.then((response) => {
  console.log(response)
  const data = response.data
  store.updateSessionValid(true)
  const userobj = {
    first_name: data.firstname,
    last_name: data.lastname,
    email_name: data.email,
    date_of_birth: data.date_of_birth
  }

  store.updateUserObj(userobj)
  router.push('/')
})
.catch((error) => {
  store.updateSessionValid(false)
  console.log(error)
  router.push('/login')
})

</script>
<style>
body{
  font-family: 'Poppins', sans-serif;
}
</style>
