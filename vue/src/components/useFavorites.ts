import { ref, watch } from "vue";

const FAVORITES_KEY = "emoji-favorites";
const favorites = ref<string[]>(
  JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
);

watch(
  favorites,
  (val) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(val));
  },
  { deep: true }
);

export function useFavorites() {
  function isFavorite(name: string) {
    return favorites.value.includes(name);
  }
  function toggleFavorite(name: string) {
    if (isFavorite(name)) {
      favorites.value = favorites.value.filter((n) => n !== name);
    } else {
      favorites.value.push(name);
    }
  }
  return { favorites, isFavorite, toggleFavorite };
}
