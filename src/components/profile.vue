<template>
  <div>
    <sidebar></sidebar>
    <div class="page-container">
      <topbar></topbar>

      <main class='main-content bgc-grey-100'>
        <div id='mainContent'>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="bgc-white bd bdrs-3 p-20">
                  <h4 class="c-grey-900 mT-10 mB-30">Profile</h4>
Name {{ name }}
Email {{ email }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footerbar></footerbar>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar';
import Topbar from './topbar';
import Footerbar from './footerbar';
import axios from 'axios';

export default {
  name: 'profile',
  mounted() {
    this.name = user.name;
    this.email = user.email;
  },
  data() {
    return {
      name,
      email
    }
  },
  components: {
    'sidebar': Sidebar,
    'topbar': Topbar,
    'footerbar': Footerbar
  }
};
</script>

<style scoped>

</style>
