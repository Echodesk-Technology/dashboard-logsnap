<template>
  <div>
    <Notes>
      <div id="note-data" v-for="note in getNote" :key="note.id">
        <h1 ref="noteName">{{ note.title }}</h1>
      </div>
    </Notes>
  </div>
</template>
<script>
import Notes from "./Notes";
import { getNote } from "../config/functions";

import { mapGetters } from "vuex";
export default {
  name: "Note",
  components: {
    Notes,
  },
  data() {
    return {
      note: [],
      workspacePath: this.$route.fullPath.split("/")[4].split("?")[0],
      notePath: this.$route.fullPath.split("/")[5].split("?")[0],
    };
  },
  mounted() {
    setTimeout(() => {
      document.title = `${this.$refs.noteName.innerText}`;
      if (document.getElementById(this.notePath)) {
      document.getElementById(this.notePath).classList.add("bg-main-noteLight");
    }
    }, 500);
    
  },
  computed: mapGetters(["getNote"]),
  created() {
    getNote(this.workspacePath, this.notePath);
  },
};
</script>