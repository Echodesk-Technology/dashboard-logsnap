<template>
  <div>
    <Dashboard>
      <div
        id="Notes-page"
        :class="[{ 'collapsed-closed': isCollapsed }, ' collapsed-opened']"
      >
        <div class="notes-main h-screen space-mb-sides">
          <div
            class="notes-header bg-white fixed flex items-center justify-between top-10 z-20 pl-8 p-4 border-b border-gray-100 w-full"
            style="margin-top: 0.6rem"
          >
            <div
              class="notes-header-text w-3/12 flex items-center justify-between mt-1"
            >
              <h1 class="text-gray-60 text-2xl font-semibold ml-3">Notes</h1>
              <div class="add-new-note mr-5">
                <button
                  @click="createNote"
                  class="text-sm flex items-center bg-main-normal text-white rounded-xl p-1 outline-none focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    /></svg
                  >New Note
                </button>
              </div>
            </div>
            <div class="notes-search-header w-3/12 bg-white mr-56">
              <div
                class="side-1 search-notes w-full relative bg-white border border-gray-100 rounded-2xl outline-none p-2 space-mb-side"
              >
                <div class="note-search-input ml-7 select-none">
                  <input
                    type="text"
                    ref="searchNotes"
                    v-model="search"
                    class="w-full outline-none focus:outline-none appearance-none placeholder-gray-600 select-none"
                    placeholder="Search Notes"
                  />
                </div>
                <div class="absolute top-4 left-3 -mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-white flex items-center notes-side-1 notes-side-2-view mt-16"
          >
            <div class="side-1-notes w-5/12 max-w-sm h-screen">
              <div class="notes-list break-words select-none">
                <div class="note-con" v-for="note in getNotes" :key="note.id">
                  <ul>
                    <li
                    :id="note.id"
                      class="note  border border-gray-100 w-full p-3 pl-10 cursor-pointer"
                    >
                      <router-link
                        :to="{
                          name: 'Note',
                          params: {
                            workspacePath: note.workspacePath,
                            noteID: note.id,
                          },
                        }"
                      >
                        <div class="note-created-date">
                          <p class="uppercase text-xs text-gray-600 mt-1">
                            {{ note.createdAt }}
                          </p>
                          <div class="note-heading">
                            <h1
                              class="mt-2 font-semibold text-lg"
                              style="font-size: 1.126rem"
                            >
                              {{ note.title }}
                            </h1>
                            <h2
                              class="font-normal text-gray-400 mt-2 w-11/12 whitespace-nowrap overflow-hidden overflow-ellipsis"
                              style="font-size: 1rem"
                            >
                              {{ note.description }}
                            </h2>
                          </div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="side-2-view w-10/12 border-l border-gray-100 h-screen p-3"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  </div>
</template>
<script>
import Dashboard from "../components/Dashboard";
import { createNote, getNotes } from "../config/functions";
import { mapGetters } from "vuex";
export default {
  name: "Notes",
  data() {
    return {
      isCollapsed: false,
      search: "",
      workspacePath: this.$route.fullPath.split("/")[4].split("?")[0],
      note: {
        title: "Untitled",
        createdAt: this.getFormattedDate(),
        fullDate: this.getFullDate(),
        contents: [],
      },
    };
  },
  components: {
    Dashboard,
  },
  mounted() {
    // setTimeout(() => {
    //   const notes = document.querySelectorAll(".note");
    //   if(notes.length !== 0) {
    //     notes[0].classList.add("bg-main-noteLight");
    //   notes.forEach((note) => {
    //     note.addEventListener("click", () => {
    //       notes.forEach((isNote) =>
    //         isNote.classList.remove("bg-main-noteLight")
    //       );
    //       note.classList.add("bg-main-noteLight");
    //     });
    //   });
    //   }
    // }, 600);
  },
  computed: mapGetters(["getNotes"]),
  created() {
    getNotes(this.workspacePath);
  },
  methods: {
    getFormattedDate() {
      const todayTime = new Date();
      let month;
      const isMonth = todayTime.getMonth() + 1;
      switch (isMonth) {
        case 1:
          month = "Jan";
          break;
        case 2:
          month = "Feb";
          break;
        case 3:
          month = "March";
          break;
        case 4:
          month = "Apr";
          break;
        case 5:
          month = "May";
          break;
        case 6:
          month = "Jun";
          break;
        case 7:
          month = "Jul";
          break;
        case 8:
          month = "Aug";
          break;
        case 9:
          month = "Sep";
          break;
        case 10:
          month = "Oct";
          break;
        case 11:
          month = "Nov";
          break;
        case 12:
          month = "Dec";
          break;
        default:
          break;
      }
      const day = todayTime.getDate();
      return `${month} ${day}`;
    },
    formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    },
    getFullDate() {
      const todayTime = new Date();
      let month;
      const isMonth = todayTime.getMonth() + 1;
      const day = todayTime.getDate();
      const year = todayTime.getFullYear();
      const time = this.formatAMPM(todayTime);
      //eslint-disable-next-line
      const timezone = todayTime.toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
      switch (isMonth) {
        case 1:
          month = "Jan";
          break;
        case 2:
          month = "Feb";
          break;
        case 3:
          month = "March";
          break;
        case 4:
          month = "Apr";
          break;
        case 5:
          month = "May";
          break;
        case 6:
          month = "Jun";
          break;
        case 7:
          month = "Jul";
          break;
        case 8:
          month = "Aug";
          break;
        case 9:
          month = "Sep";
          break;
        case 10:
          month = "Oct";
          break;
        case 11:
          month = "Nov";
          break;
        case 12:
          month = "Dec";
          break;
        default:
          break;
      }
      return `${month} ${day}, ${year} at ${time} ${timezone}`;
    },
    createNote() {
      createNote(this.workspacePath, this.note)
      .then((docRef) => {
        docRef.update({
          id: docRef.id,
          workspacePath: this.workspacePath,
        });
      });
    },
  },
  watch: {
    "$store.getters.getCollapsedState": function (data) {
      if (data === true) {
        localStorage.sidebarCollasped = true;
        this.isCollapsed = true;
      } else {
        localStorage.sidebarCollasped = false;
        this.isCollapsed = false;
      }
    },
    "$store.getters.getNotes": function (data) {
      // if (data) {
      //   const notes = document.querySelectorAll(".note");
      //   notes[0].classList.add("bg-main-noteLight");
      //   notes.forEach((note) => {
      //     note.addEventListener("click", () => {
      //       notes.forEach((isNote) =>
      //         isNote.classList.remove("bg-main-noteLight")
      //       );
      //       note.classList.add("bg-main-noteLight");
      //     });
      //   });
      // }
    },
  },
};
</script>