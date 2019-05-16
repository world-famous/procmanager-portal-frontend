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
                  <h4 class="c-grey-900 mT-10 mB-30">Users</h4>

<b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="4" class="my-1">
        <b-btn @click="createUser()">Create</b-btn>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="Per page" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table striped hover
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
        <template slot="details" slot-scope="row">
          <b-btn @click="showDetails(row.item.id)">View</b-btn>
        </template>
      </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
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
import Sidebar from './sidebar';
import Topbar from './topbar';
import Footerbar from './footerbar';
import axios from 'axios';
import { getIdToken} from '../../utils/auth';

const items = []

export default {
  name: 'users',
  mounted() {
    this.getUserList();
  },
  data() {
    return {

      items: items,

      fields: [ {
          key: 'name',
          sortable: true
        },
        {
          key: 'email',
          sortable: false
        },
        {
          key: 'role',
          sortable: false
        },
        {
          key: 'active',
          sortable: false
        },
        {
          key: 'verified',
          sortable: false
        },
        {
          key: 'details',
          sortable: false
        },
      ],

      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
    }
  },
  methods: {
    getUserList() {
      const self = this;
      const token = getIdToken();
      const authstr = 'Bearer '.concat(token);

      axios.get('http://localhost:3130/user/users', { headers: {'Authorization': authstr } } )
        .then(response => {
           this.items = response.data.users;
        })
        .catch(error => { })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    showDetails() {
    },
    createUser() {
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
