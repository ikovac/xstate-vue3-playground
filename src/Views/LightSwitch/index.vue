<template>
  <div class="container">
    <switch-machine />
    <switch-machine />
  </div>
</template>

<script>
import SwitchMachine from './SwitchMachine.vue';

export default {
  name: 'light-switch',
  components: { SwitchMachine }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30px;
}
</style>
