const chroma = require('chroma-js');
const { createCanvas } = require('canvas');
const fetch = require('node-fetch');

// Função para fazer upload da imagem para o Uploadfiles.io
async function uploadImageToUploadfiles(imageBuffer) {
    const response = await fetch('https://upload.uploadfiles.io/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'image/png',
        },
        body: imageBuffer,
    });

    const result = await response.json();
    return result.data.url;
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

        // Faz o upload da imagem para o Uploadfiles.io
        const uploadfilesLink = await uploadImageToUploadfiles(imageBuffer);

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
