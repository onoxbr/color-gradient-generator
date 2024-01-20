const chroma = require('chroma-js');
const { createCanvas } = require('canvas');
const fetch = require('node-fetch');
const { SapphireError } = require('@sapphire/framework');

async function handleAsyncNullish(value) {
    try {
        // Simule uma verificação assíncrona (substitua por sua lógica real)
        const result = await asyncFunction(value);

        // Se o resultado não for null ou undefined, rejeite com um erro personalizado
        if (result !== null && result !== undefined) {
            throw new SapphireError('Value is not null or undefined');
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

// Exemplo de uso
handleAsyncNullish(someAsyncValue)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });

async function uploadImageToImgur(imageBuffer) {
    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            Authorization: 'Client-ID fae6f5d7405b960', // Substitua com seu Client ID do Imgur
            'Content-Type': 'image/png',
        },
        body: imageBuffer,
    });

    const result = await response.json();
    return result.data.link;
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

        // Faz o upload da imagem para o Imgur
        const imgurLink = await uploadImageToImgur(imageBuffer);

        return imgurLink;
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
