const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new KoaRouter()

// Replace with DB
const things = ['My Family', 'My THing', 'car', 'house', 'horse']

// JSON Prettier Middleware
app.use(json())

// BodyParser Middleware
app.use(bodyParser())

// Add additional properties to context
app.context.user = 'Matt'

// Simple Middleware Example
// app.use(async ctx => (ctx.body = {'hello': 'world'}))

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false,
})

// Routes
router.get('/', index)
router.get('/add', showAdd)
router.post('/add', add)

// List of things
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I Love',
        things: things
    })
}

// Show Add Page
async function showAdd(ctx) {
    await ctx.render('add')
}

// Add thing
async function add(ctx) {
    const body = ctx.request.body;
    console.log('[matt][tealium] body', body)
    
    things.push(body.thing)
    ctx.redirect('/')
}


router.get('/test', ctx => {
    return (ctx.body = `Hello ${ctx.user}`)
})

router.get('/test2/:name', ctx => {
    return (ctx.body = `Hello ${ctx.params.name}`)
})


// Router Middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => console.log('[matt][tealium] Server started...'))