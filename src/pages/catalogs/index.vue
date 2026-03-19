<template>
  <v-container max-width="1200" class="py-8">
    
    <v-row class="mb-6" align="center">
      <v-col cols="12" md="7">
        <h1 class="text-h4 font-weight-black mb-1">Catálogos</h1>
        <p class="text-body-1 text-grey-darken-1">Explora y administra las dimensiones de tus observatorios.</p>
      </v-col>
      
      <v-col cols="12" md="5">
        <v-text-field
          v-model="searchQuery"
          variant="solo-filled"
          flat
          rounded="pill"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar por nombre o valor..."
          hide-details
          clearable
          bg-color="surface"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="catalog in filteredCatalogs" :key="catalog.catalog_id" cols="12" sm="6" md="4">
        
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :elevation="isHovering ? 6 : 2"
            rounded="xl"
            class="h-100 transition-swing d-flex flex-column"
            @click="goToCatalog(catalog)"
          >
            <v-card-item class="pb-2 pt-5">
              <template v-slot:prepend>
                <v-avatar color="primary-lighten-1" variant="tonal" rounded="lg">
                  <v-icon>mdi-database-outline</v-icon>
                </v-avatar>
              </template>
              <v-card-title class="text-h6 font-weight-bold text-wrap" style="line-height: 1.2;">
                {{ catalog.name }}
              </v-card-title>
              <v-card-subtitle class="text-caption font-monospace mt-1 font-weight-bold text-primary">
                {{ catalog.value }}
              </v-card-subtitle>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <div class="d-flex flex-wrap ga-2 mt-2">
                <v-chip size="small" variant="flat" color="secondary-blue" class="font-weight-bold">
                  {{ catalog.catalog_type }}
                </v-chip>
                
                <v-chip size="small" variant="tonal" color="grey-darken-2" class="font-weight-medium">
                  Nivel: {{ catalog.level }}
                </v-chip>
                
                <v-chip v-if="catalog.parent_catalog_id" size="small" variant="outlined" color="teal" class="font-weight-medium">
                  <v-icon start size="small">mdi-file-tree</v-icon> Subcatálogo
                </v-chip>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4 bg-grey-lighten-4">
              <v-spacer></v-spacer>
              <v-btn 
                :to="{ name: 'CatalogDetails', params: { catalogId: catalog.catalog_id } }"
                color="black" 
                variant="text" 
                append-icon="mdi-arrow-right" 
                class="text-none font-weight-bold"
              >
                Ver Ítems
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>

      </v-col>
    </v-row>

    <v-row v-if="filteredCatalogs.length === 0" justify="center" class="mt-10">
      <v-col cols="12" class="text-center">
        <v-empty-state
          icon="mdi-database-search-outline"
          title="No se encontraron catálogos"
          text="Intenta con otro término de búsqueda o crea un nuevo catálogo."
        ></v-empty-state>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePage({
  name: 'Catalogs',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const router = useRouter();
const searchQuery = ref('');

// 1. Interfaces basadas en tus modelos de Python
interface CatalogDTO {
  catalog_id: string;
  root_group_id?: string | null;
  name: string;
  value: string; // UpperSnakeStr
  catalog_type: string; // Enum CatalogType
  parent_catalog_id?: string | null;
  level: number;
}

// 2. Mock Data simulando la respuesta de tu backend
const catalogs = ref<CatalogDTO[]>([
  {
    catalog_id: 'cat_001',
    name: 'Variables de Salud Pública',
    value: 'VAR_SALUD',
    catalog_type: 'SYSTEM',
    level: 0
  },
  {
    catalog_id: 'cat_002',
    name: 'Grupos de Edad Estándar',
    value: 'EDAD_ESTANDAR',
    catalog_type: 'DEMOGRAPHIC',
    level: 0
  },
  {
    catalog_id: 'cat_003',
    name: 'Subclasificación CIE-10',
    value: 'CIE_10_SUB',
    catalog_type: 'MEDICAL',
    parent_catalog_id: 'cat_010', // Indica que es hijo de otro
    level: 1
  },
  {
    catalog_id: 'cat_004',
    name: 'Entidades Federativas (México)',
    value: 'ESTADOS_MX',
    catalog_type: 'GEOGRAPHIC',
    level: 0
  },
  {
    catalog_id: 'cat_005',
    name: 'Sectores Económicos',
    value: 'SECTORES_ECON',
    catalog_type: 'USER_DEFINED',
    level: 0
  }
]);

// 3. Lógica de Búsqueda
const filteredCatalogs = computed(() => {
  if (!searchQuery.value) return catalogs.value;
  
  const query = searchQuery.value.toLowerCase();
  return catalogs.value.filter(cat => 
    cat.name.toLowerCase().includes(query) || 
    cat.value.toLowerCase().includes(query) ||
    cat.catalog_type.toLowerCase().includes(query)
  );
});

// 4. Navegación al Detalle
const goToCatalog = (catalog: CatalogDTO) => {
  // Redirige a la página de detalles del catálogo (la construiremos después)
  console.log('Navegando al catálogo:', catalog.catalog_id);
  
  // Descomenta esto cuando la página exista:
  // router.push({ name: 'CatalogDetails', params: { id: catalog.catalog_id } });
};
</script>