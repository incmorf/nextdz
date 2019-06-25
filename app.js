const Koa = require('koa');
const app = new Koa();

const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views/pages',
  basedir: './views',
  pretty: true,
  noCache: true,
  app: app 
});

const static_koa = require('koa-static');
app.use(static_koa('./public'));

const koaBody = require('koa-body');
app.use(koaBody({
  formidable: {
    uploadDir: './public/assets/img/products/'
  },
  multipart: true
}));

const router = require('./router');
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server runnning'); 
});