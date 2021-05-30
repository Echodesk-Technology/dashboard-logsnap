<template>
  <div>
    <div id="issuedata">
      <div
        class="issues-list mt-4 hover:bg-gray-100 cursor-pointer px-1 py-2 rounded ml-6"
        v-for="issue in getIssuesDatas"
        :key="issue.id"
      >
        <div
          @click="openIssueView(issue.id)"
          class="grid grid-cols-5 items-center"
        >
          <div class="issues-flex flex items-center">
            <div class="issue-short-desc ml-2 max-w-xs w-52 whitespace-nowrap">
              <h1
                class="text-gray-800 font-medium ml-1 overflow-hidden overflow-ellipsis"
              >
                {{ issue.summary }}
              </h1>
            </div>
          </div>
          <div class="tag-con status-con ml-2 col-span-1 col-start-3">
            <Tag
              :status="issue.status"
              :color="issue.statusColor"
              :backgroundColor="issue.statusBackgroundColor"
              size="p-4"
            />
          </div>
          <div class="priority col-start-4">
            <Tag
              :status="issue.priority"
              :color="issue.priorityColor"
              :backgroundColor="issue.priorityBackgroundColor"
              size="p-4"
            />
          </div>
          <div class="aisde-fl grid grid-cols-2 items-center col-start-5">
            <div class="-ml-1 mt-1 created">
              <span class="text-xs text-gray-600">
                {{ issue.createdAt }} <br />
              </span>
            </div>
            <!-- <div class="created-at mr-5">
            <h1 class="text-sm">{{ issue.createdAt }}</h1>
          </div> -->
            <!-- <div class="relative action mr-4 col-start-6 col-end-5">
            <button @click="showAction()" class="focus:outline-none outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-4 text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
            <div class="action-card-con absolute right-0 top-4 mt-3 z-50 animate-slide" v-if="actionClicked">
              <div
                class="action-card bg-white shadow-xl border border-gray-100 rounded-lg p-4 w-24"
              >
                <div class="card-flex flex items-center">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <h1 class="text-sm ml-2">View</h1>
                </div>

                <div class="card-flex flex items-center mt-2">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <h1 class="text-sm ml-2">Edit</h1>
                </div>

                <div class="card-flex flex items-center mt-2">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <h1 class="text-sm ml-2">Delete</h1>
                </div>
              </div>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      v-if="showIssueView"
      class="show-issue-modal-bg bg-gray-500 opacity-75 w-full h-screen fixed top-0 left-0 z-50"
    ></div> -->
    <div class="modal-issue-view-contents">
      <div
        v-if="showIssueView"
        ref="showIssueViewElement"
        :class="[
          { 'animate-slideFromLeft-05sec': !showIssueView },
          'show-issue-container bg-white w-4/12 shadow-lg h-screen fixed top-0 right-0 z-50 border-l-4 border-gray-200 p-2 animate-slideFromRight-05sec  pb-10',
        ]"
      >
        <div class="show-issue-cancel">
          <div
            @click="closeIssueView"
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
        <div class="issue-view-contents">
          <div class="issue-data mt-5 break-words w-full">
            <div class="flex items-center workspace-icon-name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-main-normal"
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
              <p class="text-gray-500 text-xs capitalize ml-2">
                {{ getIssueData.workspaceName }}
              </p>
            </div>
            <div class="issue-summary w-full mt-3">
              <input
                type="text"
                v-model="getIssueData.summary"
                required
                ref="summary"
                class="p-1 rounded-sm w-full focus:outline-none hover:bg-gray-200 focus:bg-white focus:ring-1 focus:ring-main-normal text-gray-800 font-medium text-lg appearance-none"
              />
              <div class="mt-1 pr-20 px-0">
                <h2 class="text-gray-800 font-semibold mt-3 text-sm p-1">
                  Description
                </h2>
                <textarea
                  name="content"
                  v-model="getIssueData.description"
                  ref="description"
                  required
                  id="descContent"
                  class="w-full h-30 text-sm mt-1 p-1 max-h-32 hover:bg-gray-200 focus:bg-white focus:ring-1 focus:ring-main-normal focus:outline-none outline-none appearance-none rounded-sm"
                >
                </textarea>
              </div>
              <div class="attach mt-3" v-if="attachmentURL">
                <h2 class="text-gray-800 font-semibold text-sm">Attachments</h2>
                <div class="att-img mt-2">
                  <img
                    ref="attachmentURL"
                    class="shadow-sm border border-gray-100 h-40 w-60 rounded-lg"
                    :src="getIssueData.attachmentURL"
                    alt="issue-attachemnt"
                  />
                </div>
              </div>

              <div class="flex items-center label-element mt-4">
                <h1 class="text-gray-800 font-medium text-sm">Label</h1>
                <div class="label-group ml-3" v-if="editEnabled">
                  <div class="relative">
                    <!-- <input
                      type="text"
                      ref="label"
                      v-model="getIssueData.labels"
                      @input="labelTyped = true"
                      @blur="labelTyped = false"
                      class="hover:bg-gray-200 text-sm py-1 max-w-md text-gray-600 rounded-sm w-full focus:outline-none pl-2 focus:bg-white focus:ring-1 focus:ring-main-normal appearance-none"
                      @keydown.enter="addNewTag"
                    /> -->
                    <div class="tags-con flex flex-wrap pl-0">
                      <div
                        class="mr-1 mt-1 bg-main-light opacity-80 text-xs rounded-lg px-1 flex items-center"
                        v-for="(tag, index) in newTags"
                        :key="index"
                      >
                        <p
                          class="overflow-ellipsis"
                          style="font-size: 0.6rem"
                          ref="tag"
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
                            <p>{{ getIssueData.labels }}</p>
                            <h1 class="text-xs ml-1">Add Label</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="side-status mt-5">
                <div class="flex items-center">
                  <h1 class="text-gray-800 font-semibold text-sm">Status</h1>
                  <div class="status-select w-full ml-2">
                    <div class="selecxt">
                      <select
                        ref="status"
                        v-model="getIssueData.status"
                        class="w-2/4 bg-gray-200 py-1 text-sm rounded-sm border focus:outline-none outline-none focus:bg-white focus:border=gray-200"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="side-priority mt-5 mb-5">
                <div class="flex items-center">
                  <h1 class="text-gray-800 font-semibold text-sm">Priority</h1>
                  <div class="prority-select w-full ml-1">
                    <div class="selecxt">
                      <select
                        ref="priority"
                        v-model="getIssueData.priority"
                        class="w-2/4 bg-gray-200 py-1 text-sm rounded-sm border focus:outline-none outline-none focus:bg-white focus:border=gray-200"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 w-full flex justify-end mb-3">
                <button
                  @click="updateIssue(getIssueData.id)"
                  type="button"
                  class="w-16 block rounded-md border px-1 py-1 text-xs bg-main-normal font-medium text-white hover:bg-main-dark focus:outline-none outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  @click="deleteIssue(getIssueData.id)"
                  type="button"
                  class="w-16 block rounded-md px-1 py-1 text-xs bg-none font-medium text-main-normal hover:text-main-dark focus:outline-none outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="issueUpdated"
      class="fixed z-50 top-5 right-0 bg-white px-3 py-3 shadow rounded-lg mr-5 animate-slide"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 text-green-600"
          ref="notiColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-gray-600 text-sm ml-1" ref="notiText">
          Issue updated successfully
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getAuthUser,
  userDB,
  getAllIssues,
  getPath,
  getIssue,
  updateIssue,
  deleteIssue,
} from "../config/functions";

import Tag from "./Tag";
import { mapGetters } from "vuex";
export default {
  name: "IssuesList",
  components: {
    Tag,
  },
  data() {
    return {
      actionClicked: false,
      issues: [],
      getIssueData: [],
      tags: [],
      newTags: [],
      attachmentURL: false,
      editEnabled: true,
      labelTyped: false,
      getRoute: this.$route.fullPath.split("/")[4].split("?")[0],
      workspacePath: this.$route.fullPath.split("/")[4].split("?")[0],
      issuePath: "",
      showIssueView: false,
      issueUpdated: false,
    };
  },
  methods: {
    showAction() {
      if (this.actionClicked === false) {
        this.actionClicked = true;
      } else {
        this.actionClicked = false;
      }
    },
    openIssueView(id) {
      this.showIssueView = true;
      this.issuePath = id;
      // setTimeout(() => { 
      //   const image = this.$refs.attachmentURL;
      //   console.log(image);
      // },100)
      // Get issue data from Database
      getAuthUser().then((user) => {
        const uuser = user;
        const isUserDB = userDB.doc(uuser.uid);
        isUserDB
          .collection("workspace")
          .doc(this.workspacePath)
          .collection("issues")
          .doc(id)
          .get()
          .then((data) => {
            this.getIssueData = data.data();
            const isAttachmentURL = data.data().attachmentURL;
            console.log(isAttachmentURL);
            if(isAttachmentURL) {
              console.log("yes");
            }
            else {
              console.log("no");
            }
          });
      });
      getAuthUser().then((user) => {
        const uuser = user;
        const isUserDB = userDB.doc(uuser.uid);
        isUserDB
          .collection("workspace")
          .doc(this.workspacePath)
          .collection("issues")
          .doc(id)
          .get()
          .then((data) => {
            const oldTags = data.data().tags;
            oldTags.forEach((tag) => {
              this.newTags.push(tag);
            });
          });
      });
    },
    closeIssueView() {
      this.showIssueView = false;
    },
    updateIssue(id) {
      console.log(this.$refs.summary.value);
      const summaryNewValue = this.$refs.summary.value;
      const descriptionNewValue = this.$refs.description.value;
      const statusNewValue = this.$refs.status.value;
      const priorityNewValue = this.$refs.priority.value;
      let statusColor = "";
      let statusBackgroundColor = "";
      let priorityColor = "";
      let priorityBackgroundColor = "";

      if (this.$refs.status.value === "Open") {
        statusColor = "text-white";
        statusBackgroundColor = "bg-green-400";
      }
      if (this.$refs.status.value === "In Progress") {
        statusColor = "text-status-inProgressDark";
        statusBackgroundColor = "bg-status-inProgressLight";
      }
      if (this.$refs.status.value === "Fixed") {
        statusColor = "text-green-500";
        statusBackgroundColor = "bg-green-200";
      }
      if (this.$refs.status.value === "Closed") {
        statusColor = "text-red-500";
        statusBackgroundColor = "bg-red-200";
      }
      if (this.$refs.priority.value === "Low") {
        priorityColor = "text-white";
        priorityBackgroundColor = "bg-yellow-300";
      }
      if (this.$refs.priority.value === "Medium") {
        priorityColor = "text-white";
        priorityBackgroundColor = "bg-green-400";
      }
      if (this.$refs.priority.value === "High") {
        priorityColor = "text-white";
        priorityBackgroundColor = "bg-red-600";
      }

      updateIssue(this.workspacePath, id, {
        summary: summaryNewValue,
        description: descriptionNewValue,
        status: statusNewValue,
        tags: this.newTags,
        priority: priorityNewValue,
        statusColor: statusColor,
        statusBackgroundColor: statusBackgroundColor,
        priorityColor: priorityColor,
        priorityBackgroundColor: priorityBackgroundColor,
      });
      this.issueUpdated = true;
      setTimeout(() => {
        this.showIssueView = false;
      }, 500);
      setTimeout(() => {
        this.issueUpdated = false;
      }, 800);
    },
    deleteIssue(id) {
      if (
        confirm(
          `You are about to delete this issue, ${this.$refs.summary.value}`
        )
      ) {
        deleteIssue(this.workspacePath, id);
        this.issueUpdated = true;
        setTimeout(() => {
          this.$refs.notiColor.classList.remove("text-green-600");
          this.$refs.notiColor.classList.add("text-red-600");
          this.$refs.notiText.textContent = "Issue deleted successfully";
        }, 0);
        setTimeout(() => {
          this.showIssueView = false;
        }, 500);
        setTimeout(() => {
          this.issueUpdated = false;
        }, 800);
      } else {
        return false;
      }
    },
    addNewTag() {
      const val = this.getIssueData.labels;
      if (val === "") {
        return false;
      }
      this.newTags.push(val);
      this.resetInput();
      this.labelTyped = false;
    },
    resetInput() {
      this.$refs.label.value = "";
      this.getIssueData.labels = "";
    },
    removeLabel(istag) {
      const removeItem = this.newTags.filter((tag) => tag !== istag);
      this.newTags = removeItem;
    },
  },
  mounted() {
    // getPath(this.getRoute, "Issues")
  },
  computed: mapGetters(["getIssuesDatas", "getIssueData"]),
  created() {
    getAllIssues(this.getRoute);
    // getIssue(this.getWorkspacePath, this.getIssueID);
    // getAuthUser().then((user) => {
    //   db.collection("users")
    //     .doc(user.uid)
    //     .collection("workspace")
    //     .doc(this.getWorkspacePath)
    //     .collection("issues")
    //     .doc(this.getIssueID)
    //     .get()
    //     .then((getTags) => {
    //       const oldTags = getTags.data().tags;
    //       oldTags.forEach((tag) => {
    //         this.tags.push(tag);
    //       });
    //     });
    // });
  },
  // watch: {
  //   showIssueView(data) {
  //     if(data === true) {
  //        // check if imgae src is loaded and no error if error then replace with error image
  //     const image = this.$refs.attachmentURL
  //     console.log(image);
     
  //     // image.onerror = function () {
  //     //   alert("error loading " + this.src);
  //     //   this.src = "error.png"; // place your error.png image instead
  //     // };
  //     }
  //   }
  // }
};
</script>