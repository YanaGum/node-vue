<template>
  <section class="container-fluid signUp">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4">
        <div class="row mt-3 justify-content-center">
          <h6>Sign Un</h6>
        </div>
        <div class="card shadow bg-white rounded container">
          <form>
            <div class="mt-4 row justify-content-center">
              <div class="col-9 mt-2">
                <label class="input-label">Username:{{user.username}}</label>
                <input type="text"  class="form-control form-control-sm" v-model="username">
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-9 mt-2">
                <label class="input-label">Email:{{user.email}}</label>
                <input type="email" class="form-control form-control-sm" v-model="email">
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-9 mt-2">
                <label class="input-label">Phone:{{user.phone}}</label>
                <input class="form-control form-control-sm" v-model="phone">
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-9 mt-2">
                <label class="input-label">Password:{{user.password}}</label>
                <input type="password" class="form-control form-control-sm" v-model="password">
              </div>

            </div>
            <div class="form-group d-flex justify-content-center mt-4">
              <button class="btn btn-outline-secondary button" id="login" @click="handleSubmit">Sign Up</button>
              <button class="btn btn-outline-secondary button" disabled>
                <router-link to="/login">Log In</router-link>
              </button>
            </div>

          </form>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'signUp',
    data() {
      return {
        loading: false,
        user: {},
        username: "",
        phone: "",
        email: "",
        password: ""
      }
    },
    methods: {
      handleSubmit() {
        const data = {
          username: this.username,
          email: this.email,
          phone: this.phone,
          password: this.password
        };
        console.log(data);
        axios.post('http://localhost:3000/users', data)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('Token', res.data.token)
            console.log(localStorage.getItem('Token'))
            this.$router.push({ name: 'adverts' });
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.card{
  max-width: 500px;
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