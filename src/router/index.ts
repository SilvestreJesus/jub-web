/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore, type VerifyDTO } from '@/stores/auth'
import { useAppStore,SnackbarColor } from '@/stores/app'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})




router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const appStore = useAppStore();
  const requiresAuth = to.meta.requiresAuth || false;

  console.log(`Navigating from ${from.fullPath} to ${to.fullPath} - [requiresAuth: ${requiresAuth}]`)
  const token    = localStorage.getItem('token');
  const secret   = localStorage.getItem('secret');
  const username = localStorage.getItem('username');

  // if (to.fullPath == "/" && token && secret && username) {
  //   const isAuthenticated = await authStore.verifyToken({ access_token: token, secret, username } as VerifyDTO)

  //   if (isAuthenticated) {
  //     console.log("User already authenticated, redirecting to /dashboard")
  //     return next(from.fullPath != "/" ? from.fullPath : {name:"Dashboard"})
  //   }
  // }

  if (!requiresAuth ) {

    return next() 
  } 

  else if (!token || !secret || !username) {
    // console.log("Missing authentication data, redirecting to home.")
    appStore.showSnackbar("Por favor, inicie sesión para acceder a esta página.",2000, SnackbarColor.WARNING)
    if (requiresAuth) {
      return next("/signin")
    }
    return next("/")
  } 
  
  else {
    const isAuthenticated = await authStore.verifyToken({ access_token: token, secret, username } as VerifyDTO)
    
    if (!isAuthenticated) {
      // console.log("Invalid token, redirecting to home and clearing local storage.")
      appStore.showSnackbar("Su sesión ha expirado, por favor inicie sesión nuevamente.",2000, SnackbarColor.ERROR) 
      authStore.clearLocalStorage();
      return next("/signin")
    }
    return next()
  }
  // Scroll to top on route change
  // TODO: Add authentication checks here
  // next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
