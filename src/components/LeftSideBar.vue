<template>
  <div>
    <div id="aside-left" class="border-r">
      <!-- Click away -->
      <div
        v-if="workspaceDropdown"
        @click="workspaceDropdown = false"
        class="clickaway bg-none fixed top-0 w-full h-screen"
      ></div>
      <!-- Click away -->
      <aside
        :class="[
          { 'w-12': isCollapsed },
          'fixed shadow-none left-0 top-14 z-50  border-r border-gray-100 dark:bg-gray-800 h-screen',
        ]"
      >
      <div
            v-if="isCollapsed"
            @click="openCollapsedMenu"
            :class="[
              { 'mt-6': isCollapsed },
              'collapsed-icon-open cursor-pointer absolute -top-2 z-50 -right-3   hover:bg-main-normal hover:text-white flex items-center justify-center rounded-full w-6 h-6 bg-white border border-gray-200',
            ]"
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
        <!-- First Left Sidebar starts -->
        <div
          class="'first-left hidden shadow-none w-20 bg-main-veryDark border-r border-gray-100 dark:bg-gray-800 h-screen fixed top-0 z-50',"
        >
          
          <!-- First Left Sidebar Contents starts -->
          <div
            class="flex flex-col items-center relative z-50 h-screen sidebar-links"
          >
            <div class="logo-hdd-top w-full p-3 mt-1">
              <img
                src="https://res.cloudinary.com/serveryguken/image/upload/v1622134200/LogSnap/logo/LogSnap-icon_j9b15w_lvjemh.svg"
                alt="workspace-logo"
                class="w-8 h-8 block ml-auto mr-auto"
              />
            </div>
            <div class="mt-3">
              <div
                class="workspaces-icon-route folder-icon-main tooltip relative z-50 mt-2 cursor-pointer"
              >
                <router-link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </router-link>
                <div
                  class="workspace-folder-icon-tooltip tooltip-text bg-gray-800 text-white rounded"
                  style="font-size: 0.9rem"
                >
                  <p class="ml-1">Workspace</p>
                </div>
              </div>
            </div>
           
          </div>
          <!-- First Left Sidebar Contents ends-->
        </div>
        <!-- First Left Sidebar ends -->
        <!-- Second Left Sidebar starts -->
        <div
          class="collapsedSidebar border-r bg-ghostsmoke border-gray-100 pt-2 w-60 h-screen fixed top-14 z-0"
          ref="collapsedSidebar"
        >
         <!-- Workspace Dropdwon Container starts -->
          <div class="flex wkspace-dropdown items-center w-full">
            <div
              @click="showWorkspaceDropdown"
              class="workspace-dropdown select-none cursor-pointer  w-full relative"
            >
              <div
                class="flex items-center justify-between pl-4 py-1 px-2"
              >
                <div
                  class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                >
                  <span class="font-semibold">{{ workspaceName }}</span>
                  <h1 class="text-sm">Workspace</h1>
                </div>
                <svg
                  v-if="!workspaceDropdown"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-if="workspaceDropdown"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                
              </div>
               <!-- Workspace Dropdwon Container ends -->
                 <!-- Workspace Dropdown Container Contents  starts -->
              <div
                v-if="workspaceDropdown"
                class="workspace-dropdown-list select-none bg-white absolute z-0 mt-2 rounded-lg ml-4 p-2 animate-slidedown-main w-80"
              >
                <div class="workspace-search flex items-center">
                  <div class="relative w-full">
                    <input
                      @keyup="startSearch($event.target)"
                      type="text"
                      ref="searchBox"
                      v-model="search"
                      class="w-full bg-white text-gray-600 text-sm border border-gray-100 p-2 focus:outline-none focus:border-main-normal rounded placeholder-gray-600"
                      placeholder="Search for a workspace"
                    />
                  </div>
                  <div
                    class="absolute top-3 right-3 cursor-pointer hover:bg-gray-100 rounded p-1"
                  >
                    <div class="" v-if="!searching" ref="workspaceSearchIcon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div
                      class="animate-spin-icon"
                      ref="clearSearchIcon"
                      v-if="searching"
                      @click="clearSearch"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  class="workspaces-list mt-2 mb-2 relative max-h-56 overflow-auto"
                >
                  <h1 class="text-sm text-gray-400 font-nedium mt-3 p-2">
                    workspaces
                  </h1>
                  <ul class="mt-1">
                    <li
                      @click="gotoworkspace($event.target)"
                      v-for="workspace in filteredworkspaces"
                      :key="workspace.id"
                      :id="workspace.path"
                      class="text-sm text-gray-800 font-normal hover:bg-gray-100 rounded p-2 cursor-pointer"
                    >
                      {{ workspace.name }}
                    </li>
                  </ul>
                </div>
                <div
                  class="add-workspace border-t mt-1 border-gray-300 flex justify-between"
                >
                  <div
                    @click="openWorkspaceModal"
                    class="add-workspace-icon flex items-center p-2 mt-2 cursor-pointer hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <h1 class="ml-1 text-sm text-gray-600">Add workspace</h1>
                  </div>
                  <router-link
                    to="/"
                    class="add-workspace-icon flex items-center p-2 mt-2 cursor-pointer hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    <h1 class="ml-1 text-sm text-gray-600">View all</h1>
                  </router-link>
                </div>
              </div>
              <!-- Workspace Dropdown Container Contents ends -->
              <!-- Second Sidebar Links starts -->
              <div class="links-con pl-1" v-if="!isCollapsed">
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
                </ul>
              </div>
            
              <!-- Second Sidebar Links ends -->
             
            </div>
          </div>

          <div
            v-if="!isCollapsed"
            @click="closeCollapsedMenu"
            class="collapsed-icon-close cursor-pointer absolute top-0 z-50 bg-white -right-3 mt-5 hover:bg-main-normal hover:text-white flex items-center justify-center rounded-full w-6 h-6 border border-gray-200"
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
        </div>
        <!-- Second Left Sidebar ends-->
      </aside>
    </div>
    <!-- <div class="dash-mb-icon-menu flex items-center cursor-pointer ml-4">
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
      <aside class="border-r dark:bg-gray-800 h-screen">
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
    </div> -->
    <!-- Create Workspace Modal starts -->
    <div class="create-workspace-modal" v-if="workspaceModalOpened">
      <div class="modal">
        <div class="modal-contents">
          <div class="fixed z-50 inset-0">
            <div
              class="flex items-end cr-is-top justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
              <div
                class="fixed inset-0 overflow-x-auto transition-opacity"
                aria-hidden="true"
              >
                <div
                  class="absolute inset-0 bg-gray-500 opacity-75"
                  @click="clearWorkspaceModalForm"
                ></div>
              </div>

              <!-- This element is to trick the browser into centering the modal contents. -->
              <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
              >
              <div
                class="inline-block cr-modal align-bottom w-5/6 bg-white rounded-xl text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg">
                  <div
                    class="create-workspace-hd-flex flex items-center justify-between"
                  >
                    <h1 class="text-3xl font-medium">Create workspace</h1>
                    <div
                      @click="clearWorkspaceModalForm"
                      class="create-workspace-modal-close round-circle cursor-pointer hover:bg-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="create-workspace-details mt-4">
                    <h1 class="mb-2">Workspace name</h1>
                    <input
                      type="text"
                      ref="workspaceName"
                      class="p-2 border border-gray-200 w-full focus:outline-none focus:ring-1 focus:ring-main-normal rounded-sm"
                      value="New workspace"
                      placeholder="Choose a name for your workspace"
                    />
                    <input
                      type="text"
                      ref="workspaceDescription"
                      class="p-2 mt-2 border border-gray-200 w-full focus:outline-none focus:ring-1 focus:ring-main-normal rounded-sm"
                      placeholder="What is your workspace about?"
                    />
                  </div>
                  <div class="create-workspace-modal-footer">
                    <h1 class="mt-4 text-sm text-gray-600">
                      A better way to organize your work.
                    </h1>
                  </div>
                  <div
                    class="create-workspace-modal-buttons button-flex mt-6 flex justify-end"
                  >
                    <div class="button-cancel mr-4">
                      <button
                        @click="clearWorkspaceModalForm"
                        class="outline-none focus:outline-none hover:bg-gray-100 p-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="button-create">
                      <button
                        v-if="!spinner"
                        @click="createWorkspace"
                        class="text-white bg-main-normal outline-none focus:outline-none p-2 rounded hover:opacity-80"
                      >
                        Create workspace
                      </button>
                      <div
                        v-if="spinner"
                        class="relative spn-b form-btn w-14 block ml-auto"
                      >
                        <div
                          class="pr-spinner outline-none focus:outline-none rounded bg-main-normal text-white hover:opacity-90"
                          ref="crSpinner"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Create Workspace Modal ends -->
  </div>
</template>
<script>
import {
  getUser,
  getAuthUser,
  getWorkspace,
  generateUID,
  createWorkspace,
} from "../config/functions";
import { mapActions, mapGetters } from "vuex";
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
      search: "",
      workspaces: [],
      workspaceName: this.$route.fullPath.split("/")[2].replace(/%20/g, " "),
      searchBox: "",
      workspaceDropdown: false,
      searching: false,
      projID: generateUID(),
      workspaceModalOpened: false,
      spinner: false,
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
      this.workspaceDropdown = false;
      this.searching = false;
      this.$store.commit("SET_COLLAPSED", true);
    },
    openCollapsedMenu() {
      this.$refs.collapsedSidebar.classList.remove("animate-slideToLeft");
      this.isCollapsed = false;
      localStorage.sidebarCollasped = false;
      this.$store.commit("SET_COLLAPSED", false);
    },
    showWorkspaceDropdown() {
      if (this.workspaceDropdown === true) {
        this.workspaceDropdown = false;
        this.searching = false;
        this.search = "";
      } else {
        this.workspaceDropdown = true;
        this.search = "";
      }
    },
    openWorkspaceModal() {
      this.workspaceModalOpened = true;
      this.workspaceDropdown === false;
    },
    startSearch() {
      this.searching = true;
      if (this.$refs.searchBox.value === "") {
        this.searching = false;
        setTimeout(() => {
          this.$refs.workspaceSearchIcon.classList.add(
            "animate-spin-icon-small"
          );
        }, 100);
      }
    },
    clearSearch() {
      this.search = "";
      this.searching = false;
      setTimeout(() => {
        this.$refs.workspaceSearchIcon.classList.add("animate-spin-icon-small");
      }, 100);
    },
    createWorkspace() {
      const workspaceData = {
        ID: this.projID,
        name: this.$refs.workspaceName.value,
        description: this.$refs.workspaceDescription.value,
        path: "",
      };
      createWorkspace(workspaceData).then((data) => {
        data
          .update({
            path: data.id,
          })
          .then(() => {
            this.spinner = true;
            setTimeout(() => {
              this.clearWorkspaceModalForm();
            }, 500);
          });
      });
      console.log("workspaceData: ", workspaceData);
    },
    clearWorkspaceModalForm() {
      this.search = "";
      this.workspaceDropdown = false;
      this.$refs.workspaceName.value = "";
      this.$refs.workspaceDescription.value = "";
      this.spinner = false;
      this.workspaceModalOpened = false;
    },
    gotoworkspace(workspace) {
      const origin = location.origin;
      const path = workspace.id;
      const workspaceName = workspace.innerText;
      const url = `${origin}/workspace/${workspaceName}/issues/${path}`;
      location.href = url;
    },
  },
  mounted() {
    if (localStorage.sidebarCollasped) {
      if (localStorage.sidebarCollasped === "true") {
        this.$refs.collapsedSidebar.classList.add("animate-slideToLeft");
        this.isCollapsed = true;
        this.$store.commit("SET_COLLAPSED", true);
      } else {
        this.$refs.collapsedSidebar.classList.remove("animate-slideToLeft");
        this.isCollapsed = false;
        this.$store.commit("SET_COLLAPSED", false);
      }
    }
    // const getInitials = function (name) {
    //   var parts = name.split("");
    //   var initials = parts[0];
    //   return initials;
    // };
    // this.getRoute = this.$route.fullPath.split("/")[4];
    // getAuthUser().then((user) => {
    //   getUser(user.uid).then((user) => {
    //     this.name = user.fullName;
    //     this.initals = getInitials(this.name);
    //     this.color = `background-color: ${user.coloruserSetActive};`;
    //   });
    // });
  },
  computed: {
    ...mapGetters(["getWorkspace"]),
    filteredworkspaces() {
      return this.workspaces.filter((workspace) => {
        return workspace.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    getWorkspace();
  },
  watch: {
    "$store.getters.getWorkspace": function (data) {
      this.workspaces = data;
    },
    workspaceModalOpened(data) {
      if (data === true) {
        this.search = "";
        this.searching = false;
        setTimeout(() => {
          this.$refs.workspaceName.focus();
        }, 0);
      }
    },
    workspaceDropdown(data) {
      if (data === true) {
        setTimeout(() => {
          this.$refs.searchBox.focus();
        }, 0);
      }
    },
  },
};
</script>