<template>
  <div>
    <p>{{greeting}} World!</p>

    <router-link to="/projects">Projects</router-link>
    <router-link to="/users">Users</router-link>

    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';

  export default {
    name: 'master',
    data () {
      return {
        greeting: 'Hello'
      }
    },
    mounted () {
      axios.get('http://127.0.0.1:3000/users')
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        ;
    }
  }
</script>

<style scoped lang="sass">
  p
    font-size: 2em
    text-align: center

</style>
