<template>
  <div class="cards">
    <h6 v-if="loading">Loading...</h6>
    <div v-else class="container mt-5">
      <div class="row justify-content-center mt-4">
        <div class="card  shadow bg-white rounded ">
          <div class="card-body">
            <div>{{card.title}}</div>
            <img src="../assets\john-towner-JgOeRuGD_Y4-unsplash.jpg" style="max-width: 100%" alt="">
            <div>{{card.description}}</div>
            <div class="text-category">Category: #{{card.categories.name}}</div>
            <div class="text-category">Creator:{{card.user.username}}</div>
            <div class="text-date">{{new Date(card.created).getDate()+"-"+
                    new Date(card.created).getMonth()+1+"-"+
                    new Date(card.created).getFullYear()}}</div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <router-link to="/adverts" class="btn btn-outline-secondary button">Go Back</router-link>
      </div>

    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'cards',
    data() {
      return {
        loading: false,
        card: {
          title: '',
          description: '',
          categories: {
            name: ''
          },
          user: {
            username: ''
          }
        },
      }
    },
    mounted() {
      this.loading = true;
      axios.get(`http://localhost:3000/adverts/${this.$route.params.id}`)
        .then(response => {
          this.card = response.data;
          this.loading = false
        })
        .catch(function (error) {
          console.log('Error: ', error)
        });
    },
  }
</script>

<style scoped>
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

  .card {
    max-width: 300px;
  }
  .button {
    font-size: 12px;
  }

  .text-date{
    font-size: 9px;
  }
  .text-category{
    font-size: 11px;
  }
</style>