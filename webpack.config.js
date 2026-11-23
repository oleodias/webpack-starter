const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Exportar uma FUNÇÃO (e não um objeto) dá acesso ao modo pedido na linha
// de comando (argv.mode): o build de produção e o de desenvolvimento mudam
// em alguns pontos.
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Mapa do código original só no desenvolvimento: no DevTools, os erros
    // apontam para src/, e não para o arquivo empacotado.
    devtool: isProduction ? false : 'inline-source-map',

    // O Webpack começa aqui e segue cada import.
    entry: { main: './src/index.js' },

    output: {
      // Caminho ABSOLUTO (o Webpack recusa um relativo como './dist').
      path: path.resolve(__dirname, 'dist'),
      // Em produção, o hash do conteúdo entra no nome (main.3f9a1c2b.js):
      // arquivo novo = nome novo, e o navegador do visitante nunca fica
      // com a versão velha no cache.
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      // '' = caminhos relativos no HTML e no CSS gerados. Funciona tanto
      // num domínio próprio quanto no GitHub Pages (usuario.github.io/repo/).
      publicPath: '',
      // Apaga o dist/ antes de cada build (no lugar do rm -rf, que não roda
      // no CMD nem no PowerShell).
      clean: true,
    },

    // O código que o próprio Webpack acrescenta também sai em ES5.
    target: ['web', 'es5'],

    // Mostra também os erros dos plugins (child compilations).
    stats: { children: true },

    devServer: {
      static: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 8080,
      open: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          // Regex, e não o texto "/node_modules/": como texto, ele vira um
          // caminho que não existe e não exclui nada.
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          // Os loaders rodam de baixo para cima: postcss-loader (prefixos e
          // minificação), css-loader (resolve @import e url()) e, por
          // último, o MiniCssExtractPlugin.loader (tira o CSS do JS e o põe
          // num arquivo próprio).
          use: [
            MiniCssExtractPlugin.loader,
            // importLoaders: 1 = os arquivos trazidos por @import (um por
            // bloco BEM) também passam pelo postcss-loader.
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
          type: 'asset/resource',
          generator: { filename: 'images/[name].[contenthash:8][ext]' },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: { filename: 'fonts/[name].[contenthash:8][ext]' },
        },
      ],
    },

    plugins: [
      // Gera o dist/index.html a partir do modelo, com o <script> e o
      // <link> já colocados (os nomes mudam a cada build por causa do hash).
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash:8].css' : '[name].css',
      }),
    ],
  };
};
