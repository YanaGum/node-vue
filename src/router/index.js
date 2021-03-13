import Vue from "vue";
import VueRouter from "vue-router";
import adverts from '../views/Adverts.vue';
import Login from '../views/Login.vue'
import createAdvert from '../views/CreateAdvert.vue';
import card from '../components/Card.vue'
import user from '../views/Profile.vue'
import signUp from '../views/SignUp.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: "/adverts",
      name: "adverts",
      component: adverts
    },
    {
      path: "/users/:username",
      name: "user",
      component: user
    },
    {
      path: "/createAdvert",
      name: "createAdvert",
      component: createAdvert
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signUp",
      name: "signUp",
      component: signUp
    },
    {
      path: "/:id",
      name: "card",
      component: card
    },

  ]
})


export default router;