<template>
  <div>
    <sidebar></sidebar>
    <div class="page-container">
      <topbar></topbar>

      <main class="main-content bgc-grey-100">
        <div id="mainContent">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div class="bgc-white bd bdrs-3 p-20">
                  <h4 class="c-grey-900 mT-10 mB-30">Work Orders</h4>

                  <b-modal
                    id="modalPrevent"
                    ref="modal"
                    title="Assign Work Order"
                    @ok="handleOk"
                    :busy="loading"
                  >
                    <form @submit.stop.prevent="handleSubmit">
                      <b-form-select v-model="selected" :options="users" class="mb-3"/>
                      <!--        <b-form-input type="text"
                      placeholder="Enter your name"
                      v-model="name"></b-form-input>-->
                    </form>
                  </b-modal>
                  <b-modal
                    id="modalPrevent"
                    ref="modal2"
                    title="Unassign Work Order"
                    @ok="handleOkUnassign"
                    :busy="loading"
                  >
                    <form @submit.stop.prevent="handleSubmit"></form>
                  </b-modal>
                  <b-container fluid>
                    <!-- User Interface controls -->
                    <b-row>
                      <input type="file" id="inputfile" @change="onSelectFile" hidden accept=".csv"/>
                      <b-col md="2" class="my-1">
                        <b-btn @click="create()" variant="secondary">Create</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <b-btn @click="massChange()" variant="secondary">Mass Change</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <b-btn @click="importTemplate()" variant="secondary">Batch Create By CSV File</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <b-btn @click="showAssign()" variant="secondary">Assign</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <b-btn @click="showUnassign()" variant="secondary">Unassign</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <b-btn @click="gotoMapView()" variant="secondary">Go To MapView</b-btn>
                      </b-col>
                      <b-col md="2" class="my-1">
                        <download-excel
                          class   = "btn btn-secondary"
                          :data   = "items"
                          :fields = "json_fields"
                          name    = "workorders.xls">
                          Export Excel
                        </download-excel>
                      </b-col>
                      <b-col md="3" class="my-1">
                        <b-form-group horizontal label="Filter" class="mb-0">
                          <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search"/>
                            <b-input-group-append>
                              <b-btn :disabled="!filter" @click="filter = ''" >Clear</b-btn>
                            </b-input-group-append>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="3" class="my-1">
                        <b-form-group horizontal label="Per page" class="mb-0">
                          <b-form-select :options="pageOptions" v-model="perPage"/>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <!-- Main table element -->
                    <b-table
                      striped
                      hover
                      show-empty
                      stacked="md"
                      :items="items"
                      :fields="fields"
                      :current-page="currentPage"
                      :per-page="perPage"
                      :filter="filter"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :sort-direction="sortDirection"
                      @filtered="onFiltered"
                    >
                      <template slot="checked" slot-scope="row">
                        <b-form-checkbox
                          ref="rowCheckbox"
                          @click.native.stop
                          @change="checkboxChange(row.item.id)"
                        />
                      </template>
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
                  </b-container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footerbar></footerbar>
    </div>
    <b-modal ref="progressModal" hide-footer title="Create Batch WorkOrders Progress!">
  
      <div class="d-block text-center">
  
        <h3>Create Batch WorkOrders Progress!</h3>

        <b-progress v-model="progress.value" :value="progress.value" :max="progress.max" show-progress animated />
        <div>
          Success : {{progress.success}}
          Fail : {{progress.fail}}
        </div>

      </div>
      <b-button class="mt-2" variant="outline-danger" block @click="progressModalClose">Close</b-button>
    </b-modal>
    
    <b-modal
      id="modalPrevent"
      ref="massChangeModal"
      title="Mass Change Work Orders"
      :busy="massloading"
      @ok="handleMassChange"
    >
      <form @submit.stop.prevent="handleSubmit">
        <b-form-group id="exampleGroup41">
          <b-form-checkbox value="true" v-model="massChangeStatus.status">Change status</b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Status" label-for="status">
          <b-form-select v-model="massForm.selected" :options="status" class="mb-3" id="status" :disabled="!massChangeStatus.status"/>
        </b-form-group>

        <b-form-group id="exampleGroup42">
          <b-form-checkbox value="true" v-model="massChangeStatus.priority">Change priority</b-form-checkbox>
        </b-form-group>

        <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Priority" label-for="priority">
          <b-form-input v-model="massForm.priority" id="priority" type="number" :disabled="!massChangeStatus.priority"/>
        </b-form-group>

        <b-form-group id="exampleGroup43">
          <b-form-checkbox value="0" v-model="massChangeStatus.planned_start">Change planned start date</b-form-checkbox>
        </b-form-group>

        <b-form-group label-cols-sm="4" label-cols-lg="3"   label="Planned Start" label-for="planned_start">
          <date-picker id="planned_start"  v-model="massForm.planned_start" :config="dateOptions" :disabled="!massChangeStatus.planned_start"></date-picker>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Footerbar from "../footerbar";
import axios from "axios";
import { getIdToken } from "../../../utils/auth";
import Papa from "papaparse";
import JsonExcel from 'vue-json-excel';
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
const items = [];

export default {
  name: "workorders",
  mounted() {
    this.getWorkorderList();
    this.getUserList();
  },
  data() {
    return {
      name: "",
      checkedId: [],
      users: [],
      selected: "",
      loading: false,
      dateOptions: {
        format: 'YYYY-MM-DD h:mm:ss',
        useCurrent: false,
      },
      items: items,

      fields: [
        {
          key: "checked",
          label: "",
          sortable: false
        },
        {
          key: "external_id",
          label: "Id",
          sortable: true
        },
        {
          key: "priority",
          sortable: true
        },
        {
          key: "assigned_to",
          sortable: true
        },
        {
          key: "short_description",
          sortable: false
        },
        {
          key: "planned_start",
          sortable: true,
          formatter: (value, key, item) => {
            return new Date(value).toLocaleString();
          }
        },
        {
          key: "city",
          sortable: true
        },
        {
          key: "suburb",
          sortable: true
        },
        {
          key: "street",
          sortable: false
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
          key: "details",
          sortable: false
        }
        
      ],

      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "" },
      authstr: '',
      progress: {
        value: 0,
        max: 100,
        success: 0,
        fail: 0
      },
      json_fields: {
        'id': 'id',
        'app_design_id': 'app_design_id',
        'app_id': 'app_id',
        'app_process_id': 'app_process_id',
        'assigned_to': 'assigned_to',
        'city': 'city',
        'country': 'country',
        'external_id': 'external_id',
        'house_num': 'house_num',
        'short_description': 'short_description',
        'long_description': 'long_description',
        'planned_start': 'planned_start',
        'planned_end': 'planned_end',
        'priority': 'priority',
        'region': 'region',
        'street': 'street',
        'suburb': 'suburb',
        'x_coord': 'x_coord',
        'y_coord': 'y_coord'
      },
      massForm: {
        selected: null,
        priority: null,
        planned_start: null
      },
      status: [
        {value: 1, text: 'Created'},
        {value: 2, text: 'Assigned'},
        {value: 3, text: 'Completed'}
      ],
      massloading: false,
      batchCreatedIds: [],
      massChangeStatus: {
        status: false,
        priority: false,
        planned_start: false
      }
    };
  },
  methods: {
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
    getUserList() {
      const self = this;

      axios
        .get("http://localhost:3130/user/users", {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          response.data.users.forEach(function(user) {
            self.users.push({ value: user.id, text: user.name });
          });
        })
        .catch(error => {});
    },
    assignWorkorders(user_id, workorderarray) {
      const self = this;

      this.loading = true;

      axios
        .post(
          "http://localhost:3130/workorder/assign",
          { user_id: user_id, workorderid: workorderarray },
          { headers: { Authorization: this.authstr } }
        )
        .then(response => {
          this.getWorkorderList();
          this.selected = "";
          this.loading = false;
          this.$refs.modal.hide();
          this.$refs.modal2.hide();
        })
        .catch(error => {
          alert("Work order could not be assigned, please try again");
          this.loading = false;
        });
    },
    checkboxChange(id) {
      var index = this.checkedId.indexOf(id);
      if (index > -1) {
        this.checkedId.splice(index, 1);
      } else {
        this.checkedId.push(id);
      }
    },
    showAssign() {
      if (this.checkedId.length > 0) {
        this.$refs.modal.show();
      }
    },
    showUnassign() {
      if (this.checkedId.length > 0) {
        this.$refs.modal2.show();
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.selected) {
        alert("Please choose a user");
      } else {
        this.assignWorkorders(this.selected, this.checkedId);
      }
    },
    handleOkUnassign(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      this.assignWorkorders("", this.checkedId);
    },
    showDetails(id) {
      // Navigate to new page or modal popup.
      this.$router.push('/workorder/detail/' + id);
    },
    create() {
      this.$router.push("/workorder/create");
    },
    importTemplate: function() {
      document.getElementById("inputfile").click();
    },
    onSelectFile: function(e) {
      if (e.target.files.length == 0) return;
      var selectedFile = e.target.files[0];
      var self = this;
      Papa.parse(selectedFile, {
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        complete: async function(results) {
          this.batchCreatedIds = [];
          var data = results.data;
          self.$refs.progressModal.show();
          self.progress.max = data.length - 2;
          for (var i = 1; i < data.length - 1 ; i++) {
            await self.sendBatchWorkOrder(data[i]);
          }
          self.sendBatchCreatedIds();
          self.getWorkorderList();
        },
        error: undefined,
        download: false,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
      });
    },
    async sendBatchWorkOrder (body) {
       const apiRequest = await axios
          .post("http://localhost:3130/workorder/batchCreate", {
            batchWorkOrder: body
          },{
            headers: { Authorization: this.authstr }
          });
          const result = apiRequest.data;
          if(result.status) {
            this.progress.value++;
            this.progress.success++;
            this.batchCreatedIds.push(result.workOrderId);
          } else {
            this.progress.value++;
            this.progress.fail++;
          }
    },
    sendBatchCreatedIds () {
      axios
        .post(
          "http://localhost:3130/workorder/batchCreatedIds",
          { batchCreatedIds: this.batchCreatedIds },
          { headers: { Authorization: this.authstr } }
        )
        .then(response => {
          
        })
        .catch(error => {
          
        });
    },
    progressModalClose() {
      this.$refs.progressModal.hide();
    },
    massChange() {
      if (this.checkedId.length > 0) {
        this.$refs.massChangeModal.show();
      }
    },
    handleMassChange(evt) {
      evt.preventDefault();
      if(this.massForm.selected == null && this.massForm.priority == null && this.massForm.planned_start == null) {
        return;
      } else {
        this.submitMassChange(this.checkedId);
      }
      
      
    },
    submitMassChange(workorderarray) {
      this.massloading = true;
      axios
        .post(
          "http://localhost:3130/workorder/masschange",
          { massForm: this.massForm, workorderid: workorderarray },
          { headers: { Authorization: this.authstr } }
        )
        .then(response => {
          this.items = [];
          setTimeout(this.getWorkorderList(), 1000);
          // this.getWorkorderList();
          this.massForm.selected = null;
          this.massForm.priority = null;
          this.massForm.planned_start = null;
          this.massloading = false;
          this.$refs.massChangeModal.hide();
        })
        .catch(error => {
          alert("Work order could not be mass changed, please try again");
          this.massloading = false;
        });
    },
    gotoMapView() {
      this.$router.push('/workorders/mapview');
    }
  },
  created() {
    const token = getIdToken();
    this.authstr = "Bearer ".concat(token);
  },
  components: {
    sidebar: Sidebar,
    topbar: Topbar,
    footerbar: Footerbar,
    downloadExcel: JsonExcel,
    datePicker
  }
};
</script>

<style scoped>
.progress {
    height: 25px;
}

.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
