<template>
  <router-view />
</template>

<script>
import fbLoginMixin from "./mixins/fbLoginMixin";
export default {
  mixins: [fbLoginMixin],
  created() { this.currentuser(); }
}
</script>
