const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
   origin: "https://dyas-ecommerceapp.herokuapp.com/",
   optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   // useCreateIndex: true,
   // useFindAndModify: false,
   family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://benjamin:MUmt9mMmXqpaV090@cse341-node.bwogy.mongodb.net/shop?retryWrites=true&w=majority';

//const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   User.findById('615f5f6a3f51e5297e2b0e8a')
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect(
   MONGODB_URL, options
   )
   .then(result => {
      User.findOne().then(user => {
         if (!user) {
            const user = new User ({
               name: 'Ben',
               email: 'ben@test.com',
               cart: {
                  items: []
               }
            });
            user.save();
         }
      });
      app.listen(PORT);
   })
   .catch(err => {
      console.log(err);
   });