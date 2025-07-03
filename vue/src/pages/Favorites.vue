<template>
  <main class="flex-1 ml-70 overflow-y-auto">
    <div class="pt-5.5">
      <h2 class="text-5xl text-amber-300 font-extrabold py-8">Favorites</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        <div
          v-for="emoji in favoriteEmojis"
          :key="emoji.name"
          class="p-4 bg-gray-50 rounded-4xl flex flex-col items-center relative">
          <div v-html="emoji.htmlCode[0]" class="text-7xl"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useFavorites } from "@/components/useFavorites";
import type { Emoji } from "@/types/types";

const { favorites } = useFavorites();
const favoriteEmojis = ref<Emoji[]>([]);

const fetchEmojis = async () => {
  const response = await axios.get("https://emojihub.yurace.pro/api/all");
  favoriteEmojis.value = response.data.filter((e: Emoji) =>
    favorites.value.includes(e.name)
  );
};

onMounted(fetchEmojis);
</script>
