<template>
  <div>
    <div class="loader-comp">
      <Loader v-if="isLoading" />
    </div>
    <div id="page-dashboard" v-if="!isLoading">
      <div
        class="dash-top-flex  flex items-center fixed w-full border-b bg-white"
      >
        

        <div
          class="dash-header-search ml-2 hidden justify-between items-center space-mb-sides p-1 w-full"
        >
          <div class="search-main w-full py-2">
            <div
              class="dash-h-con flex items-center rounded bg-gray-100 py-1 px-2 w-48 max-w-full"
            >
              <div class="search-icon border-r ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 text-gray-400"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <span
                class="px-2 py-1 rounded-sm bg-gray-200 text-xs text-gray-500"
                >Issues</span
              >
              <div class="search-input w-full ml-2">
                <input
                  type="text"
                  placeholder="Search..."
                  class="text-sm text-gray-500 font-medium bg-gray-100 placeholder-gray-500 w-full max-w-full outline-none focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div class="mb-create-issue">
            <button
              class="bg-main-dark outline-none rounded px-1 py-1 focus:outline-none"
              @click="openIssueModal = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          <div class="add-is tooltip">
            <div class="flex">
              <button
                @click="openIssueModal = true"
                class="bg-main-normal rounded px-5 py-1 outline-none focus:outline-none text-white h-8"
              >
                Create
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 ml-3 text-gray-600 cursor-pointer"
                @click="openAccModal"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <!-- <div class="tooltip-text absolute top-0 right-4 mt-10 rounded flex  items-center justify-center bg-gray-800 px-1 py-1">
                  <span class="text-xs text-white" style="font-size:10px">Create issue</span>
                </div> -->
          </div>
          <div
            class="absolute z-50 right-0 mr-4 open-cc w-60 bg-white border-t shadow rounded-sm p-2 animate-slide"
            style="margin-top: 11.1rem"
            v-if="openAccAction"
          >
            <div class="gtpsdp">
              <!-- <router-link
                to="/settings/account/profile"
                class="acc0slk px-4 py-2 flex items-center hover:bg-gray-100"
              >
                <div class="text-gray-600">Account Settings</div>
                <div class="flfs ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 text-gray-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </router-link> -->

              <div class="prtd">
                <router-link
                  to="/"
                  class="flex px-4 py-2 mt-3 hover:bg-gray-100"
                >
                  <div class="text-gray-600">Projects</div>
                </router-link>
              </div>
              <button
                class="lg-btn hover:bg-gray-100 mt-3 w-full text-left px-4 py-2 outline-none focus:outline-none"
                @click="logOut"
              >
                <span class="outline-none focus:outline-none text-gray-600">
                  Log out
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
import Loader from "./Loader";
import LeftSideBar from "../components/LeftSideBar";
import {
  auth,
  db,
  getUser,
  getAuthUser,
  uploadFile,
  createIssue,
} from "../config/functions";
export default {
  name: "Dashboard",
  data() {
    return {
      isScrolling: false,
      componetLoaded: false,
      enabled: false,
      isLoading: true,
      compImage: true,
      initals: "",
      color: "",
      open: false,
      projectName: "",
      openAccAction: false,
      openIssueModal: false,
      content: "",
      name: "",
      tinyAPIKey: "",
      labelTyped: false,
      isFileName: "",
      fileSize: "",
      attachmentURL: "",
      uploadValue: 0,
      upLoading: false,
      issue: {
        projectName: this.$route.fullPath.split("/")[2],
        tags: [],
        attachmentURL: null,
        status: "",
        priority: "",
        statusColor: "",
        statusBackgroundColor: "",
        priorityColor: "",
        priorityBackgroundColor: "",
        timestamp: Date.now(),
        createdAt: null,
        targetDate: null,
      },
      getRoute: this.$route.fullPath.split("/")[4].split("?")[0],
      issueCreated: false,
    };
  },
  components: {
    Loader,
    LeftSideBar,
  },
  methods: {
    getFormattedDate() {
      const todayTime = new Date();
      const month = todayTime.getMonth() + 1;
      const day = todayTime.getDate();
      const year = todayTime.getFullYear();
      return month + "/" + day + "/" + year;
    },
    showMbMenu: function () {
      this.open = true;
    },
    hideMbMenu: function () {
      this.open = false;
    },
    openAccModal() {
      if (this.openAccAction === true) {
        this.openAccAction = false;
      } else {
        this.openAccAction = true;
      }
    },
    logOut() {
      auth.signOut().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    addTag() {
      const val = this.issue.labels;
      if (val === "") {
        return false;
      }
      this.issue.tags.push(val);
      this.resetInput();
      this.labelTyped = false;
      // const array = this.issue.tags
      // const duplicates  = array.filter((e, i, a) => a.indexOf(e) !== i)
      // this.$refs.label.addEventListener('keypress',  () =>{
      //   if(array === duplicates) {
      //     this.resetInput();
      //   return false
      // }
      // })
    },
    removeLabel(istag) {
      const removeItem = this.issue.tags.filter((tag) => tag !== istag);
      this.issue.tags = removeItem;
    },
    resetInput() {
      this.$refs.label.value = "";
      this.issue.labels = "";
    },
    handleFileUpload() {
      this.$refs.uploadBtn.click();
      this.$refs.uploadBtn.addEventListener("change", (e) => {
        if (e.target.files) {
          this.upLoading = true;
        }
        const fullPath = e.target.value;
        if (fullPath) {
          const startIndex =
            fullPath.indexOf("\\") >= 0
              ? fullPath.lastIndexOf("\\")
              : fullPath.lastIndexOf("/");
          let isFileName = fullPath.substring(startIndex);
          if (isFileName.indexOf("\\") === 0 || isFileName.indexOf("/") === 0) {
            isFileName = isFileName.substring(1);
          }
          localStorage.isFileName = isFileName;
          setTimeout(() => {
            this.$refs.isFileName.innerText = isFileName;
          }, 0);
        }
        this.fileSize = e.target.files[0].size;
        const uploadRef = uploadFile(
          `${this.getRoute}/${this.isFileName}`,
          (this.isFileName = e.target.files[0])
        );
        uploadRef.on(
          "state_changed",
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            error;
          },
          () => {
            this.uploadValue = 100;
            uploadRef.snapshot.ref.getDownloadURL().then((url) => {
              this.attachmentURL = url;
              this.issue.attachmentURL = url;
              localStorage.isFileName = "";
            });
          }
        );
      });
    },
    deleteFile() {
      this.upLoading = false;
      this.$refs.uploadBtn.value = "";
      localStorage.isFileName = "";
    },
    createIssue() {
      this.enabled = true;
      if (this.enabled) {
        if (this.$refs.summary.value === "") {
          this.$refs.summaryError.style.display = "block";
          this.$refs.summary.classList.add("border", "border-red-500");
          this.$refs.summary.classList.remove("focus:ring-1");
          return false;
        } else {
          this.$refs.summaryError.style.display = "none";
          this.$refs.summary.classList.remove("border", "border-red-500");
          this.$refs.summary.classList.add("focus:ring-1");
        }
        if (this.$refs.description.value === "") {
          this.$refs.descriptionError.style.display = "block";
          this.$refs.description.classList.add("border", "border-red-500");
          this.$refs.description.classList.remove("focus:ring-1");
          return false;
        } else {
          this.$refs.descriptionError.style.display = "none";
          this.$refs.description.classList.remove("border", "border-red-500");
          this.$refs.description.classList.add("focus:ring-1");
        }
        if (this.issue.status === "Open") {
          this.issue.statusColor = "text-white";
          this.issue.statusBackgroundColor = "bg-green-400";
        }
        if (this.issue.status === "In Progress") {
          this.issue.statusColor = "text-status-inProgressDark";
          this.issue.statusBackgroundColor = "bg-status-inProgressLight";
        }
        if (this.issue.status === "Fixed") {
          this.issue.statusColor = "text-green-500";
          this.issue.statusBackgroundColor = "bg-green-200";
        }
        if (this.issue.status === "Closed") {
          this.issue.statusColor = "text-red-500";
          this.issue.statusBackgroundColor = "bg-red-200";
        }
        if (this.issue.priority === "Low") {
          this.issue.priorityColor = "text-white";
          this.issue.priorityBackgroundColor = "bg-yellow-300";
        }
        if (this.issue.priority === "Medium") {
          this.issue.priorityColor = "text-white";
          this.issue.priorityBackgroundColor = "bg-green-400";
        }
        if (this.issue.priority === "High") {
          this.issue.priorityColor = "text-white";
          this.issue.priorityBackgroundColor = "bg-red-600";
        }
        if (
          this.$refs.summary.value !== "" &&
          this.$refs.description.value !== ""
        ) {
          createIssue(this.getRoute, this.issue)
            .then((docRef) => {
              docRef.update({
                id: docRef.id,
                projectid: this.getRoute,
              });
            })
            .then(() => {
              this.issue.tags = [];
              this.issue.summary = "";
              this.issue.description = "";
              this.issue.statusColor = "";
              this.issue.statusBackgroundColor = "";
              this.issue.priorityColor = "";
              this.issue.priorityBackgroundColor = "";
              this.issue.labels = "";
              this.issue.status = "";
              this.issue.priority = "";
              this.labelTyped = false;
              this.$refs.summary.value = "";
              this.$refs.description.value = "";
              this.$refs.label.value = "";
              this.openIssueModal = false;
              this.$refs.uploadBtn.value = "";
              this.upLoading = false;
              this.issueCreated = true;
              setTimeout(() => {
                this.issueCreated = false;
                this.$router.replace(this.$route.path);
              }, 1000);
            })

            .catch((error) => {
              error;
            });
        }
      }
    },
    clearIssueForm() {
      if (this.issue !== []) {
        if (
          confirm(
            "You are currently creating an issue, any changes you made would not be saved"
          )
        ) {
          document.getElementsByTagName("input").forEach((input) => {
            input.value === "";
          });
          this.issue.tags = [];
          this.openIssueModal = false;
          this.issue.summary = "";
          this.issue.description = "";
          this.issue.statusColor = "";
          this.issue.statusBackgroundColor = "";
          this.issue.priorityColor = "";
          this.issue.priorityBackgroundColor = "";
          this.issue.labels = "";
          this.labelTyped = false;
          this.issue.status = "";
          this.issue.priority = "";
          this.$refs.summary.value = "";
          this.$refs.description.value = "";
          this.$refs.label.value = "";
          this.$refs.uploadBtn.value = "";
          this.upLoading = false;
          this.$route.query.modalOpen = false;
        } else {
          return false;
        }
      }
    },
    // generateColor(background, color, type) {
    //   switch (type) {
    //     case "Open":
    //       return {
    //         color: "text-white",
    //         background: "bg-green-400",
    //       };
    //     case "In Progress":
    //       color = "text-status-inProgressDark";
    //       background = "bg-status-inProgressLight";
    //       break;
    //     case "Fixed":
    //       color = "text-green-500";
    //       background = "bg-green-200";
    //       break;
    //     case "Closed":
    //       color = "text-red-500";
    //       background = "bg-red-200";
    //       break;
    //     case "Low":
    //       color = "text-white";
    //       background = "bg-yellow-300";
    //       break;
    //     case "Medium":
    //       color = "text-white";
    //       background = "bg-green-400";
    //       break;
    //     case "High":
    //       color = "text-white";
    //       background = "bg-red-600";
    //       break;
    //   }
    // },
  },
  mounted() {
    this.issue.createdAt = this.getFormattedDate();
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
    this.isLoaded = true;
    setTimeout(() => {
      this.isLoading = false;
      localStorage.isLoaded = true;
    }, 1000);
    if (localStorage.isLoaded === "true") {
      this.isLoading = false;
    }
  },
  created() {
    window.addEventListener('beforeunload', function(event) {
         localStorage.isLoaded = false;
      })
  }
};
</script>