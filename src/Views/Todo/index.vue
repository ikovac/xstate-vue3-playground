<template>
  <section class="todoapp" :data-state="state.toStrings()">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="What needs to be done?"
        autofocus
        @keypress.enter="send('NEWTODO.COMMIT', { value: $event.target.value })"
        @change="send('NEWTODO.CHANGE', { value: $event.target.value })"
        :value="state.context.todo">
    </header>
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="allCompleted"
        @change="send(markEvent)">
      <label for="toggle-all" :title="`Mark all as ${mark}`">Mark all as {{ mark }}</label>

      <ul class="todo-list">
        <Todo
          :key="todo.id"
          :todoRef="todo.ref"
          :random="Math.random()"
          v-for="todo in filteredTodos"
        />
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{ numActiveTodos }}</strong>
        item
        {{ numActiveTodos === 1 ? "" : "s" }} left
      </span>
      <ul class="filters">
        <li>
          <a
            @click="send('SHOW.all')"
            :class="{ selected: state.matches('all') }"
            class="todo-filter">
            All
          </a>
        </li>
        <li>
          <a
            @click="send('SHOW.active')"
            :class="{ selected: state.matches('active') }"
            class="todo-filter">
            Active
          </a>
        </li>
        <li>
          <a
            @click="send('SHOW.completed')"
            :class="{ selected: state.matches('completed') }"
            class="todo-filter">
            Completed
          </a>
        </li>
      </ul>

      <button
        v-if="numActiveTodos < state.context.todos.length"
        @click="send('CLEAR_COMPLETED')"
        class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useMachine } from '@xstate/vue';
import { machine as todosMachine } from './todosMachine';
import Todo from './Todo.vue';

function filterTodos (state, todos) {
  if (state.value.matches('active')) {
    return todos.filter(todo => !todo.completed);
  }

  if (state.value.matches('completed')) {
    return todos.filter(todo => todo.completed);
  }

  return todos;
}

export default {
  name: 'todo-page',
  setup () {
    const { state, send } = useMachine(todosMachine);

    const numActiveTodos = computed(
      () => state.value.context.todos.filter(todo => !todo.completed).length
    );

    const allCompleted = computed(
      () => state.value.context.todos.length > 0 && numActiveTodos.value === 0
    );

    const mark = computed(() => (!allCompleted.value ? 'completed' : 'active'));

    const markEvent = computed(() => `MARK.${mark.value}`);

    const filteredTodos = computed(() =>
      filterTodos(state, state.value.context.todos)
    );

    return {
      state,
      send,
      numActiveTodos,
      allCompleted,
      filteredTodos,
      markEvent,
      mark
    };
  },
  components: { Todo }
};
</script>

<style lang="scss" scoped>
.todo-filter {
  cursor: pointer;
}
</style>
