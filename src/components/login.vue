<template>
  <div class="peers ai-s fxw-nw h-100vh">
    <div class="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv" style='background-image: url("static/images/bg.jpg")'>
      <div class="pos-a centerXY">
        <div class="bgc-white bdrs-50p pos-r" style='width: 120px; height: 120px;'>
          <img class="pos-a centerXY" src="../assets/static/images/logo.png" alt="">
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
      <h4 class="fw-300 c-grey-900 mB-40">Login</h4>
      <div class="alert alert-danger" role="alert" v-if="fail_alert">Login Failed!</div>
      <form v-on:submit.prevent="handleLogin()">
        <div class="form-group">
          <label class="text-normal text-dark">Username</label>
          <input type="text" class="form-control" v-model="email" placeholder="name@example.com">
        </div>
        <div class="form-group">
          <label class="text-normal text-dark">Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div>
        <div class="form-group">
          <div class="peers ai-c jc-sb fxw-nw">
            <div class="peer">
              <div class="checkbox checkbox-circle checkbox-info peers ai-c">
                <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" class="peer">
                <label for="inputCall1" class=" peers peer-greed js-sb ai-c">
                  <span class="peer peer-greed">Remember Me</span>
                </label>
              </div>
            </div>
            <div class="peer">
              <button class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <span class="peer peer-greed"><router-link to="/register"> Register</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import dashboard from './dashboard';
// eslint-disable-next-line import/first
// import axios from 'axios';
import { login} from '../../utils/auth';

export default {
  name: 'Login',
  components: {
    dashboard,
  },
  data() {
    return {
      fail_alert: false,
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      const self = this;

      login(this.email, this.password)
       .then(function (response) {
         self.$router.push('/dashboard');
       })
       .catch(function () {
         self.fail_alert = true;
       });
      // const self = this;
      // axios.post('http://procmanager.com/rest/login', {
      //   email: this.email,
      //   password: this.password,
      // })
      // // eslint-disable-next-line func-names,prefer-arrow-callback
      // .then(function (response) {
      //   if (response.data.status) self.$router.push('/dashboard');
      // })
      // // eslint-disable-next-line func-names,prefer-arrow-callback
      // .catch(function () {
      //   self.fail_alert = true;
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
