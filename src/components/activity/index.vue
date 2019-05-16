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
                  <h4 class="c-grey-900 mT-10 mB-30">User Activities</h4>

                  <!-- <b-container fluid>
                    <ul class="timeline">
                      <li v-for="(activity, index) in activities" v-bind:key="index" :class="(index % 2) == 0? '':'timeline-inverted'">
                        <div class="timeline-badge" :class="activity.color"><i :class="activity.class"></i></div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <p><small class="text-muted"><i class="ti-time"></i> {{activity.time}}</small></p>
                          </div>
                          <div class="timeline-body">
                            <p v-html="activity.activity"></p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </b-container> -->

                  <b-container>
                    <!-- <h3>User Activities</h3> -->
                    <b-row>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal label="Filter" class="mb-0">
                          <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search"/>
                            <b-input-group-append>
                              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                            </b-input-group-append>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal label="Per page" class="mb-0">
                          <b-form-select :options="pageOptions" v-model="perPage"/>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal label="Changes made By" class="mb-0">
                          <b-form-select :options="userOptions" v-model="selUser" v-on:change="getActivityByUserEvent($event)"/>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-table
                      striped
                      hover
                      show-empty
                      stacked="md"
                      :items="activities"
                      :fields="fields"
                      :current-page="currentPage"
                      :per-page="perPage"
                      :filter="filter"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :sort-direction="sortDirection"
                      @filtered="onFiltered"
                    >
                      <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                      </template>

                      <template slot="name" slot-scope="data">
                        {{ data.item.name }}
                      </template>

                      <template slot="activity" slot-scope="data">
                        <p v-html="data.item.activity"></p>
                      </template>

                      <template slot="time" slot-scope="data">
                        {{ data.item.time}}
                      </template>
                    </b-table>
                    <b-row>
                      <b-col md="6" class="my-1">
                        <b-pagination
                          :total-rows="totalRows"
                          :per-page="perPage"
                          v-model="currentPage"
                          class="my-0"
                        />
                      </b-col>
                    </b-row>
                  </b-container>

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
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import Footerbar from '../footerbar';
import axios from 'axios';
import { getIdToken} from '../../../utils/auth';
import LightTimeline from 'vue-light-timeline';
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline';

export default {
  name: 'userActivities',
  mounted() {
    
  },
  data() {
    return {
      activities: [],
      fields: [
        'index',
        'name',
        {
          key: "activity",
          sortable: false
        },
        {
          key: "time",
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      userOptions: [{ value: 0, text: 'All' }],
      selUser: 0,
      users: [],
      userIds: []
    }
  },
  methods: {
    async load(){
      await this.getUserList();
      this.getActivities();
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getUserList() {
      const token = getIdToken();
      const authstr = 'Bearer '.concat(token);
      const apiRequest = await axios
        .get("http://localhost:3130/user/users", {
          headers: { Authorization: authstr }
        });

      const result = apiRequest.data;

      this.users = result.users;
      for(var i = 0; i < this.users.length; i++) {
        this.userOptions.push({value: this.users[i].id, text: this.users[i].name});
        this.userIds[this.users[i].id] = i;
      }
        
    },
    getActivities() {
      const self = this;
      const token = getIdToken();
      const authstr = 'Bearer '.concat(token);

      axios
        .get("http://localhost:3130/user/activities", {
          headers: { Authorization: authstr }
        })
        .then(response => {
          var activities = response.data.activities;
          this.totalRows = activities.length;
          activities.forEach((each) => {
            var classString = '', colorString = '';
            if(each.type == 'edit'){
              classString = 'c-white-500 ti-text';
              colorString = 'warning'
            }else if(each.type == 'remove'){
              classString = 'c-white-500 ti-unlink';
              colorString = 'danger';
            }else if(each.type == 'create'){
              classString = 'c-white-500 ti-link';
              colorString = 'success';
            }else if(each.type == 'register'){
              classString = 'c-white-500 ti-shine';
              colorString = 'info';
            }
              
            this.activities.push({time: new Date(each.time).toLocaleString(), name: this.users[this.userIds[each.uid]].name, activity: each.activity, class: classString, color: colorString});
          });
        })
        .catch(error => {});
    },
    getActivityByUser() {
      const self = this;
      const token = getIdToken();
      const authstr = 'Bearer '.concat(token);
      this.activities = [];
      axios
        .post("http://localhost:3130/user/activitiesByUser", {uid: this.selUser},{
          headers: { Authorization: authstr }
        })
        .then(response => {
          var activities = response.data.activities;
          this.totalRows = activities.length;
          activities.forEach((each) => {
            var classString = '', colorString = '';
            if(each.type == 'edit'){
              classString = 'c-white-500 ti-text';
              colorString = 'warning'
            }else if(each.type == 'remove'){
              classString = 'c-white-500 ti-unlink';
              colorString = 'danger';
            }else if(each.type == 'create'){
              classString = 'c-white-500 ti-link';
              colorString = 'success';
            }else if(each.type == 'register'){
              classString = 'c-white-500 ti-shine';
              colorString = 'info';
            }
              
            this.activities.push({time: new Date(each.time).toLocaleString(),name: this.users[this.userIds[each.uid]].name, activity: each.activity, class: classString, color: colorString});
          });
        })
        .catch(error => {});
    },
    getActivityByUserEvent(e) {
      this.selUser = e;
      if(this.selUser == 0) {
        this.getActivities();
      } else {
        this.getActivityByUser();
      }
    }
  },
  created() {
    this.load();
  },
  components: {
    'sidebar': Sidebar,
    'topbar': Topbar,
    'footerbar': Footerbar,
    Timeline,
    TimelineItem,
    TimelineTitle
  }
};
</script>

<style scoped>
.timeline {
  list-style: none;
  padding: 20px 0 20px;
  position: relative;
}

.timeline:before {
  top: 0;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 3px;
  background-color: #eeeeee;
  left: 50%;
  margin-left: -1.5px;
}

.timeline > li {
  margin-bottom: 20px;
  position: relative;
}

.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}

.timeline > li:after {
  clear: both;
}

.timeline > li:before,
.timeline > li:after {
  content: " ";
  display: table;
}

.timeline > li:after {
  clear: both;
}

.timeline > li > .timeline-panel {
  width: 46%;
  float: left;
  border: 1px solid #2196f3;
  border-radius: 2px;
  padding: 20px;
  position: relative;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.175);
}

.timeline > li > .timeline-panel:before {
  position: absolute;
  top: 26px;
  right: -15px;
  display: inline-block;
  border-top: 15px solid transparent;
  border-left: 15px solid #ccc;
  border-right: 0 solid #ccc;
  border-bottom: 15px solid transparent;
  content: " ";
}

.timeline > li > .timeline-panel:after {
  position: absolute;
  top: 27px;
  right: -14px;
  display: inline-block;
  border-top: 14px solid transparent;
  border-left: 14px solid #fff;
  border-right: 0 solid #fff;
  border-bottom: 14px solid transparent;
  content: " ";
}

.timeline > li > .timeline-badge {
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 50px;
  font-size: 1.4em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -25px;
  background-color: #999999;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}

.timeline > li.timeline-inverted > .timeline-panel {
  float: right;
}

.timeline > li.timeline-inverted > .timeline-panel:before {
  border-left-width: 0;
  border-right-width: 15px;
  left: -15px;
  right: auto;
}

.timeline > li.timeline-inverted > .timeline-panel:after {
  border-left-width: 0;
  border-right-width: 14px;
  left: -14px;
  right: auto;
}

.timeline-badge.primary {
  background-color: #2e6da4 !important;
}

.timeline-badge.success {
  background-color: #3f903f !important;
}

.timeline-badge.warning {
  background-color: #f0ad4e !important;
}

.timeline-badge.danger {
  background-color: #d9534f !important;
}

.timeline-badge.info {
  background-color: #5bc0de !important;
}

.timeline-title {
  margin-top: 0;
  color: inherit;
}

.timeline-body > p,
.timeline-body > ul {
  margin-bottom: 0;
}

.timeline-body > p + p {
  margin-top: 5px;
}

.text-muted {
  color: #000000 !important;
}
</style>
