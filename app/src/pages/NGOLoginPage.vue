<template lang="html">
  <form class="signup-form" action="" method="post" type="multipart/form-data">
    <h3>NGO Login</h3>
    <input type="email" name="email" value="" required placeholder="Organization email" >
    <input type="password" name="password" value="" required placeholder="Your password" >

    <input type="submit" name="submit" value="Submit" @click.stop.prevent="handleSubmit">
  </form>
</template>

<script>
import axios from 'axios';
import {setCookie, getCookie, deleteCookie} from 'tiny-cookie/dist/tiny-cookie.js';

export default {
  methods: {
    handleSubmit: () => {

      let form = document.querySelector('form');
      form.addEventListener('submit', (evt) => {

        axios.post('http://127.0.0.1:3000/auth?type=org', new FormData(form))
        .then((res) => {
          console.log(JSON.stringify(res.data));
          if(res.data == null) alert("Email or password are wrong. Please try again!");
          else {
            setCookie('user', JSON.stringify(res.data), {domain: 'localhost'});
            setCookie('type', 'org');
            console.log(JSON.parse(getCookie('user')));
          }
        })
        ;


        evt.preventDefault();

      }, false);
      form.dispatchEvent(new Event('submit'));
    }
  }
}
</script>

<style lang="sass">
</style>
