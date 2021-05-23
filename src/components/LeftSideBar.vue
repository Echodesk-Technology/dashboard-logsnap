<template>
  <div>
    <div id="aside-left" class="border-r">
      <aside
        class="fixed shadow-none left-0 top-0 z-50 bg-white border-r border-gray-100 dark:bg-gray-800 h-screen"
      >
        <div class="flex">
          <div
            class="first-left shadow-none w-20 bg-main-veryDark border-r border-gray-100 dark:bg-gray-800 h-screen"
          >
            <div class="flex flex-col">
              <!-- <div class="logsnap-logo-icon flex-grow pt-3">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1612385665/Projects/logsnap/logo/LogSnap-icon_cp7dgm.png"
                alt="workspace-logo"
                class="w-8 ml-auto mr-auto"
              />
            </div> -->
              <div class="cmp-pf-con flex items-center mt-5">
                <div
                  class="user-img usernameInitials rounded-xl p-1 bg-gray-100 ml-auto mr-auto"
                  v-if="userImage"
                >
                  <img
                    src="https://res.cloudinary.com/serveryguken/image/upload/v1612385665/Projects/logsnap/logo/LogSnap-icon_cp7dgm.png"
                    alt="workspace-logo"
                    class="w-8"
                  />
                </div>
                <div
                  class="user-img usernameInitials-sm border-2 border-white cursor-pointer ml-auto mr-auto"
                  v-if="!userImage"
                  :style="color"
                >
                  <h1 class="user-img-txt text-white text-lg font-semibold">
                    {{ initals }}
                  </h1>
                </div>
                <div class="cmp-text ml-3">
                  <!-- <h1 ref="workspaceName" class="text-xs font-medium w-24">
                {{ name }}
              </h1> -->
                </div>
              </div>
            </div>
          </div>
          <div
            class="collapsedSidebar left-main w-44 space-mb-sides p-4 relative"
            ref="collapsedSidebar"
          >
            <div
              @click="closeCollapsedMenu"
              class="collapsed-icon-close cursor-pointer absolute -right-3 mt-1 hover:bg-main-normal hover:text-white flex items-center justify-center rounded-full w-6 h-6 bg-white border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
            v-if="isCollapsed"
              @click="openCollapsedMenu"
              class="collapsed-icon-open cursor-pointer absolute -right-3 mt-1  hover:bg-main-normal hover:text-white flex items-center justify-center rounded-full w-6 h-6 bg-white border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="links-con" v-if="!isCollapsed">
              <ul class="mt-4">
                <li class="mb-1 p-1 dash-link">
                  <router-link
                    :to="{ name: 'Issues', params: { id: getRoute } }"
                    class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                  >
                    <div class="icon-con">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div class="link-txt ml-3">
                      <p class="text-sm font-medium text-gray-600">Issues</p>
                    </div>
                  </router-link>
                </li>

                <li class="mb-1 p-1 dash-link">
                  <router-link
                    :to="{ name: 'Todos', params: { id: getRoute } }"
                    class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                  >
                    <div class="icon-con">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    </div>
                    <div class="link-txt ml-3">
                      <p class="text-sm font-medium text-gray-600">Todos</p>
                    </div>
                  </router-link>
                </li>

                <!-- <li class="mb-1 p-1 dash-link">
                <router-link
                  :to="{name: 'Backlog', params: {id: getRoute}}"
                  class="dash-link flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <div class="icon-con">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                  <div class="link-txt ml-3">
                    <p class="text-sm font-medium text-gray-600">Backlog</p>
                  </div>
                </router-link>
              </li> -->

                <!-- <li class="mb-1 p-1 dash-link">
                <router-link
                  to="/settings/account/profile"
                  class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <div class="icon-con">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div class="link-txt ml-3">
                    <p class="text-sm font-medium text-gray-600">Settings</p>
                  </div>
                </router-link>
              </li> -->
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
    <div class="dash-mb-icon-menu flex items-center cursor-pointer ml-4">
      <div
        class="mb-close"
        v-show="open"
        v-on:click="hideMbMenu()"
        ref="mbNavClose"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 text-gray-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        class="mb-open"
        v-show="!open"
        v-on:click="showMbMenu()"
        ref="mbNavOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 text-gray-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
    </div>
    <div
      ref="dashMBMenu"
      class="dash-mb-sidebar overflow-y-hidden fixed z-50 border-t shadow-lg animate-slideright"
      v-if="open"
    >
      <aside class="bg-white border-r dark:bg-gray-800 h-screen">
        <div class="mb-left-main space-mb-sides p-4">
          <div class="links-con">
            <ul class="mt-4">
              <li class="mb-1 p-1 dash-link">
                <router-link
                  :to="{ name: 'Issues', params: { id: getRoute } }"
                  class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <div class="icon-con">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div class="link-txt ml-3">
                    <p class="text-sm font-medium text-gray-600">Issues</p>
                  </div>
                </router-link>
              </li>

              <li class="mb-1 p-1 dash-link">
                <router-link
                  :to="{ name: 'Todos', params: { id: getRoute } }"
                  class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                >
                  <div class="icon-con">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div class="link-txt ml-3">
                    <p class="text-sm font-medium text-gray-600">Todos</p>
                  </div>
                </router-link>
              </li>
              <!-- <li class="mb-1 p-1 dash-link">
                  <router-link
                    :to="{ name: 'Backlog', params: { id: getRoute } }"
                    class="dash-link flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                  >
                    <div class="icon-con">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <div class="link-txt ml-3">
                      <p class="text-sm font-medium text-gray-600">Backlog</p>
                    </div>
                  </router-link>
                </li> -->

              <!-- <li class="mb-1 p-1 dash-link">
                  <router-link
                    to="/dashboard/settings"
                    class="flex items-center p-2 hover:bg-gray-100 rounded text-sm"
                  >
                    <div class="icon-con">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div class="link-txt ml-3">
                      <p class="text-sm font-medium text-gray-600">Settings</p>
                    </div>
                  </router-link>
                </li> -->
              <li class="mb-1 p-1 dash-link">
                <button
                  class="lg-btn bg-main-normal shadow rounded text-sm text-white py-1 hover:bg-main-light mt-3 w-24 outline-none focus:outline-none"
                  @click="logOut"
                >
                  <span
                    class="outline-none focus:outline-none text-sm text-white"
                  >
                    Log out
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import { getUser, getAuthUser } from "../config/functions";
import { mapActions } from "vuex";
export default {
  name: "LeftSideBar",
  data() {
    return {
      userImage: false,
      getRoute: this.$route.fullPath.split("/")[4],
      name: "",
      color: "",
      initals: "",
      open: false,
      isCollapsed: false,
    };
  },
  methods: {
    showMbMenu: function () {
      this.open = true;
    },
    hideMbMenu: function () {
      this.open = false;
    },
    closeCollapsedMenu() {
      this.$refs.collapsedSidebar.classList.add("animate-slideToLeft");
      this.isCollapsed = true;
      localStorage.sidebarCollasped = true;
      this.$store.commit("SET_COLLAPSED", true)
    },
    openCollapsedMenu() {
      this.$refs.collapsedSidebar.classList.remove("animate-slideToLeft");
      this.isCollapsed = false;
      localStorage.sidebarCollasped = false;
      this.$store.commit("SET_COLLAPSED", false)
    },
  },
  mounted() {
    if (localStorage.sidebarCollasped) {
      if (localStorage.sidebarCollasped === "true") {
        this.$refs.collapsedSidebar.classList.add("animate-slideToLeft");
        this.isCollapsed = true;
        this.$store.commit("SET_COLLAPSED", true)
      } else {
         this.$refs.collapsedSidebar.classList.remove("animate-slideToLeft");
        this.isCollapsed = false;
        this.$store.commit("SET_COLLAPSED", false)
      }
    }
    const getInitials = function (name) {
      var parts = name.split("");
      var initials = parts[0];
      return initials;
    };
    this.getRoute = this.$route.fullPath.split("/")[4];
    getAuthUser().then((user) => {
      getUser(user.uid).then((user) => {
        this.name = user.fullName;
        this.initals = getInitials(this.name);
        this.color = `background-color: ${user.coloruserSetActive};`;
      });
    });
    // if(localStorage.sidebarCollapedOpen === "true") {
    //   this.collapsed = false;
    //   mapActions("setCollapsed", {
    //     isCollapsed: false
    //   })
    // }
  },
};
</script>