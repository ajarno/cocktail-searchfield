<template>
  <li
    ref="el"
    class="suggestion-item"
    :class="{ 'suggestion-item--selected': selected }"
    :data-selected="selected"
  >
    <div v-if="thumbnail" class="suggestion-item__img-wrapper">
      <img :src="thumbnail" :alt="primaryText" class="suggestion-item__img" />
    </div>
    <div class="suggestion-item__text-wrapper">
      <p class="suggestion-item__text-headline">
        {{ primaryText }}
        <span
          v-if="isExclusive"
          class="suggestion-item__exclusive text-primary"
        >
          <span v-if="$slots.exclusive">
            <slot name="exclusive"></slot>
          </span>
        </span>
      </p>
      <p
        v-if="secondaryText || tertiaryText"
        class="suggestion-item__text-subline text-secondary"
      >
        <span v-if="secondaryText" class="suggestion-item__text-secondary">
          {{ secondaryText }}
        </span>
        <span class="suggestion-item__text-tertiary">
          {{ secondaryText && tertiaryText ? " | " : "" }}
          {{ tertiaryText }}
        </span>
      </p>
    </div>
  </li>
</template>

<script setup>
// Reactive refs
const el = ref(null);

// Props
const props = defineProps({
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
    default: false,
  },
  isExclusive: {
    type: String,
    required: false,
    default: false,
  },
  primaryText: {
    type: String,
    required: true,
  },
  secondaryText: {
    type: String,
    required: false,
  },
  tertiaryText: {
    type: String,
    required: false,
  },
});

// Watchers
watch(
  () => props.selected,
  (value, oldValue) => {
    if (value) setupFocus();
  }
);

// Functions
function setupFocus() {
  el.value.scrollIntoView({ block: "nearest", inline: "nearest" });
}
</script>

<style scoped>
.suggestion-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.suggestion-item__img-wrapper {
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.suggestion-item__img {
  width: 4.5rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.suggestion-item--selected,
.suggestion-item:hover {
  background-color: #f0f0f0;
}

.suggestion-item__text-wrapper {
  padding: 0 0 0.25rem 0;
}

.suggestion-item__text-headline {
  font-weight: 700;
  font-size: 1.2rem;
}

.suggestion-item__text-subline {
  font-weight: 400;
  font-size: 0.8rem;
}

.suggestion-item__text-secondary {
  font-weight: 600;
}

.suggestion-item__text-headline,
.suggestion-item__text-subline {
  margin: 0 0 0.5em 0;
}

.suggestion-item__exclusive {
  display: inline-flex;
  align-items: flex-end;
  gap: 4px;
  font-weight: 700;
  font-size: 0.8rem;
}

.suggestion-item__exclusive svg {
  width: 1.1em;
  height: 1.1em;
}
</style>
