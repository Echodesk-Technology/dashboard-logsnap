<template>
  <div>
    <div id="page-issues">
      <LeftCard v-if="mobile" />
      <Dashboard>
        <div class="issue-main h-screen space-mb-sides">
          <div class="issues-contents">
            <div class="open-closed-filter">
              <!-- <div class="o-c flex items-center">
                <div class="o">
                  <button
                    @click="isFilteredOpenShow()"
                    ref="openBtn"
                    class="text-xs px-2 py-1 border border-gray-300 text-gray-300 outline-none focus:outline-none"
                  >
                    OPEN<span ref="openCount">(48)</span>
                  </button>
                </div>
                <div class="c">
                  <button
                    @click="isFilteredClosedShow()"
                    ref="closedBtn"
                    class="text-xs px-2 py-1 border border-l-0 border-gray-300 text-gray-300 outline-none focus:outline-none"
                  >
                    CLOSED<span ref="closedCount">(196)</span>
                  </button>
                </div>
              </div> -->
            </div>
            <div class="issue-modal" v-if="openIssueModal">
              <div class="modal">
                <div class="modal-contents">
                  <div class="fixed z-50 inset-0 overflow-y-auto">
                    <div
                      class="flex items-end cr-is-top justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                    >
                      <div
                        class="fixed inset-0 overflow-x-auto transition-opacity"
                        aria-hidden="true"
                      >
                        <div
                          class="absolute inset-0 bg-gray-500 opacity-75"
                        ></div>
                      </div>

                      <!-- This element is to trick the browser into centering the modal contents. -->
                      <span
                        class="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                        >&#8203;</span
                      >
                      <div
                        class="inline-block cr-modal align-bottom w-5/6 bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                      >
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div class="pl-1 pr-1">
                            <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                class="text-lg leading-6 font-medium text-gray-700"
                                id="modal-headline"
                              >
                                Create Issue
                              </h3>
                              <div class="mt-2">
                                <p class="text-xs text-gray-600">
                                  Summary<span class="text-red-500"
                                    >&#x2a;</span
                                  >
                                </p>
                              </div>
                              <div class="mt-0 w-full">
                                <input
                                  type="text"
                                  v-model="issue.summary"
                                  required
                                  ref="summary"
                                  class="bg-gray-100 text-sm py-1 text-gray-600 rounded-sm w-full focus:outline-none pl-2 focus:bg-white focus:ring-1 focus:ring-main-normal appearance-none"
                                />
                                <p
                                  class="text-xs text-red-600 hidden"
                                  ref="summaryError"
                                >
                                  Summary is required
                                </p>
                              </div>
                              <div class="dsc-group mt-1">
                                <div class="mt-2">
                                  <p class="text-xs text-gray-600">
                                    Description<span class="text-red-500"
                                      >&#x2a;</span
                                    >
                                  </p>
                                </div>
                                <div class="mt-o">
                                  <div class="cnt-area w-full">
                                    <textarea
                                      name="content"
                                      v-model="issue.description"
                                      ref="description"
                                      required
                                      id="descContent"
                                      class="bg-gray-100 w-full p-1 h-30 text-sm max-h-56 focus:outline-none outline-none appearance-none"
                                    >
                                    </textarea>
                                  </div>
                                  <p
                                    class="text-xs text-red-600 hidden"
                                    ref="descriptionError"
                                  >
                                    Description is required
                                  </p>
                                </div>
                              </div>
                              <div class="label-group mt-1">
                                <div class="mt-o">
                                  <div class="">
                                    <p class="text-xs text-gray-600">
                                      Label<span class="text-red-500"
                                        >&#x2a;</span
                                      >
                                    </p>
                                  </div>
                                  <input
                                    type="text"
                                    ref="label"
                                    v-model="issue.labels"
                                    @input="labelTyped = true"
                                    class="bg-gray-100 text-sm py-1 text-gray-600 rounded-sm w-full focus:outline-none pl-2 focus:bg-white focus:ring-1 focus:ring-main-normal appearance-none"
                                    @keydown.enter="addTag"
                                  />
                                  <div
                                    class="tags-con relative flex flex-wrap mt-2 pl-0"
                                  >
                                    <div
                                      class="mr-1 mt-1 bg-main-light opacity-80 text-xs rounded-lg px-1 flex items-center"
                                      v-for="(tag, index) in issue.tags"
                                      :key="index"
                                    >
                                      <p
                                        class="overflow-ellipsis"
                                        style="font-size: 0.6rem"
                                      >
                                        {{ tag }}
                                      </p>
                                      <div class="cancel-label">
                                        <svg
                                          @click="removeLabel(tag)"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          class="w-2 cursor-pointer"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                    <div
                                      class="label-suggest absolute z-50 shadow-sm border border-gray-100 top-0 w-full bg-white p-1"
                                      v-if="labelTyped"
                                    >
                                      <div class="label-textx bg-gray-200 p-1">
                                        <div class="text-xs flex">
                                          <p>{{ issue.labels }}</p>
                                          <h1 class="text-xs ml-1">
                                            Add Label
                                          </h1>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="drop-file drop-zone upload mt-2">
                                <p class="text-xs text-gray-600">Attachment</p>
                                <div
                                  class="flex justify-center mt-2 border-2 py-2 border-gray-200 border-dashed"
                                >
                                  <p class="text-xs">
                                    <span
                                      ><button
                                        @click="handleFileUpload"
                                        class="text-xs text-main-normal focus:outline-none outline-none bg-white hover:underline"
                                      >
                                        Upload
                                      </button></span
                                    >
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  class="input-dsnone"
                                  ref="uploadBtn"
                                  name="isFileName"
                                  accept="image/x-png,image/gif,image/jpeg"
                                />
                              </div>
                              <div
                                class="selectedFile w-full -mt-2"
                                v-if="upLoading"
                              >
                                <div class="flex justify-between items-center">
                                  <div class="file-preview">
                                    <div class="flex">
                                      <img
                                        :src="attachmentURL"
                                        alt=""
                                        ref="selectedfile"
                                        class="w-6"
                                      />
                                      <p
                                        ref="isFileName"
                                        class="ml-1 text-xs"
                                      ></p>
                                    </div>
                                    <div class="flex justify-between">
                                      <div class="upload-progress ml-7">
                                        <p v-if="upLoading" class="text-xs">
                                          {{ uploadValue.toFixed() + "%" }}
                                        </p>
                                        <progress
                                          :value="uploadValue"
                                          class="appearance-none w-96 h-1"
                                        ></progress>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="file-size cancel-con flex items-center -ml-8"
                                  >
                                    <p class="text-xs mr-1">{{ fileSize }}</p>
                                    <div
                                      class="delete-btn hover:bg-gray-200 cursor-pointer rounded-2xl p-1"
                                      v-if="upLoading"
                                      @click="deleteFile"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="w-5 text-gray-600 cursor-pointer"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="status-select mt-2 w-full">
                                <p class="text-xs text-gray-600">Status</p>
                                <div class="selecxt">
                                  <select
                                    v-model="issue.status"
                                    class="w-2/4 bg-gray-100 py-1 text-sm rounded-sm border focus:outline-none outline-none focus:bg-white focus:border=gray-200"
                                  >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Fixed">Fixed</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </div>
                              </div>
                              <div class="status-select mt-3 w-full">
                                <div class="selecxt">
                                  <p class="text-xs text-gray-600">Priority</p>
                                  <select
                                    v-model="issue.priority"
                                    class="w-2/4 bg-gray-100 py-1 text-sm rounded-sm border focus:outline-none outline-none focus:bg-white focus:border=gray-200"
                                  >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                  </select>
                                </div>
                              </div>
                              <!-- <div class="date-select mt-3">
                        <p class="text-xs text-gray-600">Created At</p>
                        <p class="text-sm text-gray-600">{{ issue.createdAt }}</p>
                      </div> -->
                            </div>
                          </div>
                        </div>
                        <div
                          class="bg-gray-50 px-4 py-3 w-full flex justify-end"
                        >
                          <button
                            @click="createIssue"
                            type="button"
                            class="w-16 block rounded-md border px-1 py-1 text-xs bg-main-normal font-medium text-white hover:bg-main-dark focus:outline-none outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Create
                          </button>
                          <button
                            @click="clearIssueForm"
                            type="button"
                            class="w-16 block rounded-md px-1 py-1 text-xs bg-none font-medium text-main-normal hover:text-main-dark focus:outline-none outline-none sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="issueCreated"
              class="fixed z-50 top-14 right-0 bg-white px-3 py-3 shadow rounded-lg mr-5 animate-slide"
            >
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-4 text-green-600"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-gray-600 text-sm ml-1">
                  Issue created successfully
                </p>
              </div>
            </div>


            <div class="issues-comp">
              <IssuesData />
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  </div>
</template>
<script>
import Dashboard from "../components/Dashboard";
import LeftCard from "./LeftCard";
import IssuesData from "../components/IsuuesData";
import {
  auth,
  db,
  getUser,
  getAuthUser,
  uploadFile,
  createIssue,
} from "../config/functions";
export default {
  name: "Issues",
  data() {
    return {
      mobile: false,
      isFilterOpen: true,
      isFilterClosed: false,
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
    Dashboard,
    LeftCard,
    IssuesData,
  },
  methods: {
    getFormattedDate() {
      const todayTime = new Date();
      const month = todayTime.getMonth() + 1;
      const day = todayTime.getDate();
      const year = todayTime.getFullYear();
      return month + "/" + day + "/" + year;
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
    // showMbMenu: function () {
    //   this.$refs.mbNavOpen.classList.add("animate-spin");
    //   setTimeout(() => {
    //     this.$refs.mbNavOpen.classList.remove("animate-spin");
    //     document.getElementById("aside-left").style.display = "block";
    //   }, 100);
    // },
    // hideMbMenu: function () {
    //   this.$refs.mbNavClose.classList.add("animate-spin");
    //   setTimeout(() => {
    //     this.$refs.mbNavClose.classList.remove("animate-spin");
    //     this.open = false;
    //   }, 100);
    // },
    // isFilteredOpenShow() {
    //   this.$refs.openBtn.classList.add("active");
    //   this.$refs.closedBtn.classList.remove("active");
    //   this.isFilterOpen = true;
    //   this.isFilterClosed = false;
    //   const isFiltredState = "isFilterOpen";
    //   localStorage.isFiltredState = isFiltredState;
    // },
    // isFilteredClosedShow() {
    //   this.$refs.openBtn.classList.remove("active");
    //   this.$refs.closedBtn.classList.add("active");
    //   this.$refs.openBtn.classList.add("border-r-0");
    //   this.isFilterClosed = true;
    //   this.isFilterOpen = false;
    //   const isFiltredState = "isFilterClosed";
    //   localStorage.isFiltredState = isFiltredState;
    // },
  },
  // mounted() {
  //   setTimeout(() => {
  //     switch (localStorage.isFiltredState) {
  //       case "isFilterOpen":
  //         this.isFilteredOpenShow();
  //         break;
  //       case "isFilterClosed":
  //         this.isFilteredClosedShow();
  //         break;
  //       default:
  //         this.isFilteredOpenShow();
  //         break;
  //     }
  //   }, 1000);
  // },
};
</script>