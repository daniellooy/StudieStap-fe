<template>
  <div class="card-wrapper">
    <vue-flip class="card1" v-model="editSection1" transition="1.6s">
      <template v-slot:front class="front ">
        <div class="section-wrapper bg-1">
          <h3>Wie ben ik?</h3>
          <section class="section">
            <div class="section-content">
              <div>
                <img class="profile-photo" :src="profile_image" v-if="profile_image">
              </div>
              <div>
                <div>
                  <p class="bold-text">{{ user.first_name + " " + user.last_name }}</p>
                </div>
                <div>
                  <p class="cursif">{{ user.email ? user.email : "Geen Email" }}</p>
                </div>
                <div>
                  <p class="cursif">{{ user.phone ? user.phone : "geen telefoonnummer" }}</p>
                </div>
              </div>
            </div>
            <div>
              <p class="bold-text">Biografie</p>
              <p>{{ user.bio ? user.bio : "Geen Bio" }}</p>
            </div>
            <div class="align-end">
              <button type="button" class="edit-button" @click="ShowEditSection(1)">aanpassen</button>
            </div>
          </section>
        </div>
      </template>
      <template v-slot:back class="back">
        <form @submit.prevent="submitForm" class="back section-wrapper bg-1">
          <h3>Wie ben ik?</h3>
          <section class="section">
            <div class="section-content">
              <div class="content-profileImage">
                <div class="profile-photo-wrapper">
                  <img class="profile-photo" :src="profile_image">
                  <label for="profile-photo" class="profile-photo-change">+</label>
                </div>
                <input class="hidden" type="file" id="profile-photo" accept="image/*" @change="onProfilePhotoChange">
              </div>
              <div>
                <div>
                  <p class="bold-text">{{ user.first_name + " " + user.last_name }}</p>
                </div>
                <div>
                  <p class="cursif">{{ user.email ? user.email : "Geen Email" }}</p>
                </div>
                <div>
                  <p class="cursif">{{ user.phone ? user.phone : "geen telefoonnummer" }}</p>
                </div>
              </div>
            </div>
            <div class="biography">
              <label for="biography" class="bold-text">Biografie</label>
              <textarea v-model="Form.biography" name="biography" id="biography" cols="30" row="6"></textarea>
            </div>
            <div class="button-group align-end ">
              <button type="button" class="cancel-button" @click="ShowEditSection(1)">Cancel</button>
              <button type="submit" class="save-button">Opslaan</button>
            </div>
          </section>
        </form>
      </template>
    </vue-flip>
    <vue-flip class="card2" v-model="editSection2" transition="1.6s">
      <template v-slot:front class="front">
        <div class="section-wrapper bg-2">
          <h3>Persoonsinformatie</h3>
          <section class="section-grid">
            <div class="content-item column">
              <div class="content-item-group">
                <p>Voornaam</p>
                <p>{{ user.first_name }}</p>
              </div>
              <div class="content-item-group">
                <p>Email address</p>
                <p>{{ user.email }}</p>
              </div>
              <div class="content-item-group">
                <p>Welke workshop geef ik?</p>
                <p>{{ user.workshop ? user.workshop : "Geen workshop" }}</p>
              </div>
            </div>
            <div class="content-item column">
              <div class="content-item-group">
                <p>Achternaam</p>
                <p>{{ user.last_name }}</p>
              </div>
              <div class="content-item-group">
                <p>TelefoonNummer</p>
                <p>{{ user.phone ? user.phone : "Geen nummer" }}</p>
              </div>
            </div>
            <div class="align-end">
              <button type="button" class="edit-button" @click="ShowEditSection(2)">aanpassen</button>
            </div>
          </section>
        </div>
      </template>
      <template v-slot:back class="back">
        <form @submit.prevent="submitForm" class="back section-wrapper bg-2">
          <h3>Persoonsinformatie</h3>
          <section class="section-grid">
            <div class="content-item column">
              <div class="content-item-group">
                <label for="firstName">Voornaam</label>
                <input placeholder="Wat is je voornaam?" type="text" name="firstName" v-model="Form.first_name" />
              </div>
              <div class="content-item-group">
                <label for="email">Email address</label>
                <input placeholder="email@hotmail.com" type="email" name="email" v-model="Form.email" />
              </div>
              <div class="content-item-group">
                <label for="workshop">Welke workshop geef ik?</label>
                <input placeholder="workshop?" type="text" name="workshop" v-model="Form.workshop" />
              </div>
            </div>
            <div class="content-item column">
              <div class="content-item-group">
                <label for="lastName">Achternaam</label>
                <input placeholder="Wat is je achternaam?" type="text" name="lastName" v-model="Form.last_name" />
              </div>
              <div class="content-item-group">
                <label for="tel">TelefoonNummer</label>
                <input placeholder="+(31) 6 12345678" type="tel" name="tel" v-model="Form.phone" />
              </div>
            </div>

            <div class="button-group align-end ">
              <button type="button" class="cancel-button" @click="ShowEditSection(2)">Cancel</button>
              <button type="submit" class="save-button">Opslaan</button>
            </div>
          </section>
        </form>
      </template>
    </vue-flip>
    <vue-flip class="card3" v-model="editSection3" transition="1.6s">
      <template v-slot:front class="front">
        <div class="section-wrapper bg-1">
          <h3>Adres</h3>
          <section class="section-grid">
            <div class="content-item column">
              <div class="content-item-group">
                <p>Stad/dorp</p>
                <p>{{ user.city ? user.city : "Onbekend" }}</p>
              </div>
              <div class="content-item-group">
                <p>postcode</p>
                <p>{{ user.zip ? user.zip : "onbekend" }}</p>
              </div>
            </div>
            <div class="content-item column">
              <div class="content-item-group">
                <p>Straatnaam</p>
                <p>{{ user.street ? user.street : "onbekend" }}</p>
              </div>
              <div class="content-item-group">
                <p>Huisnummer</p>
                <p>{{ user.houseNumber ? user.houseNumber : "onbekend" }}</p>
              </div>
            </div>
            <div class="align-end">
              <button type="button" class="edit-button" @click="ShowEditSection(3)">aanpassen</button>
            </div>

          </section>
        </div>
      </template>
      <template v-slot:back class="back">
        <form @submit.prevent="submitForm" class="section-wrapper bg-1">
          <h2>Adress</h2>
          <section class="section-grid">
            <div class="content-item column">
              <div class="content-item-group">
                <label for="city">Stad/dorp</label>
                <input placeholder="In welk dorp/stad woon je?" type="text" name="city" v-model="Form.city" />
              </div>
              <div class="content-item-group">
                <label for="zip"> Postcode</label>
                <input placeholder="AB 1234" type="text" name="zip" v-model="Form.zip" />
              </div>
            </div>
            <div class="content-item column">
              <div class="content-item-group">
                <label for="street">Straatnaam</label>
                <input placeholder="Wat is jouw straatnaam?" type="text" name="street" v-model="Form.street">
              </div>
              <div class="content-item-group">
                <label for="houseNumber">Huisnummer</label>
                <input placeholder="Wat is jouw huisnummer?" type="number" name="houseNumber" v-model="Form.houseNumber">
              </div>
            </div>
            <div class="button-group align-end ">
              <button type="button" class="cancel-button" @click="ShowEditSection(3)">Cancel</button>
              <button class="save-button" @click="Submit">Opslaan</button>
            </div>
          </section>
        </form>
      </template>
    </vue-flip>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/store";
import axios from "axios";
import { reactive } from 'vue'
import { VueFlip } from 'vue-flip';

const store = useAppStore()
const { user } = storeToRefs(store)
const profile_image = ref("https://185-220-205-7.cloud-xip.com/" + user.value.Profile_image)


const editSection1 = ref(false)
const editSection2 = ref(false)
const editSection3 = ref(false)

const Form = reactive({
  id: user.value.id,
  first_name: user.value.first_name,
  last_name: user.value.last_name,
  email: user.value.email,
  profile_image: user.value.Profile_image,
  profile_image_file: "",
  biography: user.value.bio ? user.value.bio : "",
  city: user.value.city,
  phone: user.value.phone,
  street: user.value.street,
  houseNumber: user.value.houseNumber,
  zip: user.value.zip,
  workshop: user.value.workshop,
  OldPassword: "",
  NewPassword: ""
})

const axiosInstance = axios.create({
  baseURL: 'https://185-220-205-7.cloud-xip.com',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "multipart/form-data"
  }
})

const onProfilePhotoChange = (event) => {
  const file = event.target.files[0]
  console.log(file)
  profile_image.value = URL.createObjectURL(file)
  Form.profile_image_file = file
}

const ShowEditSection = (sectie) => {
  if (sectie == 1) {
    editSection1.value = !editSection1.value
  } else if (sectie == 2) {
    editSection2.value = !editSection2.value
  } else if (sectie == 3) {
    editSection3.value = !editSection3.value
  }
}

const submitForm = () => {
  const data = new FormData()
  data.append("id", Form.id)
  data.append("first_name", Form.first_name)
  data.append("last_name", Form.last_name)
  data.append("email", Form.email)
  data.append("biography", Form.biography)
  data.append("city", Form.city)
  data.append("phone", Form.phone)
  data.append("street", Form.street)
  data.append("houseNumber", Form.houseNumber)
  data.append("zip", Form.zip)
  data.append("profile_image_file", Form.profile_image_file)
  data.append("workshop", Form.workshop)
  data.append("_method", "PUT")
  axiosInstance.post('/api/user', data)
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
}

</script>

<style scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px
}

.bg-1 {
  background-color: white;
  /*background-color: #f1f1f1 !important;*/
  /*background-image: url('/src/assets/Background_profiel_1.svg');*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% auto;*/
  /*background-position: bottom;*/
}

.bg-2{
  background-color: white;
  /*background-color: #f1f1f1 !important;*/
  /*background-image: url('/src/assets/Background_profiel_2.svg');*/
  /*background-repeat: no-repeat;*/
  /*background-size: 100% auto;*/
  /*background-position: bottom;*/
}

.card1 {
  width: 100%;
  height: 180px;
}

.card2 {
  width: 100%;
  height: 294px;
}

.card3 {
  width: 100%;
  height: 220px;
}

.content-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
}


.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.section-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /*background-color: transparent;*/
  padding: 16px;
  /*border: 2px solid #2C9B22;*/
  border-radius: 20px;
  gap: 20px;
  background-color: white;
}

.section {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 2fr) 1fr;
  width: 100%;
  gap: 32px;
}

.section-grid {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) minmax(300px, 2fr) 1fr;
  width: 100%;
  gap: 16px;
}

.section-content {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
}

.content-item-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-item-group>p:first-child {
  font-weight: bold;
}

.content-item-group>label {
  font-weight: bold;
}

.content-item-group>input {
  border: 1px solid #2C9B22;
  padding: 4px 8px;
  background: #C8D7EC;
  border-radius: 8px;
}

.profile-photo-wrapper {
  position: relative;
}

.profile-photo-change {
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

.profile-photo-change:hover {
  background-color: white;
  color: #2C9B22;
}

.biography>textarea {
  width: 100%;
  height: auto;
  resize: none;
  border: 1px solid #2C9B22;
  border-radius: 8px;
  background-color: #C8D7EC;
  padding: 4px 8px;
}

.edit-button {
  border: 1px solid #2C9B22;
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.2s ease-in-out;
}

.edit-button:hover {
  background-color: #2C9B22;
  color: white;
  cursor: pointer;
}

.save-button {
  border: 1px solid #2C9B22;
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.2s ease-in-out;
}

.save-button:hover {
  background-color: #2C9B22;
  color: white;
  cursor: pointer;
}

.cancel-button {
  border: 1px solid #C8D7EC;
  border-radius: 8px;
  padding: 4px 8px;
  transition: all 0.2s ease-in-out;
}

.cancel-button:hover {
  background-color: #C8D7EC;
  color: white;
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 8px;
}

.bold-text {
  font-weight: bold;
}

.align-end {
  justify-self: end;
  align-self: center;
}

.column {
  flex-direction: column;
}

.row {
  flex-direction: row;
}

.cursif {
  font-style: italic;
}

.hidden {
  display: none;
}

/* form card flip transition animation */
</style>
