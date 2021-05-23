<template>
  <div class="max-w-2xl ml-auto mr-auto" id="page-signup">
    <div class="signup-form-container animate-fadein" v-if="!isSignedup">
      <div class="hd-logo mt-6 mb-3">
        <router-link to="/">
          <img
            src="https://res.cloudinary.com/serveryguken/image/upload/v1612386754/Projects/logsnap/logo/LogSnap-main_xppj6x.svg"
            alt="logsnap-logo"
            class="w-32 pt-1 pb-2 ml-auto mr-auto"
          />
        </router-link>
      </div>
      <div class="flex  justify-between signup-ft pt-4 pb-10">
        <div class="sn-ft max-w-xl p-2">
          <h1 class="text-2xl font-semibold">
            A few clicks away from managing your projects.
          </h1>
          <div class="ft-list mt-6">
            <div class="flex mt-4">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1621701353/LogSnap/imgs/report_guveug.svg"
                alt="report issue image"
                class="w-6 h-6 mt-2"
              />
              <h1 class="ml-2 text-sm">
                <span class="font-semibold">Create Issues.</span> Record and
                follow the progress of every ticket or issue.
              </h1>
            </div>
            <div class="flex mt-6">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1621702905/LogSnap/imgs/to-do-list_xt7icv.svg"
                alt="report issue image"
                class="w-6 h-6 mt-2"
              />
              <h1 class="ml-2 text-sm">
                <span class="font-semibold">Manage Todos.</span> prioritize the
                tasks that needs to be done.
              </h1>
            </div>
            <div class="flex mt-6">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1621702944/LogSnap/imgs/post-it_mlohh2.svg"
                alt="report issue image"
                class="w-6 h-6 mt-2"
              />
              <h1 class="ml-2 text-sm">
                <span class="font-semibold">Build notes.</span> Simple note
                taking tool for any use case.
              </h1>
            </div>
            <div class="flex mt-6">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1621702947/LogSnap/imgs/files_nmladb.svg"
                alt="report issue image"
                class="w-6 h-6 mt-2"
              />
              <h1 class="ml-2 text-sm">
                <span class="font-semibold">File Storage.</span> Organize Store
                files also available offline.
              </h1>
            </div>
          </div>
        </div>
        <div class="form-container pl-16  max-w-sm ml-auto mr-auto w-10/12">
          <div class="su">
            <div class="su-form-hd text-center">
              <h1 class="text-3xl font-semibold">Join LogSnap</h1>
              <p class="mt-2 text-gray-600">Start managing your projects</p>
            </div>
            <div class="form pt-4">
              <form action="/">
                <div class="error-con mt-4 mb-3">
                  <p ref="lgError" class="text-sm font-medium text-red-600">
                    {{ error }}
                  </p>
                </div>
                <div class="form-group mt-4">
                  <!-- <label for="username" class="text-gray-dark font-normal"
                  >username</label
                > -->
                  <input
                    type="text"
                    id="username"
                    ref="username"
                    placeholder="Username"
                    v-model="tenantData.username"
                    @keyup="validateusername($event.target.value)"
                    class="bg-gray-100 focus:bg-white border border-gray-200 p-1 h-9 rounded w-full mt-1 focus:outline-none focus:ring-1 focus:ring-main-normal appearance-none"
                  />
                </div>
                <div class="error-con mt-2 mb-2">
                  <p ref="lgError" class="text-sm font-medium text-red-600">
                    {{ usernameError }}
                  </p>
                </div>
                <div class="form-group mt-4">
                  <input
                    type="email"
                    id="email"
                    ref="email"
                    placeholder="Email address"
                    autocomplete="new-email"
                    v-model="tenantData.email"
                    @keyup="validateEmail($event.target.value)"
                    class="bg-gray-100 focus:bg-white border border-gray-200 p-1 h-9 rounded w-full mt-1 focus:outline-none focus:ring-1 focus:ring-main-normal appearance-none"
                  />
                </div>
                <div class="error-con mt-2 mb-2">
                  <p ref="lgError" class="text-sm font-medium text-red-600">
                    {{ emailError }}
                  </p>
                </div>
                <div class="form-group mt-4">
                  <input
                    type="password"
                    id="password"
                    ref="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="tenantData.password"
                    class="bg-gray-100 focus:bg-white border border-gray-200 p-1 h-9 rounded w-full mt-1 focus:outline-none focus:ring-1 focus:ring-main-normal appearance-none"
                  />
                </div>
                <div class="error-con mt-2 mb-2">
                  <p ref="lgError" class="text-sm font-medium text-red-600">
                    {{ passwordError }}
                  </p>
                </div>
                <!-- <div class="form-group mt-4">
              <label for="username" class="text-gray-dark font-normal"
                >Workspace Name</label
              >
              <input
                type="text"
                id="workspaceName"
                ref="workspaceName"
                v-model="tenantData.workspaceName"
                class="border border-gray-200 rounded-sm p-2 w-full mt-1 focus:outline-none focus:ring-1 focus:ring-main-normal appearance-none"
              />
            </div>
            <div class="error-con mt-4 mb-3">
              <p ref="lgError" class="text-sm font-medium text-red-600">
                {{ workspaceNameError }}
              </p>
            </div>
            <div class="form-group mt-4">
              <label for="username" class="text-gray-dark font-normal"
                >Workspace URL</label
              >
              <div class="flex rounded-md w-full mt-1">
                <input
                  type="text"
                  id="workspaceURL"
                  ref="workspaceURL"
                  v-model="tenantData.workspaceURL"
                  class="border border-gray-200 rounded-sm p-2 w-10/12 focus:outline-none focus:ring-1 focus:ring-main-normal appearance-none border-r-0"
                />
                <span
                  class="wk-url inline-flex items-center w-24 rounded-sm border border-gray-200 bg-gray-100 text-gray-500 text-sm border-l-0"
                >
                  <span class="ml-1">logsnap.app</span>
                </span>
              </div>
            </div>
                <div class="error-con mt-4 mb-3">
                  <p ref="lgError" class="text-sm font-medium text-red-600">
                    {{ workspaceURLError }}
                  </p>
                </div> -->
                <div class="flex mt-6 items-center">
                  <div
                    class="checkbox cursor-pointer w-5 h-5 rounded border border-gray-800"
                    @click="handleCheckbox"
                  >
                    <div
                      class="checkbox_icon flex justify-center items-center"
                      v-if="checked"
                    >
                      <svg
                        class="w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span class="ml-2" style="font-size: 1rem"
                    >I agree to
                    <span
                      ><router-link
                        to="/terms"
                        class="text-main-normal underline"
                      >
                        Terms and
                      </router-link></span
                    >
                    <span
                      ><router-link
                        to="/privacy"
                        class="text-main-normal underline"
                      >
                        Privacy Policy.
                      </router-link></span
                    ></span
                  >
                </div>
                <div class="error-con mt-2 mb-2">
                  <p
                    ref="checkedError"
                    class="text-sm font-medium text-red-600"
                  >
                    {{ checkedError }}
                  </p>
                </div>
                <div class="form-group relative form-btn mt-6" v-if="!spinner">
                  <button
                    @click.prevent="createAccount()"
                    ref="createBtn"
                    class="w-full font-semibold outline-none focus:outline-none rounded bg-main-normal text-white p-1 h-9 hover:opacity-90"
                  >
                    Start for free
                  </button>
                </div>
                <div class="relative spn-b form-btn mt-4" v-if="spinner">
                  <div
                    class="cr-spinner w-full font-semibold outline-none focus:outline-none rounded bg-main-normal text-white p-1 h-9 hover:opacity-90"
                    ref="crSpinner"
                  ></div>
                </div>
                <div class="mt-5">
                  <div class="al-acc text-center mt-2">
                    <span class="text-gray-600  font-medium" style="font-size: 1rem"
                      >Already have an account?
                      <span
                        ><router-link to="/login" class="text-main-normal">
                          Log in
                        </router-link></span
                      ></span
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vrfy h-screen bg-main-normal w-full" v-if="isSignedup">
      <div class="flex justify-center items-center pt-6">
        <div class="dldj">
          <img
            src="https://res.cloudinary.com/serveryguken/image/upload/v1612385665/Projects/logsnap/logo/LogSnap-icon_cp7dgm.png"
            alt="logsnap-logo"
            class="w-10"
          />
        </div>
      </div>
      <div class="info mt-1 p-5">
        <h1 class="text-center text-white text-3xl font-semibold mb-4">
          Almost there!
        </h1>
        <div class="t text-main-light p-4">
          <h1>
            Thank you for joining LogSnap! To finish signing up, you need to
            confirm your email address.
          </h1>

          <!-- <h1 class="mt-4">
            An email confirmation was sent to
            <span class="text-main-normal">{{ getEmail }}</span>
          </h1> -->

          <h1 class="mt-6">Welcome to LogSnap!</h1>
          <h1 class="mt-2">LogSnap Team.</h1>
        </div>
      </div>
      <div class="d mt-2">
        <button
          class="text-white bg-main-dark py-5 rounded w-80 block ml-auto mr-auto hover:opacity-90 outline-none focus:outline-none"
          @click="sendEmailVerification"
          ref="sendEmallinkBtn"
        >
          RESEND VERIFICATION EMAIL
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  auth,
  createUser,
  updateUser,
  sendEmailVerification,
} from "../config/functions";
export default {
  name: "Signup",
  data() {
    return {
      planType: "Free",
      error: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      workspaceNameError: "",
      workspaceURLError: "",
      checkedError: "",
      getEmail: "",
      checked: false,
      isSignedup: false,
      spinner: false,
      tenantData: {},
    };
  },
  methods: {
    handleCheckbox() {
      if (this.checked === true) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    },
    focusInput() {
      setTimeout(() => {
        this.$refs.username.focus();
      }, 1500);
    },
    // setPlan() {
    //   let isPlan = localStorage.getItem("planType")
    //     ? JSON.parse(localStorage.planType)
    //     : "";
    //   if (isPlan) {
    //     this.planType = isPlan.plan;
    //     this.$refs.planType.innerText = isPlan.plan;
    //   } else {
    //     isPlan === this.planType;
    //     this.$refs.planType.innerText = this.planType;
    //   }
    // },
    validateEmail(value) {
      switch (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        case true:
          this.emailError = "";
          this.$refs.email.classList.remove("border-red-400");
          this.$refs.email.classList.remove("focus:ring-0");
          this.$refs.email.classList.add("focus:ring-1");
          break;
        case false:
          this.emailError = "Invalid Email";
          this.$refs.email.classList.add("border-red-400");
          this.$refs.email.classList.add("focus:ring-0");
          this.$refs.email.classList.remove("focus:ring-1");
          return false;
        default:
          this.emailError = "";
          this.$refs.email.classList.remove("border-red-400");
          this.$refs.email.classList.remove("focus:ring-0");
          this.$refs.email.classList.add("focus:ring-1");
          break;
      }
    },
    validateusername(value) {
      switch (/^[a-zA-Z0-9]+$/.test(value)) {
        case true:
          this.usernameError = "";
          this.$refs.username.classList.remove("border-red-400");
          this.$refs.username.classList.remove("focus:ring-0");
          this.$refs.username.classList.add("focus:ring-1");
          break;
        case false:
          this.usernameError = "Please enter a valid username.";
          this.$refs.username.classList.add("border-red-400");
          this.$refs.username.classList.add("focus:ring-0");
          this.$refs.username.classList.remove("focus:ring-1");
          return false;
        default:
          this.usernameError = "";
          this.$refs.username.classList.remove("focus:ring-0");
          this.$refs.username.classList.add("focus:ring-1");
          this.$refs.username.classList.remove("border-red-400");
          break;
      }
    },
    createAccount() {
      if (/^[a-zA-Z0-9]+$/.test(this.$refs.username.value)) {
        this.usernameError = "";
        this.$refs.username.classList.remove("border-red-400");
        this.$refs.username.classList.add("focus:ring-1");
        this.$refs.username.classList.remove("focus:ring-0");
      } 
      else {
        this.usernameError = "Please enter a valid username.";
        this.$refs.username.classList.add("border-red-400");
        this.$refs.username.classList.add("focus:ring-0");
        this.$refs.username.classList.remove("focus:ring-1");
        return false;
      }
      if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.$refs.email.value
        )
      ) {
        this.emailError = "";
        this.$refs.email.classList.remove("border-red-400");
        this.$refs.email.classList.add("focus:ring-1");
        this.$refs.email.classList.remove("focus:ring-0");
      } else {
        this.emailError = "Invalid Email";
        this.$refs.email.classList.add("border-red-400");
        this.$refs.email.classList.add("focus:ring-0");
        this.$refs.email.classList.remove("focus:ring-1");
        return false;
      }
      if (!this.tenantData.username) {
        this.usernameError = "Username is required";
        this.$refs.username.classList.add("border-red-400");
        this.$refs.username.classList.add("focus:ring-0");
        this.$refs.username.classList.remove("focus:ring-1");
        return false;
      } else {
        this.usernameError = "";
        this.$refs.username.classList.remove("border-red-400");
        this.$refs.username.classList.add("focus:ring-1");
        this.$refs.username.classList.remove("focus:ring-0");
      }
      if (!this.tenantData.email) {
        this.emailError = "Email is required";
        this.$refs.email.classList.add("border-red-400");
        this.$refs.email.classList.add("focus:ring-0");
        this.$refs.email.classList.remove("focus:ring-1");
        return false;
      } else {
        this.emailError = "";
        this.$refs.email.classList.remove("border-red-400");
        this.$refs.email.classList.add("focus:ring-1");
        this.$refs.email.classList.remove("focus:ring-0");
      }
      if (!this.tenantData.password) {
        this.passwordError = "Password is required";
        this.$refs.password.classList.add("border-red-400");
        this.$refs.password.classList.add("focus:ring-0");
        this.$refs.password.classList.remove("focus:ring-1");
        return false;
      } else {
        this.passwordError = "";
        this.$refs.password.classList.remove("border-red-400");
        this.$refs.password.classList.remove("focus:ring-0");
        this.$refs.password.classList.add("focus:ring-1");
      }
      if (this.checked === false) {
        this.checkedError = "The terms and privacy policy must be accepted.";
        return false;
      } else {
        this.checkedError = "";
      }
      // if(!this.tenantData.workspaceName) {
      //   this.workspaceNameError = "Workspace Name is required"
      //   this.$refs.workspaceName.classList.add("border-red-400")
      //   this.$refs.workspaceName.classList.add("focus:ring-0")
      //   this.$refs.workspaceName.classList.remove("focus:ring-1")
      // }
      //  else {
      //   this.workspaceNameError = ""
      //   this.$refs.workspaceName.classList.remove("border-red-400")
      //   this.$refs.workspaceName.classList.add("focus:ring-1")
      //   this.$refs.workspaceName.classList.remove("focus:ring-0")
      // }
      // if(!this.tenantData.workspaceURL) {
      //   this.workspaceURLError = "Workspace URL is required"
      //   this.$refs.workspaceURL.classList.add("border-red-400")
      //   this.$refs.workspaceURL.classList.add("focus:ring-0")
      //   this.$refs.workspaceURL.classList.remove("focus:ring-1")
      // }
      //  else {
      //   this.workspaceURLError = ""
      //   this.$refs.workspaceURL.classList.remove("border-red-400")
      //    this.$refs.workspaceURL.classList.add("focus:ring-1")
      //   this.$refs.workspaceURL.classList.remove("focus:ring-0")
      // }
      // if (this.validateusername(this.tenantData.username) === false) {
      //   this.$refs.username.classList.add("border-red-400");
      //   this.$refs.username.classList.add("focus:ring-0");
      //   this.$refs.username.classList.remove("focus:ring-1");
      //   return false;
      // }
      // if (this.validateEmail(this.tenantData.email) === false) {
      //   this.$refs.email.classList.add("border-red-400");
      //   this.$refs.email.classList.add("focus:ring-0");
      //   this.$refs.email.classList.remove("focus:ring-1");
      //   return false;
      // }

      // const tenantProperties = this.tenantData
      // const planType = this.planType

      if (
        this.tenantData.username &&
        this.tenantData.email &&
        this.tenantData.password &&
        this.checked === true
      ) {
        // this.$http.post('http://localhost:5000/api/v1/tenant/create', {
        //   tenantProperties,
        //   planType
        // })
        const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        auth
          .createUserWithEmailAndPassword(
            this.tenantData.email,
            this.tenantData.password
          )
          .then((data) => {
            data.user.updateProfile({
              displayName: this.tenantData.username,
            });
            createUser(data.user.uid, this.tenantData).then(() => {
              updateUser(data.user.uid, {
                planType: "free",
                colorUserSetActive: randomColor,
              });
            });
          })
          .then(() => {
            localStorage.isEmail = this.tenantData.email;
            this.isEmail = localStorage.isEmail;
            sendEmailVerification();
            this.spinner = true;
            setTimeout(() => {
              this.isSignedup = true;
            }, 2200);
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/invalid-email":
                this.emailError = "Invalid email.";
                break;
              case "auth/weak-password":
                this.passwordError = "Password too weak.";
                break;
              case "auth/email-already-in-use":
                this.emailError = "Email address is alredy in use.";
                break;
            }
          });
      }
    },
    sendEmailVerification() {
      const email = localStorage.isEmail
        ? localStorage.isEmail
        : "nospecified@email.com";
      sendEmailVerification();
      this.isEmail = email;
      this.$refs.sendEmallinkBtn.innerText = "EMAIL VERIFICATION SENT";
      this.$refs.sendEmallinkBtn.disabled = true;
      setTimeout(() => {
        this.$refs.sendEmallinkBtn.disabled = true;
        this.$refs.sendEmallinkBtn.innerText = "RESEND VERIFICATION EMAIL";
      }, 1000);
    },
  },
  mounted() {
    if (this.isSignedup === false) {
      this.focusInput();
      // this.setPlan();
    }
    // this.$refs.workspaceName.addEventListener("keyup", () => {
    //   let reg = /[^a-z0-9]/gi;
    //   this.tenantData.workspaceName = this.tenantData.workspaceName
    //     .toLowerCase()
    //     .replace(reg, "");
    //   this.tenantData.workspaceURL = this.tenantData.workspaceName
    // });
    // this.$refs.workspaceURL.addEventListener("keyup", () => {
    //   let reg = /[^a-z0-9]/gi;
    //   this.tenantData.workspaceURL = this.tenantData.workspaceURL
    //     .toLowerCase()
    //     .replace(reg, "");

    //   this.tenantData.workspaceName = this.tenantData.workspaceURL;
    // })
  },
};
</script>
