<template>
  <main>
    <EmojiList @emoji-click="openModal" />
    <Transition name="fade">
      <div
        v-show="selectedEmoji"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-2 py-4 overflow-y-auto"
        @click.self="closeModal">
        <Transition name="modal">
          <div
            v-if="selectedEmoji"
            class="bg-white rounded-3xl shadow p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg relative mx-auto my-auto">
            <button
              @click="closeModal"
              class="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 p-2 bg-gray-200 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:text-gray-500 transition duration-200 text-xl sm:text-2xl">
              <Icon
                icon="material-symbols:close"
                class="font-black text-4xl sm:text-7xl" />
            </button>
            <div class="flex flex-col gap-2">
              <div
                v-html="selectedEmoji.htmlCode[0]"
                class="text-5xl sm:text-7xl text-center"></div>
              <h2
                class="text-lg sm:text-2xl font-bold mt-2 overflow-x-auto whitespace-nowrap">
                {{ selectedEmoji.name }}
              </h2>
              <p>
                <span class="text-amber-300 font-bold">Category:</span>
                {{ selectedEmoji.category }}
              </p>
              <p>
                <span class="text-amber-300 font-bold">Group:</span>
                {{ selectedEmoji.group }}
              </p>
              <p class="break-all">
                <span class="text-amber-300 font-bold">HTML Code:</span>
                {{ selectedEmoji.htmlCode.join(" ") }}
              </p>
              <p class="break-all">
                <span class="text-amber-300 font-bold">Unicode:</span>
                {{ selectedEmoji.unicode.join(" ") }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Emoji } from "@/types/types";
import EmojiList from "@/components/EmojiList.vue";
import { Icon } from "@iconify/vue";

const selectedEmoji = ref<Emoji | null>(null);

function openModal(emoji: Emoji) {
  selectedEmoji.value = emoji;
}
function closeModal() {
  selectedEmoji.value = null;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
