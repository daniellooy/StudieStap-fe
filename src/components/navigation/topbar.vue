<template>
  <div class="topbar">
    <div class="topbar-left">
      <div class="menubutton" @click="openSidebar()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div class="font">
        {{ currentRouteName }}
      </div>
    </div>
    <div class="profile-info">
      <span class="profile-info-notifications">
        <div class="number">
          1
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </span>
      <span class="username">{{ user ? user.first_name : 'Niet ingelogd' }}</span>
      <div class="profile-info-avatar"></div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import {useAppStore} from "@/store/store";
import {storeToRefs} from "pinia";
const route = useRoute()
const store = useAppStore()
const {user} = storeToRefs(store)
const currentRouteName = computed(() => route.name)

const emit = defineEmits(['open']);
function openSidebar(){
  emit('open');
}
</script>

<style scoped>
.topbar{
  height: 90px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E0DDCF;
  padding-left: 65px;
  padding-right: 65px;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  position: fixed;
  width: 80%;
}

.profile-info{
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 16px;
}

.profile-info-avatar{
  height: 40px;
  width: 40px;
  border-radius: 999999px;
  background-color: #C9C9C9;
}

.profile-info-notifications{
  display: flex;
  position: relative;
}

.profile-info-notifications .number{
  height: 15px;
  width: 15px;
  border-radius: 999999px;
  background-color: #2C9B22;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  position: absolute;
  font-weight: 700;
  left: 0px;
  bottom: 2px;
}

.profile-info-notifications svg{
  height: 30px;
  width: 30px;
  align-self: center;
}

.menubutton{
  display: none;
}

@media only screen and (max-width: 1280px){
  .topbar{
    padding-right: 22px;
    padding-left: 22px;
    width: 100%;
  }

  .menubutton{
    display: flex;
    align-items: center;
  }

  .topbar-left{
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .username{
    display: none;
  }
}
</style>
