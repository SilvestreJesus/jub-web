<template>
  <div class="mictlanx-page bg-background">
    
    <v-sheet class="hero-section d-flex flex-column align-center justify-center pt-16 pb-16" color="grey-darken-4">
      
      <v-container class="text-center position-relative z-10" max-width="800">
        
        <v-img
          src="@/assets/mictlanx.svg" 
          alt="MictlanX Logo"
          width="240"
          class="mx-auto mb-4"
        ></v-img>

        <h1 class="text-h2 text-white mb-2" style="font-family: Georgia, serif !important;">
          MictlanX
        </h1>

        <p class="text-body-1 text-grey-lighten-1 mb-6" style="font-family: monospace;">
          Disponibilidad de los datos de forma segura.
        </p>

        <h2 class="text-h5 font-weight-bold text-white mb-10">
          Servicio de almacenamiento de objetos distribuido
        </h2>

        <div class="d-flex justify-center flex-wrap gap-4 mb-8">
          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
          >
            Reporte técnico
          </v-btn>
          
          <v-btn
            color="primary"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8"
            @click="onClickDocs"
          >
            Docs
          </v-btn>
          
          <v-btn
            color="grey-darken-2"
            rounded="pill"
            size="large"
            elevation="0"
            class="text-none font-weight-bold px-8 text-white"
            @click="onClickDemo"
          >
            Demo
          </v-btn>
        </div>

        <div class="d-flex justify-center flex-wrap gap-2 pb-16">
          <v-chip
            v-for="tag in ['Prod4', 'Meta 4', 'E1-C1', 'E1-C2', 'E4-C2']"
            :key="tag"
            color="primary-darken-1"
            variant="flat"
            class="text-white font-weight-bold px-4"
          >
            {{ tag }}
          </v-chip>
        </div>

      </v-container>
    </v-sheet>


<v-container class="px-4 pb-16">
      <v-card
        class="mx-auto overlap-card mt-n16"
        max-width="1000"
        elevation="6"
        rounded="xl"
      >
        <v-card-text class="pa-8 pa-md-12">
          <div class="text-center mb-12">
            <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">¿Qué es MictlanX?</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px; line-height: 1.6;">
              MictlanX Client es un SDK de Python para un sistema de almacenamiento de objetos descentralizado. 
              Permite transferir objetos grandes de manera confiable a través de un grupo de nodos, manejando transferencias fragmentadas, 
              concurrencia, reintentos y verificaciones de integridad de forma automática.
            </p>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="primary-lighten-1" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="primary">mdi-puzzle-outline</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Datos Segmentados</h3>
              <p class="text-caption text-grey-darken-1">División de archivos grandes para limitar el uso de memoria y permitir transferencias eficientes y seguras.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="teal-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="teal">mdi-shield-check-outline</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Integridad End-to-End</h3>
              <p class="text-caption text-grey-darken-1">Verificación automática de sumas de comprobación (SHA-256) en todas las operaciones de lectura y escritura.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="secondary-blue" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="secondary-blue">mdi-hexagon-multiple-outline</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">Basado en EAV</h3>
              <p class="text-caption text-grey-darken-1">Operación a través de Espacios de Almacenamiento Virtuales (EAV) que facilitan la rotación, el balanceo de carga y la tolerancia a fallos.</p>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="text-center px-4">
              <v-avatar color="amber-lighten-4" variant="tonal" size="64" class="mb-4">
                <v-icon size="32" color="amber-darken-2">mdi-lightning-bolt-outline</v-icon>
              </v-avatar>
              <h3 class="text-subtitle-1 font-weight-bold mb-2">E/S Concurrente</h3>
              <p class="text-caption text-grey-darken-1">Descargas y subidas en paralelo para maximizar el rendimiento de transferencia de datos.</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

<v-sheet class="bg-surface py-16 border-bottom">
      <v-container max-width="1200">
        <div class="text-center mb-12">
          <v-chip color="primary" variant="tonal" class="mb-4 font-weight-bold" size="small">
            Meta 4 • Prod 4
          </v-chip>
          <h2 class="text-h4 font-weight-black text-grey-darken-4 mb-4">Componentes del Sistema</h2>
          <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px;">
            El desarrollo de MictlanX se materializa en componentes técnicos clave, cada uno diseñado con estrictos indicadores de éxito para garantizar su integración en el ecosistema.
          </p>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start mb-4">
                <v-avatar color="primary" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-code-braces</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-primary mb-1">Actividad D1 • E1-C1</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Cliente Ligero</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-0">
                    Biblioteca para operaciones <code>put</code> y <code>get</code> integrada nativamente con Xelhua y Nez. Se entrega empaquetada y operativa con un cumplimiento del 100% de los casos de uso.
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start mb-4">
                <v-avatar color="secondary-blue" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-api</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-secondary-blue mb-1">Actividad D2 • E1-C2</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Orquestador de EAV</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-0">
                    API REST diseñada para crear, listar y gestionar los Espacios de Almacenamiento Virtual (VSS/EAV). Garantiza la disponibilidad del servicio operativo.
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start mb-4">
                <v-avatar color="teal" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-cloud-outline</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-teal mb-1">Actividad D3 • E4-C1</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Conectores Multi-Plataforma</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-0">
                    Adaptadores especializados para colocar y localizar objetos cifrados en diversos servicios de nube pública y privada.
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card rounded="xl" elevation="0" class="h-100 pa-6 border bg-grey-lighten-4 transition-swing hover-card">
              <div class="d-flex align-start mb-4">
                <v-avatar color="amber-darken-2" variant="flat" rounded="lg" class="mr-4 mt-1">
                  <v-icon color="white">mdi-file-certificate-outline</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption font-weight-bold text-amber-darken-2 mb-1">Actividad D4 • E5</div>
                  <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-2">Patente y Licencia</h3>
                  <p class="text-body-2 text-grey-darken-2 mb-0">
                    Registro formal y solicitud de patente de los componentes estructurales ante la autoridad competente, junto con el licenciamiento como software libre.
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-sheet class="bg-grey-darken-4 py-16">
      <v-container max-width="1000">
        <v-row align="center" justify="space-between" class="mb-10">
          <v-col cols="12" md="5">
            <h2 class="text-h4 font-weight-black text-white mb-4">Validación Técnica</h2>
            <p class="text-body-1 text-grey-lighten-1 mb-0">
              El desempeño de la plataforma se sustenta en pruebas rigurosas. Hemos superado las metas establecidas para asegurar un entorno de producción estable y confiable.
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
             <v-chip color="success" variant="flat" class="font-weight-bold px-4" size="large">
               <v-icon start>mdi-check-decagram</v-icon>
               Métricas Cumplidas
             </v-chip>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100 border-success" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="87"
                color="success"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="87" :duration="2" suffix=" %" />
                  <!-- <number-flow animated :value="87" :duration="5000" :formatter="(val:number) => val + '%'"/> -->
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Cliente Ligero</div>
              <div class="text-caption text-grey-lighten-1">Cobertura de pruebas unitarias (Meta: ≥ 80%)</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <div class="d-flex justify-center align-center mb-4" style="height: 90px;">
                <v-icon size="64" color="success">mdi-server-network</v-icon>
              </div>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Orquestador EAV</div>
              <div class="text-caption text-success font-weight-bold text-uppercase mb-1">Operativo</div>
              <div class="text-caption text-grey-lighten-1">Disponibilidad del servicio</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="82"
                color="success"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="82" :duration="2" suffix=" %" />
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Conectores Cloud</div>
              <div class="text-caption text-grey-lighten-1">Pruebas de integración (Meta: ≥ 80%)</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="3" class="text-center">
            <v-card color="rgba(255,255,255,0.05)" rounded="xl" elevation="0" class="pa-6 h-100" style="border: 1px solid rgba(76, 175, 80, 0.3);">
              <v-progress-circular
                :model-value="100"
                color="success"
                size="90"
                width="8"
                class="mb-4"
              >
                <span class="text-h5 font-weight-bold text-white">
                  <vue3-autocounter :startAmount="0" :endAmount="100" :duration="2" suffix=" %" />
                </span>
              </v-progress-circular>
              <div class="text-subtitle-1 font-weight-bold text-white mb-1">Casos de Uso</div>
              <div class="text-caption text-grey-lighten-1">Cumplimiento de los casos pactados</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>


   <v-sheet class="bg-grey-lighten-4 py-16">
      <v-container max-width="1000">
        <h2 class="text-h4 font-weight-black text-center mb-12">Granularidad de Datos</h2>
        
        <v-timeline align="start" side="end">
          
          <v-timeline-item dot-color="primary-lighten-1" size="small">
            <template v-slot:icon>
              <v-icon color="white">mdi-puzzle</v-icon>
            </template>
            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold">1. Chunks (Fragmentos)</h3>
              <p class="text-body-2 text-grey-darken-2">
                Todo payload (memoria o archivo) se segmenta primero en fragmentos de tamaño fijo (ej. 256KB, 1MB). Cada fragmento se indexa (0..N-1) para que pueda transmitirse, reintentarse y verificarse de forma independiente.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item dot-color="secondary-blue" size="small">
            <template v-slot:icon>
              <v-icon color="white">mdi-sphere</v-icon>
            </template>
            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold">2. Balls (Objetos Lógicos)</h3>
              <p class="text-body-2 text-grey-darken-2">
                Los fragmentos se ensamblan en una "Ball". Es la unidad de almacenamiento administrada por el sistema. Contiene los datos crudos ordenados y metadatos descriptivos (tamaño, tipo de contenido, suma de comprobación y etiquetas).
              </p>
              <v-chip size="small" color="white" class="mt-2 font-weight-bold font-monospace text-secondary-blue border">
                ID = {bucket_id, ball_id}
              </v-chip>
            </div>
          </v-timeline-item>

          <v-timeline-item dot-color="teal" size="small">
            <template v-slot:icon>
              <v-icon color="white">mdi-pail</v-icon>
            </template>
            <div class="mb-4">
              <h3 class="text-h6 font-weight-bold">3. Buckets (Contenedores)</h3>
              <p class="text-body-2 text-grey-darken-2">
                Un espacio de nombres lógico que agrupa múltiples Balls. Funciona como un límite de ciclo de vida para datos relacionados. Diferentes Balls pueden compartir el mismo <code>ball_id</code> dentro de un Bucket para crear agrupaciones lógicas (como los cuadros de un video).
              </p>
            </div>
          </v-timeline-item>

        </v-timeline>

      </v-container>
    </v-sheet>


    <v-sheet class="bg-surface py-16">
      <v-container max-width="1200">
        
        <v-row class="mb-10" align="center" justify="center">
          <v-col cols="12" md="10" class="text-center">
            <h2 class="text-h4 font-weight-black mb-4 text-grey-darken-4">Arquitectura de Espacios de Almacenamiento Virtuales (EAV)</h2>
            <p class="text-body-1 text-grey-darken-1 mx-auto" style="max-width: 800px;">
              MictlanX separa la coordinación de los datos de su almacenamiento físico. El sistema se compone de Espacios Virtuales de Almacenamiento independientes e interconectados, logrando alta disponibilidad y escalabilidad masiva.
            </p>
          </v-col>
        </v-row>

        <v-row align="center" justify="space-between">
          
          <v-col cols="12" md="6" class="text-center pr-md-8 mb-8 mb-md-0">
            <v-img
              src="@/assets/vss_full.png"
              alt="Arquitectura EAV de MictlanX"
              max-width="1000"
              class="mx-auto rounded-xl elevation-4 border"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <div class="text-caption text-grey-darken-1 mt-4 font-weight-medium">
              Fig 1. Representación de un Espacio Virtual de Almacenamiento interactuando con el cliente.
            </div>
          </v-col>

          <v-col cols="12" md="6">
            
            <v-card rounded="xl" elevation="0" class="mb-4 border bg-grey-lighten-4 transition-swing hover-card">
              <v-card-text class="pa-5">
                <div class="d-flex align-start">
                  <v-avatar color="primary-darken-2" variant="flat" rounded="lg" class="mr-4 mt-1">
                    <v-icon color="white">mdi-brain</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-1">SPM (Plano de Control)</h3>
                    <p class="text-body-2 text-grey-darken-2 mb-0 text-justify">
                      El <strong>Gestor de Réplicas de Almacenamiento</strong> no procesa archivos. Su propósito es mantener el estado del clúster: monitorea la disponibilidad, administra el mapa de ubicaciones de las réplicas y coordina la recuperación ante fallos.
                    </p>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card rounded="xl" elevation="0" class="mb-4 border bg-grey-lighten-4 transition-swing hover-card">
              <v-card-text class="pa-5">
                <div class="d-flex align-start">
                  <v-avatar color="primary" variant="flat" rounded="lg" class="mr-4 mt-1">
                    <v-icon color="white">mdi-transit-connection-variant</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-1">Router (Punto de Acceso)</h3>
                    <p class="text-body-2 text-grey-darken-2 mb-0 text-justify">
                      Es la puerta de enlace para las operaciones del cliente. Oculta la complejidad de la red y dirige el tráfico consultando al SPM para decidir qué nodos deben almacenar o entregar los datos de forma óptima.
                    </p>
                  </div>
                </div>
              </v-card-text>
            </v-card>

            <v-card rounded="xl" elevation="0" class="border bg-grey-lighten-4 transition-swing hover-card">
              <v-card-text class="pa-5">
                <div class="d-flex align-start">
                  <v-avatar color="secondary-blue" variant="flat" rounded="lg" class="mr-4 mt-1">
                    <v-icon color="white">mdi-server-network</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-1">Nodo de Almacenamiento (Plano de Datos)</h3>
                    <p class="text-body-2 text-grey-darken-2 mb-0 text-justify">
                      Es un servicio ligero responsable de la escritura y lectura física de los fragmentos en el disco. Opera de forma independiente, ejecutando instrucciones sin necesidad de conocer la estructura global del sistema.
                    </p>
                  </div>
                </div>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

 
    <v-sheet class="bg-surface py-16">
      <v-container max-width="800">
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-black mb-2">Colocación y localización de datos simple</h2>
          <p class="text-body-1 text-grey-darken-1">Interactúa con el clúster usando unas cuantas líneas de Python.</p>
        </div>

        <v-card rounded="xl" elevation="10" class="bg-grey-darken-4 overflow-hidden">
          
          <v-toolbar color="rgba(0,0,0,0.2)" density="compact" class="px-4">
            <div class="d-flex ga-2">
              <v-avatar size="12" color="error"></v-avatar>
              <v-avatar size="12" color="warning"></v-avatar>
              <v-avatar size="12" color="success"></v-avatar>
            </div>
            <v-spacer></v-spacer>
            <span class="text-caption text-grey-lighten-1 font-monospace">example_put.py</span>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-content-copy" size="small" variant="text" color="grey"></v-btn>
          </v-toolbar>

          <v-card-text class="pa-6 font-monospace text-body-2" style="line-height: 1.6; color: #e0e0e0;">
            <div class="mb-4">
              <span style="color: #c678dd;">import</span> asyncio<br>
              <span style="color: #c678dd;">from</span> mictlanx <span style="color: #c678dd;">import</span> AsyncClient
            </div>

            <div class="mb-4">
              <span style="color: #c678dd;">async def</span> <span style="color: #61afef;">main</span>():<br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #7f848e; font-style: italic;"># Conecta al enrutador del VSS local</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;uri = <span style="color: #98c379;">"mictlanx://router-0@localhost:60666/?protocol=http&api_version=4"</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;client = AsyncClient(uri=uri, client_id=<span style="color: #98c379;">"client-0"</span>)
            </div>

            <div class="mb-4">
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #7f848e; font-style: italic;"># El cliente fragmenta, reintenta y verifica la integridad por ti</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #c678dd;">await</span> client.put(<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bucket_id=<span style="color: #98c379;">"mictlanx"</span>,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key=<span style="color: #98c379;">"hello-object"</span>,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value=<span style="color: #d19a66;">b"Disponibilidad de los datos de forma segura."</span>,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chunk_size=<span style="color: #98c379;">"1MB"</span><br>
              &nbsp;&nbsp;&nbsp;&nbsp;)
            </div>

            <div>
              asyncio.run(main())
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-sheet>



    <v-footer class="bg-grey-darken-4 pt-12 pb-6 d-flex flex-column border-t" style="border-color: rgba(255,255,255,0.1) !important;">
      <v-container max-width="1200" class="pa-0">
        <v-row justify="center" align="center" class="mb-8">
          <v-img max-width="100" src="@/assets/mictlanx.svg" width="100"/>
        </v-row>
        <v-row justify="space-between" class="mb-8">
          
          <v-col cols="12" md="4" class="text-center text-md-left mb-6 mb-md-0">
            <h3 class="text-h5 font-weight-black text-white mb-4" style="font-family: Georgia, serif !important;">
              MictlanX
            </h3>
            <p class="text-body-2 text-grey-lighten-1 mb-0 mx-auto mx-md-0" style="max-width: 300px;">
              Sistema de almacenamiento descentralizado diseñado para alta disponibilidad y transferencia segura de objetos masivos.
            </p>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <h4 class="text-subtitle-1 font-weight-bold text-white mb-4">Código Abierto</h4>
            <div class="d-flex flex-column align-center ga-3">
              <v-btn
                href="https://github.com/jub-ecosystem/mictlanx-client"
                target="_blank"
                variant="outlined"
                color="grey-lighten-1"
                prepend-icon="mdi-github"
                rounded="pill"
                class="text-none font-weight-bold"
                width="220"
              >
                MictlanX Client
              </v-btn>
              <v-btn
                href="https://github.com/jub-ecosystem/mictlanx-service"
                target="_blank"
                variant="outlined"
                color="grey-lighten-1"
                prepend-icon="mdi-github"
                rounded="pill"
                class="text-none font-weight-bold"
                width="220"
              >
                MictlanX Service
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="text-center text-md-right mt-6 mt-md-0">
            <h4 class="text-subtitle-1 font-weight-bold text-white mb-4">Contacto</h4>
            <p class="text-body-2 text-grey-lighten-1 mb-1">
              <v-icon size="small" class="mr-2">mdi-email-outline</v-icon>
              jesus.castillo.b@cinvestav.mx
            </p>
            <p class="text-body-2 text-grey-lighten-1">
              Cinvestav Unidad Tamualipas, México
            </p>
          </v-col>

        </v-row>

        <v-divider color="grey-darken-2" class="mb-6"></v-divider>

        <v-row>
          <v-col cols="12" class="text-center text-caption text-grey-darken-1">
            &copy; {{ new Date().getFullYear() }} Jub Ecosystem. Todos los derechos reservados. <br>
            Distribuido bajo la Licencia Apache 2.0.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Vue3Autocounter  from 'vue3-autocounter';


definePage({
  name: 'MictlanX',
  meta: {
    requiresAuth: false,
    layout: 'service', 
  },
});

const router = useRouter();
const authStore = useAuthStore();

function onClickDemo() {
  const token = localStorage.getItem('token'); 
  
  if (token) {
    // User is logged in, navigate to the MictlanX specific dashboard/demo
    router.push({ name: 'Dashboard' }); 
  } else {
    // User is not logged in, trigger the global Pinia Auth Dialog
    authStore.pendingRedirect = '/services/mictlanx/demo'; // Or wherever the demo is
    authStore.showAuthDialog = true; 
  }
}

function onClickDocs() {
  window.open('https://jub-ecosystem.github.io/mictlanx-client/#/', '_blank');
}


</script>

<style scoped>
/* 1. Set your background image here. 
  The linear-gradient helps darken the image so the white text stays readable!
*/
.hero-section {
  background-image: linear-gradient(to bottom, rgba(15, 15, 15, 0.8), rgba(20, 20, 20, 0.95)), url('@/assets/mictlanx_hs_25s.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* 2. Z-index ensures the card sits strictly above the background */
.overlap-card {
  position: relative;
  z-index: 20;
}

/* 3. Flexbox gaps for quick spacing */
.gap-4 {
  gap: 16px;
}
.gap-2 {
  gap: 8px;
}
.hover-card:hover {
  background-color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}
</style>