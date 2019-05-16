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
  
                  <h4 class="c-grey-900 mT-10 mB-30">Edit User Data</h4>
                  <b-button @click="back" variant="default" style="float:right;">Back</b-button>
                  <br/>
                  <b-container fluid>
  
                    <div class="d-block text-center">

                      <b-alert variant="warning" dismissible fade :show="showEditAlert" @dismissed="showEditAlert=false">{{editWarningMsg}}</b-alert>
  
                      <b-alert variant="success" dismissible fade :show="showEditSuccessAlert" @dismissed="showEditSuccessAlert=false">Successfully Changed!</b-alert>
  
                      <b-form>
  
                        <b-form-group id="userInputGroup11" label="Name:" label-for="uEditName">
  
                          <b-form-input id="uEditName" type="text" v-model="userEditForm.name" required placeholder="Change name" />
  
                        </b-form-group>
  
  
  
                        <b-form-group id="userInputGroup12" label="Email address:" label-for="uEditEmail">
  
                          <b-form-input id="uEditEmail" type="email" v-model="userEditForm.email" required placeholder="Change email" />
  
                        </b-form-group>
  
  
  
                        <b-form-group id="userInputGroup13" label="User Role:" label-for="uEditRoleValue">
  
                          <multiselect v-model="userEditForm.roleValue" tag-placeholder="Edit User Role" placeholder="Add this role to this user" label="name" track-by="value" :options="roleOptions" :multiple="true" :taggable="true" @tag="addRoleTag" id="uEditRoleValue"></multiselect>
  
                        </b-form-group>
  
                        <b-button @click="submitUserEdit" variant="default">Submit Changes</b-button>
  
                      </b-form>
  
                      <b-form>
  
                        <h3>Change User Password</h3>
  
                        <b-alert variant="warning" dismissible fade :show="showPassAlert" @dismissed="showPassAlert=false">{{passWarningMsg}}</b-alert>
  
                        <b-alert variant="success" dismissible fade :show="showPassSuccessAlert" @dismissed="showPassSuccessAlert=false">Successfully Changed!</b-alert>
  
                        <b-form-group id="userInputGroup14" label="Old Password:" label-for="uEditOldPass">
  
                          <b-form-input id="uEditOldPass" type="password" v-model="passwordForm.oPass" required placeholder="Old password" />
  
                        </b-form-group>
  
  
  
                        <b-form-group id="userInputGroup14" label="New Password:" label-for="uEditNewPass">
  
                          <b-form-input id="uEditNewPass" type="password" v-model="passwordForm.nPass" required placeholder="Input New password" />
  
                        </b-form-group>
  
  
  
                        <b-form-group id="userInputGroup15" label="Confirm Password:" label-for="uEidtConfPass">
  
                          <b-form-input id="uEidtConfPass" type="password" v-model="passwordForm.cnPass" required placeholder="Enter Confirm password" />
  
                        </b-form-group>
  
  
  
                        <b-button @click="changePassword" variant="default">Change</b-button>
  
                      </b-form>
  
                    </div>
  
                  </b-container>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </main>
  
      <footerbar></footerbar>
  
    </div>
  
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
  import {
    getIdToken
  } from "../../../utils/auth"; 
  import Multiselect from "vue-multiselect";

  export default {
    name: "edituser",
    data() {
  
      return {
  
        editLoading: false,
  
        passLoading: false,
  
        edittedUID: null,
  
        roleMngEn: false,
  
        roleOptions: [{
  
            name: "Administrator",
  
            value: 1
  
          },
  
          {
  
            name: "Assigner",
  
            value: 2
  
          },
  
          {
  
            name: "Field worker",
  
            value: 3
  
          }
  
        ],
  
        authstr: null,
  
        roles: ["Administrator", "Assigner", "Field worker"],
  
        userEditForm: {
  
          name: "",
  
          email: "",
  
          roleValue: [{
  
            name: "Field worker",
  
            value: 3
  
          }]
  
        },
  
        passwordForm: {
  
          oPass: "",
  
          nPass: "",
  
          cnPass: ""
  
        },
  
        emailValid: true,
  
        showPassAlert: false,
  
        passWarningMsg: "",
  
        showPassSuccessAlert: false,
  
        showEditAlert: false,
  
        editWarningMsg: "",
  
        showEditSuccessAlert: false
  
      };
  
    },
  
    methods: {
  
      load() {
        this.edittedUID = this.$route.params.id;
        axios
          .post("http://localhost:3130/user/userDetail", {
            uid: this.edittedUID
          },{
            headers: { Authorization: this.authstr }
          })
          .then(response => {
            var user = response.data.user;
            this.userEditForm.name = user.name;
            this.userEditForm.email = user.email;
            this.userEditForm.roleValue = [];
            var user_type = JSON.parse(user.user_type);
            for(var i=0; i<user_type.length; i++) {
              if(user_type[i] == 1) {
                this.userEditForm.roleValue.push({ name: 'Administrator', value: 1 });
              } else if(user_type[i] == 2) {
                this.userEditForm.roleValue.push({ name: 'Assigner', value: 2 });
              } else {
                this.userEditForm.roleValue.push({ name: 'Field worker', value: 3 });
              }
            }
          })
          .catch(error => {
            
          });
      },
  
      warninigModalClose() {
  
        this.$refs.warninigModal.hide();
  
      },
  
      checkUserRole() {
  
        var userRole = JSON.parse(
  
          JSON.parse(localStorage.getItem("user_data")).user_type
  
        );
  
  
  
        if (userRole.includes(1)) this.roleMngEn = true;
  
        else this.roleMngEn = false;
  
      },
  
      addRoleTag(newTag) {
  
        const tag = {
  
          name: newTag,
  
          value: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
  
        };
  
        this.roleOptions.push(tag);
  
        this.roleValue.push(tag);
  
      },
  
      submitUserEdit() {
        axios
          .post(
            "http://localhost:3130/user/editUserData", {
              uid: this.edittedUID,
              user: this.userEditForm
            }, {
              headers: {
                Authorization: this.authstr
              }
            }
          )
          .then(response => {
            this.showEditAlert = false;
            if (response.data.status == true) {
  
              this.editLoading = false;
  
              this.showEditSuccessAlert = true;
              this.load();
  
            } else {
  
              this.editLoading = false;
  
              this.showEditAlert = true;
  
              this.editWarningMsg = 'Email Already Taken!';
  
            }
  
          })
  
          .catch(error => {
  
            this.editLoading = false;
  
            this.showEditAlert = true;
  
            this.editWarningMsg = error;
  
          });
  
      },
  
      changePassword() {
  
        this.passLoading = true;
  
        if (this.passwordForm.cnPass != this.passwordForm.nPass) {
  
          this.passLoading = false;
  
          this.showPassAlert = true;
  
          this.passWarningMsg = "Misconfirmed Password!";
  
        } else {
  
          axios
  
            .post(
  
              "http://localhost:3130/user/changepassword", {
  
                uid: this.edittedUID,
  
                password: this.passwordForm
  
              }, {
  
                headers: {
  
                  Authorization: this.authstr
  
                }
  
              }
  
            )
  
            .then(response => {
  
              this.passLoading = false;
              this.showPassAlert = false;
  
              if (response.data.status == true) {
  
                this.showPassSuccessAlert = true;
  
              } else {
  
                this.showPassAlert = true;
  
                this.passWarningMsg = "Please input correct Old Password!";
  
              }
  
            })
  
            .catch(error => {
  
              this.passLoading = false;
  
            });
  
        }
  
      },
      back() {
        this.$router.push('/users');
      }
  
    },
  
    computed: {},
  
    mounted() {},
  
    created() {
  
      this.checkUserRole();
  
      const token = getIdToken();
  
      this.authstr = "Bearer ".concat(token);

      this.load();
  
    },
  
    components: {
  
      sidebar: Sidebar,
  
      topbar: Topbar,
  
      footerbar: Footerbar,
  
      Multiselect
  
    }
  
  };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
  
</style>

<style scoped>
  .error {
    color: red;
  }
</style>

