<template>
  <div>
    <h1>Home page</h1>
    <ul class="links">
      <li><router-link to="/lightswitch">LightSwitch</router-link></li>
      <li><router-link to="/webshop">WebShop</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home-page'
};
</script>

<style lang="scss" scoped>
.links {
  li {
    margin-bottom: 15px;
  }
}
</style>
