const { createCanvas } = require('canvas');
const fetch = require('node-fetch');
const chroma = require('chroma-js');

async function createUploadSession(fileSize) {
    try {
        const response = await fetch('https://up.ufile.io/v1/upload/create_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file_size: fileSize }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create upload session. Status: ${response.status}`);
        }

        const result = await response.json();
        if (!result || !result.fuid) {
            throw new Error('Failed to get "fuid" from the response.');
        }

        return result.fuid;
    } catch (error) {
        console.error('Error in createUploadSession:', error.message);
        throw error;
    }
}

async function uploadChunk(fuid, chunkIndex, fileChunk) {
    try {
        const formData = new FormData();
        formData.append('chunk_index', chunkIndex);
        formData.append('fuid', fuid);
        formData.append('file', fileChunk);

        const response = await fetch('https://up.ufile.io/v1/upload/chunk', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload chunk. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error in uploadChunk:', error.message);
        throw error;
    }
}

async function finalizeUpload(fuid, fileName, fileType, totalChunks) {
    try {
        const response = await fetch('https://up.ufile.io/v1/upload/finalise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fuid,
                file_name: fileName,
                file_type: fileType,
                total_chunks: totalChunks,
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to finalize upload. Status: ${response.status}`);
        }

        const result = await response.json();
        if (!result || !result.url) {
            throw new Error('Failed to get URL from the response.');
        }

        return result.url;
    } catch (error) {
        console.error('Error in finalizeUpload:', error.message);
        throw error;
    }
}

async function handleAsyncNullish(value) {
    try {
        // Simule uma verificação assíncrona (substitua por sua lógica real)
        const result = await asyncFunction(value);

        // Se o resultado não for null ou undefined, rejeite com um erro personalizado
        if (result !== null && result !== undefined) {
            throw new Error('Value is not null or undefined');
        }

        // Caso contrário, o valor passou na validação
        return result;
    } catch (error) {
        // Trate erros aqui
        console.error('Error in handleAsyncNullish:', error.message);
        throw error;
    }
}

// Função de exemplo para simular uma operação assíncrona
function asyncFunction(value) {
    return new Promise(resolve => {
        setTimeout(() => {
            // Simule uma lógica que pode retornar null ou undefined
            resolve(null);
        }, 1000);
    });
}

async function generateGradientImage(colors, width, height, direction) {
    try {
        // Simulando uma validação assíncrona
        await handleAsyncNullish(colors);

        if (!colors || colors.length < 2) {
            throw new Error('At least two colors are required to generate a gradient.');
        }

        const canvas = createCanvas(width || 800, height || 400);
        const ctx = canvas.getContext('2d');

        const chromaColors = colors.map(color => chroma(color));
        const gradient = ctx.createLinearGradient(0, 0, direction === 'vertical' ? 0 : canvas.width, direction === 'vertical' ? canvas.height : 0);

        chromaColors.forEach((color, index) => {
            gradient.addColorStop(index / (chromaColors.length - 1), color.hex());
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imageBuffer = canvas.toBuffer();

        // Cria uma sessão de upload
        const fuid = await createUploadSession(imageBuffer.length);

        // Divide a imagem em chunks e faz o upload
        const chunkSize = 1024 * 1024; // 1MB (ajuste conforme necessário)
        const totalChunks = Math.ceil(imageBuffer.length / chunkSize);

        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, imageBuffer.length);
            const chunk = imageBuffer.slice(start, end);

            await uploadChunk(fuid, chunkIndex, chunk);
        }

        // Finaliza o upload e obtém o URL
        const uploadfilesLink = await finalizeUpload(fuid, 'gradient', 'png', totalChunks);

        return uploadfilesLink;
    } catch (error) {
        // Trate erros aqui
        console.error('Error in generateGradientImage:', error.message);
        throw error;
    }
}

async function generateGradient(colors, direction) {
    try {
        // Simulando uma validação assíncrona
        await handleAsyncNullish(colors);

        if (!colors || colors.length < 2) {
            throw new Error('At least two colors are required to generate a gradient.');
        }

        const chromaColors = colors.map(color => chroma(color));
        const gradientStops = chromaColors.map((color, index) => ({
            stop: index / (chromaColors.length - 1),
            color: color.hex(),
        }));

        const gradient = {
            type: 'linear-gradient',
            direction: direction || 'to right',
            stops: gradientStops,
        };

        return gradient;
    } catch (error) {
        // Trate erros aqui
        console.error('Error in generateGradient:', error.message);
        throw error;
    }
}

module.exports = {
    generateGradient,
    generateGradientImage,
};
