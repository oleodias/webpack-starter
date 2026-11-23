# webpack-starter — modelo de landing page

Modelo de site de uma página para pequenos negócios, montado com **Webpack
5**, **Babel** e **PostCSS**. Serve de ponto de partida para o site de um
cliente: copie, troque o conteúdo e publique. O build sai otimizado e é
publicado sozinho no GitHub Pages.

## 📅 Sprints

Projeto prático do **Módulo Bônus — Construção de projetos com Webpack**,
liberado depois da conclusão do curso de Desenvolvimento Web da TripleTen
Brasil (Sprint 19).

| Sprint | O que foi feito neste repositório |
| --- | --- |
| Módulo Bônus (Webpack) | Configuração completa do Webpack (Babel, PostCSS, imagens, fontes, hash nos nomes), página de exemplo responsiva e publicação automática no GitHub Pages |

## Página de exemplo

Uma landing page genérica ("Sua Empresa") com cabeçalho fixo e menu no
celular, apresentação, serviços, sobre, botão de WhatsApp e rodapé com o ano
atualizado sozinho. Responsiva em 1440, 768 e 320 px.

## O que o build faz

| Etapa | Ferramenta | Resultado |
| --- | --- | --- |
| Junta os módulos a partir de `src/index.js` | Webpack | `dist/main.<hash>.js` |
| Reescreve o JS para os navegadores da lista e põe só os polyfills necessários | Babel + `core-js` | JS compatível e pequeno |
| Junta o CSS dos blocos, acrescenta prefixos e minifica | `css-loader` + PostCSS (autoprefixer, cssnano) | `dist/main.<hash>.css` |
| Copia imagens e fontes com hash no nome | Asset Modules do Webpack 5 | `dist/images/`, `dist/fonts/` |
| Gera o HTML com o `<script>` e o `<link>` já colocados | `html-webpack-plugin` | `dist/index.html` |

O **hash** no nome muda quando o conteúdo muda: o visitante nunca fica com
uma versão velha no cache do navegador.

A lista de navegadores fica num lugar só, o `"browserslist"` do
`package.json`, e vale para o Babel e para o autoprefixer.

## Como rodar

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev     # servidor em http://localhost:8080, recarrega ao salvar
npm run build   # gera a versão de produção em dist/
```

## Como começar o site de um cliente novo

1. No GitHub, abra este repositório → **Use this template** → **Create a new
   repository**. Dê o nome do cliente ao repositório. (O botão aparece depois
   de marcar **Settings** → **General** → **Template repository**, uma vez
   só, neste repositório.)
2. **Cores e fonte:** em `src/blocks/page.css`, troque as variáveis do
   `:root` (`--color-primary` e as outras). Para outra fonte, troque os
   arquivos de `src/vendor/fonts/` e o `src/vendor/fonts.css`.
3. **Textos e seções:** em `src/index.html`. Cada seção tem o seu arquivo de
   estilo em `src/blocks/` (BEM Flat, um arquivo por bloco); um bloco novo
   entra também no `src/pages/index.css`.
4. **Imagens:** coloque em `src/images/` e use no HTML com
   `<%= require('./images/nome.jpg') %>`. O build cuida do caminho.
5. **WhatsApp:** no `href` do botão, troque `5500000000000` pelo número do
   cliente (55 + DDD + número, só dígitos).
6. **Título e descrição** da página: as tags `<title>` e
   `<meta name="description">` do `src/index.html` (é o que aparece no
   Google).
7. Rode `npm run dev` e confira no navegador, nas larguras de computador,
   tablet e celular.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy.yml` faz o build e publica a cada push
na `main`. Na primeira vez, é preciso ligar o GitHub Pages:

1. No repositório, **Settings** → **Pages**.
2. Em **Build and deployment** → **Source**, escolha **GitHub Actions**.
3. Faça um push (ou, na aba **Actions**, rode o workflow com **Run
   workflow**).
4. O endereço aparece no fim do workflow e em **Settings** → **Pages**:
   `https://<usuario>.github.io/<repositorio>/`.

Os caminhos do build são relativos (`publicPath: ''`), então o site funciona
tanto nesse endereço quanto num domínio próprio do cliente.

## Estrutura

```
src/
├── index.html        modelo da página (sem <script> nem <link>)
├── index.js          entrada: importa o CSS; menu do celular e ano do rodapé
├── pages/index.css   um @import por bloco
├── blocks/           um arquivo CSS por bloco (BEM Flat)
├── images/
└── vendor/           normalize.css e as fontes (Inter)
webpack.config.js     entrada, saída, loaders, plugins e servidor
babel.config.js       Babel com os polyfills do core-js
postcss.config.js     autoprefixer e cssnano
```

## Decisões técnicas

- **Babel 7 fixado:** a configuração usa `useBuiltIns`, que o Babel 8
  removeu.
- **`useBuiltIns: 'usage'`:** só entram os polyfills das funções que o
  código usa, e não todos.
- **`output.clean: true`** no lugar de `rm -rf dist`, que não roda no CMD nem
  no PowerShell.
- **`exclude: /node_modules/`** como regex: entre aspas, seria um caminho e
  não excluiria nada.
- **`importLoaders: 1`** no `css-loader`: o CSS de cada `@import` também
  passa pelo PostCSS.

## Autor

Leonardo Dias Caumo — [LinkedIn](https://www.linkedin.com/in/leonardodiascaumo) ·
[GitHub](https://github.com/oleodias)

A fonte Inter é distribuída sob a licença SIL Open Font License
(`src/vendor/fonts/LICENSE-Inter.txt`).
