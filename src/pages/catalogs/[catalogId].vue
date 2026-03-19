<template>
  <v-container max-width="1200" class="py-8">
    
    <v-btn 
      variant="text" 
      prepend-icon="mdi-arrow-left" 
      class="text-none font-weight-bold mb-4 px-0"
      @click="goBack"
    >
      Volver a Catálogos
    </v-btn>

    <v-card rounded="xl" elevation="1" class="mb-8 border-s-lg" style="border-left-color: rgb(var(--v-theme-primary)) !important;">
      <v-card-text class="d-flex align-center justify-space-between flex-wrap ga-4 pa-6">
        <div>
          <div class="d-flex align-center ga-3 mb-1">
            <h1 class="text-h4 font-weight-black">{{ currentCatalog?.name }}</h1>
            <v-chip color="primary" variant="flat" size="small" class="font-monospace font-weight-bold">
              {{ currentCatalog?.value }}
            </v-chip>
          </div>
          <p class="text-body-1 text-grey-darken-1 mb-0">
            Gestiona los elementos, códigos y alias de esta dimensión.
          </p>
        </div>

        <div class="d-flex ga-2">
          <v-chip prepend-icon="mdi-tag-outline" color="secondary-blue" variant="tonal" class="font-weight-bold">
            {{ currentCatalog?.catalog_type }}
          </v-chip>
          <v-chip prepend-icon="mdi-layers-outline" color="teal" variant="tonal" class="font-weight-bold">
            Nivel {{ currentCatalog?.level }}
          </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <v-row class="mb-2" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchItem"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar ítem por nombre, código o alias..."
          hide-details
          clearable
          bg-color="surface"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end">
        <v-btn color="black" prepend-icon="mdi-plus" rounded="lg" class="text-none font-weight-bold">
          Nuevo Ítem
        </v-btn>
      </v-col>
    </v-row>

    <v-card rounded="xl" elevation="2" class="overflow-hidden border">
      <v-table hover>
        <thead class="bg-grey-lighten-4">
          <tr>
            <th class="text-left font-weight-bold text-uppercase text-caption">Código</th>
            <th class="text-left font-weight-bold text-uppercase text-caption">Valor</th>
            <th class="text-left font-weight-bold text-uppercase text-caption">Nombre / Descripción</th>
            <th class="text-left font-weight-bold text-uppercase text-caption">Tipo de Dato</th>
            <th class="text-left font-weight-bold text-uppercase text-caption">Alias Conocidos</th>
            <th class="text-right font-weight-bold text-uppercase text-caption">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.catalog_item_id">
            <td class="font-weight-medium text-grey-darken-2">
              {{ item.code }}
            </td>
            
            <td>
              <v-chip size="small" variant="tonal" color="primary-darken-1" class="font-monospace font-weight-bold">
                {{ item.value }}
              </v-chip>
            </td>
            
            <td class="font-weight-bold">
              {{ item.name }}
            </td>
            
            <td>
              <v-chip size="x-small" variant="outlined" color="grey-darken-2" class="font-weight-bold">
                {{ item.value_type }}
              </v-chip>
            </td>

            <td>
              <div class="d-flex flex-wrap ga-1 py-2">
                <v-chip 
                  v-for="alias in item.aliases" 
                  :key="alias.catalog_item_alias_id"
                  size="x-small" 
                  color="grey-lighten-2" 
                  variant="flat"
                  class="text-grey-darken-3 font-weight-medium"
                >
                  {{ alias.value }}
                </v-chip>
                <span v-if="item.aliases.length === 0" class="text-caption text-grey-lighten-1">
                  Sin alias
                </span>
              </div>
            </td>

            <td class="text-right">
              <v-btn icon="mdi-pencil-outline" variant="text" size="small" color="grey-darken-1"></v-btn>
              <v-btn icon="mdi-delete-outline" variant="text" size="small" color="error"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      
      <div v-if="filteredItems.length === 0" class="pa-8 text-center">
        <v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-text-box-search-outline</v-icon>
        <div class="text-body-1 text-grey-darken-1">No se encontraron ítems que coincidan con la búsqueda.</div>
      </div>
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePage({
  name: 'CatalogDetails',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const router = useRouter();
const searchItem = ref('');

// 1. Información del Catálogo Padre (Simulado)
const currentCatalog = ref({
  catalog_id: 'cat_004',
  name: 'Entidades Federativas (México)',
  value: 'ESTADOS_MX',
  catalog_type: 'SPATIAL', // Tipo Espacial
  level: 1
});

// 2. Interfaces basadas en tus clases de Python
interface CatalogItemAliasDTO {
  catalog_item_alias_id: string;
  value: string;
  value_type: string;
}

interface CatalogItemDTO {
  catalog_item_id: string;
  name: string;
  value: string; // UpperSnakeStr
  code: number;
  value_type: string; // CatalogItemValueType Enum
  aliases: CatalogItemAliasDTO[];
}

// 3. Mock Data de los Ítems (CatalogItemX) y sus Alias
const items = ref<CatalogItemDTO[]>([
  {
    catalog_item_id: 'item_001',
    name: 'Tamaulipas',
    value: 'TAMPS',
    code: 28,
    value_type: 'STRING',
    aliases: [
      { catalog_item_alias_id: 'al_1', value: 'Tamps', value_type: 'STRING' },
      { catalog_item_alias_id: 'al_2', value: 'Tamaulipas Estado', value_type: 'STRING' }
    ]
  },
  {
    catalog_item_id: 'item_002',
    name: 'Ciudad de México',
    value: 'CDMX',
    code: 9,
    value_type: 'STRING',
    aliases: [
      { catalog_item_alias_id: 'al_3', value: 'D.F.', value_type: 'STRING' },
      { catalog_item_alias_id: 'al_4', value: 'Distrito Federal', value_type: 'STRING' },
      { catalog_item_alias_id: 'al_5', value: 'Ciudad de Mexico', value_type: 'STRING' }
    ]
  },
  {
    catalog_item_id: 'item_003',
    name: 'Nuevo León',
    value: 'NL',
    code: 19,
    value_type: 'STRING',
    aliases: [
      { catalog_item_alias_id: 'al_6', value: 'NL', value_type: 'STRING' },
      { catalog_item_alias_id: 'al_7', value: 'Nuevo Leon', value_type: 'STRING' }
    ]
  }
]);

// 4. Lógica de Búsqueda reactiva
const filteredItems = computed(() => {
  if (!searchItem.value) return items.value;
  
  const query = searchItem.value.toLowerCase();
  return items.value.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.value.toLowerCase().includes(query) ||
    item.code.toString().includes(query) ||
    // Buscar también dentro de los alias
    item.aliases.some(alias => alias.value.toLowerCase().includes(query))
  );
});

const goBack = () => {
  router.push({ name: 'Catalogs' });
};
</script>