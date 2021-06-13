const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;




const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//will automatically logout after
//1)
//app.use(session({secret:"Key",cookie:{maxAge:600000}}))

//2)
// app.use(session({
//   secret: config.sessionKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//       maxAge: 600 * 1000
//   }
// }));

//3)
// app.use(function(req, res, next){
//   req.setTimeout(500000, function(){
//       // call back function is called when request timed out.
//   });
//   next();
// });


//4)npm install connect-timeout need to be installed
// var timeout = require('connect-timeout');
// app.use(timeout('100s'));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});