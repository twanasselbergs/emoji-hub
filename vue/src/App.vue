<template>
  <main class="container mx-auto">
    <Sidebar />
    <router-view />
  </main>
</template>

<script lang="ts" setup>
import Sidebar from "@/components/layout/Sidebar.vue";
</script>
