<template>
  <li
    :class="{
      editing: state.matches('editing'),
      completed: state.context.completed
    }"
    :data-todo-state="state.context.completed ? 'completed' : 'active'"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        @change="send('TOGGLE_COMPLETE')"
        :value="state.context.completed"
        :checked="state.context.completed"
      />
      <label @dblclick="send('EDIT')"> {{ state.context.title }} </label>
      <button class="destroy" @click="send('DELETE')" />
    </div>
    <input
      class="edit"
      :value="state.context.title"
      @blur="send('BLUR')"
      @change="send('CHANGE', { value: $event.target.value })"
      @keypress.enter="send('COMMIT')"
      @keydown.esc="send('CANCEL')"
      ref="inputRef"
    />
  </li>
</template>

<script>
import { useService } from '@xstate/vue';
import { watch, ref } from 'vue';

export default {
  props: {
    todoRef: { type: Object, required: true }
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup ({ todoRef }) {
    const { state, send } = useService(todoRef);
    const inputRef = ref(null);

    watch(
      () => state.value,
      state => {
        todoRef.execute(state, {
          focusInput () {
            inputRef.value.select();
          }
        });
      }
    );

    return {
      state,
      send,
      inputRef
    };
  }
};
</script>
