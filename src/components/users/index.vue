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
                  <h4 class="c-grey-900 mT-10 mB-30">Users</h4>

                  <b-container fluid>
                    <!-- User Interface controls -->
                    <b-row>
                      <b-col md="4" class="my-1">
                        <b-btn v-if="roleMngEn" @click="createUser()">Create</b-btn>
                      </b-col>
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

                    <!-- Main table element -->
                    <b-table
                      striped
                      hover
                      show-empty
                      stacked="md"
                      :busy="loading"
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
                      <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                      </template>

                      <!-- A custom formatted column -->
                      <template slot="name" slot-scope="data">
                        {{ data.item.name }}
                      </template>

                      <!-- A virtual composite column -->
                      <template slot="email" slot-scope="data">
                        {{ data.item.email}}
                      </template>

                      <template slot="role" slot-scope="data">
                        <div v-for="(item, idx) in data.item.user_type" v-bind:key="idx">
                          <b-badge variant="secondary" v-if="item == 1">
                            Administrator
                          </b-badge>
                          <b-badge variant="secondary" v-if="item == 2">
                            Assigner
                          </b-badge>
                          <b-badge variant="secondary" v-if="item == 3">
                            Field worker
                          </b-badge>
                        </div>
                        
                      </template>

                      <template slot="active" slot-scope="data">
                        {{data.item.active == 1?'Active':'Inactive'}}
                      </template>

                      <template slot="verified" slot-scope="data">
                        {{data.item.verified == 1? 'Verified': 'Unverified'}}
                      </template>

                      <template slot="details" slot-scope="row">
                        <b-btn @click="showDetails(row.index)">View</b-btn>

                        <b-btn v-if="roleMngEn" @click="showEdit(row)">Edit</b-btn>
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

    <b-modal ref="createUserModal" hide-footer title="Create New User">
      <div class="d-block text-center">
        <h3>Create New User</h3>
        <span class="error" v-if="!emailValid">Email Aleady Exist!</span>
        <span class="error" v-if="!passValid">Mis-confirmed Password!</span>
        <b-form>
          <b-form-group id="userInputGroup1" label="Name:" label-for="uName">
            <b-form-input
              id="uName"
              type="text"
              v-model="userForm.name"
              required
              placeholder="Enter name" />
          </b-form-group>

          <b-form-group
            id="userInputGroup2"
            label="Email address:"
            label-for="uEmail"
          >
            <b-form-input
              id="uEmail"
              type="email"
              v-model="userForm.email"
              required
              placeholder="Enter email" />
          </b-form-group>

          <b-form-group id="userInputGroup3" label="User Role:" label-for="uRoleValue">
            <multiselect v-model="userForm.uRoleValue" tag-placeholder="Add this role to this user" placeholder="Add this role to this user" label="name" 
              track-by="value" :options="roleOptions" :multiple="true" :taggable="true" @tag="addRoleTag" id="uRoleValue">
            </multiselect>
          </b-form-group>

          <b-form-group
            id="userInputGroup4"
            label="Password:"
            label-for="uPass"
          >
            <b-form-input id="uPass" type="password" v-model="userForm.pass" required placeholder="Enter password" />
          </b-form-group>

          <b-form-group
            id="userInputGroup5"
            label="Confirm Password:"
            label-for="uConfPass"
          >
            <b-form-input id="uConfPass" type="password" v-model="userForm.cPass" required placeholder="Enter Confirm password" />
          </b-form-group>

          <b-button @click="createUserSubmit" variant="default">Submit</b-button>
          <b-button @click="onReset" variant="default">Reset</b-button>
        </b-form>
        
      </div>

    </b-modal>

    <b-modal ref="userDetailModal" hide-footer title="User Detail">
      <div class="d-block text-center">
        <h3>User Detail</h3>
        <b-form-group
            id="nameLabel"
            label="Name"
            label-for="name"
          >
            <b-form-input id="name" type="text" v-model="detailForm.name" disabled/>
          </b-form-group>

          <b-form-group
            id="emailLabel"
            label="Email"
            label-for="email"
          >
            <b-form-input id="email" type="text" v-model="detailForm.email" disabled/>
          </b-form-group>

          <b-form-group
            id="role"
            label="User Type"
            label-for="email"
          >
            <div v-for="(item, idx) in detailForm.user_type" v-bind:key="idx">
              <b-badge variant="secondary" v-if="item == 1">
                Administrator
              </b-badge>
              <b-badge variant="secondary" v-if="item == 2">
                Assigner
              </b-badge>
              <b-badge variant="secondary" v-if="item == 3">
                Field worker
              </b-badge>
            </div>
          </b-form-group>

          <b-form-group
            id="verifiedLabel"
            label="Verified"
            label-for="verified"
          >
            <b-form-input id="verified" type="text" v-model="detailForm.verified" disabled/>
          </b-form-group>

          <b-form-group
            id="activeLabel"
            label="Active"
            label-for="active"
          >
            <b-form-input id="active" type="text" v-model="detailForm.active" disabled/>
          </b-form-group>
      </div>
      
      <b-button class="mt-2" variant="outline-danger" block @click="userDetailModalClose">Close</b-button>
    </b-modal>

    <b-modal ref="warninigModal" hide-footer title="Warning!">
      <div class="d-block text-center">
        <h3>You don't have permission to do this operation!</h3>
      </div>
      
      <b-button class="mt-2" variant="outline-danger" block @click="warninigModalClose">Close</b-button>
    </b-modal>
  </div>
  
</template>

<script>
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Footerbar from "../footerbar";
import axios from "axios";
import { getIdToken } from "../../../utils/auth";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
const items = [];

export default {
  name: "users",
  data() {
    return {
      loading: false,

      items: items,

      fields: [
        'index',
        {
          key: "name",
          sortable: true
        },
        {
          key: "email",
          sortable: false
        },
        {
          key: "role",
          sortable: false
        },
        {
          key: "active",
          sortable: false
        },
        {
          key: "verified",
          sortable: false
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
      roleMngEn: false,
      roleOptions: [
        { name: 'Administrator', value: 1 },
        { name: 'Assigner', value: 2 },
        { name: 'Field worker', value: 3 }
      ],
      roleValue: [],
      selUser: null,
      authstr: null,
      selRow: null,
      roles: ['Administrator', 'Assigner', 'Field worker'],
      userForm: {
        name: '',
        email: '',
        uRoleValue: [
          { name: 'Field worker', value: 3 }
        ],
        pass: '',
        cPass: ''
      },
      emailValid: true,
      passValid: true,
      detailForm: {
        name: '',
        email: '',
        user_type: [],
        active: null,
        verified: null
      }
    };
  },
  methods: {
    getUserList() {
      const self = this;

      this.loading = true;

      axios
        .get("http://localhost:3130/user/users", {
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          this.items = response.data.users;
          for(var i = 0; i < this.items.length; i++) {
            this.items[i].user_type = JSON.parse(this.items[i].user_type);
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showDetails(index) {
      this.detailForm = this.items[index];
      this.detailForm.active = (this.detailForm.active?'Active':'Not Active');
      this.detailForm.verified = (this.detailForm.verified?'Verified':'Not Verified');
      this.$refs.userDetailModal.show();
    },
    createUser() {
      if(!this.checkUserRole())
        this.$refs.createUserModal.show();
      else 
        this.$refs.warninigModal.show();
    },
    warninigModalClose() {
      this.$refs.warninigModal.hide();
    },
    userDetailModalClose() {
      this.$refs.userDetailModal.hide();
    },
    checkUserRole() {
      var userRole = JSON.parse(JSON.parse(localStorage.getItem('user_data')).user_type);

      if(userRole.includes(1)) 
        this.roleMngEn = true;
      else 
        this.roleMngEn = false;
    },
    showEdit(row) {
      this.$router.push("/user/edit/" + row.item.id);
    },
    addRoleTag(newTag) {
      const tag = {
        name: newTag,
        value: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      };
      this.roleOptions.push(tag);
      this.roleValue.push(tag);
    },
    createUserSubmit() {
      if(this.userForm.pass != this.userForm.cPass) {
        this.passValid = false;
      } else {
        this.passValid = true;
        axios
        .post("http://localhost:3130/user/emailValidate", {
          email: this.userForm.email
        },{
          headers: { Authorization: this.authstr }
        })
        .then(response => {
          this.emailValid = response.data.status;
          if(this.emailValid) {
            axios
              .post("http://localhost:3130/user/createUser", {
                user: this.userForm
              },{
                headers: { Authorization: this.authstr }
              })
              .then(response => {
                if(response.data.status) {
                  this.$refs.createUserModal.hide();
                  this.getUserList();
                  this.onReset();
                } else {

                }
              })
              .catch(error => {
                
              });
          } else {
            this.emailValid = response.data.status;
          }
            
        })
        .catch(error => {
          
        });
      }
      
    },
    onReset() {
      this.userForm.name = '';
      this.userForm.email = '';
      this.userForm.uRoleValue = [
          { name: 'Field worker', value: 3 }
      ];
      this.userForm.pass = '';
      this.userForm.cPass = '';
    }
  },
  computed: {
  },
  mounted() {
    this.getUserList();
  },
  created() {
    this.checkUserRole();
    const token = getIdToken();
    this.authstr = "Bearer ".concat(token);
  },
  components: {
    sidebar: Sidebar,
    topbar: Topbar,
    footerbar: Footerbar,
    Multiselect
  }
};
</script>


<style>
.multiselect__option--highlight {
    background: grey !important;
}

.multiselect__tags-wrap .multiselect__tag {
    background: grey;
}

.multiselect__tags span {
  background: grey;
}
.error {
    color: red;
}

</style>