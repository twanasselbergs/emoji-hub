<template>
  <div class="flex">
    <div class="flex-1 ml-64 overflow-y-auto">
      <div class="p-6">
        <h2 class="text-5xl text-amber-300 font-extrabold py-8">Home</h2>
        <div class="relative mb-6">
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-amber-300 pointer-events-none">
            <Icon icon="material-symbols:search-rounded" />
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="Search emojis..."
            class="pl-12 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-200" />
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          <div
            v-for="emoji in filteredEmojis"
            :key="emoji.name"
            @click="onEmojiClick(emoji)"
            class="cursor-pointer p-4 bg-gray-50 hover:bg-amber-100 transition-colors duration-200 rounded-4xl flex flex-col items-center relative group">
            <button
              @click.stop="toggleFavorite(emoji.name)"
              class="absolute top-3 right-3 z-10 text-2xl cursor-pointer"
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
            <div v-html="emoji.htmlCode[0]" class="text-7xl"></div>
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
