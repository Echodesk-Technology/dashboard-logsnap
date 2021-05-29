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
        <div class="absolute top-1 right-0 left-1 ml-28 w-20 p-1">
          <p class="text-sm text-main-normal">Beta</p>
        </div>
      </div>
      <div class="cmp-pf-con user-card tooltip">
        <div
          class="user-img usernameInitials rounded-xl bg-gray-100"
          v-if="userImage"
        >
          <img
            src="https://res.cloudinary.com/serveryguken/image/upload/v1622134200/LogSnap/logo/LogSnap-icon_j9b15w_lvjemh.svg"
            alt="workspace-logo"
            class="w-8"
          />
        </div>
        <div
          class="user-img usernameInitials-sm  cursor-pointer ml-auto mr-auto"
          v-if="!userImage"
          :style="color"
        >
          <h1 class="user-img-txt text-white text-lg font-semibold">
            {{ initals }}
          </h1>
          <div
                  class="workspace-folder-icon-tooltip tooltip-text bg-gray-800 text-white rounded"
                >
                  <p class="ml-1 text-xs">Profile and settings</p>
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
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuthUser,getUser, } from "../config/functions";
import Loader from "./Loader";
import LeftSideBar from "../components/LeftSideBar";
export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: false,
      user: "",
      initals: "",
    };
  },
  components: {
    Loader,
    LeftSideBar,
  },
  mounted() {
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
  created() {
    window.addEventListener("beforeunload", function () {
      localStorage.isLoaded = false;
    });
  },
};
</script>