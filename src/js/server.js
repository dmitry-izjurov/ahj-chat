const http = require('http');
const port = process.env.PORT || 7070;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const WS = require('ws');
const contacts = ['Alexandra', 'Petr', 'Ivan'];

function getDate() {
  let dateTransaction = new Date();
  return `${dateTransaction.toLocaleString()}`;
}

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true
}));


app.use(async (ctx) => { 
  const method  = ctx.request.querystring;
  // let id;
  // if (method) {
  //   const num = Number(method.split('id=')[1]);
  //   if (num) id = num;
  // }

  switch (method) {
    case 'method=getName':
      const newName = ctx.request.body.text;
      if (!contacts.find(a => a === newName)) {
        contacts.push(newName);
        ctx.response.body = {response: contacts, name: newName};
      } else {
        ctx.response.body = {response: `Псевдоним ${newName} уже занят`};
      }
      return;

    default:
      ctx.response.status = 404;
      return;
    }

});


const ws = new WS('ws://localhost:7070/ws');

ws.addEventListener('open', () => {
console.log('connected');
// After this we can send messages
ws.send('hello!');
});
ws.addEventListener('message', (evt) => {
// handle evt.data
console.log(evt);
});
ws.addEventListener('close', (evt) => {
console.log('connection closed', evt);
// After this we can't send messages
});
ws.addEventListener('error', () => {
console.log('error');
});

const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

// wsServer.on('connection', (ws, req) => {
// const errCallback = (err) => {
//   if (err) {
//     // TODO: handle error
//   }
// }

// ws.on('message', msg => {
// console.log('msg');

// ws.send('response', errCallback);
// });

// ws.send('welcome', errCallback);
// });

server.listen(port);

// const server = http.createServer(app.callback()).listen(port);

