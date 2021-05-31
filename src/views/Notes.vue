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
            <div class="notes-header-text w-3/12 flex items-center justify-between mt-1">
              <h1 class="text-gray-60 text-2xl font-semibold  ml-3">
                Notes
              </h1>
              <div class="add-new-note mr-5">
                <button class="text-sm flex items-center bg-main-normal text-white rounded-xl p-1 outline-none focus:outline-none">
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
            <div class="search-header w-3/12 bg-white mr-56">
              <div
                class="side-1 search-notes w-full relative bg-white border border-gray-100 rounded-2xl outline-none p-2 space-mb-side"
              >
                <div class="search-input ml-7 select-none">
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
            class="flex items-center notes-side-1 notes-side-2-view mt-16 bg-white"
          >
            <div class="side-1-notes w-5/12 max-w-sm h-screen">
              <div class="notes-list break-words select-none">
                <div
                  v-for="note in notes"
                  :key="note.id"
                  class="note border-b border-gray-200 w-full p-3 pl-10 cursor-pointer"
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
                </div>
              </div>
            </div>
            <div
              class="side-2-view w-10/12 border-l border-gray-100 h-screen p-3"
            >
              <h1>View notes</h1>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  </div>
</template>
<script>
import Dashboard from "../components/Dashboard";
export default {
  name: "Notes",
  data() {
    return {
      isCollapsed: false,
      search: "",
      notes: [
        {
          id: "1",
          createdAt: "may 29",
          title: "Development Practice",
          description: "Building a website with Vue and Tailwind!",
        },
        {
          id: "2",
          createdAt: "may 31",
          title: "Marketing Ideas",
          description:
            "A new way to market your business.ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
        },
      ],
    };
  },
  components: {
    Dashboard,
  },
  mounted() {
    const notes = document.querySelectorAll(".note");
    notes[0].classList.add("bg-main-noteLight");
    notes.forEach((note) => {
      note.addEventListener("click", () => {
        notes.forEach((isNote) => isNote.classList.remove("bg-main-noteLight"));
        note.classList.add("bg-main-noteLight");
      });
    });
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
  },
};
</script>