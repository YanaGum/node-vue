<template>
  <section class="container-fluid">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4">
        <div class="row mt-3 justify-content-center">
          <h6>Log In</h6>
        </div>
        <div class="card shadow bg-white rounded container">
          <form>
            <div class="row justify-content-center">
              <div class="col-8 mt-5">
                <label class="input-label">Email:</label>
                <input class="form-control form-control-sm" maxlength="35" v-model="email" type="text">
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-8 mt-2">
                <label class="input-label">Password:</label>
                <input type="password" class="form-control form-control-sm" maxlength="20" v-model="password" >
              </div>
            </div>
            <div class="form-group d-flex justify-content-center mt-3">
              <button class="btn btn-outline-secondary button" @click="addToAPI">Login</button>
              <button class="btn btn-outline-secondary button" disabled>
                <router-link to="/signUp">Sign Up</router-link>
              </button>
            </div>
          </form>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Login',
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {

      addToAPI() {
        let newUser = {
          email: this.email,
          password: this.password
        }
        console.log(newUser);
        axios.post('http://localhost:3000/login', newUser)
          .then((response) => {
            console.log(response.data)
            localStorage.setItem('Token', response.data.token);
            localStorage.setItem('UserId', response.data.userId)
            console.log(localStorage.getItem('Token'))
            console.log(response)
            this.$router.push({name: 'adverts'})
          })
          .catch(function () {
          console.log('Wrong email or password')
        });
      }
    }
  }
</script>

<style scoped>
  .card {
    max-width: 450px;
  }
  .button {
    font-size: 12px;
  }
  .input-label{
    font-size: 12px;
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
</style>