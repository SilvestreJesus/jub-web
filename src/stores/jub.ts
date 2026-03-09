import { defineStore } from "pinia";
import {ref} from 'vue'

export interface Observatory{
    obid: string | null;
    title: string;
    image_url: string | null;
    description: string;
    catalogs: any[] | null;
}

export const jubStore = defineStore("jub", () => {

    const observatories: Ref<Observatory[]> = ref([])  
    const currentObservatory: Ref<Observatory | null> = ref(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Fetch all observatories
    async function fetchObservatories() {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch('http://localhost:5000/observatories');
            if (!response.ok) throw new Error('Error al obtener la lista');
            
            const data = await response.json();
            console.log('Fetched observatories:', data)
            observatories.value = data;
        } catch (err: any) {
            error.value = err.message;
            console.error('Error:', err);
        } finally {
            isLoading.value = false;
        }        
    }
    
    // Fetch a single observatory by ID
    async function fetchObservatoryById(obid: string) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await fetch(`http://localhost:5000/observatories/${obid}`);
            if (!response.ok) throw new Error('No se encontró el observatorio');
            
            const data = await response.json();
            console.log('Fetched observatory by ID ${obid}:', data)
            currentObservatory.value = data;
        } catch (err: any) {
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        observatories,
        currentObservatory,
        isLoading,
        error,
        fetchObservatories,
        fetchObservatoryById      
    }
})   