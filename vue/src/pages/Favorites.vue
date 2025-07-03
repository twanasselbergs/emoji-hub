<template>
  <main
    class="flex-1 w-full md:ml-80 md:pl-6 px-2 py-4 sm:px-6 md:px-8 overflow-y-auto">
    <div>
      <h2
        class="text-3xl sm:text-4xl md:text-5xl text-amber-300 font-extrabold py-4 sm:py-6 md:py-10">
        Favorites
      </h2>
      <div
        class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-4">
        <div
          v-for="emoji in favoriteEmojis"
          :key="emoji.name"
          class="p-2 sm:p-4 bg-gray-50 rounded-2xl sm:rounded-4xl flex flex-col items-center relative">
          <div
            v-html="emoji.htmlCode[0]"
            class="text-4xl sm:text-6xl md:text-7xl"></div>
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
