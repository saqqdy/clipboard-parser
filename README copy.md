<div style="text-align: center;" align="center">

# grace-speak

A composition api for SpeechSynthesis

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/grace-speak)** • **[Change Log](./CHANGELOG.md)**

</div>

## Installing

```bash
# use pnpm
$ pnpm install grace-speak

# use npm
$ npm install grace-speak --save

# use yarn
$ yarn add grace-speak
```

## Usage

1. Simple use:

```ts
import Speaker from 'grace-speak'

const speaker = new Speaker()

speaker.speak('very good')
speaker.speak('powered by saqqdy<https://github.com/saqqdy>')
```

2. Using unpkg CDN:

```html
<!-- grace-speak < v2.0.0 -->
<!-- for modern browser -->
<script src="https://unpkg.com/grace-speak@1.1.0/dist/index.min.js"></script>
<!-- for ie11 and blow -->
<script src="https://unpkg.com/grace-speak@1.1.0/dist/es5/index.min.js"></script>

<!-- grace-speak >= v2.0.0 -->
<script src="https://unpkg.com/grace-speak@2.0.0/dist/index.global.prod.js"></script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/grace-speak/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/grace-speak.svg?style=flat-square
[npm-url]: https://npmjs.org/package/grace-speak
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/grace-speak/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/grace-speak&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/grace-speak.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/grace-speak?branch=master
[download-image]: https://img.shields.io/npm/dm/grace-speak.svg?style=flat-square
[download-url]: https://npmjs.org/package/grace-speak
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_grace-speak
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_grace-speak
