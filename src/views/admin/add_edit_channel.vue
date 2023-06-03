<template>
  <div class="formwrapper">
    <h1>Channel {{ editmode ? 'bewerken' : 'toevoegen' }}</h1>
    <div class="form">
      <div class="form-section">

        <div class="form-group">
          <div class="form-image-wrapper">
            <img
              :src="[channelImage ? channelImage : channel.image_path ? ('http://localhost:8000/' + channel.image_path) : 'https://cataas.com/cat']"
              alt="">
            <label for="channel-image">+</label>
          </div>
          <input class="hidden" id="channel-image" @change="onImageChange($event)" type="file">
        </div>
        <div class="form-group">
          <label for="title">Titel</label>
          <input type="text" v-model="channel.name" name="title">
        </div>
      </div>
      <div class="form-group">
        <label for="description">Beschrijving</label>
        <textarea v-model="channel.description" name="description" />
      </div>
      <div class="form-section">
        <div class="form-group">
          <label for="users">Channel Gebruikers</label>
          <div class="selected-users">
            <div class="badge" v-for="user in selectedUsersData" :key="user.id">
              <img :src="user.image" alt="">
              <span>{{ truncatedName(user.name) }}</span>
              <button @click="removeUser(user.id)">Verwijderen</button>
            </div>
          </div>

          <div class="custom-multiselect">
            <input type="text" v-model="searchQuery" placeholder="Zoek gebruikers" @input="filterUsers" />
            <ul class="user-list">
              <li v-for="user in filteredUsers" :key="user.id">
                <label>
                  <input type="checkbox" :value="user.id" v-model="selectedUsers" />
                  <span :class="{ 'selected-user': isSelected(user.id) }">
                    {{ user.name }}
                  </span>
                </label>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="form-buttons">
        <button @click="cancel()">Annuleren</button>
        <button @click="save()">Opslaan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, computed } from "vue";

const route = useRoute();
const router = useRouter();
const channel = ref({});
const value = ref(null);
const editmode = ref(route.params.channel_id ? true : false);
const channelImage = ref('');
const selectedUsers = ref([]);
const searchQuery = ref('');
const users = ref([]);
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    'Content-Type': 'multipart/form-data'
  }
});

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
const selectedUsersData = computed(() => {
  return users.value.filter(user => selectedUsers.value.includes(user.id));
});

function isSelected(userId) {
  return selectedUsers.value.includes(userId);
}

function filterUsers() {
  // Voeg eventueel extra logica toe voor het filteren van gebruikers
}

function removeUser(userId) {
  const index = selectedUsers.value.indexOf(userId);
  if (index !== -1) {
    selectedUsers.value.splice(index, 1);
  }
}

if (editmode.value) {
  axiosInstance.get('/channel/' + route.params.channel_id).then((response) => {
    channel.value = response.data
    selectedUsers.value = response.data.users.map(user => user.user.id,
  )
})
}
else {
  channel.value.name = ''
  channel.value.description = ''
  channel.value.imageFile = ''
  channel.value.users = []
}

axiosInstance.get('/users').then((response) => {
  users.value = response.data.map(user => {
    return {
      id: user.id,
      name: user.firstname + ' ' + user.lastname,
      image: user.image ? ('http://localhost:8000/' + user.image) : 'https://cataas.com/cat'
    }
  })
})

const truncatedName = (name) => {
  if (name.length <= 20) {
    return name;
  } else {
    return name.substring(0, 17) + '...';
  }
};

const onImageChange = (event) => {
  const file = event.target.files[0]
  console.log(file)
  channel.value.imageFile = file
  channelImage.value = URL.createObjectURL(file)
}

const save = () => {
  if (editmode.value) {
    let data = new FormData();
    data.append('id', channel.value.id);
    data.append('name', channel.value.name)
    data.append('description', channel.value.description)
    data.append('image_file', channel.value.imageFile)
    data.append('users', selectedUsers.value)
    data.append('_method', 'PUT')
    console.log(data.get('users'))
    axiosInstance.post('/channel/update', data).then((response) => { console.log(response) })
    // router.push({ name: 'Channel Overzicht' });
  }
  else {
    let data = new FormData();
    data.append('name', channel.value.name)
    data.append('description', channel.value.description)
    data.append('image_file', channel.value.imageFile)
    data.append('_method', 'POST')
    axiosInstance.post('/channel/add', data).then((response) => { console.log(response) })
    router.push({ name: 'Channel Overzicht' });
  }
}
</script>


<style scoped>
.hidden {
  display: none;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-section {
  display: flex;
  gap: 16px;
}

.form-image-wrapper {
  position: relative;
  width: 125px;

}

.form-image-wrapper>img {
  height: 125px;
  width: inherit;
  aspect-ratio: 4/3;
  max-width: fit-content;
  border-radius: 100%;
}

.form-image-wrapper>label {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #2C9B22;
  color: white;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  padding: 4px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  border: 1px solid #2C9B22;
}

.form-image-wrapper>label:hover {
  background-color: white;
  color: #2C9B22;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
}

.formwrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form input,
textarea,
select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #999;
}

.form textarea {
  height: 150px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}


/* multiselect stylinbg */
.selected-user {
  color: blue;
  /* Voeg hier je gewenste stijl toe */
}

.selected-users {
  display: inline-flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.badge {
  display: flex;
  align-items: center;
  padding: 5px;
  gap: 8px;
  margin-right: 5px;
  border-radius: 16px;
  background-color: #f1f1f1;
}

.badge>img {
  height: 36px;
  width: 36px;
  border-radius: 100%;
  margin-right: 5px;
}
</style>