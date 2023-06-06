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
              <img class="user-image" :src="user.image" alt="">
              <span>{{ truncatedName(user.name) }}</span>
              <button @click="removeUser(user.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            </div>

          </div>

          <div class="custom-multiselect">
            <input type="text" v-model="searchQuery" placeholder="Wie wil je toevoegen aan de channel"
              @input="filterUsers" />
            <ul class="user-list">
              <li class="user-list-item" v-for="user in filteredUsers" :key="user.id">
                <label :class="{ 'selected-user': isSelected(user.id) }">
                  <input class="hidden" type="checkbox" :value="user.id" v-model="selectedUsers" />
                  <img class="user-image" :src="user.image" alt="">
                  <span class="user-name">
                    {{ truncatedName(user.name) }}
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
  axiosInstance.get('/channel/' + route.params.channel_id + "/edit").then((response) => {
    channel.value = response.data
    console.log(response.data)
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
    router.push({ name: 'Channel Overzicht' });
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
.custom-multiselect {
  margin-top: 16px;
}

.custom-multiselect>input {
  width: 100%;
}

.user-list {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  max-height: calc(3 * (50px + 10px));
  overflow-y: scroll;
  list-style-type: none;
  scrollbar-width: thin;
  transition: all 0.2s ease-in-out;
}

.user-list-item {
  display: flex;
}

.user-list-item>label {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.user-list-item>label:hover {
  color: #2C9B22;
  background: rgba(44, 455, 34, 0.2);
}

.user-name {
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.selected-user {
  color: #2C9B22;
  width: 100%;
  background: rgba(44, 455, 34, 0.4);
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
  font-weight: 500;
  color: #2C9B22;
  background: rgba(44, 455, 34, 0.4);
}

.badge > button{
  width: 24px;
  height: 24px;
  color: #000;
  transition: all 0.2s ease-in-out;
}
.badge > button:hover{
  color : red;
}

.user-image {
  height: 36px;
  width: 36px;
  border-radius: 100%;
  margin-right: 5px;
}
/* custom scrollbar */
/* Track */
.user-list::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(44, 455, 34, 0.2);
}

/* Handle */
.user-list::-webkit-scrollbar-thumb {
  background-color: rgba(44, 455, 34, 0.8);
  border-radius: 5px;
}

/* Handle on hover */
.user-list::-webkit-scrollbar-thumb:hover {
  background: #2C9B22;

}


</style>