import {defineStore} from 'pinia'
import {type ObservatoryDTO,type ProductXDTO} from '@/types/index.types'
// interface Observatory


export const useJubStore = defineStore('jub', () => {

    const API_URL = import.meta.env.VITE_JUB_API_URL || 'http://localhost:5000';
    const isLoading = ref(false)
    const error = ref<string | null>(null );

    async function get_observatories(): Promise<ObservatoryDTO[]>  {
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/api/v2/observatories`);
            if(response.ok){
                const data:ObservatoryDTO[] = await response.json();
                return data;
            }else {
                throw new Error(`Error fetching observatories: ${response.statusText}`);
            }
            
        }catch(e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        }finally {
            isLoading.value = false
        }
    }
    async function search_observatories(query:string): Promise<ObservatoryDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/api/v2/search/observatories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });
            if(response.ok){
                const data:ObservatoryDTO[] = await response.json();
                return data;
            }else {
                throw new Error(`Error searching observatories: ${response.statusText}`);
            }
        } catch (e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        } finally {
            isLoading.value = false; 
        }
    }

    async function search(query:string): Promise<ProductXDTO[]>{
        try{
            isLoading.value = true;
            const response = await fetch(`${API_URL}/api/v2/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });
            if(response.ok){
                const data:ProductXDTO[] = await response.json();
                return data;
            }else {
                throw new Error(`Error searching products: ${response.statusText}`);
            }
        } catch (e){
            console.error(e);
            error.value = e instanceof Error ? e.message : String(e);
            return [];
        } finally {
            isLoading.value = false; 
        }
    }

    return { 
        get_observatories,
        search,
        search_observatories,
        isLoading,
        error
    }

})