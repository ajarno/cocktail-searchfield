<template>
  <div>
    <div
      id="searchField"
      class="suggestive-search"
      :style="`--bottom-position: ${Math.ceil(elBottomPosition)}px`"
    >
      <input
        id="searchInput"
        class="suggestive-search__input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        :aria-expanded="menuExpanded"
        :aria-label="placeholder"
        :aria-controls="menuExpanded ? 'suggestionsMenu' : null"
        :placeholder="placeholder"
        v-model="model"
        @focus="menuExpanded = true"
        @blur="menuExpanded = false"
        @input.stop="update($event.target.value)"
        @keyup.prevent.up="decreaseIndex"
        @keyup.prevent.down="increaseIndex"
        @keyup.exact.enter="$emit('select', suggestions[activeSuggestionIndex])"
      />
      <ul
        v-show="menuExpanded"
        id="suggestionsMenu"
        class="suggestive-search__menu"
        role="listbox"
        aria-labelledby="searchInput"
      >
        <!-- TODO: Highlight the correspondance between searched text and suggestion name: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API -->
        <SuggestionItem
          v-for="(item, index) in suggestions"
          :key="item._id"
          :id="item._id"
          :thumbnail="item.thumbnail"
          :isExclusive="item.exclusive"
          :primaryText="item.primaryText"
          :secondaryText="item.secondaryText"
          :tertiaryText="item.tertiaryText"
          :aria-posinset="index"
          :aria-setsize="suggestions.length - 1"
          :aria-selected="index === activeSuggestionIndex"
          :selected="index === activeSuggestionIndex"
          tabindex="-1"
          role="option"
          @click="$emit('select', item)"
        >
          <template #exclusive><slot name="exclusive"></slot></template>
        </SuggestionItem>
      </ul>
    </div>

    <p v-if="$slots.hint" class="suggestive-search__input-hint">
      <slot name="hint"></slot>
    </p>
  </div>
</template>

<script setup>
// Reactive refs
const menuExpanded = ref(false);
const activeSuggestionIndex = ref(0);
const elBottomPosition = ref(0);

// Props
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: false,
  },
  suggestions: {
    type: Array,
    required: false,
    default: [],
  },
});

// Models
const model = defineModel();
function update(newValue) {
  model.value = newValue;
}

// Events emitters
const emits = defineEmits(["select"]);

// Watchers
watch(
  () => props.suggestions,
  (value, oldValue) => {
    activeSuggestionIndex.value = 0;
  }
);

// Lifecycle hooks
onMounted(() => {
  elBottomPosition.value = document
    .getElementById("searchField")
    .getBoundingClientRect().bottom;
});

// Functions
function increaseIndex(params) {
  if (activeSuggestionIndex.value < props.suggestions.length - 1)
    ++activeSuggestionIndex.value;
}
function decreaseIndex(params) {
  if (activeSuggestionIndex.value > 0) --activeSuggestionIndex.value;
}
</script>

<style scoped>
.suggestive-search {
  position: relative;
  display: inline-block;
  max-width: 90vw;
}

.suggestive-search__input {
  width: 340px;
  padding: 1em 1.25em;
  max-width: calc(100% - 2.5em);
  font-size: 18px;
  border-radius: 8px;
}

.suggestive-search__menu {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  max-height: calc(100vh - var(--bottom-position) - 20px);
  overflow-y: auto;
  z-index: 1000;
  background-color: #ffffff;
  border: 1px solid #bcbcc8;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
}

li + li {
  border-top: 1px solid #dbdbe1;
}
</style>
