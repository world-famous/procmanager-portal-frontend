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
                  <h4 class="c-grey-900 mT-10 mB-30">Saved WorkOrder Route</h4>
                  <b-container fluid>
                    <div class="d-block">
                        <b-row>
                          <b-col>
                            <b-button @click="back" variant="default">Back</b-button>
                          </b-col>
                        </b-row>
                        <br/>
                        <b-row cols="12" style="position: relative;">
                            <gmap-map ref="mymap" :center="center" :zoom="12" style="width: 100%; height: 600px">
                                <gmap-marker
                                      :position="marker"
                                      @dblclick="showDetail(index)"
                                      @click="drawPolyLine(index)"
                                      v-for="(marker, index) in markers"
                                      :key="index"
                                      :label="(index+1).toString()"
                                ></gmap-marker>
                            </gmap-map>

                            <div id="wrapper" v-if="infoViewFlag">
                              <div id="over_map">
                                <b-card
                                  no-body
                                  style="max-width: 20rem;"
                                >
                                  <h4 slot="header">Work Order {{workorderForm.id}}</h4>

                                  <b-list-group flush>
                                    <b-list-group-item><b>External Id : </b>{{workorderForm.external_id}}</b-list-group-item>
                                    <b-list-group-item><b>Short Description : </b>{{workorderForm.short_description}}</b-list-group-item>
                                    <b-list-group-item><b>Long Description : </b>{{workorderForm.long_description}}</b-list-group-item>
                                    <b-list-group-item><b>Planned Date : </b>{{new Date(workorderForm.planned_start).toLocaleString() + ' ~ ' + new Date(workorderForm.planned_end).toLocaleString()}}</b-list-group-item>
                                    <b-list-group-item><b>Address : </b>{{workorderForm.country + '  ,' + workorderForm.region + '  ,' + workorderForm.city + '  ,' + workorderForm.suburb + '  ,' + workorderForm.street}}</b-list-group-item>
                                    <b-list-group-item><b>House Nums : </b>{{workorderForm.house_num}}</b-list-group-item>
                                  </b-list-group>

                                  <b-card-body center>
                                    <b-button @click="closeInfo()" variant="outline-primary">Close</b-button>
                                  </b-card-body>
                                </b-card>
                              </div>
                            </div>
                        </b-row>
                        <b-row>
                          <hr>
                        </b-row>
                        <b-row v-if="routeItems.length>0">
                          <b-row>
                            <b-col md="6" class="my-1">
                              <b-form-group horizontal label="Filter" class="mb-0">
                                <b-input-group>
                                  <b-form-input v-model="filter" placeholder="Type to Search"/>
                                  <b-input-group-append>
                                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                                  </b-input-group-append>
                                </b-input-group>
                              </b-form-group>
                            </b-col>
                            <b-col md="6" class="my-1">
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
                            :items="routeItems"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            @filtered="onFiltered"
                          >
                            <template slot="details" slot-scope="row">
                              <b-btn @click="showRoute(row.index)">View</b-btn>
                              <b-btn @click="removeRoute(row.item.id)">Remove</b-btn>
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
                        </b-row>

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
    <b-modal ref="removeRouteModal" hide-footer title="Remove Route">
  
      <div class="d-block text-center">
  
        <h3>Are you sure remove this route?</h3>
        <b-alert variant="success" dismissible fade :show="showCreateSuccessAlert" @dismissed="showCreateSuccessAlert=false">Successfully Removed!</b-alert>
        <b-alert variant="warning" dismissible fade :show="showCreateFailAlert" @dismissed="showCreateFailAlert=false">Something Went Wrong!</b-alert>
        

      </div>
      <b-button class="mt-2" variant="outline-danger" block @click="removeRouteSubmit" :disabled="bRemoved">Remove</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="closeRemoveModal">Close</b-button>
    </b-modal>
  </div>
</template>

<script>
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Footerbar from "../footerbar";
import axios from "axios";
import { getIdToken } from "../../../utils/auth"; 

export default {
  name: 'savedRouteWorkorder',
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
      authstr: '',
      center: {
          lat: 1.38,
          lng: 103.8
      },
      drawingManager: null,
      polygon: null,
      items:[],
      coordinates: [],
      markers:[],
      itemids:[],
      selids:[],
      infoViewFlag: false,
      routeItems:[],
      fields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "name",
          sortable: false
        },
        {
          key: "description",
          sortable: false
        },
        {
          key: "details",
          sortable: false
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
      polyLinePath: [],
      polyLine: [],
      route: [],
      routeName: '',
      routeDescription: '',
      brearrange: false,
      showCreateSuccessAlert: false,
      showCreateFailAlert: false,
      successMsg: '',
      errMsg: '',
      selRouteID: null,
      routes: [],
      orderIdxs: [],
      bRemoved: false
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getWorkorderList() {
      const self = this;

      axios
        .get("http://localhost:3130/workorder/all", {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          this.workOrders = response.data.workorder;
        })
        .catch(error => {});
    },

    getSavedRouteList() {
      const self = this;

      axios
        .post("http://localhost:3130/workorder/savedRoute",{}, {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          this.routeItems = response.data.routes;
          this.totalRows = this.routeItems.length;
        })
        .catch(error => {});
    },
    load() {
        this.getSavedRouteList();
        this.getWorkorderList();
    },
    back() {
        this.$router.push('/workorders/mapview');
    },
    showDetail(idx) {
      // this.workorderForm = this.workOrders[idx];
      this.workorderForm = this.workOrders[this.orderIdxs[this.routes[idx]]];
      this.infoViewFlag = true;
    },
    showRoute(idx) {
      this.markers = [];
      this.routes = JSON.parse(this.routeItems[idx].route);
      this.orderIdxs = [];
      this.markers = [];
      this.polyLine.forEach((each) => {
        each.setMap(null);
      });
      this.workOrders.forEach((each, index) => {
        this.orderIdxs[each.id] = index;
      });
      

      this.routes.forEach((each, index) => {
        this.markers.push(new google.maps.LatLng(this.workOrders[this.orderIdxs[each]].x_coord, this.workOrders[this.orderIdxs[each]].y_coord));
      });

      this.polyLinePath = [];
      this.routes.forEach((each, index) => {
        var position = this.markers[index];
        this.polyLinePath.push(position);
        var l = this.polyLinePath.length;

        if(l > 1) {
          var line= new google.maps.Polyline({
            path: [this.polyLinePath[ l - 1 ], this.polyLinePath[ l - 2 ]],
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          line.setMap(this.$refs.mymap.$mapObject.data.map);
          this.polyLine.push(line);
        }
        
      });

    },
    removeRoute(idx) {
        this.selRouteID = idx;
        this.$refs.removeRouteModal.show();
    },
    removeRouteSubmit() {
        axios
            .post(
            "http://localhost:3130/workorder/removeRoute",
            { routeId: this.selRouteID },
            { headers: { Authorization: this.authstr } }
            )
            .then(response => {
              console.log(response)
                if(response.data.status) {
                    this.showCreateSuccessAlert = true;
                    this.showCreateFailAlert = false;
                    this.errMsg = '';
                    this.successMsg = response.data.message;
                    this.selRouteID = null;
                    this.markers = [];
                    this.polyLine.forEach((each) => {
                      this.polyLine.setMap(null);
                    });
                    this.bRemoved = true;
                }
            })
            .catch(error => {
              console.log('error')
                this.showCreateSuccessAlert = false;
                this.showCreateFailAlert = true;
                this.errMsg = error;
                this.selRouteID = null;
                this.bRemoved = true;
            });
    },
    closeInfo() {
      this.infoViewFlag = false;
    },
    refreshRoute() {
      this.route = [];
      this.polyLinePath = [];
      this.polyLine.forEach((each) => {
        each.setMap(null);
      });
    },
    closeRemoveModal() {
      this.routeDescription = '';
      this.showCreateSuccessAlert = false;
      this.showCreateFailAlert = false;
      this.successMsg = '';
      this.errMsg = '';
      this.$refs.removeRouteModal.hide();
      this.refreshRoute();
      this.load();
      this.bRemoved = false;
    },
    drawPolyLine(idx) {
      
    }
  },
  computed: {},
  
  mounted() {
    // this.getWorkorderList();
  },
  
  created() {
    const token = getIdToken();
    this.authstr = "Bearer ".concat(token);
    this.load();
  },

  components: {
      sidebar: Sidebar,
      topbar: Topbar,
      footerbar: Footerbar
  }
}
</script>

<style scoped>
   #over_map { position: absolute; top: 10px; left: 10px; z-index: 99; }

</style>


