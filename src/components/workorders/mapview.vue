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
                  <h4 class="c-grey-900 mT-10 mB-30">Work Orders</h4>
                  <b-container fluid>
                    <div class="d-block">
                        <b-row>
                          <b-col>
                            <b-button @click="loadControls" variant="secondary">Draw Range to Check the Work Orders</b-button>
                          </b-col>

                          <!-- <b-col>
                            <b-button @click="rearrange()" variant="primary" :disabled="markers.length == 0">Rearrange</b-button>
                          </b-col> -->

                          <b-col>
                            <b-button @click="saveRoute()" variant="secondary" :disabled="selids.length == 0">Save Route</b-button>
                          </b-col>

                          <b-col>
                            <b-button @click="refreshRoute()" variant="secondary" :disabled="selids.length == 0">Refresh Route</b-button>
                          </b-col>

                          <b-col>
                            <b-button @click="savedRoute()" variant="secondary">Check Saved Routes</b-button>
                          </b-col>
                          
                          <b-col>
                            <b-button @click="back" variant="secondary">Back</b-button>
                          </b-col>
                          
                        </b-row>
                        <br/>
                        <b-row cols="12" style="position: relative;">
                            <gmap-map ref="mymap" :center="center" :zoom="12" style="width: 100%; height: 600px">
                                <gmap-polygon ref="polygon" :paths="paths" :editable="true" @paths_changed="updateEdited($event)">
                                </gmap-polygon>
                                <!-- <gmap-polyline v-bind:polyLinePath.sync="polyLinePath" v-bind:options="{ strokeColor:'#008000'}">
                                </gmap-polyline> -->
                                <gmap-marker
                                      :position="marker"
                                      @dblclick="showDetail(index)"
                                      @click="drawPolyLine(index)"
                                      v-for="(marker, index) in markers"
                                      :key="index"
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
                        <b-row v-if="tableItems.length>0">
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
                            :items="tableItems"
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
                              <b-btn @click="showDetails(row.item.id)">View</b-btn>
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
    <b-modal ref="createRouteModal" hide-footer title="Create New Route">
  
      <div class="d-block text-center">
  
        <h3>Create New Route</h3>
        <b-alert variant="success" dismissible fade :show="showCreateSuccessAlert" @dismissed="showCreateSuccessAlert=false">{{successMsg}}</b-alert>
        <b-alert variant="warning" dismissible fade :show="showCreateFailAlert" @dismissed="showCreateFailAlert=false">{{errMsg}}</b-alert>
        <b-row>
          <b-col>
            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Route Name" label-for="routeName">
              <b-form-textarea id="routeName" size="sm" v-model="routeName"/>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Route Description" label-for="description">
              <b-form-textarea id="description" size="sm" v-model="routeDescription"/>
            </b-form-group>
          </b-col>
        </b-row>

      </div>
      <b-button class="mt-2" variant="outline-success" block @click="createRoute">Create</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="closeRoute">Close</b-button>
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
  name: 'workordersmapview',
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
      position: {
          lat: '',
          lng: ''
      },
      center: {
          lat: 1.38,
          lng: 103.8
      },
      paths: [],
      geojson: null,
      drawingManager: null,
      polygon: null,
      items:[],
      coordinates: [],
      markers:[],
      itemids:[],
      selids:[],
      infoViewFlag: false,
      tableItems:[],
      fields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "planned_start",
          sortable: true,
          formatter: (value, key, item) => {
            return new Date(value).toLocaleString();
          }
        },
        {
          key: "planned_end",
          sortable: true,
          formatter: (value, key, item) => {
            return new Date(value).toLocaleString();
          }
        },
        {
          key: "status",
          sortable: true,
          formatter: (value, key, item) => {
            if(value == 1) 
              return 'Created';
            else if(value == 2)
              return 'Assigned';
            else if(value == 3)
              return 'Completed'
          }
        },
        {
          key: "short_description",
          sortable: false
        },
        {
          key: "long_description",
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
      errMsg: ''
    }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showDetails(id) {
      // Navigate to new page or modal popup.
      this.$router.push('/workorder/detail/' + id);
    },
    getWorkorderList() {
      const self = this;

      axios
        .get("http://localhost:3130/workorder/all", {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          this.items = response.data.workorder;
        })
        .catch(error => {});
    },
    load() {
        this.getWorkorderList();
    },
    back() {
        this.$router.push('/workorders');
    },
    loadControls() {
      if(this.drawingManager !== null) {
        return false;
      }
      this.drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {
              fillColor: '#0099FF',
              fillOpacity: 0.7,
              strokeColor: '#AA2143',
              strokeWeight: 4,
              editable: true
          },
      });
      this.drawingManager.setMap(this.$refs.mymap.$mapObject.data.map);
      google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (event) => {
        this.items.forEach((each) => {
          this.coordinates.push(new google.maps.LatLng(each.x_coord, each.y_coord));
          this.itemids.push(each.id);
        });
        this.polygon = event;
        this.coordinates.forEach((each, idx) => {
          if(google.maps.geometry.poly.containsLocation(each, this.polygon)) {
            this.markers.push(each);
            this.selids.push(this.itemids[idx]);
            this.tableItems.push(this.items[idx]);
          }
        });

        this.totalRows = this.tableItems.length;
        
        this.drawingManager.setOptions({
          drawingMode: null
        });
      });

      google.maps.event.addListener(this.drawingManager, 'drawingmode_changed', (event)=>{
        if(this.drawingManager.getDrawingMode() == 'polygon' && this.polygon ){
          this.polygon.setMap(null);
          this.polygon = null;
          this.markers = [];
          this.tableItems = [];
          this.totalRows = this.tableItems.length;
          this.infoViewFlag = false;
          this.selids = [];
          this.refreshRoute();
          console.log(this.markers)
        }
      });
    },
    
    displayGeoJson() {
      if(this.polygon === null){
        alert("Please draw polygon before display data");
        return false;
      }
    },

    showDetail(idx) {
      this.workorderForm = this.items[idx];
      this.infoViewFlag = true;
    },
    closeInfo() {
      this.infoViewFlag = false;
    },
    drawPolyLine(idx) {
      // if(this.brearrange) {
        var position = this.markers[idx];
        var index = this.polyLinePath.indexOf(position);
        if(index === -1){
          this.polyLinePath.push(position);
          if(this.polyLinePath.length > 1){
            var l = this.polyLinePath.length;
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
          this.route.push(this.selids[idx]); 
        }
      // } else {
      //   alert('Please click Rearrange Button!');
      //   return;
      // }
      
      
    },
    rearrange() {
      this.polygon.setMap(null);
      this.polygon = null;
      this.brearrange = true;
    },
    saveRoute() {
      // console.log(this.route);
      this.$refs.createRouteModal.show();
    },
    refreshRoute() {
      this.route = [];
      this.polyLinePath = [];
      this.polyLine.forEach((each) => {
        each.setMap(null);
      });
      this.polygon.setMap(null);
      this.polygon = null;
      this.markers = [];
      this.tableItems = [];
      this.totalRows = this.tableItems.length;
      this.infoViewFlag = false;
      this.selids = [];
    },
    createRoute() {
      if(this.routeName == '') {
        this.showCreateSuccessAlert = false;
        this.showCreateFailAlert = true;
        this.errMsg = 'Please input the route name';
        return;
      } 
      axios
        .post(
          "http://localhost:3130/workorder/saveRoute",
          { route: this.route, description: this.routeDescription, name: this.routeName},
          { headers: { Authorization: this.authstr } }
        )
        .then(response => {
          if(response.data.status) {
            this.showCreateSuccessAlert = true;
            this.showCreateFailAlert = false;
            this.successMsg = response.data.message;
          }
        })
        .catch(error => {
          this.showCreateSuccessAlert = false;
          this.showCreateFailAlert = true;
          this.errMsg = response.data.message;
        });
    },
    closeRoute() {
      this.routeDescription = '';
      this.showCreateSuccessAlert = false;
      this.showCreateFailAlert = false;
      this.$refs.createRouteModal.hide();
      this.refreshRoute();
    },
    savedRoute() {
      this.$router.push("/workorders/savedRoute");
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


