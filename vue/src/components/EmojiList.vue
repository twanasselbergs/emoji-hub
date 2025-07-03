<template>
  <div class="flex flex-col md:flex-row">
    <div class="flex-1 w-full md:ml-80 md:pl-6 overflow-y-auto">
      <div class="p-2 sm:p-4 md:p-6">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl text-amber-300 font-extrabold py-4 sm:py-6 md:py-8">
          Home
        </h2>
        <div class="relative mb-4 sm:mb-6">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-xl sm:text-2xl text-amber-300 pointer-events-none">
            <Icon icon="material-symbols:search-rounded" />
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="Search emojis..."
            class="w-full pl-12 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200 text-base sm:text-lg" />
        </div>
        <div
          class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
          <div
            v-for="emoji in filteredEmojis"
            :key="emoji.name"
            @click="onEmojiClick(emoji)"
            class="cursor-pointer p-2 sm:p-4 bg-gray-50 hover:bg-amber-100 transition-colors duration-200 rounded-2xl sm:rounded-4xl flex flex-col items-center relative group">
            <button
              @click.stop="toggleFavorite(emoji.name)"
              class="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 text-xl sm:text-2xl cursor-pointer"
              :class="
                isFavorite(emoji.name)
                  ? 'text-red-400'
                  : 'text-gray-300 hover:text-red-400'
              "
              aria-label="Toggle favorite">
              <Icon
                :icon="
                  isFavorite(emoji.name)
                    ? 'material-symbols:favorite-rounded'
                    : 'material-symbols:favorite-outline-rounded'
                " />
            </button>
            <div
              v-html="emoji.htmlCode[0]"
              class="text-4xl sm:text-6xl md:text-7xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, defineEmits } from "vue";
import axios from "axios";
import type { Emoji } from "@/types/types";
import { Icon } from "@iconify/vue";
import { useFavorites } from "@/components/useFavorites";

const emits = defineEmits<{
  (e: "emoji-click", emoji: Emoji): void;
}>();

const emojis = ref<Emoji[]>([]);
const loading = ref(true);
const search = ref("");

const { isFavorite, toggleFavorite } = useFavorites();

const fetchEmojis = async () => {
  try {
    const response = await axios.get("https://emojihub.yurace.pro/api/all");
    emojis.value = response.data;
  } catch (error) {
    console.error("Error", error);
  } finally {
    loading.value = false;
  }
};

const filteredEmojis = computed(() =>
  emojis.value.filter((emoji) => {
    const name = emoji.name?.toLowerCase() ?? "";
    const category = emoji.category?.toLowerCase() ?? "";
    const group = emoji.group?.toLowerCase() ?? "";
    const q = search.value.toLowerCase();
    return name.includes(q) || category.includes(q) || group.includes(q);
  })
);

function onEmojiClick(emoji: Emoji) {
  emits("emoji-click", emoji);
}

onMounted(fetchEmojis);
</script>
