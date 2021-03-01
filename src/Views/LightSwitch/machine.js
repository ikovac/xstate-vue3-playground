import { createMachine, interpret, assign } from 'xstate';

export const machine = createMachine({
  initial: 'off',
  context: { count: 0 },
  states: {
    on: {
      entry: 'increment',
      on: {
        TOGGLE: [
          { target: 'off', cond: (context) => context.count < 9 },
          { target: 'burntOut' }
        ]
      }
    },
    off: { on: { TOGGLE: 'on' } },
    burntOut: { type: 'final' }
  }
}, {
  actions: {
    increment: assign({
      count: context => context.count + 1
    })
  }
});

export const machineService = interpret(machine);
machineService.start();
