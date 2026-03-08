<template>
  <v-card  class="mx-auto" elevation="2" rounded="xl" max-width="450">
    <v-img :src="observatory.image" height="230" cover class="align-end ma-2 rounded-lg">

      <div class="d-flex align-center justify-center px-4 pb-6 w-100">
        <v-rating :model-value="5" color="amber" density="compact" half-increments readonly size="medium"></v-rating>
        <span class="text-white text-caption ml-2">( {{ observatory.review }} reviews)</span>
      </div>
    </v-img>

    <v-card-item class="text-left pt-2 pb-0">
      <div class="text-h5 font-weight-bold text-capitalize">{{ observatory.name }}</div>
      
      <div class="d-flex justify-start flex-wrap ga-2 mt-2 mb-2">
        <v-chip v-for="role in observatory?.role" :key="role" size="small" color="grey-lighten-2" variant="flat" class="text-grey-darken-3 font-weight-bold">
          {{ role }}
        </v-chip>
      </div>
    </v-card-item>

    <v-card-text class="text-body-2 text-grey-darken-1 text-justify ">
      {{ observatory?.bio }}
    </v-card-text>

    <v-card class="px-4 pb-4 d-flex justify-space-between align-center">
      <div class="text-left">
        <div class="text-caption font-weight-bold text-grey-darken-1" style="line-height: 1;">GRÁFICAS</div>
        <div class="text-h5 font-weight-bold">{{ observatory?.percentage }}+</div>
      </div>

      <v-btn @click="$emit('show-details', observatory)" color="secondary-blue" rounded="lg" size="large" 
        class="text-white font-weight-bold text-none px-10" height="55">
        Ver Más
      </v-btn>
    </v-card>
  </v-card>
</template>

<script setup>
defineProps(['observatory'])
defineEmits(['show-details'])
</script>

