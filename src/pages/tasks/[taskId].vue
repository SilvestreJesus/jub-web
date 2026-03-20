<template>
    <div class="tasks-index">
        <h1>Task Details</h1>
        <p>This is the task details page.</p>
    </div>
</template>
<script lang="ts" setup>
  definePage({
    name: 'TaskDetails',
    meta: {
        requiresAuth: true,
        layout: 'dashboard',
    },
});
</script>