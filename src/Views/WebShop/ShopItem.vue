<template>
  <li class="item">{{ name }} | {{ price }}kn</li>
</template>

<script>
export default {
  name: 'shop-item',
  props: {
    name: { type: String, reguired: true },
    price: { type: Number, reguired: true }
  }
};
</script>

<style lang="scss" scoped>
.item {
  cursor: pointer;
}
</style>
