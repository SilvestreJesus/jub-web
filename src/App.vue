<template>
  <v-app>
    <router-view />
    <auth-dialog />
    <v-snackbar 
      v-model="appStore.snackbarVisible"
      :color="appStore.snackbarColor" 
      location="bottom center" 
      timeout="-1" 
      >
      <div class="d-flex align-center">
      <v-icon start :icon="appStore.snackbarIcon" class="mr-3"></v-icon>
    <div>
      <div class="text-subtitle-1 font-weight-bold">{{ appStore.snackbarTitle }}</div>
      <div>{{ appStore.snackbarMessage }}</div>
    </div>
  </div>
      <template v-slot:actions>
        <v-btn 
          class="px-3"
          density="comfortable" 
          rounded="lg" 
          text="Got it!" 
          variant="tonal" 
          @click="appStore.snackbarVisible=false"
        />
      </template>
      <v-progress-linear
        absolute
        bottom
        indeterminate
        color="white"
        height="4"
      ></v-progress-linear>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
// const snackbarVisible = computed(() => appStore.isSnackbarVisible());
// const snackbarMessage = computed(() => appStore.getSnackbarMessage());
// const snackbarColor = computed(() => appStore.getSnackbarColor());

//
</script>
