<template>
    <div class="profile">
        <v-row class="d-flex flex-row flex align-center justify-end" >
            <img class="profile-image" :src="'http://localhost:8000/' + user.Profile_image" v-if="user">
            <div class="mr-4">
                <span>Welkome terug, </span>
                <p>{{ user ?  user.first_name : "" }} {{ user ? user.last_name : '' }}</p>
            </div>
            <button class="profile-settings" @click="showMenu = !showMenu">
                <!-- make a settings icon from vuetify -->
                <svg class="profile-icon" width="36" height="36" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                d="M22 6H26C27.1046 6 28 6.89544 28 8V9.13758C28 9.99318 28.5742 10.7365 29.3644 11.0646C30.155 11.3928 31.0754 11.2677 31.6806 10.6625L32.4852 9.85782C33.2662 9.07676 34.5326 9.07676 35.3136 9.85782L38.142 12.6862C38.9232 13.4673 38.923 14.7336 38.142 15.5147L37.3376 16.3192C36.7322 16.9245 36.6072 17.8449 36.9354 18.6355C37.2634 19.4257 38.0068 20 38.8626 20H40C41.1046 20 42 20.8954 42 22V26C42 27.1046 41.1046 28 40 28H38.8624C38.0068 28 37.2636 28.5742 36.9354 29.3644C36.6072 30.155 36.7322 31.0754 37.3376 31.6806L38.142 32.4852C38.9232 33.2662 38.9232 34.5326 38.142 35.3136L35.3136 38.142C34.5326 38.9232 33.2662 38.9232 32.4852 38.142L31.6806 37.3376C31.0754 36.7322 30.155 36.6072 29.3644 36.9354C28.5742 37.2636 28 38.0068 28 38.8624V40C28 41.1046 27.1046 42 26 42H22C20.8954 42 20 41.1046 20 40V38.8626C20 38.0068 19.4257 37.2634 18.6355 36.9354C17.8449 36.6072 16.9245 36.7322 16.3192 37.3376L15.5146 38.142C14.7336 38.9232 13.4673 38.9232 12.6862 38.142L9.85778 35.3136C9.07674 34.5326 9.07674 33.2662 9.85778 32.4852L10.6625 31.6806C11.2677 31.0754 11.3928 30.155 11.0646 29.3644C10.7365 28.5742 9.99318 28 9.13758 28H8C6.89544 28 6 27.1046 6 26V22C6 20.8954 6.89544 20 8 20H9.13754C9.99316 20 10.7365 19.4258 11.0646 18.6355C11.3928 17.845 11.2677 16.9246 10.6625 16.3193L9.85782 15.5147C9.07676 14.7336 9.07676 13.4673 9.85782 12.6863L12.6862 9.85782C13.4673 9.07678 14.7336 9.07678 15.5147 9.85782L16.3193 10.6625C16.9246 11.2677 17.845 11.3928 18.6355 11.0646C19.4258 10.7365 20 9.99316 20 9.13752V8C20 6.89544 20.8954 6 22 6Z"
                stroke="black" stroke-width="2" />
                <path
                d="M28 24C28 26.2092 26.2092 28 24 28C21.7908 28 20 26.2092 20 24C20 21.7908 21.7908 20 24 20C26.2092 20 28 21.7908 28 24Z"
                stroke="black" stroke-width="2" />
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

.profile-settings {
    display: flex;
    align-items: center;
    gap: 16px;
}
.profile-icon {
    cursor: pointer;
}

.profile-menu-list-wrapper {
    position: absolute;
    top: 90px;
    right: 30px;
    width: 300px;
    height: auto;
    z-index: 100;
    /* set border inside the wrapper */
    border: 2px solid #2C9B22;
    background-color: white;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top-style: none;
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
    border-bottom: 1px solid #2C9B22;
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

</style>