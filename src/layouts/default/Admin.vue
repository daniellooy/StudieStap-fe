<template>
  <div class="wrapper">
    <div class="sidebar sidebar-padding-util">
      <ul class="sidebar-list">
        <router-link exact-active-class="sidebar-active" :to="{name: 'Admin overzicht'}">
          <li class="sidebar-list-item">
            <svg class="sidebar-list-item-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <span>Admin Overzicht</span>
          </li >
        </router-link>
        <router-link exact-active-class="sidebar-active" :to="{name: 'Admin Modules Overzicht'}">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
            <span>Modules bekijken</span>
          </li>
        </router-link>
        <router-link exact-active-class="sidebar-active" :to="{name: 'Module toevoegen'}">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
            </svg>
            <span>Module toevoegen</span>
          </li>
        </router-link>
        <router-link exact-active-class="sidebar-active" :to="{name: 'Admin Videos Overzicht'}">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>Video's bekijken</span>
          </li>
        </router-link>
        <router-link exact-active-class="sidebar-active" :to="{name: 'Video toevoegen'}">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>Video toevoegen</span>
          </li>
        </router-link>
        <router-link exact-active-class="sidebar-active" :to="{name: 'Requests'}">
          <li class="sidebar-list-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sidebar-list-item-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>Achievements</span>
          </li>
        </router-link>
        
      </ul>
    </div>
    <div class="main">
      <div class="main-content">
        <router-view  />
      </div>
    </div>
  </div>
</template>

<script setup>



</script>

<style scoped>
.wrapper{
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  position: relative;
}

.sidebar{
  grid-column: span 2 / span 2;
  background-color: white;
  min-height: 100vh;
  z-index: 2;
}

a{
  color: #000;
  text-decoration: none;
}

.sidebar-active{
  color: #2C9B22;
}

.main{
  grid-column: span 8 / span 8;
  position: relative;
  background-color: #F4F6F3;
}

.main-content{
  max-height: calc(100vh - 90px);
  margin-top: 30px;
  padding: 40px 70px;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.main-content::-webkit-scrollbar {
  display: none;
}

.topbar a{
  color: black;
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

.sidebar-padding-util{
  padding-left: 65px;
  padding-right: 65px;
}

</style>
