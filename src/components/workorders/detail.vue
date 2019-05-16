<template>
  <div>
    <sidebar></sidebar>
    <div class="page-container">
      <topbar></topbar>
      <main class="main-content bgc-grey-100">
        <div id="mainContent">
          <div class="container-fluid">
            <b-row>
              <b-col md="12">
                <div class="bgc-white bd bdrs-3 p-20">
                  <h4 class="c-grey-900 mT-10 mB-30">Work Order Detail</h4>
                  <b-button @click="back" variant="primary" style="float:right;">Back</b-button>
                  <b-container fluid>
                    <div class="d-block">
                      <h3>Work Order Detail</h3>
                      
                      <b-alert variant="warning" dismissible fade :show="showDetailAlert" @dismissed="showDetailAlert=false">Something went wrong!</b-alert>
                      <b-form>
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3" label="App Id :" label-for="app_id">
                              <span>{{workorderForm.app_id}}</span>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"  label="External Id :" label-for="external_id">
                              <span>{{workorderForm.external_id}}</span>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"  label="Priority :" label-for="priority">
                              <span>{{workorderForm.priority}}</span>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="App Process Id :" label-for="app_process_id">
                              <span>{{workorderForm.app_process_id}}</span>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="App Design Id :" label-for="app_design_id">
                              <span>{{workorderForm.app_design_id}}</span>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Planned Start :" label-for="planned_start">
                              <span>{{workorderForm.planned_start}}</span>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Planned End :" label-for="planned_end">
                              <span>{{workorderForm.planned_end}}</span>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Short Description :" label-for="short_description">
                              <span>{{workorderForm.short_description}}</span>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Long Description :" label-for="long_description">
                              <span>{{workorderForm.long_description}}</span>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="x_coord :" label-for="x_coord">
                              <span>{{workorderForm.x_coord}}</span>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="y_coord :" label-for="y_coord">
                              <span>{{workorderForm.y_coord}}</span>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Address :" label-for="country">
                              <span>{{workorderForm.country + '  ,' + workorderForm.region + '  ,' + workorderForm.city + '  ,' + workorderForm.suburb + '  ,' + workorderForm.street}}</span>
                            </b-form-group>
                          </b-col>
                            

                        </b-row>

                        <b-row>
                          <b-col md="3">
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="House Num :" label-for="house_num">
                                <span>{{workorderForm.house_num}}</span>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row cols="12">
                            <gmap-map
                                :center="center"
                                :zoom="12"
                                style="width:100%;  height: 400px;"
                            >
                                <gmap-marker
                                    :position="position"
                                    @click="center=position"
                                ></gmap-marker>
                            </gmap-map>
                        </b-row>
                        <hr>
                        
                        <!-- <b-container fluid>
                          <ul class="timeline">
                            <li v-for="(activity, index) in activities" v-bind:key="index" :class="(index % 2) == 0? '':'timeline-inverted'">
                              <div class="timeline-badge" :class="activity.color"><i :class="activity.class"></i></div>
                              <div class="timeline-panel">
                                <div class="timeline-heading">
                                  <p><small class="text-muted"><i class="ti-time"></i> {{activity.time}}</small></p>
                                </div>
                                <div class="timeline-body">
                                  <p v-html="activity.history"></p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </b-container> -->
                      </b-form>

                    </div>
                  </b-container>
                  <b-container>
                    <h3>Work Order History</h3>
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

                      <template slot="history" slot-scope="data">
                        <p v-html="data.item.history"></p>
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
              </b-col>
            </b-row>
          </div>
        </div>
      </main>
      <footerbar></footerbar>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Footerbar from "../footerbar";
import axios from "axios";
import { getIdToken } from "../../../utils/auth"; 
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline';

export default {
  name: 'createworkorder',
  data() {
    return {
      workorderForm: {
        app_id: 1,
        external_id: '',
        priority: 1,
        app_process_id: 1,
        app_design_id: 1,
        planned_start: new Date(),
        planned_end: new Date(),
        short_description: '',
        long_description: '',
        x_coord: 0,
        y_coord: 0,
        country: '',
        region: '',
        city: '',
        suburb: '',
        street: '',
        house_num: 0
      },
      dateOptions: {
        format: 'YYYY-MM-DD h:mm:ss',
        useCurrent: false,
      },
      authstr: '',
      showDetailAlert: false,
      position: {
          lat: '',
          lng: ''
      },
      center: {
          lat: '',
          lng: ''
      },
      activities: [],
      wid: null,
      fields: [
        'index',
        {
          key: "history",
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
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    load() {
        this.wid = this.$route.params.id;
        axios
            .post("http://localhost:3130/workorder/detail", {
                wid: this.wid
            },{
                headers: { Authorization: this.authstr }
            })
            .then(response => {
                if(response.data.status) {
                    this.workorderForm = response.data.workorder[0];
                    this.position.lat = this.workorderForm.x_coord;
                    this.position.lng = this.workorderForm.y_coord;
                    this.center = this.position;
                    this.showDetailAlert = false;
                } else {
                    this.showDetailAlert = true;
                }
            })
            .catch(error => {
                this.showDetailAlert = true;
            });
        
        this.getActivities();
    },
    back() {
        this.$router.push('/workorders');
    },
    getActivities() {
      const self = this;

      axios
        .post("http://localhost:3130/workorder/getWorkOrderHistory",{wid: this.wid}, {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          var activities = response.data.history;
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
              
            this.activities.push({time: new Date(each.time).toLocaleString(), history: each.history, class: classString, color: colorString});
          });
        })
        .catch(error => {});
    }
  },
  computed: {},
  
  mounted() {},
  
  created() {
    const token = getIdToken();
    this.authstr = "Bearer ".concat(token);
    this.load();
  },

  components: {
      sidebar: Sidebar,
      topbar: Topbar,
      footerbar: Footerbar,
      datePicker,
      Timeline,
      TimelineItem,
      TimelineTitle
  }
}
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
