<template>
    <div class="container">
        <div class="messages__wrapper">
            <div @change="messageContainer" v-for="message in channelMessages" :key="message.id">
                <div :class="[user.id === message.user_id ? 'message__item own' : 'message__item']">
                    <img :src="'http://localhost:8000/' + message.user.image" v-if="message.user.image">
                    <div class="message__content">
                        <div class="message__content__header">
                            <h3 class="message__content__header__name">{{ message.user.firstname }} {{ message.user.lastname
                            }}</h3>
                        </div>

                        <img class="appendix__image" v-for="appendix in message.appendix" :key="appendix.id"
                            :src="`http://localhost:8000/` + appendix.appendix_path" alt="">
                        <!-- make an embedded -->

                        <p class="message__content__text">{{ message.message }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- channel messages -->
        <div class="post__messages__wrapper">
            <!-- appendix list -->
            <div class="appendix__section">
                <div class="appendix__item" v-for="file in files" :key="file.name" 
             >
                    <img class="appendix__image" :src="getFilePreview(file)" alt="Preview" />
                    <button class='appendix__delete'
                    @click="deleteFile(file)">x</button>
                </div>
            </div>
            <section class="post__messages__container">
                <label for="appendix">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="post__message__button">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                    <input class="hidden" type="file" id="appendix" multiple @change="handleFileUpload">
                </label>
                <!-- button for adding an appendix -->
                <input v-model="postMessage" class="post__message__input" type="text">
                <!-- button for submit message -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="post__message__button" @click="SendPost">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/store";
import axios from 'axios'


const store = useAppStore()
const { user } = storeToRefs(store)

// houd de selected channel bij
const selectedChannel = ref(inject('selectedChannel'));
const postMessage = ref('');
const files = ref([]);
const hovered = ref(false);

const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    for (let i = 0; i < uploadedFiles.length; i++) {
        files.value.push(uploadedFiles[i]);
    }
};

const deleteFile = (file) => {
    files.value = files.value.filter((f) => f.name !== file.name);
};



const getFilePreview = (file) => {
    if (file.type.startsWith('image')) {
        return URL.createObjectURL(file);
    }
    return 'https://picsum.photos/200';
};

watch(selectedChannel, (e) => {
    setMessageContainerScrollToBottom()
})

const props = defineProps({
    channelMessages: Object
})

// zet de scroll van de message container op de bodem 
const setMessageContainerScrollToBottom = () => {
    const container = document.querySelector('.messages__wrapper')
    container.scrollTop = container.scrollHeight;
}


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        "accept": 'application/json',
        "content-type": "multipart/form-data"
    }
})

const SendPost = () => {
    console.log('send post')
    const data = new FormData()
    data.append('channel_id', selectedChannel.value)
    data.append('message', postMessage.value)
    files.value.forEach((file) => {
        data.append('appendix_files[]', file)
    })
    data.append("_method", "POST")

    axiosInstance.post(`/channel/messages`, data)
        .then((response) => {
            postMessage.value = ''
            files.value = []
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    padding: 4px;
    display: flex;
    overflow-y: hidden;
    flex-direction: column;
    gap: 4px;
}

.messages__wrapper {
    height: 100%;
    display: flex;
    gap: 8px;
    flex-direction: column;
    overflow-y: scroll;
    padding-right: 8px;
    padding-left: 8px;
}

.hidden {
    display: none;
}

.own {
    flex-direction: row-reverse;
}

.message__item {
    display: flex;
    gap: 8px;
    align-items: center;
}

.message__item>img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    display: block;
}

.message__content {
    background: #C8D7EC;
    padding: 4px 8px;
    border-radius: 8px;
    max-width: 80%;
}

.post__message {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 4px;
    background-color: transparent;
}

.post__message__button {
    width: 36px;
    height: 36px;
    background: #2C9B22;
    border-radius: 50%;
    padding: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.post__message__button:hover {
    /* make a shadow on hover */
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.75);
}

.appendix__item {
    position: relative;
}

.appendix__delete {
    position: absolute;
    top: 0;
    right: 8px;
    color: red;
}

.appendix__section {
    position: relative;
    display: flex;
    gap: 16px;
    padding: 8px;
    /* overflow-x: scroll; */
}

.appendix__section>div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.appendix__image {
    width: 100px;
    height: 100px;
}

.post__message__input {
    width: 100%;
    outline: none;
}

.post__messages__wrapper {
    border: 2px solid #2C9B22;
    border-radius: 8px;
    padding: 8px;
}

.post__messages__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.post__messages__container>label {
    display: flex;
}

.post__messages__container>section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
}

.post__messages__container>button {
    display: flex;
}
</style>