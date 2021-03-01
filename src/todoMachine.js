import { createMachine, assign, interpret } from 'xstate';

export const createTodoMachine = ({ id, title, completed }) => createMachine({
  id: 'todo',
  initial: 'reading',
  context: {
    id,
    title,
    completed
  },
  on: {
    TOGGLE_COMPLETE: {
      actions: assign({
        completed: (context, event) => context.title + '!'
      })
    }
  },
  states: {
    reading: {
      entry: assign({ completed: true })
    },
    editing: {}
  }
});

const todoMachine = createTodoMachine({ id: 2, title: 'Learn', completed: false });
const todoService = interpret(todoMachine);
todoService.start();

console.log('Todo machine: ', todoService.machine.context);

todoService.send('TOGGLE_COMPLETE');
console.log('Todo machine: ', todoService.machine.context);
