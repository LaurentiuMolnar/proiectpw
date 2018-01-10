<template>
  <div class="container">
    <h3>{{project.name}}</h3>
    <div>
      {{project.description}}
    </div>
      <img src="http://via.placeholder.com/350x150" v-bind:alt="project.name">
    <small><br>
      {{project.type}}
    </small>
    <br>
    <form style="display: none;" action="" method="post">
      <input type="hidden" name="project" v-bind:value="id">
      <input type="hidden" name="user" v-bind:value="user.id">
    </form>
    <input v-if="isUser"  style="display: block; !important" type="submit" name="submit" value="Signup" @click.stop.prevent="handleSubmit">
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import {setCookie, getCookie, deleteCookie} from 'tiny-cookie/dist/tiny-cookie.js';

  export default {
    name: 'project-info',
    data () {
      return {
        project: {},
        id: this.$route.params.id,
        user: JSON.parse(getCookie('user'))
      }
    },
    computed: {
      isUser: () => getCookie('type') === 'user'
    },
    created() {
      axios.get(`http://127.0.0.1:3000/projects/${this.$route.params.id}`)
        .then((res) => {
          console.log(res);
          this.project = res.data;
        })
        .catch(err => console.log(err))
        ;
    },
    methods: {
      handleSubmit: () => {
        let form = document.querySelector('form');
        form.addEventListener('submit', (evt) => {
          axios.post('http://127.0.0.1:3000/registrations/', new FormData(form));
          evt.preventDefault();
        }, false);
        form.dispatchEvent(new Event('submit'));
      }
    }
  }
</script>

<style media="screen" scoped lang="sass">
  img
    max-width: 640px
    width: 100%

  small
    text-transform: uppercase
    font-size: 0.75em
    background-color: #eee
    padding: 0.3em
</style>
