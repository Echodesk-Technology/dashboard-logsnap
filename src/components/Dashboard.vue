<template>
  <div>
    <div class="notice-beta bg-main-normal text-white w-48 fixed right-4 bottom-10 z-50">
     <h1>Hey {{user}} </h1>
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
import {getAuthUser} from "../config/functions"
import Loader from "./Loader";
import LeftSideBar from "../components/LeftSideBar";
export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: false,
      user: "",
    };
  },
  components: {
    Loader,
    LeftSideBar,
  },
  mounted() {
    getAuthUser().then(user => {
      return this.user = user.displayName;
    })
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