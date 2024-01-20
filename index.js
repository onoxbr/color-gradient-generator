const gc = require('./src/index')
async function a() {
    console.log(await gc.generateGradientImage(['#ffffff', '#FF3333'], 400, 200, 'horizontal'))
}
a()