export default defineEventHandler((event) => {
  const query = getQuery(event);

  return $fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query.searchParam}`);
});
