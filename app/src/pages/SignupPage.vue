<template lang="html">
  <form class="signup-form" action="" method="post" type="multipart/form-data">
    <h3>User Registration</h3>
    <input type="text" name="first_name" value="" required placeholder="Enter your first name" >
    <input type="text" name="last_name" value="" required placeholder="Enter your last name" >
    <input type="password" name="password" value="" required placeholder="Enter your password" >
    <input type="email" name="email" value="" required placeholder="Enter your email" >
    <input type="text" name="phone" value="" required placeholder="Enter your phone number">
    <textarea name="about" rows="8" cols="80" placeholder="Something about yourself" ></textarea>
    <input type="file" name="image" value="" placeholder="Profile picture">

    <input type="submit" name="submit" value="Submit" @click.stop.prevent="handleSubmit">
  </form>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    handleSubmit: () => {
      let form = document.querySelector('form');
      form.addEventListener('submit', (evt) => {
        // console.log((new FormData(form)).entries().next());
        axios.post('http://127.0.0.1:3000/users', new FormData(form));
        evt.preventDefault();

      }, false);
      form.dispatchEvent(new Event('submit'));
    }
  }
}
</script>

<style lang="sass">
</style>
