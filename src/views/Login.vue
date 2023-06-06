<template>
  <div class="login-wrapper">
    <div class="login-modal">
      <div class="login-modal-message">
        <h1>Welkom terug StudieStapper!</h1>
        <p>Goed om je weer te zien :)</p>
      </div>
      <div class="login-modal-form">
        <div class="login-modal-form-fields">
          <div class="login-modal-form-field-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
            </svg>
            <input placeholder="walt@disney.com" type="text" id="email" v-model="email">
          </div>
          <div class="login-modal-form-field-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <input placeholder="*********" type="password" id="password" v-model="password">
          </div>
        </div>
        <div class="login-modal-form-buttons">
          <button class="login-modal-form-login-button" @click="login()">Inloggen</button>
          <a href="">Wachtwoord vergeten?</a>
        </div>
      </div>
    </div>
    <div class="login-splashart">
      <svg viewBox="0 0 705 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="686.942" height="816.11" transform="matrix(0.996442 0.0842812 -0.104365 0.994539 187.509 41.1037)" fill="#2C9B22"/>
        <path d="M585.494 432.375C595.927 423.331 612.582 423.622 622.693 433.024L988.122 772.828L383.737 1296.71L18.3079 956.907C8.19671 947.505 8.45773 932.551 18.8909 923.508L585.494 432.375Z" fill="#32B027"/>
        <path d="M68.9203 -502.09L682.53 -548.804L744.552 107.839L155.87 152.656C142.103 153.704 129.89 143.411 128.591 129.665L68.9203 -502.09Z" fill="#1D861D"/>
        <g clip-path="url(#clip0_34_2)">
          <path d="M310.72 1023.01L267.458 1023.23C265.996 1023.23 264.592 1022.68 263.553 1021.69C262.514 1020.7 261.926 1019.35 261.918 1017.94L261.489 931.339C261.483 929.932 262.058 928.579 263.087 927.578C264.116 926.577 265.514 926.01 266.976 926.002L310.238 925.787C311.7 925.782 313.104 926.335 314.143 927.325C315.182 928.316 315.77 929.663 315.778 931.071L316.207 1017.67C316.212 1019.08 315.638 1020.43 314.609 1021.44C313.58 1022.44 312.182 1023 310.72 1023.01Z" fill="#1D861D"/>
          <path d="M413.365 1023.32L370.103 1023.53C368.416 1023.54 366.796 1022.9 365.598 1021.76C364.399 1020.62 363.721 1019.06 363.711 1017.44L362.877 849.134C362.871 847.51 363.534 845.949 364.721 844.794C365.908 843.64 367.522 842.985 369.209 842.975L412.471 842.761C414.158 842.754 415.778 843.393 416.976 844.535C418.175 845.678 418.853 847.233 418.863 848.857L419.697 1017.16C419.703 1018.79 419.04 1020.35 417.853 1021.5C416.666 1022.66 415.052 1023.31 413.365 1023.32ZM369.217 844.609C367.98 844.617 366.796 845.096 365.926 845.943C365.056 846.79 364.569 847.935 364.574 849.126L365.407 1017.43C365.414 1018.62 365.912 1019.76 366.791 1020.6C367.67 1021.44 368.858 1021.91 370.095 1021.9L413.357 1021.69C414.594 1021.68 415.777 1021.2 416.648 1020.35C417.518 1019.51 418.005 1018.36 418 1017.17L417.167 848.866C417.159 847.674 416.662 846.534 415.783 845.696C414.904 844.858 413.716 844.39 412.479 844.395L369.217 844.609Z" fill="#3F3D56"/>
          <path d="M516.006 1022.81L472.744 1023.03C471.057 1023.03 469.437 1022.39 468.239 1021.25C467.04 1020.11 466.362 1018.55 466.352 1016.93L464.988 741.598C464.982 739.973 465.645 738.412 466.832 737.258C468.019 736.103 469.633 735.449 471.32 735.439L514.582 735.224C516.269 735.218 517.889 735.856 519.087 736.999C520.286 738.142 520.964 739.696 520.974 741.32L522.338 1016.65C522.344 1018.28 521.681 1019.84 520.494 1020.99C519.307 1022.15 517.693 1022.8 516.006 1022.81ZM471.328 737.073C470.091 737.08 468.908 737.56 468.037 738.407C467.167 739.253 466.68 740.398 466.685 741.589L468.048 1016.92C468.056 1018.11 468.553 1019.25 469.432 1020.09C470.311 1020.93 471.499 1021.4 472.736 1021.39L515.998 1021.18C517.235 1021.17 518.419 1020.69 519.289 1019.84C520.159 1019 520.646 1017.85 520.641 1016.66L519.278 741.329C519.271 740.137 518.773 738.998 517.894 738.16C517.015 737.322 515.827 736.854 514.59 736.858L471.328 737.073Z" fill="#3F3D56"/>
          <path d="M619.603 1021.89L576.341 1022.1C574.88 1022.11 573.475 1021.56 572.437 1020.57C571.398 1019.58 570.81 1018.23 570.801 1016.82L568.879 628.741C568.874 627.333 569.449 625.981 570.478 624.98C571.506 623.979 572.905 623.412 574.367 623.404L617.629 623.189C619.091 623.184 620.495 623.737 621.534 624.727C622.572 625.718 623.16 627.065 623.169 628.473L625.091 1016.55C625.096 1017.96 624.521 1019.31 623.493 1020.31C622.464 1021.31 621.065 1021.88 619.603 1021.89Z" fill="#2C9B22"/>
          <path d="M349.354 783.534C349.505 782.342 349.383 781.132 348.996 779.99C348.609 778.849 347.967 777.802 347.115 776.926C346.263 776.049 345.222 775.363 344.064 774.916C342.907 774.469 341.662 774.272 340.417 774.339L325.206 747.771L321.869 759.226L332.321 783.592C332.575 785.599 333.585 787.447 335.159 788.784C336.733 790.122 338.762 790.857 340.862 790.85C342.961 790.842 344.985 790.094 346.551 788.745C348.116 787.397 349.113 785.543 349.354 783.534Z" fill="#A0616A"/>
          <path d="M233.693 889.303L242.121 895.168L269.629 866.637L257.19 857.982L233.693 889.303Z" fill="#A0616A"/>
          <path d="M252.719 914.018L226.229 895.587L233.627 885.726L249.882 897.036C252.596 898.925 254.42 901.775 254.952 904.96C255.485 908.144 254.681 911.403 252.719 914.018Z" fill="#2F2E41"/>
          <path d="M278.284 920.345L288.684 920.293L293.44 881.634L278.091 881.71L278.284 920.345Z" fill="#A0616A"/>
          <path d="M308.787 929.494L276.103 929.657L276.042 917.495L296.098 917.394C299.447 917.378 302.666 918.643 305.045 920.912C307.425 923.181 308.771 926.268 308.787 929.494Z" fill="#2F2E41"/>
          <path d="M308.771 769.504C308.771 769.504 314.096 816.865 301.533 849.609L292.51 911.748L276.393 911.828L277.725 838.288L271.464 772.957C271.464 772.957 283.194 743.486 308.771 769.504Z" fill="#2F2E41"/>
          <path d="M253.65 773.045L270.894 829.334L238.063 880.153L254.671 893.552L292.138 836.582L280.766 767.191L253.65 773.045Z" fill="#2F2E41"/>
          <path d="M296.289 646.418C307.796 646.361 317.079 637.33 317.024 626.248C316.969 615.165 307.597 606.227 296.09 606.284C284.584 606.341 275.3 615.372 275.355 626.454C275.41 637.537 284.782 646.475 296.289 646.418Z" fill="#A0616A"/>
          <path d="M278.933 654.042C278.933 654.042 291.617 645.809 306.127 663.712L310.504 776.849C310.504 776.849 299.404 762.197 276.569 776.2C253.735 790.202 248.568 774.704 248.568 774.704C248.568 774.704 231.872 657.952 278.933 654.042Z" fill="#CCCCCC"/>
          <path d="M305.099 663.431C308.759 663.604 312.224 665.074 314.826 667.559C317.428 670.044 318.984 673.368 319.194 676.892L322.129 726.135L340.174 772.617L330.035 780.837L296.677 725.444L289.678 679.812C289.357 677.721 289.522 675.587 290.16 673.564C290.798 671.54 291.894 669.678 293.369 668.112C294.844 666.545 296.661 665.313 298.689 664.504C300.717 663.694 302.906 663.328 305.099 663.431Z" fill="#CCCCCC"/>
          <path d="M280.955 641.479C284.379 644.956 290.695 643.049 291.115 638.273C291.148 637.902 291.144 637.529 291.102 637.159C290.862 635.046 289.584 633.132 289.877 630.898C289.943 630.342 290.156 629.811 290.494 629.356C293.191 625.842 299.587 630.877 302.133 627.695C303.694 625.745 301.833 622.694 303.027 620.517C304.604 617.642 309.323 619.033 312.27 617.449C315.549 615.686 315.329 610.828 313.15 607.884C310.493 604.293 305.855 602.393 301.284 602.139C296.713 601.884 292.18 603.096 287.922 604.719C283.083 606.562 278.289 609.101 275.326 613.221C271.723 618.231 271.407 624.945 273.25 630.774C274.372 634.32 278.16 638.639 280.955 641.479Z" fill="#2F2E41"/>
          <path d="M726.077 1021.43L176.994 1024.14C176.727 1024.14 176.47 1024.04 176.28 1023.86C176.091 1023.68 175.983 1023.43 175.982 1023.18C175.981 1022.92 176.086 1022.67 176.274 1022.49C176.461 1022.3 176.717 1022.2 176.984 1022.2L726.067 1019.48C726.335 1019.48 726.591 1019.58 726.781 1019.76C726.971 1019.94 727.078 1020.19 727.079 1020.45C727.081 1020.7 726.976 1020.95 726.788 1021.14C726.6 1021.32 726.344 1021.42 726.077 1021.43Z" fill="#3F3D56"/>
        </g>
        <defs>
          <clipPath id="clip0_34_2">
            <rect width="551.11" height="421.772" fill="white" transform="translate(173.897 602.729) rotate(-0.283739)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import {useAppStore} from "@/store/store";

const store = useAppStore()
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "accept": 'application/json',
    "content-type": "application/json"
  }
})
export default {
  name: "Login.vue",

  data(){
    return {
      email: null,
      password: null,
    }
  },

  setup(){
    axiosInstance.get('/sanctum/csrf-cookie').then(response => {
      console.log(response)
    })
  },

  methods: {
    login(){
      axiosInstance.post('/api/login',
        {
          email: this.email,
          password: this.password
        },
      ).then((response) => {
          axiosInstance.get('/api/user')
            .then((response) => {
              console.log(response)
              const data = response.data
              store.updateSessionValid(true)
              const userobj = {
                id: data.id,
                address: data.address,
                bio: data.bio,
                city: data.city,
                date_of_birth: data.date_of_birth,
                Profile_image: data.image,
                first_name: data.firstname,
                last_name: data.lastname,
                email: data.email,
                phone: data.phone,
                street: data.street,
                workshop: data.workshop,
                zip: data.zip,

              }
              store.updateUserObj(userobj)
              router.push('/')
            })
        }
      )
    },
  }
}
</script>

<style scoped>

.login-wrapper{
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  padding-left: 90px;
  padding-right: 90px;
  position: relative;
}

.login-modal{
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.login-modal-message h1{
  font-size: 48px;
  font-weight: 400;
  max-width: 500px;
  line-height: 52px;
}

.login-modal-form{
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 375px;

}

.login-modal-form-fields{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-modal-form-fields input{
  width: 100%;
  font-size: 16px;
}

.login-modal-form-fields input:active,input:focus{
  border: none;
  outline: none;
}

.login-modal-form-fields
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}


.login-modal-form-buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-modal-form-login-button{
  border-radius: 999px;
  width: 170px;
  background-color: #2C9B22;
  padding-top: 8px;
  padding-bottom: 8px;
  color: white;
}

.login-modal-form-field-wrapper{
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #CCCCCC;
  padding-bottom: 5px;
}

.login-modal-form-field-wrapper svg{
  height: 16px;
  width: auto;
  align-self: center;
}

.login-splashart{
  position: absolute;
  height: 100vh;
  width: 100%;
  max-width: 499px;
  right: 0;
  bottom: 0;
}

.login-splashart svg{
  height: 100%;
  object-fit: cover;
}

</style>
