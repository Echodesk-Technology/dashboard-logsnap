<template>
  <div @click="open">
    <slot />
  </div>
</template>

<script>
import { Uppload, en, Local, Camera, Crop, URL, Screenshot, Preview  } from "uppload";
import "uppload/dist/uppload.css";
import "uppload/dist/themes/light.css";
import { firebaseUploader } from "../config/functions"
export default {
  name: "UpploadVue",
  props: {
    uploader: HTMLButtonElement
  },
  data: () => ({
  }),
  created() {
    if (!this.uppload) {
      this.uppload = new Uppload({
        lang: en,
        call: this.uploader,
        uploader: firebaseUploader
      });
      this.uppload.use([new Local(), new Camera(),  new Crop(), new URL(), new Screenshot(), new Preview()]);
      // this.uppload.on("upload", url => this.$emit("input", url))
    }
  },
  methods: {
    open() {
      this.uppload.open();
    }
  }
}
</script>

<style scoped>

</style>
