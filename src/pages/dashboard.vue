<template>
  <v-container max-width="1400" class="py-8">
    
    <v-row justify="center" class="mb-10 mt-4">
      <v-col cols="12" md="10" lg="8" class="text-center">
        
        <h1 class="text-h3 font-weight-black mb-3">Observatorios</h1>
        <p class="text-body-1 text-grey-darken-1 mb-8">
          Escribe tu consulta DSL para filtrar y explorar los conjuntos de datos.
        </p>

        <div class="position-relative">
          <v-text-field 
            id="search-input" 
            v-model="searchQuery" 
            :rules="dslRules"
            validate-on="input" 
            placeholder="Ej: jub.v1.VS(TAMPS).VT(2025)" 
            variant="solo" 
            elevation="3"
            rounded="xl" 
            bg-color="surface" 
            clearable 
            hide-details="auto"
            class="text-body-1"
            @keyup.enter="executeSearch" 
            @update:model-value="handleTyping"
          >
            <template v-slot:prepend-inner>
              <v-icon color="primary" class="mr-2">mdi-database-search-outline</v-icon>
            </template>
            <template v-slot:append-inner>
              <v-icon color="grey-darken-1">mdi-tune</v-icon>
            </template>
          </v-text-field>

          <v-menu 
            v-model="showAutocomplete" 
            activator="#search-input" 
            :close-on-content-click="true"
            :open-on-click="false" 
            :open-on-focus="false" 
            offset-y
            location="bottom center"
          >
            <v-card rounded="xl" elevation="4" class="mt-2 border">
              <v-list v-if="dynamicSuggestions.length > 0" max-height="300" bg-color="surface">
                <v-list-item 
                  v-for="item in dynamicSuggestions" 
                  :key="item" 
                  @click="insertSuggestion(item)"
                  class="cursor-pointer transition-swing"
                  hover
                >
                  <template v-slot:prepend>
                    <v-icon size="small" color="secondary-blue" class="mr-3">mdi-tag-outline</v-icon>
                  </template>
                  <v-list-item-title class="font-weight-bold text-primary">
                    {{ item }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>

      </v-col>
    </v-row>

    <v-row align="center" justify="space-between" class="mb-4" v-if="filteredObservatories.length > 0 || searchCounter > 0">
      <v-col cols="auto">
        <v-btn variant="text" color="grey-darken-1" prepend-icon="mdi-help-circle-outline" class="text-none text-caption font-weight-bold">
          ¿Cómo realizar búsquedas usando identificadores?
        </v-btn>
      </v-col>

      <v-col cols="auto" class="d-flex align-center ga-4">
        <span class="text-caption font-weight-bold text-grey-darken-1">
          {{ filteredObservatories.length }} resultados
        </span>

        <v-btn-toggle
          v-model="viewMode"
          color="primary"
          variant="outlined"
          divided
          rounded="pill"
          density="comfortable"
          mandatory
        >
          <v-btn value="grid" icon="mdi-view-grid-outline" size="small"></v-btn>
          <v-btn value="table" icon="mdi-table" size="small"></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider class="mb-6" v-if="filteredObservatories.length > 0 || searchCounter > 0"></v-divider>

    <v-row v-if="viewMode === 'grid' && filteredObservatories.length > 0" class="d-flex align-stretch">
      <v-col v-for="observatory in filteredObservatories" :key="observatory.observatory_id" cols="12" sm="6" md="4">
        <ObservatoryCard :observatory="observatory" @show-details="goToDetails" class="h-100" />
      </v-col>
    </v-row>

    <v-row v-else-if="viewMode === 'table' && filteredObservatories.length > 0">
      <v-col cols="12">
        <v-card rounded="xl" elevation="2" class="overflow-hidden border">
          <ObservatoryTables :items="filteredObservatories" @show-details="goToDetails" />
        </v-card>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-8" v-else-if="searchCounter > 0 && filteredObservatories.length === 0">
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="0" color="transparent" class="text-center pa-8">
          <v-empty-state
            icon="mdi-package-variant-remove"
            image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
            headline="Sin observatorios asociados"
            title="No hay observatorios asociados a esta consulta."
            text="Pero puedes programar una nueva tarea para crear un observatorio privado que podrás publicar después."
            action-text="Personalizar Tarea de Observatorio"
            @click:action="showCreateDialog = true"
            color="primary"
            action-color="black"
          ></v-empty-state>
        </v-card>
      </v-col>
    </v-row>

    <CreateObservatoryDialog :model-value="showCreateDialog" @update:model-value="showCreateDialog = $event" />
  
  </v-container>

  
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { type ObservatoryDTO } from '@/types/index.types';
import { useJubStore } from '@/stores/jub';
import { useRouter } from 'vue-router'
import { useAppStore,SnackbarColor } from '@/stores/app';


definePage({
  name: 'Dashboard',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

const showCreateDialog      = ref(false);
const appStore              = useAppStore();
const router                = useRouter();
const jubStore              = useJubStore();
const filteredObservatories = ref<ObservatoryDTO[]>([]);
const viewMode              = ref<'grid' | 'table'>('grid');
const searchQuery           = ref('jub.v1.VS(*).VT(*).VI(*)');
const showAutocomplete      = ref(false);
const dynamicSuggestions    = ref<string[]>([]);

const catalogData = {
  'DATASOURCE1': ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  'DATASOURCE2': ['2023', '2024', '2025', '2026'],
  'DATASOURCE3': ['SEX.M', 'SEX.F', 'CIE10.C50'],
  "VS": ['TAMPS', 'CDMX', 'NL', 'MEXICO'],
  "VT": ['2023', '2024', '2025', '2026'],
  "VI": ['SEX.M', 'SEX.F', 'CIE10.C50']
};


const searchCounter = ref(0);  

const newTask = ref({
  name: '',
  privacy: '',
  dataSource: '',
  catalogs: [] as string[],
});
const handleCreateTask = () => {
  console.log("Nueva tarea configurada:", newTask.value);
  appStore.showSnackbar("Tarea creada exitosamente", 3000, SnackbarColor.SUCCESS);
  showCreateDialog.value = false; // Cierra el diálogo después de manejar la creación
};
const validateDsl = (v: string): true | string => {
  // 1. Allow it to be empty (if you want users to be able to clear the search)
  if (!v) return true;

  // 2. Must start exactly with the version prefix
  if (!v.startsWith('jub.v1.')) {
    return "La consulta debe iniciar con 'jub.v1.'";
  }

  // 3. Extract the core query after the prefix
  const coreQuery = v.substring(7).trim();
  if (coreQuery.length === 0) {
    return "Debes incluir al menos un catálogo (VS, VT o VI)";
  }

  // 4. Regex to validate the structure:
  // - (?:VS|VT|VI) : Strictly allows only VS, VT, or VI
  // - \([^)]+\)    : Requires parentheses with some content inside (e.g., "(2024)")
  // - (?:\s*(?:AND)?\s*)? : Optionally allows spaces or the word "AND" between functions
  // - ^ ... +$     : Ensures the ENTIRE string matches this pattern, preventing garbage characters
  const isValidStructure = /^(?:(?:VS|VT|VI)\([^)]+\)(?:\s*(?:AND|\.)?\s*)?)+$/.test(coreQuery);

  if (!isValidStructure) {
    return "Formato inválido. Solo usa VS(...), VT(...) o VI(...) con sus condiciones.";
  }

  // Passed all validations
  return true;
};

const dslRules: Array<(v: string) => true | string> = [validateDsl];

const executeSearch = async () => {
  
  searchCounter.value++; // Incrementa el contador cada vez que se ejecuta una búsqueda
  const validationResult = validateDsl(searchQuery.value);

  if (validationResult === true) {
    const result = await jubStore.search_observatories(searchQuery.value);
    console.log("Resultados de la búsqueda:", result);
    filteredObservatories.value = result; // Actualiza la lista de observatorios mostrados  


  } else {
    // If it's invalid, Vuetify is already showing the red error text, 
    // so we just stop the function from making a bad API call.
    console.warn("La consulta tiene errores:", validationResult);
  }

};
// 1. State for the autocomplete

// 2. Mock Data (Replace this with calls to your JubStore or Repositories)
// These represent the possible valid tags for each catalog.

// 3. Detect what the user is typing
const handleTyping = (val: string) => {
  if (!val) {
    showAutocomplete.value = false;
    return;
  }

  // Regex Magic: Looks for VS(, VT(, or VI( followed by anything that IS NOT a closing parenthesis.
  // This means the user's cursor is currently inside one of the functions.
  const activeContextMatch = val.match(/(VS|VT|VI)\([^)]*$/);

  if (activeContextMatch) {
    const activeCatalog = activeContextMatch[1] as 'VS' | 'VT' | 'VI'; // e.g., 'VS'

    // Extract what they have typed inside the parentheses so far (e.g., if "VS(TA", extracts "TA")
    const typedInsideParentheses = val.substring(activeContextMatch.index! + activeCatalog.length + 1);

    // Get the correct array of items based on the active catalog
    const availableItems = catalogData[activeCatalog] || [];

    // Filter the items to match what they are typing
    dynamicSuggestions.value = availableItems.filter(item =>
      item.toLowerCase().includes(typedInsideParentheses.toLowerCase())
    );

    // Show the menu if we found matches
    showAutocomplete.value = dynamicSuggestions.value.length > 0;
  } else {
    // User is not actively typing inside a catalog function
    showAutocomplete.value = false;
  }
};

// 4. Inject the selection into the string
const insertSuggestion = (selectedItem: string) => {
  // Find the open function again
  const activeContextMatch = searchQuery.value.match(/(.*)(VS|VT|VI)\([^)]*$/);

  if (activeContextMatch) {
    const textBeforeFunction = activeContextMatch[1]; // e.g., "jub.v1."
    const activeCatalog = activeContextMatch[2];      // e.g., "VS"

    // Rebuild the string: Text Before + Catalog + ( + Selected Item + ).
    // We automatically add the closing parenthesis and a dot so they can start typing the next one!
    searchQuery.value = `${textBeforeFunction}${activeCatalog}(${selectedItem}).`;

    // Close the menu and trigger validation
    showAutocomplete.value = false;
  }
};


const goToDetails = (observatory: ObservatoryDTO) => {
  router.push({ name: 'ObservatoryDetails', params: { observatory_id: observatory.observatory_id } });

};


onMounted(async () => {
  // jubStore.fetchObservatories();
  await executeSearch();
  // filteredObservatories.value = await jubStore.search_observatories(searchQuery.value); // Carga inicial con la consulta por defecto
});




</script>