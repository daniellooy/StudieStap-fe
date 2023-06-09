<template>
    <NavAdmin />
    <section class="formwrapper">
      <section class="form">
        <h1>Shopitem toevoegen</h1>

        <section class="form-group">
          <label for="name">Item naam</label>
          <input type="text" v-model="shopitem.name" name="name">
        </section>

        <section class="form-group">
          <label for="description">Item beschrijving</label>
          <textarea name="description" v-model="shopitem.description" ></textarea>
        </section>

        <section class="form-group">
          <label for="name">Prijs van item</label>
          <input type="number" v-model="shopitem.price" name="name">
        </section>

        <section class="button-section">
          <button class="shopitem__button" @click="addshopitem(shopitem)" >Submit shopitem</button>
        </section>

      </section>

    </section>
</template>

<script>
import NavAdmin from '../../components/achievement/NavAdmin.vue'
import axios from 'axios';

export default {
  name: "Requests",
  components: {
    NavAdmin
  },
  data() {
    return {
      shopitem: {name: "", description: "", price: 1000}
    };
  },

  methods:{
    addshopitem(shopitem){
      axios.post('http://localhost:8000/api/shopitems', shopitem).then((response) => {console.log(response)});
      router.push("/admin/achievements");
    }
  }

};
</script>

<style scoped>

.formwrapper{
  display: flex;
  align-items: center;
  justify-content: center;
}

.form{
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  border-radius: 1rem;
  width: 50rem;
  margin: 3rem;
  padding: 2rem;
}

.form-group{
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label{
  font-weight: 500;
}

.form input, textarea{
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #999;
}

.form textarea{
  height: 100px;
}

.button-section{
  display: flex;
  justify-content: center;
  width: 100%;
}

.shopitem__button{
  width: 12rem;
  height: 2.5rem;
  background: #339529;
  color: white;
  border-radius: 1.5rem;
}
</style>