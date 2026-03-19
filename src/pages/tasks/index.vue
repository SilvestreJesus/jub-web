<template>
  <v-container max-width="1000" class="py-8">
    
    <div class="mb-8 d-flex align-center justify-space-between">
      <div>
        <h1 class="text-h4 font-weight-black mb-1">Estado de tareas</h1>
        <p class="text-body-1 text-grey-darken-1">Monitorea la generación de productos y configuración de observatorios.</p>
      </div>
      <v-btn color="primary" variant="tonal" prepend-icon="mdi-refresh" @click="refreshTasks">
        Actualizar
      </v-btn>
    </div>

    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-info)) !important;">
          <div class="text-overline text-grey-darken-1">En Progreso</div>
          <div class="text-h4 font-weight-bold text-info">{{ pendingCount }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-success)) !important;">
          <div class="text-overline text-grey-darken-1">Completadas</div>
          <div class="text-h4 font-weight-bold text-success">{{ successCount }}</div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="1" class="pa-4 border-s-lg" style="border-left-color: rgb(var(--v-theme-error)) !important;">
          <div class="text-overline text-grey-darken-1">Fallidas</div>
          <div class="text-h4 font-weight-bold text-error">{{ failedCount }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-card rounded="xl" elevation="2" class="overflow-hidden">
      <v-list lines="three" bg-color="surface">
        <template v-for="(task, index) in tasks" :key="task.id">
          
          <v-list-item class="pa-4">
            <template v-slot:prepend>
              <v-avatar :color="getStatusColor(task.status) + '-lighten-4'" size="48" class="mr-4">
                <v-icon :color="getStatusColor(task.status)">{{ getStatusIcon(task.status) }}</v-icon>
              </v-avatar>
            </template>

            <v-list-item-title class="text-h6 font-weight-bold mb-1">
              {{ task.title }}
            </v-list-item-title>
            
            <v-list-item-subtitle class="text-body-2 mb-2 text-wrap">
              {{ task.description }}
            </v-list-item-subtitle>

            <div v-if="task.status === 'running' || task.status === 'pending'" class="mt-3">
              <div class="d-flex justify-space-between text-caption font-weight-medium mb-1 text-grey-darken-1">
                <span>{{ task.status === 'pending' ? 'En cola...' : 'Generando productos...' }}</span>
                <span>{{ task.progress }}%</span>
              </div>
              <v-progress-linear
                :model-value="task.progress"
                :color="getStatusColor(task.status)"
                height="6"
                rounded
                :indeterminate="task.status === 'pending'"
              ></v-progress-linear>
            </div>

            <div class="mt-3 d-flex align-center flex-wrap ga-2">
              <v-chip size="small" variant="flat" :color="getStatusColor(task.status)" class="text-white font-weight-bold text-uppercase">
                {{ task.status }}
              </v-chip>
              <span class="text-caption text-grey-darken-1">
                <v-icon size="small" class="mr-1">mdi-calendar-clock</v-icon>
                Inicio: {{ formatDate(task.createdAt) }}
              </span>
              <span v-if="task.completedAt" class="text-caption text-grey-darken-1">
                <v-icon size="small" class="mr-1">mdi-check-all</v-icon>
                Fin: {{ formatDate(task.completedAt) }}
              </span>
            </div>

            <v-alert
              v-if="task.status === 'failed' && task.errorDetail"
              type="error"
              variant="tonal"
              density="compact"
              class="mt-3 text-caption"
            >
              {{ task.errorDetail }}
            </v-alert>

            <template v-slot:append>
              <div class="d-flex flex-column ga-2 justify-center h-100 ml-4">
                <v-btn 
                  v-if="task.status === 'success'" 
                  color="secondary-blue" 
                  variant="flat" 
                  size="small" 
                  rounded="lg"
                  class="text-none font-weight-bold"
                >
                  Ver Observatorio
                </v-btn>
                <v-btn 
                  v-if="task.status === 'failed'" 
                  color="error" 
                  variant="outlined" 
                  size="small" 
                  rounded="lg"
                  class="text-none font-weight-bold"
                >
                  Reintentar
                </v-btn>
              </div>
            </template>

          </v-list-item>

          <v-divider v-if="index < tasks.length - 1" inset></v-divider>
        </template>

        <v-empty-state
          v-if="tasks.length === 0"
          icon="mdi-clipboard-text-outline"
          title="No hay tareas recientes"
          text="Las tareas de generación de productos aparecerán aquí."
        ></v-empty-state>

      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

definePage({
  name: 'TasksIndex',
  meta: {
    requiresAuth: true,
    layout: 'dashboard',
  },
});

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  progress: number;
  createdAt: string;
  completedAt?: string;
  errorDetail?: string;
}

const tasks = ref<Task[]>([
  {
    id: 'tsk-001',
    title: 'Creación de Observatorio: Salud Pública NL',
    description: 'Procesando catálogos base y generando cruces de variables (VS, VT, VI).',
    status: 'running',
    progress: 65,
    createdAt: '2026-03-18T18:30:00Z',
  },
  {
    id: 'tsk-002',
    title: 'Generación de Productos: Demografía 2025',
    description: 'En espera de recursos del clúster.',
    status: 'pending',
    progress: 0,
    createdAt: '2026-03-18T19:05:00Z',
  },
  {
    id: 'tsk-003',
    title: 'Actualización: Observatorio TAMPS',
    description: 'Ingesta de nuevo archivo YAML con metadatos actualizados.',
    status: 'success',
    progress: 100,
    createdAt: '2026-03-17T10:00:00Z',
    completedAt: '2026-03-17T10:05:00Z',
  },
  {
    id: 'tsk-004',
    title: 'Creación de Observatorio: Economía Global',
    description: 'Error al vincular el catálogo de divisas.',
    status: 'failed',
    progress: 32,
    createdAt: '2026-03-16T14:20:00Z',
    completedAt: '2026-03-16T14:22:00Z',
    errorDetail: 'Timeout en el servicio de catálogos (CatalogService). Código: 504.',
  }
]);

const pendingCount = computed(() => tasks.value.filter(t => t.status === 'pending' || t.status === 'running').length);
const successCount = computed(() => tasks.value.filter(t => t.status === 'success').length);
const failedCount = computed(() => tasks.value.filter(t => t.status === 'failed').length);

const getStatusColor = (status: Task['status']) => {
  const colors = {
    pending: 'warning',
    running: 'info',
    success: 'success',
    failed: 'error'
  };
  return colors[status];
};

const getStatusIcon = (status: Task['status']) => {
  const icons = {
    pending: 'mdi-clock-outline',
    running: 'mdi-loading mdi-spin',
    success: 'mdi-check',
    failed: 'mdi-alert-circle-outline'
  };
  return icons[status];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', { 
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
  }).format(date);
};

const refreshTasks = () => {
  console.log("Actualizando lista de tareas...");
  
};
</script>