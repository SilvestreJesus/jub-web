<template>
    <h1>JUB</h1>
</template>
<script setup lang="ts">
import { jubStore } from '@/stores/jub';
import { onMounted } from 'vue';
const JubStore = jubStore();

definePage({
    name: 'Jub',
    meta: {
        requiresAuth: false,
        layout: 'default',
    },
});

onMounted(() => {
  JubStore.fetchObservatories();
});



</script>