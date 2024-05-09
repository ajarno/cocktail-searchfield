<template>
  <input
    id="searchInput"
    :placeholder="placeholder"
    v-model="model"
    @input.stop="update($event.target.value)"
  />
</template>

<script setup>
// Props
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: false,
  },
});

// Models
const model = defineModel();
function update(newValue) {
  model.value = newValue;
}
</script>