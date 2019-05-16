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
      <h4 class="fw-300 c-grey-900 mB-40">Email verification</h4>
      <div class="alert alert-danger" role="alert" v-if="fail_alert">Email verification failed!</div>
      <div class="alert alert-success" role="alert" v-if="success_alert">Email verification successful!</div>
    </div>
  </div>
</template>

<script>
import { verify} from '../../utils/auth';

export default {
  name: 'verify',
  data() {
    return {
      fail_alert: false,
      success_alert: false,
    };
  },
  mounted: function() {
    const self = this;

    verify( this.$route.query.token )
      .then(function (response) {
        self.success_alert = true;
        setTimeout(function(){
          self.$router.push('/');
        }, 2000);
      })
      .catch(function () {
        self.fail_alert = true;
      });
  }
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
