<template>
  <section class="justify-content-center mt-5">
    <h6 class="text-center mt-5">Create Advert</h6>
    <div class="justify-content-center">
      <div class="card shadow bg-white rounded">
        <form @submit.prevent='CreateAdv' class="form">
          <div class="row mt-2 justify-content-center">
            <div class="col-6 d-flex ">
              <div>
                <label class="input-label">Title:</label>
                <input class="form-control form-control-sm" type="text" v-model="title">
              </div>
            </div>
          </div>
          <div class="row">
            <label style="margin-left: 23%;" class="input-label">Description:</label>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-9">
              <b-form-textarea id="textarea" rows="3" v-model="description"></b-form-textarea>
            </div>
          </div>
          <div class="row mt-2 justify-content-center">
            <div class="col-9">
              <label class="input-label">Categories:</label>
              <select v-model="category" remove-on-delete>
                <option v-for="categori in categories" :key="categori._id" :value="categori._id">{{categori.name}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group d-flex justify-content-center">
            <button class="btn btn-outline-secondary button" id="login" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'create',
    data() {
      return {
        categories: [],
        description: '',
        title: '',
        category: '',
        user: ''
      }
    },
    mounted() {
      axios.get(`http://localhost:3000/category`)
        .then(response => {
          this.categories = response.data;
          console.log('Category: ', response.data)
          console.log(this.categories)
        })
        .catch(function (error) {
          console.log('Error: ', error)
        });
      axios.get(`http://localhost:3000/users`)
        .then(response => {
          this.users = response.data;
          console.log('User: ', response.data)
        })
        .catch(function (error) {
          console.log('Error: ', error)
        });
    },
    methods: {
      CreateAdv() {
        axios({
          method: 'POST',
          url: 'http://localhost:3000/adverts',
          data: {
            title: this.title,
            description: this.description,
            categories: this.category,
            user: localStorage.getItem('UserId'),
          },
          headers: {
            Authorization: localStorage.getItem('Token')
          }
        }).then(response => {
          console.log(response);
          this.$router.push({
            name: 'adverts'
          })
        })
      },

    }
  }
</script>

<style scoped>
  .button {
    font-size: 12px;
  }

  .card {
    max-width: 50%;
    margin-left: 25%;
    margin-right: 25%;
  }

  .title {
    font-size: 11px;
  }

  body,textarea,select,option {
    font-family: 'Roboto', sans-serif;
    font-size: 11pt;
    font-weight: 300;
    line-height: 1.75em;
    color: rgb(0, 0, 0);
  }

  h1,h2,h3,h4,h5,h6,div,option {
    font-weight: 200;
    color: #777;
  }

  .input-label{
    font-size: 12px;
  }
</style>