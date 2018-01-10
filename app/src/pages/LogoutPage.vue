<template lang="html">
  <div class="">
    bla
  </div>
</template>

<script>
  import {set, deleteCookie} from 'tiny-cookie/dist/tiny-cookie.js';
  export default {
    data () {
      return {}
    },
    created: function() {
      deleteCookie('user');
      this.$router.push('projects');
    }

  }
</script>

<style lang="sass">
</style>
