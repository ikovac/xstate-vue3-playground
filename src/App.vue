<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      todos: [],
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    };
  }
};
</script>

<style lang="scss">
div {
  p {
    color: red;
  }
}
</style>
