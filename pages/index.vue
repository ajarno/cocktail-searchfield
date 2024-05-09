<template>
  <div class="content">
    <SuggestiveSearchField
      v-model="searchParam"
      placeholder="Enter cocktail name"
    >
    </SuggestiveSearchField>
    {{ suggestions }}
  </div>
</template>

<script setup>
const searchParam = ref("");

const cleanedSearchParam = computed(() => {
  return searchParam.value.trim().toLowerCase();
});

const { data, error, pending, execute } = await useLazyFetch("/api/cocktail", {
  query: { searchParam: cleanedSearchParam, immediate: false, server: false },
});

const suggestions = computed(() => {
  return data.value.drinks ? data.value.drinks.map((item) => item) : [];
});
</script>
