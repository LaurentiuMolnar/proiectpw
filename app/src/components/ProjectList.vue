<template lang="html">
  <div class="container">
    <div v-for="project in projects" class="project-info">
      <a v-bind:href="project.href"><h3>{{project.name}}</h3></a>
      <div>
        {{project.description}}
      </div>
      <img src="http://via.placeholder.com/350x150" v-bind:alt="project.name">
      <br><small>
        {{project.type}}
      </small>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['projects'],
    created () {
      console.log("Project List created");
    }
  }
</script>

<style lang="sass">
  img
    max-width: 640px
    width: 100%
  small
    text-transform: uppercase
    font-size: 0.75em
    background-color: #eee
    padding: 0.3em
</style>
