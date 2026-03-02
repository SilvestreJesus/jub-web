<template>
  <v-card class="mx-auto pb-2" elevation="2" rounded="xl">
    <v-img :src="member.image" height="250" cover class="ma-2 rounded-lg"></v-img>
    
    <v-card-item class="text-center">
      <div class="text-h6 font-weight-bold text-capitalize">{{ member.name }}</div>
      
      <div class="d-flex align-center justify-center mt-1 grey--text">
        <v-icon size="small" class="mr-1" color="primary-darken-2">mdi-phone</v-icon>
        <span class="text-caption">{{ member.phone }}</span>
      </div>

      <div class="d-flex align-center justify-center mt-2 ga-2">
        <v-avatar size="30" rounded="1">
          <v-img src="@/assets/cinvestav.svg"></v-img> 
        </v-avatar>
        <v-avatar size="30" rounded="1">
          <v-img :src="member.country"></v-img> 
        </v-avatar>
        <v-chip size="small" color="grey-lighten-3" variant="flat">{{ member.role[0] }}</v-chip>
      </div>
    </v-card-item>

    <v-card-actions class="justify-center">
      <v-btn variant="text" color="primary" class="text-none" @click="$emit('show-details', member)">
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps(['member'])
defineEmits(['show-details'])
</script>