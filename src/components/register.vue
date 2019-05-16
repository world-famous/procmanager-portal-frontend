<template>
  <div class="peers ai-s fxw-nw h-100vh">
    <div class="peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" style='background-image: url("static/images/bg.jpg")'>
      <div class="pos-a centerXY">
        <div class="bgc-white bdrs-50p pos-r" style='width: 120px; height: 120px;'>
          <img class="pos-a centerXY" src="../assets/static/images/logo.png" alt="">
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
      <h4 class="fw-300 c-grey-900 mB-40">Register</h4>
      <div class="alert alert-danger" role="alert" v-if="password_incorrect">Password is not incorrect!</div>
      <div class="alert alert-danger" role="alert" v-if="no_register">Register Failed!</div>
      <form v-on:submit.prevent="handleRegister()">
        <div class="form-group">
          <label class="text-normal text-dark">Name</label>
          <input type="text" class="form-control" v-model="name" Placeholder='John Doe'>
        </div>
        <div class="form-group">
          <label class="text-normal text-dark">Email Address</label>
          <input type="email" class="form-control" v-model="email" Placeholder='name@email.com'>
        </div>
<!--        <div class="form-group">
          <label class="text-normal text-dark">Company Name</label>
          <input type="text" class="form-control" v-model="company_name" Placeholder='Company Name'>
        </div> -->
        <div class="form-group">
          <label class="text-normal text-dark">Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
          <label class="text-normal text-dark">Confirm Password</label>
          <input type="password" class="form-control" v-model="confirm_password" placeholder="Password">
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Register</button>
        </div>
      </form>
      <div>
        <span class="peer peer-greed"><router-link to="/">Login</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'register',
  data() {
    return {
      password_incorrect: false,
      no_register: false,
      name: '',
      email: '',
      company_name: '',
      password: '',
      confirm_password: '',
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirm_password) {
        this.password_incorrect = true;
        this.no_register = false;
      }
      else {
        const self = this;
        axios.post('http://localhost:3130/user/register', {
          name: this.name,
          email: this.email,
//          company_name: this.company_name,
          password: this.password,
        })
        .then(function (response) {
          if (response.status === 200) self.$router.push('/');
        })
        .catch(function () {
          self.password_incorrect = false;
          self.no_register = true;
        });
      }
    },
  },
  mounted() {
    // this.$store.state.logged_in = false;
  },
};
</script>

<style scoped>

</style>
