import { createMachine, assign, spawn } from 'xstate';
import { machine as todoMachine } from './todoMachine';
import uuid from 'uuid-v4';

const createTodo = title => {
  return {
    id: uuid(),
    title: title,
    completed: false
  };
};

export const machine = createMachine({
  id: 'todos',
  context: {
    todo: '',
    todos: []
  },
  initial: 'initializing',
  states: {
    initializing: {
      entry: assign({
        todos: ctx => {
          return ctx.todos.map(todo => ({
            ...todo,
            ref: spawn(todoMachine.withContext(todo))
          }));
        }
      }),
      always: 'all'
    },
    all: {},
    active: {},
    completed: {}
  },
  on: {
    'NEWTODO.CHANGE': {
      actions: assign({
        todo: (ctx, e) => e.value
      })
    },
    'NEWTODO.COMMIT': {
      actions: [
        assign({
          todo: '', // clear todo
          todos: (ctx, e) => {
            const newTodo = createTodo(e.value.trim());
            return ctx.todos.concat({
              ...newTodo,
              ref: spawn(todoMachine.withContext(newTodo))
            });
          }
        })
      ],
      cond: (ctx, e) => e.value.trim().length
    },
    'TODO.COMMIT': {
      actions: [
        assign({
          todos: (ctx, e) =>
            ctx.todos.map(todo => {
              return todo.id === e.todo.id
                ? { ...todo, ...e.todo, ref: todo.ref }
                : todo;
            })
        })
      ]
    },
    'TODO.DELETE': {
      actions: [
        assign({
          todos: (ctx, e) => ctx.todos.filter(todo => todo.id !== e.id)
        })
      ]
    },
    'SHOW.all': '.all',
    'SHOW.active': '.active',
    'SHOW.completed': '.completed',
    'MARK.completed': {
      actions: ctx => {
        ctx.todos.forEach(todo => todo.ref.send('SET_COMPLETED'));
      }
    },
    'MARK.active': {
      actions: ctx => {
        ctx.todos.forEach(todo => todo.ref.send('SET_ACTIVE'));
      }
    },
    CLEAR_COMPLETED: {
      actions: assign({
        todos: ctx => ctx.todos.filter(todo => !todo.completed)
      })
    }
  }
});
