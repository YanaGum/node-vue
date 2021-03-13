<template>
  <div class="container" id="app">
    <h6 class="mt-5">Advertisements</h6>
    <div class="row justify-content-center">
      <div class="col-9 justify-content-center">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="card shadow bg-white rounded" v-for="card in cards" :key="card.id">
              <router-link :to="{path :`/${card._id}`}">
                <div class="card-body">
                  <div>{{card.title}}</div>
                  <img src="../assets\john-towner-JgOeRuGD_Y4-unsplash.jpg" style="max-width: 100%" alt="">
                  <div class="text-category">Category: #{{card.categories.name}}</div>
                  <div class="text-date">{{new Date(card.created).getDate()+"-"+
                    new Date(card.created).getMonth()+1+"-"+
                    new Date(card.created).getFullYear()}}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        cards: [],
        categories: '',
      }
    },
    mounted() {
      var self = this;
      axios.get('http://localhost:3000/adverts')
        .then(function (res) {
          self.cards = res.data;
          console.log('Data: ', res.data)
        })
        .catch(function (error) {
          console.log('Error: ', error)
        }); 
    },
}
</script>

<style scoped>
  .card {
    max-width: 160px;
    margin: 5px;
  }

  .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: .5rem;
  }

  body,textarea,select {
    font-family: 'Roboto', sans-serif;
    font-size: 11pt;
    font-weight: 300;
    line-height: 1.75em;
    color: rgb(0, 0, 0);
  }

  h1,h2,h3,h4,h5,h6,div {
    font-weight: 200;
    color: #777;
  }

  .categori {
    max-width: 90%;
    padding: 5px;
  }

  .text-date{
    font-size: 9px;
  }
  .text-category{
    font-size: 11px;
  }
</style>