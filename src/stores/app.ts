// Utilities
import { defineStore } from 'pinia'
import {ref} from 'vue'


export enum SnackbarColor {
  ERROR = 'error',
  SUCCESS = 'primary',
  INFO = 'info',
  WARNING = 'warning'
}
export enum SnackbarIcon {
  ERROR = 'mdi-alert-circle',
  SUCCESS = 'mdi-check-circle',
  INFO = 'mdi-information',
  WARNING = 'mdi-alert'
}
export enum SnackbarTitle {
  ERROR = 'Error',
  SUCCESS = 'Éxito',
  INFO = 'Información',
  WARNING = 'Advertencia'
}

export const useAppStore = defineStore('app', ()=>{
  // State
  const isLoading = ref(false)
  const isError  = ref(false) 
  const snackbarMessage = ref('')
  const snackbarTitle = ref(SnackbarTitle.SUCCESS)
  const snackbarIcon = ref(SnackbarIcon.SUCCESS)
  const snackbarVisible = ref(false)
  const snackbarColor = ref(SnackbarColor.SUCCESS)

  // Actions
  function setIsLoading(value: boolean=true) {
    isLoading.value = value
  }

  function showSnackbar(message: string,timeout: number = 3000,color:SnackbarColor = SnackbarColor.ERROR) {
    snackbarMessage.value = message
    snackbarColor.value = color
    snackbarTitle.value = SnackbarTitle[color.toUpperCase() as keyof typeof SnackbarTitle]
    snackbarIcon.value = SnackbarIcon[color.toUpperCase() as keyof typeof SnackbarIcon]
    snackbarVisible.value = true
    setTimeout(() => {
      snackbarVisible.value = false

    }, timeout)
  }

  return {
    isLoading,
    isError,
    setIsLoading,
    showSnackbar,
    snackbarColor,
    snackbarMessage,
    snackbarTitle,
    snackbarIcon,
    snackbarVisible
    // getIsLoading,
    // isSnackbarVisible,
    // getSnackbarMessage,
    // getSnackbarColor
  }
})
