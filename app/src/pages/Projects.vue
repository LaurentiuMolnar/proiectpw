<template>
  <div class="container">
    <div v-for="project in projects">
      <h4>{{project.name}}</h4>
      <div>
        {{project.description}}
      </div>
      <small>
        {{project.type}}
      </small>
      <hr>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';

  export default {
    name: 'master',
    data () {
      return {
        greeting: 'Hello',
        projects: []
      }
    },
    mounted () {
      axios.get('http://127.0.0.1:3000/projects')
        .then((res) => {
          console.log(res);
          this.projects = res.data;
        })
        .catch((err) => console.log(err))
        ;
    }
  }
</script>

<style media="screen" scoped lang="sass">
    .container
      // background: #eee

      small
        text-transform: uppercase
        font-size: 0.75em
        background-color: #eee
        padding: 0.3em
</style>
