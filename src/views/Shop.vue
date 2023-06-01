<template>
    <button class="achievement__nav__button" @click="toShop()">Achievements</button>
    <section class="shopitem__container" >
      <section class="shopitem" v-for="shopitem in shopitems">
        <section class="shopitem__name">{{ shopitem.name }}</section>
        <section class="shopitem__description">{{ shopitem.description }}</section>
        <section class="shopitem__price">{{ shopitem.price }}</section>
        <button class="shopitem__button" @click="buyItem(shopitem.id)">Buy</button>
      </section>
    </section>
</template>

<script>
import axios from 'axios';
import router from "@/router";


export default {
  name: "Shop",
  components: {

  },
  data() {
    return {
      shopitems: [],
    };
  },

  mounted() {
    axios.get('http://localhost:8000/api/shopitems').then((res) => {
      this.shopitems = res.data;
      console.log(this.shopitems); 
    });
  },

  methods: {
    toShop(){
      router.push("/achievements");
    },
    buyItem(item){
      axios.post('http://localhost:8000/api/shopitems/' + item + '/purchase');
    }
  },
};
</script>

<style scoped>
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

.shopitem__price{
  font-weight: 600;
  padding: 0.8rem;
}

.shopitem__button{
  width: 10rem;
  height: 2.5rem;
  background: #339529;
  color: white;
  border-radius: 1.5rem;
}
</style>
