<template>
    <h1>Profile</h1>
</template>

<script lang="ts" setup>
definePage({
    name: 'UserProfile',
    meta:{
        requiresAuth: false,
        layout: 'profile'
    }
})
</script>