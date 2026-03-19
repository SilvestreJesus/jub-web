/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const jubThemeLight = {
  dark: false,
  colors: {
    // Semantic Backgrounds & Surfaces
    background: '#EFF3F6', 
    surface: '#FFFFFF',
    
    // Core Brand Colors
    primary: '#00ABDC',    
    secondary: '#0089B8',  
    
    // Custom Brand Variants
    'primary-darken-1': '#004873', 
    'primary-darken-2': '#002B53', 
    'primary-lighten-1': '#0089B8', 
    
    // Neutral Text/Accents
    'text-grey': '#354954', 
    'surface-variant': '#99AEBB',
    
    'primary-blue': '#0a192f',
    'secondary-blue': '#0089B8',
    'surface-light': '#d1d5db',
    
    // Standard States
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const jubThemeDark = {
  dark: true,
  colors: {
    // Usamos tu primary-blue como fondo principal para un look elegante
    background: '#0a192f', 
    // Un tono ligeramente más claro para las tarjetas y modales
    surface: '#112240', 
    
    // Mantenemos tus colores de marca vibrantes
    primary: '#00ABDC',    
    secondary: '#0089B8',  
    
    // Variantes ajustadas para contraste en oscuro
    'primary-darken-1': '#0089B8', // Invertimos la lógica de darken/lighten para oscuro
    'primary-darken-2': '#00ABDC', 
    'primary-lighten-1': '#004873', 
    
    // Textos más claros para que se lean bien sobre el fondo oscuro
    'text-grey': '#CBD5E1', 
    'surface-variant': '#1E293B',
    
    'primary-blue': '#EFF3F6', // Invertido
    'secondary-blue': '#00ABDC',
    'surface-light': '#1E293B', // Invertido
    
    error: '#CF6679', // Rojo suavizado estándar para dark mode
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'jubThemeLight',
    themes: {
      jubThemeLight,
      jubThemeDark,
    },
  },
})
