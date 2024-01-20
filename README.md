# 🌈 colors-gradient-generator

The `colors-gradient-generator` is a simple and flexible package that allows you to generate color gradients for use in web projects, mobile apps, and more!

## 🚀 Installation

To get started, you can install the package via npm. Make sure you have Node.js installed.

```bash
npm install colors-gradient-generator
```

## 💡 How to Use

```javascript
const gradientGenerator = require('colors-gradient-generator');

// Generate a gradient from blue to green and save the image as 'gradient.png'
colorGradientGenerator.generateGradientImage(['#3498db', '#2ecc71'], 400, 200, 'horizontal');
```

## 🎨 Available Functions

---

### `generateGradient(colors, direction)`

Generates an object representing a linear gradient.

* `colors`: Array of colors for the gradient.
* `direction`: Gradient direction (optional).

### `generateGradientImage(colors, width, height, direction)`

Generates an image of a linear gradient and return the URL.

* `colors`: Array of colors for the gradient.
* `width`: Image width (optional).
* `height`: Image height (optional).
* `direction`: Gradient direction (optional).

### Made with ❤️ by [nooxbr](https://www.npmjs.com/~nooxbr)
