const express = require('express');

//bring in mongoose
const mongoose = require('mongoose');

//bring in method override
const methodOverride = require('method-override');

const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/crudblog',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


//set template engin
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//route for the index
app.get('/', async(request, response) => {
    response.render('index');
});

//route for the category
app.get('/:category', async(request, response) => {
    let goto = await request.params.category;
    let blogs = await Blog.find().sort({timeCreated : 'desc'});
    response.render(goto, { blogs: blogs })
});

app.use(express.static("public"))
app.use('/blogs', blogRouter);

//listen port
app.listen(5000)