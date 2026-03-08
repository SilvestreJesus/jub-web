<template>
  <v-container class="py-10">
    <div class="text-center mb-10">
      
      <v-responsive max-width="700" class="mx-auto">
        <v-row no-gutters align="center">
          
          <v-col>
            <v-combobox
              v-model:search="dashboardStore.searchQuery"
              placeholder="Busca un observatorio..." 
              variant="solo-filled" 
              rounded="pill" 
              flat 
              bg-color="grey-lighten-3"  
              :items="dashboardStore.dashboard" 
              item-title="name"
              persistent-search
              clearable
              hide-no-data
              :return-object="false"
            >
              <template v-slot:append-inner>
                <v-icon color="grey-darken-1">mdi-tune</v-icon>
              </template>
            </v-combobox>
          </v-col>

          <v-col cols="auto" class="d-flex ml-4">
            <v-btn 
              icon="mdi-view-grid" 
              variant="text" 
              :color="viewMode === 'grid' ? 'primary' : 'grey-darken-3'" 
              @click="viewMode = 'grid'"
              class="mr-1"
            ></v-btn>
            <v-btn 
              icon="mdi-view-list" 
              variant="text" 
              :color="viewMode === 'table' ? 'primary' : 'grey-darken-3'" 
              @click="viewMode = 'table'"
            ></v-btn>
          </v-col>
        </v-row>

        <p class="text-subtitle-2 text-grey-darken-1 mt-3">
          ¿Como realizar busquedas usando identificadores? 
        </p>
      </v-responsive>      
    </div>

    <v-row v-if="viewMode === 'grid'">
        <v-col v-for="observatory in dashboardStore.filteredObservatory" 
            :key="observatory.id" cols="12" sm="6" md="6">
            <ObservatoryCard :observatory="observatory" @show-details="openDialog" />
        </v-col>        
    </v-row>

    <v-row v-else-if="viewMode === 'table'">
      <v-col cols="12">
        <ObservatoryTables :items="dashboardStore.filteredObservatory" @show-details="openDialog" />
      </v-col>
    </v-row>    

    <ObservatoryDialog v-model="showDialog" :observatory="selectedobservatory" />
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDashboardStore, type Dashboard } from '@/stores/dashboard';

definePage({
  name: 'Dashboard',
  meta: {
    requiresAuth: false,
    layout: 'dashboard',
  },
});

const dashboardStore = useDashboardStore();
dashboardStore.initObservatory();

const viewMode = ref<'grid' | 'table'>('grid');

const showDialog = ref(false);
const selectedobservatory = ref<Dashboard | null>(null);

const openDialog = (observatory: Dashboard) => {
  selectedobservatory.value = observatory;
  showDialog.value = true;
};
</script>