import { createMachine, assign } from 'xstate';

export const machine = createMachine({
  id: 'webshop-machine',
  context: {
    items: []
  },
  initial: 'empty',
  states: {
    empty: {
      entry: assign({ items: [] }),
      on: {
        ADD: 'notEmpty'
      }
    },
    notEmpty: {
      entry: 'addItem',
      on: {
        ADD: 'notEmpty',
        BUY: 'processing',
        CLEAR: 'empty'
      }
    },
    processing: {
      invoke: {
        src: 'processCart',
        onDone: 'empty'
      }
    }
  }
}, {
  actions: {
    addItem: assign({
      items: (context, event) => {
        const { item } = event;
        const { items } = context;
        if (items.some(it => it.id === item.id)) return items;
        return [...items, item];
      }
    })
  },
  services: {
    processCart: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    }
  }
});

// const machineService = interpret(machine).onTransition(state => {
//   console.log('State: ', state.value);
//   console.log('Context: ', state.context);
// });

// machineService.start();

// machineService.send('ADD', { data: { id: 1, name: 'Milk', price: 7 } });
// setTimeout(() => {
//   machineService.send('BUY');
// }, 2000);

// export default machineService;
