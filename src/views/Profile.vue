<template>
  <div class="user">
    <div class="container mt-5">
      <div class="row justify-content-center mt-4">

        <div class="card  shadow bg-white rounded">
          <div class="card-body">
            <div>{{user.username}}</div>
            <img src="../assets\john-towner-JgOeRuGD_Y4-unsplash.jpg" style="max-width: 100%" alt="">
            <div>{{user.email}}</div>
            <div>{{user.phone}}</div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'user',
    data() {
      return {
        user: {
          username: '',
          email: '',
          phone: ''
        }
      }
    },
    mounted() {
      axios.get(`http://localhost:3000/users/${this.$route.params.username}`)
        .then(response => {
          this.user = response.data;
          console.log('User: ', response.data)
        })
        .catch(function (error) {
          console.log('Error: ', error)
        });
    },

  }
</script>

<style scoped>
  .card {
    max-width: 300px;
  }
</style>