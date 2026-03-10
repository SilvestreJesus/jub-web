<template>
  <v-card rounded="xl">
    <v-table class="text-center">
      <thead>
        <tr class="bg-grey text-black">
          <th class="text-center">Nombre</th>
          <th class="text-center">Descripción</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.observatory_id">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <v-btn size="small" variant="text" color="primary" @click="$emit('show-details', item)">
              Ver detalles
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import { type ObservatoryDTO } from '@/types/index.types';

defineProps<{
  items: ObservatoryDTO[];
}>()


defineEmits(['show-details']);
</script>