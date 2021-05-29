<template>
  <div>
    <div
      class="notice-beta bg-white border-b border-gray-100 shadow-sm w-full h-14 fixed right-0 p-3 top-0 z-50 space-mb-sides"
    >
      <div class="flex items-center justify-between">
        <div class="logo-hdd-top relative w-40">
          <img
            src="https://res.cloudinary.com/serveryguken/image/upload/v1622134199/LogSnap/logo/LogSnap-main_xppj6x_nngrml.svg"
            alt="workspace-logo"
            class="w-32"
          />
          <div class="absolute top-5 right-0 left-1 ml-24 w-20 p-1">
            <p class="text-xs text-gray-400">Beta</p>
          </div>
        </div>
        <div class="flex-second dashboard-nav-links flex items-center">
          <div class="notification tooltip cursor-pointer relative">
            <div class="noti-icon mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 icons-color rotate-45 transform-gpu cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                />
              </svg>
              <div
                class="workspace-folder-icon-tooltip tooltip-notifications-text bg-gray-800 text-white rounded"
              >
                <p class="ml-1 text-xs">Notifications</p>
              </div>
            </div>
          </div>
          <div class="help cursor-pointer tooltip">
            <div class="help-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 icons-color mr-2 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              class="workspace-folder-icon-tooltip tooltip-help-text text-white rounded"
            >
              <p class="ml-1 text-xs">Help</p>
            </div>
          </div>
          <div class="cmp-pf-con user-card tooltip user-profile">
            <div
              class="user-img usernameInitials-sm cursor-pointer ml-auto mr-auto"
              :style="color"
            >
              <h1 class="user-img-txt text-white text-lg font-semibold">
                {{ initals }}
              </h1>
              <div
                class="workspace-folder-icon-tooltip tooltip-profile-text bg-gray-800 text-white rounded"
              >
                <p class="ml-1 text-xs">Profile and settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loader-comp">
      <Loader v-if="isLoading" />
    </div>
    <div id="page-dashboard" v-if="!isLoading">
      <div class="dashboard flex flex-col">
        <div id="dash-left" class="dash-left">
          <LeftSideBar />
        </div>
        <div id="dash-middle" class="dash-middle">
          <div class="dashboard-contents" v-if="!errorWorkspace">
            <slot />
          </div>
          <div
            class="error-page flex items-center justify-center pt-64"
            v-if="errorWorkspace"
          >
            <h1 class="text-2xl font-normal">
              This content has
              <span class="font-bold text-main-normal"> deleted or moved</span>.
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuthUser, getUser, userDB, getWorkspacePath } from "../config/functions";
import { mapGetters } from "vuex";
import Loader from "./Loader";
import LeftSideBar from "../components/LeftSideBar";
export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: false,
      user: "",
      initals: "",
      color: "",
      errorWorkspace: false,
      workspaceName: this.$route.fullPath.split("/")[2].replace(/%20/g, " "),
      workspacePath: this.$route.fullPath.split("/")[4],
    };
  },
  components: {
    Loader,
    LeftSideBar,
  },
  mounted() {
    getWorkspacePath(this.workspacePath);
    if (this.$store.getters.getErrorPage === true) {
      console.log("no content");
      this.errorWorkspace = true;
    }
    else {
      this.errorWorkspace = false;
    }
    const getInitials = function (name) {
      var parts = name.split("");
      var initials = parts[0];
      return initials;
    };
    getAuthUser().then((user) => {
      getUser(user.uid).then((user) => {
        this.name = user.fullName;
        this.initals = getInitials(this.name);
        this.color = `background-color: ${user.coloruserSetActive};`;
      });
    });
    setTimeout(() => {
      this.isLoading = false;
      localStorage.isLoaded = true;
    }, 1000);
    if (localStorage.isLoaded === "true") {
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters(["getErrorPage"]),
  },
  created() {
    window.addEventListener("beforeunload", function () {
      localStorage.isLoaded = false;
    });
  },
  watch: {
    "$store.getters.getErrorPage": function (data) {
      if (this.$store.getters.getErrorPage === true) {
        this.errorWorkspace = true;
      }
    },
  },
};
</script>