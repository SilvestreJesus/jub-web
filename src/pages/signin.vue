<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="fill-height">
      
      <v-col cols="12" md="7" class="d-flex align-center justify-center bg-white">
        <v-responsive max-width="450" class="pa-10">
          <div class="d-flex flex-column align-center justify-center mb-10">
            <v-img src="@/assets/logo.svg" width="100" class="mb-4" />
            <div class="text-center">
              <h1 class="text-h4 font-weight-bold mb-2">Bienvenido de nuevo</h1>
              <p class="text-grey-darken-1">Ecosistema de concentración y búsqueda de información estratégica</p>
            </div>
          </div>

          <v-btn-toggle v-model="authMode" mandatory rounded="pill" class="mb-8 w-100" color="primary" variant="tonal">
            <v-btn value="signin" class="flex-grow-1 text-none font-weight-bold">Iniciar Sesión</v-btn>
            <v-btn value="signup" class="flex-grow-1 text-none font-weight-bold">Registrarse</v-btn>
          </v-btn-toggle>

          <v-window v-model="authMode" v-if="authMode === 'signin'">
            <v-window-item value="signin">
              <v-form @submit.prevent="handleLogin">
                
                <v-text-field
                  v-model="username"
                  label="Nombre de usuario"
                  placeholder="ej. invitado"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-outline"
                  class="mb-4"
                  rounded="lg"
                  color="primary"
                ></v-text-field>

                <v-expand-transition>
                  <div v-if="username.toLowerCase() !== 'invitado' && username !== ''">
                    <v-text-field
                      v-model="password"
                      label="Contraseña"
                      type="password"
                      variant="outlined"
                      prepend-inner-icon="mdi-lock-outline"
                      class="mb-4"
                      rounded="lg"
                      color="primary"
                    ></v-text-field>
                  </div>
                </v-expand-transition>

                <v-btn
                  block
                  color="primary"
                  size="large"
                  rounded="lg"
                  elevation="0"
                  type="submit"
                  class="text-none font-weight-bold mt-2"
                >
                  {{ username.toLowerCase() === 'invitado' ? 'Entrar como Invitado' : 'Continuar' }}
                </v-btn>
              </v-form>

              <div class="d-flex align-center my-8">
                <v-divider></v-divider>
                    <div class="d-flex align-center justify-center flex-column mx-4">
                        <span class="px-4 text-grey text-caption font-weight-bold">O</span> 
                        <span class="text-grey text-caption font-weight-bold">CONTINUAR CON</span>
                    </div>
                <v-divider></v-divider>
              </div>

              <v-row justify="center" dense>
                <v-col cols="6">
                  <v-btn block variant="outlined" color="grey-lighten-1" size="large" rounded="lg" @click="loginWithGoogle">
                    <v-img src="@/assets/google.png" width="20" class="mr-2" /> Google
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn block variant="outlined" color="grey-lighten-1" size="large" rounded="lg" @click="loginWithFacebook">
                    <v-icon start color="blue-darken-2">mdi-facebook</v-icon> Facebook
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>

          <v-window v-model="authMode" v-else>
            <v-window-item value="signup">
              <v-card variant="flat" class="text-left mt-4">
                <h3 class="text-h6 font-weight-bold mb-4">Acceso Restringido</h3>
                <p class="text-body-2 text-grey-darken-2 mb-4">
                  El acceso a las funciones completas de <strong>Jub</strong> y sus observatorios está reservado. Esto nos permite garantizar la integridad de los datos, resguardar la información privada y asegurar los recursos de procesamiento dedicados para investigaciones aprobadas.
                </p>
                
                <v-alert
                  color="primary"
                  variant="tonal"
                  rounded="lg"
                  icon="mdi-information-outline"
                  class="mb-6 text-body-2"
                >
                  Puedes utilizar la plataforma entrando con el usuario <strong>invitado</strong> en la pestaña de inicio de sesión.
                </v-alert>

                <v-btn block color="black" rounded="lg" size="large" class="text-none font-weight-bold mb-6" @click="goToIndex">
                  Saber más sobre Jub 
                </v-btn>
                
                <p class="text-center text-caption text-grey-darken-1">
                  Para solicitar una cuenta completa, contacta a soporte: <br>
                  <a href="mailto:support@jub.mx" class="text-primary font-weight-bold text-decoration-none">support@jub.mx</a>
                </p>
              </v-card>
            </v-window-item>
          </v-window>

          <p class="mt-10 text-center text-caption text-grey">
            
            Descubre cómo <strong>Jub</strong> puede transformar tu proceso de investigación y análisis de información.
          </p>
        </v-responsive>
      </v-col>

      <v-col cols="12" md="5" class="d-none d-md-flex align-center justify-center login-gradient">
          <div class="floating-box">
             <v-icon size="180" color="white" class="drop-shadow">mdi-shield-lock-outline</v-icon>
          </div>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useAuthStore,type AuthAttemptDTO } from '@/stores/auth';
import { useAppStore,SnackbarColor } from '@/stores/app';



definePage({
  name: 'Signin',
  meta: {
    requiresAuth: false,
    layout: 'default', 
  },
});

const appStore = useAppStore();
const authStore = useAuthStore();
const router = useRouter();
const authMode = ref('signin');
const username = ref('');
const password = ref('');
  
const handleLogin = async () => {
  const usernameFormatted = username.value.trim().toLowerCase();
  
  if (usernameFormatted === 'invitado' || usernameFormatted === 'guest') {
    password.value = import.meta.env.VITE_DEFAULT_GUEST_PASSWORD;
    console.log('Iniciando sesión como invitado...' + password.value);
  }
  const authAttempt:AuthAttemptDTO = {
    username: username.value,
    password: password.value,
    expiration:"1h",
    renew_token:true,
    scope:"jub"
  };
  const result = await authStore.login(authAttempt);
    if (result) {
        router.push('/dashboard');
    } else {
        appStore.showSnackbar('Error de autenticación. Verifica tus credenciales.',2000, SnackbarColor.ERROR);
    }

};

const goToIndex = () => {
  router.push('/');
};

const loginWithGoogle = () => {
  console.log('Autenticando con Google...');
};

const loginWithFacebook = () => {
  console.log('Autenticando con Facebook...');
};
</script>

<style scoped>
.login-gradient {
  background: linear-gradient(135deg, #46d7ff 0%, #00ABDC 100%);
  position: relative;
  overflow: hidden;
}


.floating-box {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 65px;
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  animation: float 4s infinite ease-in-out;
}

.drop-shadow {
  filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
}
  50% { 
    transform: translateY(-20px); 
    border-radius: 300px;
}
}
</style>