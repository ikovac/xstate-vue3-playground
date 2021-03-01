<template>
  <div>
    <item-list @add="addToCart" :items="items" />
    <shop-cart
      @buy="send('BUY')"
      @clear="send('CLEAR')"
      :items="context.items"
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
    const isProcessing = computed(() => state.value.matches('processing'));
    const context = computed(() => state.value.context);
    const addToCart = item => send({ type: 'ADD', item });
    return { send, items, addToCart, isProcessing, context };
  },
  components: { ItemList, ShopCart }
};
</script>
