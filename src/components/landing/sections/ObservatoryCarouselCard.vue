<template>
  <v-card color="white"  rounded="xl" class="pa-6 mx-auto" max-width="1000">
    <v-card-title class="text-h5 font-weight-bold text-center mb-6"> {{ title }} </v-card-title>

    <v-card-text >
      <v-row>
        <v-col cols="12" md="6">
          <v-row dense>
            <v-col cols="12">
              <v-img :src="chartImage1" cover class="rounded-lg bg-grey-lighten-3" height="200"></v-img>
            </v-col>
            <v-col cols="12">
              <v-img :src="chartImage2" cover class="rounded-lg bg-grey-lighten-3" height="200"></v-img>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="6" class="d-flex flex-column ga-4">
          <p class="text-body-1 text-grey-darken-1">
            {{ description }}
          </p>

          <div class="text-grey-darken-1">
            Producido por: <span class="text-secondary-blue font-weight-bold">{{ author }}</span>
          </div>

          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-eye" size="small" color="grey-darken-1" class="ms-2"></v-icon>
            <span class="text-grey-darken-1">({{ reviews }} reviews)</span>
          </div>
        
          <div class="d-flex align-center ga-2">
            <v-rating :model-value="rating" color="amber" density="compact" half-increments readonly></v-rating>
            <span class="text-grey-darken-1">({{ reviews }} reviews)</span>
          </div>


          <div class="d-flex flex-wrap ga-2">
            <p class="text-body-1 text-grey-darken-1">Etiquetas:</p>
            <v-chip v-for="tag in tags" :key="tag" size="small" color="blue-grey-lighten" prepend-icon="mdi-tag">
              {{ tag }}
            </v-chip>
          </div>

          <v-spacer></v-spacer>

          <v-btn size="large"  color="secondary-blue" rounded="pill" class="text-none mt-4"> VER MÁS </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
  description: string;
  author: string;
  rating: number;
  reviews: number;
  tags: string[];
  chartImage1?: string;
  chartImage2?: string;
}>();
</script>