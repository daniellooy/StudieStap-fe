<template>
  <div class="sidebar">
    <div class="logoholder sidebar-padding-util">
      <div class="logoholder-inner">
        <img class="" src="/src/assets/logo.png" alt="">
      </div>
      <span class="closebutton" @click="closeSidebar()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>
    <div class="sidebar-content sidebar-padding-util">
      <ul class="sidebar-list">
        <router-link exact-active-class="sidebar-active" to="/">
          <li class="sidebar-list-item">
            <svg class="sidebar-list-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <span>Dashboard</span>
          </li >
        </router-link>
        <router-link active-class="sidebar-active" to="/community">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span>Community</span>
          </li>
        </router-link>
        <router-link active-class="sidebar-active" to="/voortgang">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <span>Voortgang</span>
          </li>
        </router-link>
        <router-link active-class="sidebar-active" to="/achievements">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>Achievements</span>
          </li>
        </router-link>
        <router-link active-class="sidebar-active" to="/zelfstudie">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <span>Zelfstudie</span>
          </li>
        </router-link>
        <router-link active-class="sidebar-active" to="/profiel">
        <li class="sidebar-list-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Mijn profiel</span>
        </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar"
}
</script>

<script setup>
import {ref} from "vue";
const isOpen = ref(false);
const emit = defineEmits(['close']);
function closeSidebar(){
  emit('close');
}

</script>

<style scoped>
  .sidebar{
    background-color: white;
    min-height: 100vh;
  }

  .logoholder-inner{
    display: flex;
    align-items: center;
  }

  .sidebar-active{
    color: #2C9B22;
  }

  .sidebar-padding-util{
    padding-left: 45px;
    padding-right: 65px;
  }

  .sidebar-content{
    display: flex;
    justify-content: flex-start;
  }

  a{
    color: #000;
    text-decoration: none;
  }

  .sidebar-list{
    list-style-type: none;
  }

  .sidebar-list-item{
    margin-top: 40px;
    font-weight: 600;
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .sidebar-list-item-icon{
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }

  .logoholder{
    height: 90px;
    width: 100%;
    border-bottom: 1px solid #E0DDCF;
    display: flex;
    align-items: center;
  }

  .logoholder img{
    width: 100%;
    height: auto;
  }

  .closebutton{
    display: none;
  }


  @media only screen and (max-width: 1280px){
    .sidebar-padding-util{
      padding-left: 22px;
      padding-right: 22px;
    }

    .logoholder{
      justify-content: space-between;
      gap: 10px;
    }

    .logoholder img{
      max-width: 100%;
      height: auto
    }

    .closebutton{
      display: flex;
      align-items: center;
    }
  }


</style>
