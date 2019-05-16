<template>
  <div>
    <sidebar></sidebar>
    <div class="page-container">
      <topbar></topbar>

<main class="main-content bgc-grey-100">
    <div id="mainContent">
        <div class="full-container">
            <div class="peers fxw-nw pos-r">
                <div class="peer bdR" id="chat-sidebar">
                    <div class="layers h-100">
                        <div class="bdB layer w-100">
                            <input type="text" placeholder="Search contacts..." name="chatSearch" class="form-constrol p-15 bdrs-0 w-100 bdw-0">
                        </div>
                        <div class="layer w-100 fxg-1 scrollable pos-r">
                            <div class="peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p">
                                <div class="peer"><img src="https://randomuser.me/api/portraits/men/1.jpg" alt="" class="w-3r h-3r bdrs-50p"></div>
                                <div class="peer peer-greed pL-20">
                                    <h6 class="mB-0 lh-1 fw-400">Field worker - Adam</h6><small class="lh-1 c-green-500">Online</small></div>
                            </div>
                            <div class="peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p">
                                <div class="peer"><img src="https://randomuser.me/api/portraits/men/2.jpg" alt="" class="w-3r h-3r bdrs-50p"></div>
                                <div class="peer peer-greed pL-20">
                                    <h6 class="mB-0 lh-1 fw-400">Field worker - Musa</h6><small class="lh-1 c-amber-500">Away</small></div>
                            </div>
                            <div class="peers fxw-nw ai-c p-20 bdB bgc-white bgcH-grey-50 cur-p">
                                <div class="peer"><img src="https://randomuser.me/api/portraits/men/4.jpg" alt="" class="w-3r h-3r bdrs-50p"></div>
                                <div class="peer peer-greed pL-20">
                                    <h6 class="mB-0 lh-1 fw-400">Field worker - Peter</h6><small class="lh-1 c-grey-500">Offline</small></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="peer peer-greed" id="chat-box">
                    <div class="layers h-100">
                        <div class="layer w-100">
                            <div class="peers fxw-nw jc-sb ai-c pY-20 pX-30 bgc-white">
                                <div class="peers ai-c">
                                    <div class="peer d-n@md+"><a href="" title="" id="chat-sidebar-toggle" class="td-n c-grey-900 cH-blue-500 mR-30"><i class="ti-menu"></i></a></div>
                                    <div class="peer mR-20"><img src="https://randomuser.me/api/portraits/men/10.jpg" alt="" class="w-3r h-3r bdrs-50p"></div>
                                    <div class="peer">
                                        <h6 class="lh-1 mB-0">Fredrik</h6><i class="fsz-sm lh-1">Typing...</i></div>
                                </div>

                            </div>
                        </div>
                        <div class="layer w-100 fxg-1 bgc-grey-200 scrollable pos-r">
                            <div class="p-20 gapY-15">
                                <div class="peers fxw-nw">
                                    <div class="peer mR-20"><img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/1.jpg" alt=""></div>
                                    <div class="peer peer-greed">
                                        <div class="layers ai-fs gapY-5">
                                            <div class="layer">
                                                <div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                                    <div class="peer mR-10"><small>22.06.2018 10:05</small></div>
                                                    <div class="peer-greed"><span>I can't find the meter on work order WO12345</span></div>
                                                </div>
                                            </div>
                                            <div class="layer">
                                                <div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                                    <div class="peer mR-10"><small>22.06.2018 10:06</small></div>
                                                    <div class="peer-greed"><span>I have been searching for it for the last 30 minutes</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="peers fxw-nw ai-fe">
                                    <div class="peer ord-1 mL-20"><img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/10.jpg" alt=""></div>
                                    <div class="peer peer-greed ord-0">
                                        <div class="layers ai-fe gapY-10">
                                            <div class="layer">
                                                <div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                                    <div class="peer mL-10 ord-1"><small>22.06.2018 10:06</small></div>
                                                    <div class="peer-greed ord-0"><span>Hi Adam, I will phone the customer to find out where the meter is</span></div>
                                                </div>
                                            </div>
                                            <div class="layer">
                                                <div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                                    <div class="peer mL-10 ord-1"><small>22.06.2018 10:08</small></div>
                                                    <div class="peer-greed ord-0"><span>The meter is behind the gate on the left</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="peers fxw-nw">
                                    <div class="peer mR-20"><img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/1.jpg" alt=""></div>
                                    <div class="peer peer-greed">
                                        <div class="layers ai-fs gapY-5">
                                            <div class="layer">
                                                <div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">
                                                    <div class="peer mR-10"><small>22.06.2018 10:10</small></div>
                                                    <div class="peer-greed"><span>I found it, thank you!</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="layer w-100">
                            <div class="p-20 bdT bgc-white">
                                <div class="pos-r">
                                    <input type="text" class="form-control bdrs-10em m-0" placeholder="Say something...">
                                    <button type="button" class="btn btn-primary bdrs-50p w-2r p-0 h-2r pos-a r-1 t-1"><i class="fa fa-paper-plane-o"></i></button>
                                </div>
                            </div>
                        </div>
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
  name: 'chat',
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
