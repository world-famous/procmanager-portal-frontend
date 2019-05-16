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
                                    <h4 class="c-grey-900 mT-10 mB-30">Dashboard</h4>

                                    <div class="masonry-item col-md-12">
                                        <div class="bgc-white p-20 bd">
                                            <h6 class="c-grey-900">Work order status</h6>
                                            <div class="mT-30">
                                                <div class="peers mT-20 fxw-nw@lg+ jc-sb ta-c gap-10">
                                                    <div class="peer">
                                                        <div class="easy-pie-chart" data-size="80" data-percent="" data-id="1"
                                                             data-color="#f44336"><span>{{unassignedData}}%</span></div>
                                                        <h6 class="fsz-sm">Unassigned</h6></div>
                                                    <div class="peer">
                                                        <div class="easy-pie-chart" data-size="80" data-percent="" data-id="2"
                                                             data-color="#ffc107"><span>{{assignedData}}%</span></div>
                                                        <h6 class="fsz-sm">Assigned</h6></div>
                                                    <div class="peer">
                                                        <div class="easy-pie-chart" data-size="80" data-percent="" data-id="3"
                                                             data-color="#4caf50"><span>{{completedData}}%</span></div>
                                                        <h6 class="fsz-sm">Completed</h6></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="masonry-item col-md-12">
                                        <div class="bgc-white p-20 bd">
                                            <h6 class="c-grey-900">Unassigned / Completed</h6>
                                            <div class="mT-30">
                                                <canvas id="line-chart" height="220"></canvas>
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
    import {getIdToken} from '../../utils/auth';

    import EasyPieChart from 'easy-pie-chart';
    import Chart from 'chart.js';

    const items = []

    export default {
        name: 'dashboard',
        mounted() {
        },
        data() {
            return {

                unassignedYearData: [],
                completedYearData: [],
                unassignedData: 0,
                assignedData: 0,
                completedData: 0,
                items: items,

                fields: [{
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
                pageOptions: [5, 10, 15],
                sortBy: null,
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                modalInfo: {title: '', content: ''},
            }
        },
        methods: {
            initPieChart() {
                var element = document.querySelectorAll('.easy-pie-chart');
                var self = this;
                element.forEach(function (element2) {

                    if(element2.dataset.id == 1) {
                        element2.dataset.percent = self.unassignedData;
                        new EasyPieChart(element2, {
                            barColor: element2.dataset.color
                        });
                    } else if(element2.dataset.id == 2) {
                        element2.dataset.percent = self.assignedData;
                        new EasyPieChart(element2, {
                            barColor: element2.dataset.color
                        });
                    } else if(element2.dataset.id == 3) {
                        element2.dataset.percent = self.completedData;
                        new EasyPieChart(element2, {
                            barColor: element2.dataset.color
                        });
                    }

                });


                const lineChartBox = document.getElementById('line-chart');

                if (lineChartBox) {
                    const lineCtx = lineChartBox.getContext('2d');
                    lineChartBox.height = 80;

                    new Chart(lineCtx, {
                        type: 'line',
                        data: {
                            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
                            datasets: [{
                                label: 'Unsassigned',
                                backgroundColor: 'rgba(237, 231, 246, 0.5)',
                                borderColor: '#f44336',
                                pointBackgroundColor: '#e53935',
                                borderWidth: 2,
                                data: this.unassignedYearData,
                            }, {
                                label: 'Completed',
                                backgroundColor: 'rgba(232, 245, 233, 0.5)',
                                borderColor: '#4caf50',
                                pointBackgroundColor: '#388e3c',
                                borderWidth: 2,
                                data: this.completedYearData,
                            }],
                        },

                        options: {
                            legend: {
                                display: false,
                            },
                        },

                    });
                }
            },
            getUserList() {
                const self = this;
                const token = getIdToken();
                const authstr = 'Bearer '.concat(token);

                axios.get('http://localhost:3130/user/users', {headers: {'Authorization': authstr}})
                    .then(response => {
                        this.items = response.data.users;
                        console.log(this.items);
                    })
                    .catch(error => {
                    })
            },
            async getGraphData() {
                const token = getIdToken();
                const authstr = 'Bearer '.concat(token);
                var requestResult = await axios.get('http://localhost:3130/workorder/getStatisticsData', {headers: {'Authorization': authstr}});
                var workorderStatistics = requestResult.data.workorderStatistics;
                var total = workorderStatistics.assignedData + workorderStatistics.unassignedData + workorderStatistics.completedData;
                this.unassignedData = Math.floor(workorderStatistics.unassignedData * 100 / total);
                this.assignedData = Math.floor(workorderStatistics.assignedData * 100 / total);
                this.completedData = Math.floor(workorderStatistics.completedData * 100 / total);
                this.unassignedYearData = workorderStatistics.unassignedYearData;
                this.completedYearData = workorderStatistics.completedYearData;
            },
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        },
        async created() {
            console.log('created')

            await this.getGraphData();


            this.getUserList();

            this.initPieChart();

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
