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
                  <h4 class="c-grey-900 mT-10 mB-30">Create New Work Order</h4>
                  <b-button @click="back" variant="default" style="float:right;">Back</b-button>
                  <br/>
                  <b-container fluid>
                    <div class="d-block">
                      
                      <b-form>
                        <b-alert variant="warning" dismissible fade :show="showAlert" @dismissed="showAlert=false">Something went wrong!</b-alert>
                        <b-alert variant="success" dismissible fade :show="showSuccessAlert" @dismissed="showSuccessAlert=false">Successfully Created!</b-alert>
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3" label="App Id" label-for="app_id">
                              <b-form-input id="app_id" size="sm" v-model="workorderForm.app_id" disabled/>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"  label="External Id" label-for="external_id">
                              <b-form-input id="external_id" size="sm" v-model="workorderForm.external_id"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"  label="Priority" label-for="priority">
                              <b-form-input id="priority" size="sm" v-model="workorderForm.priority"/>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="App Process Id" label-for="app_process_id">
                              <b-form-input id="app_process_id" size="sm" v-model="workorderForm.app_process_id" disabled/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="App Design Id" label-for="app_design_id">
                              <b-form-input id="app_design_id" size="sm" v-model="workorderForm.app_design_id" disabled/>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Planned Start" label-for="planned_start">
                              <date-picker id="planned_start"  v-model="workorderForm.planned_start" :config="dateOptions"></date-picker>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Planned End" label-for="planned_end">
                              <date-picker id="planned_end"  v-model="workorderForm.planned_end" :config="dateOptions"></date-picker>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Short Description" label-for="short_description">
                              <b-form-textarea id="short_description" size="sm" v-model="workorderForm.short_description"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Long Description" label-for="long_description">
                              <b-form-textarea id="long_description" size="sm" v-model="workorderForm.long_description"/>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="x_coord" label-for="x_coord">
                              <b-form-input id="x_coord" size="sm" v-model="workorderForm.x_coord"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="y_coord" label-for="y_coord">
                              <b-form-input id="y_coord" size="sm" v-model="workorderForm.y_coord"/>
                            </b-form-group>
                          </b-col>
                        </b-row>
                        
                        <b-row>
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Country" label-for="country">
                              <b-form-input id="country" size="sm" v-model="workorderForm.country"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Region" label-for="region">
                              <b-form-input id="region" size="sm" v-model="workorderForm.region"/>
                            </b-form-group>
                          </b-col>

                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="City" label-for="city">
                              <b-form-input id="city" size="sm" v-model="workorderForm.city"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Suburb" label-for="suburb">
                              <b-form-input id="suburb" size="sm" v-model="workorderForm.suburb"/>
                            </b-form-group>
                          </b-col>
                          
                          <b-col>
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Street" label-for="street">
                              <b-form-input id="street" size="sm" v-model="workorderForm.street"/>
                            </b-form-group>
                          </b-col>
                        </b-row>

                        <b-row>
                          <b-col md="3">
                            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="House Num" label-for="house_num">
                            <b-form-input id="house_num" size="sm" type="number" v-model="workorderForm.house_num"/>
                          </b-form-group>
                          </b-col>
                        </b-row>

                        <b-button @click="create" variant="default">Create</b-button>
                      </b-form>
                    </div>
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
      showAlert: false,
      showSuccessAlert: false,
      authstr: ''
    }
  },
  methods: {
    create() {
      this.showAlert = false;
      this.showSuccessAlert = false;
      axios
        .post("http://localhost:3130/workorder/create", {
          workorder: this.workorderForm
        },{
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          if(response.data.status) {
            this.showAlert = false;
            this.showSuccessAlert = true;
          } else {
            this.showSuccessAlert = false;
            this.showAlert = true;
          }
        })
        .catch(error => {
          this.showSuccessAlert = false;
          this.showAlert = true;
        });
    },
    back() {
      this.$router.push('/workorders');
    }
  },
  computed: {},
  
  mounted() {},
  
  created() {
    const token = getIdToken();
    this.authstr = "Bearer ".concat(token);
  },

  components: {
      sidebar: Sidebar,
      topbar: Topbar,
      footerbar: Footerbar,
      datePicker
  }
}
</script>

