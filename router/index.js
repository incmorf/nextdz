const Router = require('koa-router');
const router = new Router();

const productsCtrl = require('../controllers/products.js');
const skillsCtrl = require('../controllers/skills.js');
const msgCtrl = require('../controllers/msg.js');

router.get('/', async (ctx) => {
  try {
    const products = await productsCtrl.get();
    const skills = await skillsCtrl.get();
    ctx.render('index', {
      products,
      skills
    });

  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
  }

});

router.post('/', async (ctx) => {
  try {
    const products = await productsCtrl.get();
    const skills = await skillsCtrl.get();
    const msg = await msgCtrl.add({ ...ctx.request.body });

    console.log(msg);

    ctx.render('', {
      msgsemail: msg,
      products,
      skills
    });

  } catch (err) {
    const products = await productsCtrl.get();
    const skills = await skillsCtrl.get();
    
    ctx.render('', {
      msgsemail: err,
      products,
      skills
    })
  }
});

//skills render (router)
router.post('/admin/skills', async (ctx) => {
  try {
    await skillsCtrl.add({ ...ctx.request.body });
    // console.log(ctx.request.body);
    ctx.render('admin', {
      msgskill: 'Скилы обновлены'
    });

  } catch (err) {
    ctx.render('admin', {
      msgskill: err
    });
  }
});
//-----skills render (router)

router.get('/admin', async (ctx) => {
  try {
    ctx.render('admin');

  } catch (err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.post('/admin/upload', async (ctx) => {
  try {
    await productsCtrl.add({ ...ctx.request.files, ...ctx.request.body });

    ctx.render('admin', {
      msgfile: 'Товар добавлен'
    });

  } catch (err) {
    ctx.render('admin', {
      msgfile: err
    });
  }
});

router.get('/login', async (ctx) => {
  try {
    ctx.render('login');

  } catch (err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

router.post('/login', async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    if (email === 'amigo@browser.com' && password === '123') {
      ctx.redirect('/admin')
    } else {
      ctx.render('login', {
        msgslogin: 'Вы ввели не правильно пароль или емейл'
      });
    }

  } catch (err) {
    console.error('err', err);
    ctx.status = 404;
  }
});

module.exports = router;