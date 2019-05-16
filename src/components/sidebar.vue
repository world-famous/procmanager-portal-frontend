<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-logo">
        <div class="peers ai-c fxw-nw">
          <div class="peer peer-greed">
            <router-link class="sidebar-link td-n" to="/dashboard">
              <div class="peers ai-c fxw-nw">
                <div class="peer">
                  <div class="logo">
                    <img src="../assets/static/images/logo.png" alt>
                  </div>
                </div>
                <div class="peer peer-greed">
                  <h5 class="lh-1 mB-0 logo-text">Process Manager</h5>
                </div>
              </div>
            </router-link>
          </div>
          <div class="peer">
            <div class="mobile-toggle sidebar-toggle">
              <a href @click.prevent="$('.app').toggleClass('is-collapsed')" class="td-n">
                <i class="ti-arrow-circle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul class="sidebar-menu scrollable pos-r">
        <li class="nav-item mT-30 active">
          <a class="sidebar-link" href="/dashboard" @click.prevent="navigate('/dashboard')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-home"></i>
            </span>
            <span class="title">Dashboard</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/users" @click.prevent="navigate('/users')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-user"></i>
            </span>
            <span class="title">Users</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/chat" @click.prevent="navigate('/chat')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-comment-alt"></i>
            </span>
            <span class="title">Chat</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/workorders" @click.prevent="navigate('/workorders')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-list"></i>
            </span>
            <span class="title">Work orders</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/processes" @click.prevent="navigate('/processes')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-control-forward"></i>
            </span>
            <span class="title">Processes</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/layouts" @click.prevent="navigate('/layouts')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-palette"></i>
            </span>
            <span class="title">Layouts</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="sidebar-link" href="/activities" @click.prevent="navigate('/activities')">
            <span class="icon-holder">
              <i class="c-blue-500 ti-pencil-alt"></i>
            </span>
            <span class="title">Activities</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    navigate(address) {
      $(".sidebar-toggle").on("click", e => {
        $(".app").toggleClass("is-collapsed");
        e.preventDefault();
      });
      this.$router.push(address);
    }
  }
};
</script>

<style scoped>
</style>
