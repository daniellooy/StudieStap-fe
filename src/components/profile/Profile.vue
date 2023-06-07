<template>
    <div class="profile">
        <v-row class="d-flex flex-row flex align-center justify-end" >
            <v-avatar color="surface-variant" class="mr-4">
              <img class="image" :src="'http://localhost:8000/' + user.Profile_image" alt="">
            </v-avatar>
            <div class="mr-4 hideonsmallscreens">

                <p>{{ user ?  user.first_name : "" }} {{ user ? user.last_name : '' }}</p>
            </div>
            <button class="profile-settings" @click="showMenu = !showMenu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="25" width="25" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
        </v-row>
    </div>
    <transition name="fade">
        <div class="profile-menu-list-wrapper" v-if="showMenu">
            <ul class="profile-menu-list">
                <router-link class="profile-menu-list-item" :to="{ name: 'Admin overzicht'}">Admin</router-link>
                <li class="profile-menu-list-item" @click="logout()">Logout</li>
            </ul>
        </div>
    </transition>
</template>

<script setup >
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/store";
import { ref } from 'vue';
import axios from 'axios'

// define props
const props = defineProps({
    items: {
        Type: Array,
        default:
            [
                { title: "Profile" },
                { title: "Admin" },
            ]
    },
    isShow: {
        Type: Boolean,
        default: false,
    },

})
const store = useAppStore()
const { user } = storeToRefs(store)
const showMenu = ref(props.isShow);
const menuItems = ref(props.items);
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})
const logout = () =>{
    axiosInstance.post('/api/logout').then(res=> {
        console.log(res)
        router.push('/login')

    })
}

</script>

<style scoped>
.profile {
    position: relative;
    cursor: default;
}

.image{
  width: 100%;
}

.profile-settings {
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 5;
}
.profile-icon {
    cursor: pointer;
}

.profile-menu-list-wrapper {
    position: absolute;
    top: 90px;
    right: 55px;
    width: 200px;
    height: auto;
    z-index: 100;
    /* set border inside the wrapper */
    background-color: white;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top-style: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

/* set styling for .list-item  */
.profile-menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.profile-menu-list-item {
    display: flex;
    text-decoration: none;
    color: black;
    padding: 10px 20px;
    border-bottom: 1px solid #C9C9C9;
    cursor: pointer;
}

.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 16px;
}
/* change dthe styling for the last child of the list */
.profile-menu-list-item:last-child {
    border-bottom: none;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.profile-menu-list-item:hover {
    background-color: #2C9B22;
    color: white;
}

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hideonsmallscreens{
  display: block;
}

@media only screen and (max-width: 768px) {
  .hideonsmallscreens{
    display: none;
  }
}

</style>
