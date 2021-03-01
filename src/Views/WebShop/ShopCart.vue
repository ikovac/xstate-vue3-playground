<template>
  <div>
    <h3>Shop cart</h3>
    <item-list :items="items" />
    <button
      @click="$emit('buy')"
      :disabled="isProcessing"
      class="btn">
      {{ isProcessing ? 'Processing' : 'Buy' }}
    </button>
    <a @click="$emit('clear')">Clear</a>
  </div>
</template>

<script>
import ItemList from './ItemList.vue';

export default {
  name: 'shop-cart',
  props: {
    items: { type: Array, default: () => [] },
    isProcessing: { type: Boolean, default: false }
  },
  components: { ItemList }
};
</script>

<style lang="scss" scoped>
.btn {
  background-color: #2e7525;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin-right: 20px;

  &:disabled {
    background-color: gray;
  }
}

a {
  cursor: pointer;
}
</style>
