<template>
  <div class="content">
    <SuggestiveSearchField
      v-model="searchParam"
      :suggestions="suggestions"
      placeholder="Enter cocktail name"
      @select="selectSuggestion"
    >
      <template #hint>
        <small>
          Example: <strong>Cosmopolitan</strong>, <strong>Whiskey Sour</strong>,
          <strong>Virgin Mojito</strong>...
        </small>
      </template>
      <template #exclusive>IBA</template>
    </SuggestiveSearchField>
  </div>
</template>

<script setup>
const searchParam = ref("");

const cleanedSearchParam = computed(() => {
  return searchParam.value.trim().toLowerCase();
});

// TODO: update frontend to handle pending state, and errors
const { data, error, pending, execute } = await useLazyFetch("/api/cocktail", {
  query: { searchParam: cleanedSearchParam, immediate: false, server: false },
});

const suggestions = computed(() => {
  return data.value.drinks
    ? data.value.drinks.map((item) => {
        return {
          _id: item.idDrink,
          thumbnail: item.strDrinkThumb,
          exclusive: item.strIBA,
          primaryText: item.strDrink,
          secondaryText: item.strCategory,
          tertiaryText: item.strAlcoholic,
          // TODO: instead of displaying the alcoholic values, we should use them as filters and display the number of results (in total and for each alcoholic category)
        };
      })
    : [];
});

async function selectSuggestion(suggestion) {
  await navigateTo(suggestion.thumbnail, {
    external: true,
  });
}
</script>

<style src="~/assets/styles/global.css" />

<style scoped>
.content {
  display: flex;
  justify-content: center;
  min-height: 90vh;
  padding: 5vh;
}
</style>
