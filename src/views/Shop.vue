<template>
    <section class="shop__top">
      <button class="shop__nav__button" @click="toShop()">To achievements</button>
      <section class="points__section">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="total__points">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <section class="points">{{ user.points }}</section>
      </section>
    </section>
    <section class="shopitem__container" >
      <section class="shopitem" v-for="(shopitem, idx) in shopitems">
        <section class="shopitem__name">{{ shopitem.name }}</section>
        <section class="shopitem__description">{{ shopitem.description }}</section>
        <section class="shopitem__price__section">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="shopitem__points">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <section class="shopitem__price">{{ shopitem.price }}</section>
        </section>
        <button class="shopitem__button" @click="buyItem(shopitem, idx)" v-if="checkIfBought(shopitem) == 'buy'">Buy</button>
        <button class="shopitem__nomoney" v-if="checkIfBought(shopitem) == 'nomoney'">Not enough points</button>
        <section class="shopitem__bought" v-if="checkIfBought(shopitem) == 'bought'">Item already bought</section>
      </section>
    </section>
</template>

<script>
import axios from 'axios';
import router from "@/router";
import {useAppStore} from "@/store/store";
import {storeToRefs} from "pinia";

const store = useAppStore();
const {user} = storeToRefs(store);


export default {
  name: "Shop",
  data() {
    return {
      shopitems: [],
      user: user,
    };
  },

  mounted() {
    axios.get('https://185-220-205-7.cloud-xip.com/api/shopitems').then((res) => {
      this.shopitems = res.data;
      console.log(this.shopitems);
    });
  },

  methods: {
    toShop(){
      router.push("/achievements");
    },

    buyItem(item, idx){
      axios.post('https://185-220-205-7.cloud-xip.com/api/shopitems/' + item.id + '/purchase')
      .then((response)=>{
          this.shopitems[idx].purchases.length = 1;
          this.user.points -= item.price;
          // console.log(response);
        });
      ;

    },

    checkIfBought(shopitem){
      if(shopitem.purchases.length == 1){
        return "bought";
      }
      else if(this.user.points < shopitem.price){
        return "nomoney";
      }
      else{
        return "buy";
      }
    }
  },
};
</script>

<style scoped>

.shop__top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.points__section{
  display: flex;
  flex-direction: row;
}

.shop__nav__button{
  font-size: large;
  text-decoration: underline;
}

.shopitem__points{
    width: 20px;
    height: 20px;
    margin-right: 4px;
}

.total__points{
    width: 32px;
    height: 32px;
    margin-right: 4px;
}

.points{
  font-weight: 600;
  font-size: x-large;
}
.shopitem__container{
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow: wrap;
  margin-top: 2rem;
}

.shopitem{
  width: 15rem;
  height: 20rem;
  border: 0.1rem solid #339529;
  background: white;
  border-radius: 1rem;
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 1rem; */
}

.shopitem__name{
  border-bottom: 0.1rem solid #339529;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: 600;
}

.shopitem__description{
  padding: 1rem;
  height: 10rem;
  /* background: red; */
}

.shopitem__price__section{
  display: flex;
  padding: 0.8rem;
}

.shopitem__price{
  font-weight: 600;
  /* padding: 0.8rem; */
}

.shopitem__button{
  width: 10rem;
  height: 2.5rem;
  background: #339529;
  color: white;
  border-radius: 1.5rem;
}

.shopitem__bought{
  margin-top: 0.5rem;
}

.shopitem__nomoney{
  width: 12rem;
  height: 2.5rem;
  background: #339529;
  color: white;
  border-radius: 1.5rem;
}

.shopitem__nomoney:hover{
  cursor: not-allowed;
}


</style>
