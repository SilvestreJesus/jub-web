<template>
  <v-dialog v-model="internalModel" max-width="500">
    <v-card rounded="xl" class="pa-4">
      <v-row justify="center" class="mt-2">
        <v-avatar size="200" style="border: 6px solid #0089B8">
          <v-img :src="member?.image"></v-img>
        </v-avatar>
      </v-row>

      <v-card-text class="text-center">
        <h2 class="text-h4 font-weight-bold">{{ member?.name }}</h2>
        <div class="d-flex align-center justify-center mt-1 mb-2">
          <v-icon size="small" color="primary-darken-2">mdi-phone</v-icon>
          <span class="ml-1">{{ member?.phone }}</span>
        </div>

        <div class="d-flex align-center justify-center mb-4 ga-2">
          <v-avatar size="30" rounded="1"> <v-img :src="member.country"></v-img> </v-avatar>
          <v-avatar size="30" rounded="1"><v-img src="@/assets/cinvestav.svg"></v-img></v-avatar>
        </div>

        <div class="d-flex justify-center flex-wrap ga-2 mb-4">
          <v-chip v-for="role in member?.role" :key="role" size="small" color="grey-darken-1">
            {{ role }}
          </v-chip>
        </div>

        <p class="text-body-1 text-justify px-4">
          {{ member?.bio }}
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['modelValue', 'member'])
const emit = defineEmits(['update:modelValue'])

const internalModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>