<template>
  <div class="switch-container">
    <label class="switch">
      <input
        @change="send('TOGGLE')"
        :checked="state.value === 'on'"
        :disabled="state.done"
        type="checkbox">
      <span class="slider round"></span>
    </label>
    {{ state.value }}
    <p>Count: {{ state.context.count }}</p>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { useMachine, useService } from '@xstate/vue';
import { machine, machineService } from './machine';

export default {
  name: 'switch-machine',
  setup () {
    const { state, send } = useMachine(machine);
    // const { state, send } = useService(machineService);

    return { state, send };
  }
};
</script>

<style lang="scss" scoped>
.switch-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #333;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
