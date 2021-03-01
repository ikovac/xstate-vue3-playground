<template>
  <div>
    <item-list @add="addToCart" :items="items" />
    <shop-cart
      @buy="send('BUY')"
      @clear="send('CLEAR')"
      :items="state.context.items"
      :isProcessing="isProcessing" />
  </div>
</template>

<script>
import items from './items';
import ItemList from './ItemList.vue';
import ShopCart from './ShopCart.vue';
import { machine } from './machine';
import { useMachine } from '@xstate/vue';
import { computed } from 'vue';

export default {
  name: 'web-shop',
  setup () {
    const { state, send } = useMachine(machine);
    const addToCart = item => send({ type: 'ADD', item });
    const isProcessing = computed(() => state.value.matches('processing'));
    return { state, send, items, addToCart, isProcessing };
  },
  components: { ItemList, ShopCart }
};
</script>
