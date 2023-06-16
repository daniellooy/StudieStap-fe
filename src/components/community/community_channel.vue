<template>
    <div class="container">
        <div class="messages__wrapper">
            <div @change="messageContainer" v-for="message in modifiedChannelMessages" :key="message.id">
                <div :class="[user.id === message.user_id ? 'message__item own' : 'message__item']">
                    <img :src="'http://localhost:8000/' + message.user.image" v-if="message.user.image">
                    <div class="message__content">
                        <div @mousedown="showMessage(message)" class="message__content__header">
                            <h3 class="message__content__header__name">{{ message.user.firstname }} {{ message.user.lastname
                            }}</h3>
                            <div class="message__response" v-if="message.response_to">
                                <h3>
                                    {{ message.response_to.user.firstname }} {{ message.response_to.user.lastname }}
                                </h3>
                                <p class="message__content__text">{{ message.response_to.message }}</p>
                            </div>
                        </div>
                        <ul class="appendix__list">
                            <li class="appendix__list__item" v-for="appendix in message.appendix" :key="appendix.id">
                                <img v-if="isImage(appendix.appendix_path)" class="appendix__image"
                                    :src="getAppendixUrl(appendix.appendix_path)" alt=""
                                    @click="showAppendixModal(message.appendix, appendix)">
                                <video class="appendix__video" v-if="isVideo(appendix.appendix_path)" :src="getAppendixUrl(appendix.appendix_path)"
                                    controls />
                            </li>
                        </ul>
                        <p class="message__content__text">{{ message.message }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- channel messages -->
        <div class="post__messages__wrapper">
            <!-- appendix list -->
            <div :class="[files.length === 0 ? 'hidden' : 'appendix__section']">
                <div class="appendix__item" v-for="file in files" :key="file.name" @mouseover="hoveredIndex = index"
                    @mouseleave="hoveredIndex = null">
                    <img class="appendix__image" :src="getFilePreview(file)" alt="Preview" />
                    <button class="appendix__delete" @click="deleteFile(file)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
            <div :class="[responseTo ? 'responseTo message__content ' : 'hidden']">
                <div class="message__content__header">
                    <h3 class="message__content__header__name">{{ responseTo ? responseTo.user.firstname : '' }} {{
                        responseTo ? responseTo.user.lastname : '' }}</h3>
                </div>
                <p class="message__content__text">{{ responseTo ? responseTo.message : '' }}</p>
                <button class="delete__response" @click="deleteResponse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
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
        <!-- Appendix Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal__content">
                <img class="modal__image" :src="`http://localhost:8000/` + selectedAppendix.appendix_path" alt="">
                <button class="modal__close" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed, watch } from 'vue'
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/store";
import axios from 'axios'

const store = useAppStore()
const { user } = storeToRefs(store)
const endpoint = import.meta.env.VITE_API_ENDPOINT
// houd de selected channel bij
const selectedChannel = ref(inject('selectedChannel'));
const postMessage = ref('');
const files = ref([]);
const responseTo = ref(null);
const showModal = ref(false)
const selectedAppendix = ref(null);
const appendixList = ref([])
const currentIndex = ref(0);
const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    for (let i = 0; i < uploadedFiles.length; i++) {
        files.value.push(uploadedFiles[i]);
    }
};
const modifiedChannelMessages = computed(() => {
    const modifiedMessages = { ...props.channelMessages };
    return modifiedMessages;
});

const deleteFile = (file) => {
    files.value = files.value.filter((f) => f.name !== file.name);
};
const deleteResponse = () => {
    responseTo.value = null;
};


const getFilePreview = (file) => {
    if (file.type.startsWith('image')) {
        return URL.createObjectURL(file);
    }
};


watch(selectedChannel, async (e) => {
    setTimeout(() => {
        setMessageContainerScrollToBottom()
    }, 500);
})

const props = defineProps({
    channelMessages: Object
})

const showMessage = (message) => {
    responseTo.value = message
    console.log(message)
}
// zet de scroll van de message container op de bodem
const setMessageContainerScrollToBottom = () => {
    const container = document.querySelector('.messages__wrapper')
    container.scrollTop = container.scrollHeight;
}


const axiosInstance = axios.create({
    baseURL: endpoint + '/api',
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
    data.append('response_to_id', responseTo.value ? responseTo.value.id : null)
    data.append('message', postMessage.value)
    files.value.forEach((file) => {
        data.append('appendix_files[]', file)
    })
    data.append("_method", "POST")

    axiosInstance.post(`/channel/messages`, data)
        .then((response) => {
            postMessage.value = ''
            files.value = []
            responseTo.value = null
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    axiosInstance.get(`/channel/${selectedChannel.value}`)
        .then((response) => {
            modifiedChannelMessages.value = response.data.messages
            console.log(modifiedChannelMessages)
        })
}


const showAppendixModal = (appendixList, Appendix) => {
    appendixList.value = appendixList;
    selectedAppendix.value = Appendix;
    showModal.value = true;
    currentIndex.value = appendixList.value.indexOf(selectedAppendix.value);
}

const closeModal = () => {
    showModal.value = false;
    selectedAppendix.value = null;
    currentIndex.value = 0;
}

const isImage = (appendixPath) => {
    return appendixPath.startsWith('image')
}

const isVideo = (appendixPath) => {
    return appendixPath.startsWith('video')
}

const getAppendixUrl = (appendixPath) => {
    return `http://localhost:8000/${appendixPath}`; // Pas de URL-structuur aan als dat nodig is
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

.responseTo {
    max-width: 100% !important;
    margin-bottom: 8px;
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
    position: relative;
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

.message__response {
    position: relative;
    background: #a1acbb;
    padding: 4px 8px;
    border-radius: 8px;
    scale: 0.75;
}

.appendix__list {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: 8px;
    list-style-type: none;
    max-width: 100%;
}


.appendix__item {
    position: relative;
}

.appendix__item>img {
    border-radius: 16px;

}

.appendix__delete {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 24px;
    height: 24px;
}

.appendix__delete>svg {
    padding: 2px;
    background-color: red;
    color: white;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
}

.appendix__delete>svg:hover {
    padding: 2px;
    background-color: white;
    color: red;
    border-radius: 4px;
}

.delete__response {
    position: absolute;
    top: 4PX;
    right: 4px;
    color: red;
    width: 24px;
    height: 24px;
}

.delete__response>svg {
    padding: 2px;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
}

.delete__response>svg:hover {
    padding: 2px;
    color: white;
    border-radius: 4px;
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
    border-radius: 16px;
    width: 100px;
    height: 100px;
}

.appendix__video {
    border-radius: 16px;
    height: 200px;
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


/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 600px;
}

.modal__image {
    max-height: 700px;
}

.modal__close {
    position: absolute;
    top: 0px;
    right: 8px;
    border: 1px solid white;
    padding: 4px;
    border-radius: 8px;
    background: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all;
}

.modal__close:hover {
    background: #fff;
    color: #000;
}

/* custom scrollbar */

.messages__wrapper::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(44, 455, 34, 0.2);
}

/* Handle */
.messages__wrapper::-webkit-scrollbar-thumb {
    background-color: #2C9B22;
    border-radius: 5px;
}

/* Handle on hover */
.messages__wrapper::-webkit-scrollbar-thumb:hover {
    background: rgba(44, 455, 34, 0.8);

}</style>
