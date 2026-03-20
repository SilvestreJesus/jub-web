import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMictlanXStore = defineStore('mictlanx', () => {
  const activeDownloads = ref(0);
  const MAX_CONCURRENT = 3;

  const downloadFile = async (url: string="https://apix.tamps.cinvestav.mx/mictlanx/api/v4/buckets/contaminantes1/c97f6b2a9f042cf31f898ab0b50940383fd34024e82130c28d3bc9468621690c") => {
    
    while (activeDownloads.value >= MAX_CONCURRENT) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    activeDownloads.value++;
    try {
      const response = await fetch(url);
      const reader = response.body?.getReader();
      const chunks = [];
      
      if (!reader) throw new Error("No reader");

      let isFirstChunk = true;
      let detectedType = response.headers.get('Content-Type') || '';
      console.log("Detected file type:", detectedType);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        if (isFirstChunk && value) {
          if (!detectedType || detectedType === 'application/octet-stream' || detectedType === 'binary/octet-stream') {
            const sniffedType = sniffType(value);
            detectedType = sniffedType;
          }
          isFirstChunk = false;
        }

        chunks.push(value);
        console.log(`Chunk received: ${value.length} bytes`);
      }
      const type = detectedType || 'text/html';
      let finalBlob: Blob;
      console.log("Downloaded file type:", type);


      if (type.includes('text/html')) {
      // Unimos los chunks y los convertimos a string para poder inyectar CSS
      const decoder = new TextDecoder();
      const rawHtml = chunks.map(chunk => decoder.decode(chunk, { stream: true })).join('') + decoder.decode();
      const adjustedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            
          </head>
          <body>
            ${rawHtml}
          </body>
        </html>
      `;


      finalBlob = new Blob([adjustedHtml], { type: 'text/html' });
    } else {
      // Para PNG, PDF, MP3, etc., usamos los chunks originales directamente
      finalBlob = new Blob(chunks, { type });
      console.log("Downloaded file type:", type);
    }

    return {
      url: URL.createObjectURL(finalBlob),
      type
    };

    } catch (error) {
      console.error("Error descargando el archivo:", error);
      return { url: null, type: null };
    }
    finally {
      activeDownloads.value--;
    }
  };

  const sniffType = (chunk: Uint8Array): string => {
    // Convert first 4 bytes to Hex
    const hex = Array.from(chunk.subarray(0, 4))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();

    const signatures: Record<string, string> = {
      '89504E47': 'image/png',
      '47494638': 'image/gif',
      '25504446': 'application/pdf',
      'FFD8FF':   'image/jpeg',
      '494433':   'audio/mpeg', // MP3
    };

    // Check signatures
    for (const [sig, mime] of Object.entries(signatures)) {
      if (hex.startsWith(sig)){
        return mime;
      }
    }

    // Fallback: Check if it looks like HTML/XML
    const textSample = new TextDecoder().decode(chunk.subarray(0, 50)).toLowerCase();
    if (textSample.includes('<html') || textSample.includes('<!doctype') || textSample.includes('<div')) {
      return 'text/html';
    }

    return 'application/octet-stream';
  };

  return { downloadFile, activeDownloads };
});