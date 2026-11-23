// Babel 7 (fixado no package.json): o Babel 8 removeu a opção useBuiltIns.
// Os navegadores-alvo vêm do "browserslist" do package.json, o mesmo que o
// autoprefixer usa: uma lista só para o JS e para o CSS.
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 'usage': só entram os polyfills das funções que o código usa de
        // fato (em vez de todos os do core-js, como com 'entry').
        useBuiltIns: 'usage',
        corejs: '3.51',
      },
    ],
  ],
};
