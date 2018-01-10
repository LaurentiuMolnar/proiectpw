<template lang="html">
  <div class="container">
    <project-list v-bind:projects="projects"></project-list>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';

  export default {
    name: 'project-list-wrapper',
    data () {
      return {
        projects: []
      }
    },
    created () {
      axios.get('http://127.0.0.1:3000/projects')
        .then((res) => {
          console.log(res);
          this.projects = res.data;
          this.projects = this.projects.map((el) => ({ ...el, href: `/#/projects/${el.id}`}));
        })
        .catch((err) => console.log(err))
        ;
    }
  }
</script>

<style lang="sass">
</style>
