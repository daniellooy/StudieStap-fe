<template>
  <div class="topbar">
    <div class="font">
      {{ currentRouteName }}
    </div>
    <Profile />

</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

import Profile from "@/components/profile/Profile.vue";
const route = useRoute()

const currentRouteName = computed(() => route.name)
</script>

<style scoped>
.topbar {
  height: 90px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E0DDCF;
  padding-left: 65px;
  padding-right: 65px;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  position: relative;
  width: 100%;
}

.profile-info {
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 16px;
}

.profile-info-avatar {
  height: 40px;
  width: 40px;
  border-radius: 999999px;
  background-color: #C9C9C9;
}

.profile-info-notifications {
  display: flex;
  position: relative;
}

.profile-info-notifications .number {
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

.profile-info-notifications svg {
  height: 30px;
  width: 30px;
  align-self: center;
}
</style>
