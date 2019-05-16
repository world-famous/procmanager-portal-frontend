<template>
  <div class="header navbar">
    <div class="header-container">
      <ul class="nav-left">
        <li>
          <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
            <i class="ti-menu"></i>
          </a>
        </li>
        <li class="search-box">
          <a class="search-toggle no-pdd-right" href="javascript:void(0);">
            <i class="search-icon ti-search pdd-right-10"></i>
            <i class="search-icon-close ti-close pdd-right-10"></i>
          </a>
        </li>
        <li class="search-input">
          <input class="form-control" type="text" placeholder="Search...">
        </li>
      </ul>
      <ul class="nav-right">
        <li class="notifications dropdown">
          <span class="counter bgc-red">3</span>
          <a href="" class="dropdown-toggle no-after" data-toggle="dropdown">
            <i class="ti-bell"></i>
          </a>

          <ul class="dropdown-menu">
            <li class="pX-20 pY-15 bdB">
              <i class="ti-bell pR-10"></i>
              <span class="fsz-sm fw-600 c-grey-900">Notifications</span>
            </li>
            <li>
              <ul class="ovY-a pos-r scrollable lis-n p-0 m-0 fsz-sm">
                <li>
                  <a href="" class='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'>
                    <div class="peer mR-15">
                      <img class="w-3r bdrs-50p" src="https://randomuser.me/api/portraits/lego/0.jpg" alt="">
                    </div>
                    <div class="peer peer-greed">
                            <span>
                              <span class="fw-500">System</span><br/>
                              <span class="c-grey-600">New work orders received from SAP
                              </span>
                            </span>
                      <p class="m-0">
                        <small class="fsz-xs">5 mins ago</small>
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="" class='peers fxw-nw td-n p-20 bdB c-grey-800 cH-blue bgcH-grey-100'>
                    <div class="peer mR-15">
                      <img class="w-3r bdrs-50p" src="https://randomuser.me/api/portraits/men/2.jpg" alt="">
                    </div>
                    <div class="peer peer-greed">
                            <span>
                              <span class="fw-500">Musa</span><br/>
                              <span class="c-grey-600">Created new user
                              </span>
                            </span>
                      <p class="m-0">
                        <small class="fsz-xs">7 mins ago</small>
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li class="pX-20 pY-15 ta-c bdT">
                    <span>
                      <a href="" class="c-grey-600 cH-blue fsz-sm td-n">View All Notifications <i class="ti-angle-right fsz-xs mL-10"></i></a>
                    </span>
            </li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
            <div class="peer mR-10">
              <img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt="">
            </div>
            <div class="peer">
              <span class="fsz-sm c-grey-900">{{ name }}</span>
            </div>
          </a>
          <ul class="dropdown-menu fsz-sm">
            <li>
              <a href="/profile" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-user mR-10"></i>
                <span>Profile</span>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="" @click.prevent="handleLogout()" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700">
                <i class="ti-power-off mR-10"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { logout, getUser } from '../../utils/auth';

export default {
  name: 'topbar',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    handleLogout() {
      const self = this;
      logout()
       .then(function (response) {
         self.$router.push('/');
       });
    }
  },
  beforeMount() {
    const user = getUser();
    if(typeof user !== 'undefined') {
      this.name = user.name;
    }
  },
  mounted() {
//    this.name = getUser().name;
    $('.search-toggle').on('click', e => {
      $('.search-box, .search-input').toggleClass('active');
      $('.search-input input').focus();
      e.preventDefault();
    });
    // ٍSidebar Toggle
    $('.sidebar-toggle').on('click', e => {
      $('.app').toggleClass('is-collapsed');
      e.preventDefault();
    });
  }
};
</script>

<style scoped>

</style>
