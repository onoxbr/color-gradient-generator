const { createCanvas } = require('canvas');
const imgbbUploader = require('imgbb-uploader');

// Função para fazer upload da imagem para o ImgBB
async function uploadImageToImgBB(imageBuffer) {
    try {
        const options = {
            apiKey: '477feba76907e16f3b3fdf9c9cb5644d', // Substitua pela sua API Key do ImgBB
            base64string: imageBuffer.toString('base64'),
        };

        const response = await imgbbUploader(options);

        return response.url;
    } catch (error) {
        console.error('Error in uploadImageToImgBB:', error.message);
        throw new Error('Error uploading image to ImgBB');
    }
}

// Função para validar valores assíncronos
async function handleAsyncNullish(value) {
    try {
        const result = await asyncFunction(value);

        if (result !== null && result !== undefined) {
            throw new Error('Value is not null or undefined');
        }

        return result;
    } catch (error) {
        console.error('Error in handleAsyncNullish:', error.message);
        throw error;
    }
}

// Função de exemplo para simular uma operação assíncrona
function asyncFunction(value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(null);
        }, 1000);
    });
}

// Função para gerar um gradiente e fazer upload da imagem resultante para o ImgBB
async function generateGradientImage(colors, width, height, direction) {
    try {
        await handleAsyncNullish(colors);

        if (!colors || colors.length < 2) {
            throw new Error('At least two colors are required to generate a gradient.');
        }

        const canvas = createCanvas(width || 800, height || 400);
        const ctx = canvas.getContext('2d');

        // Lógica para gerar o gradiente...

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imageBuffer = canvas.toBuffer();

        // Faz o upload da imagem para o ImgBB
        const imgbbLink = await uploadImageToImgBB(imageBuffer);

        return imgbbLink;
    } catch (error) {
        console.error('Error in generateGradientImage:', error.message);
        throw error;
    }
}

// Função para gerar um gradiente
async function generateGradient(colors, direction) {
    try {
        await handleAsyncNullish(colors);

        if (!colors || colors.length < 2) {
            throw new Error('At least two colors are required to generate a gradient.');
        }

        // Lógica para gerar o gradiente...

        const gradient = {
            type: 'linear-gradient',
            direction: direction || 'to right',
            stops: gradientStops,
        };

        return gradient;
    } catch (error) {
        console.error('Error in generateGradient:', error.message);
        throw error;
    }
}

module.exports = {
    generateGradient,
    generateGradientImage,
};
