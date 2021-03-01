<template>
  <div>
    <h3>Item list:</h3>
    <ul>
      <shop-item
        v-for="item in items"
        :key="item.id"
        @click="$emit('add', item)"
        v-bind="item"
        class="shop-item" />
    </ul>
  </div>
</template>

<script>
import ShopItem from './ShopItem.vue';

export default {
  name: 'item-list',
  props: {
    items: { type: Array, default: () => [] }
  },
  components: { ShopItem }
};
</script>

<style lang="scss" scoped>
.shop-item {
  margin-bottom: 15px;

  &:hover {
    text-decoration: underline;
  }
}
</style>
