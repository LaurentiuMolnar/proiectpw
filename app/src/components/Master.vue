<template>
  <div>
    <p>{{appName}}</p>

    <nav>
      <h3>Menu</h3>
      <!-- <li><router-link to="/">Home</router-link></li> -->
      <li><router-link to="/projects">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/ngologin">Login as an organization</router-link></li>
      <li><router-link to="/signup">Signup</router-link></li>
      <li><router-link to="/ngosignup">Signup as an organization</router-link></li>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'master',
    data () {
      return {
        appName: 'Vue App'
      }
    }
  }
</script>

<style scoped lang="sass">
  p
    font-size: 2em
    text-align: center

  nav
    li
      display: block

</style>
