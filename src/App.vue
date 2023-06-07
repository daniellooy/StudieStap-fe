<template>
  <router-view />
</template>

<script setup>
import axios from "axios";
import router from "@/router";
import { useAppStore } from "@/store/store";

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
      points: data.points
    }
    store.updateUserObj(userobj)
    store.updateSessionValid(true)
  })
  .catch((error) => {
    store.updateSessionValid(false)
    router.push('/login')
  })

</script>
<style>
body {
  font-family: 'Poppins', sans-serif;
}
</style>
