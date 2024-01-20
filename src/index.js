const chroma = require('chroma-js');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

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
}

function generateGradient(colors, direction) {
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
}


module.exports = {
    generateGradient,
    generateGradientImage,
};
