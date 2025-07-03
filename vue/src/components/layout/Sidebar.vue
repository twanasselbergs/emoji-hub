<template>
  <aside
    class="w-80 h-[95vh] bg-white shadow border border-gray-100 rounded-4xl flex flex-col py-8 items-center fixed left-6 top-6 transition-all">
    <h1
      class="text-3xl font-extrabold mb-10 text-amber-300 flex items-center gap-2">
      Emoji Hub
    </h1>
    <nav class="flex flex-col gap-2 w-full px-6">
      <router-link
        v-for="sidebarItem in sidebarItems"
        :key="sidebarItem.name"
        :to="sidebarItem.to"
        class="flex items-center gap-3 px-4 py-3 rounded-full font-semibold transition-all duration-200 group"
        :class="
          isActive(sidebarItem)
            ? 'bg-amber-100/70 text-amber-500'
            : 'text-gray-700 hover:bg-amber-100/70 hover:text-amber-500'
        ">
        <Icon :icon="sidebarItem.icon" class="text-3xl" />
        <span>{{ sidebarItem.name }}</span>
      </router-link>
    </nav>
    <div class="mt-auto text-xs text-gray-400 pb-4 pt-8">
      &copy; 2025 Emoji Hub
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";
import { sidebarItems } from "@/data/sidebarItems";

const route = useRoute();

function isActive(item: any) {
  return item.match(route);
}
</script>
