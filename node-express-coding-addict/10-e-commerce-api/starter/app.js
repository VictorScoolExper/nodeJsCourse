require('dotenv').config();
//express async errors is like a trycatch for controllers automatic o setup middleware
require('express-async-errors');

//express
const express = require('express');
const app = express();


//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//database connection
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//morgan  is a middleware http request logger.
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req, res)=>{    
    res.send('e-commerce api');
});

app.get('/api/v1', (req, res)=>{    
    //console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('e-commerce api');
});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);

//the not found should popup before error middleware(404 has no next)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log( `Server is listening to ${port}....`))
    } catch (error) {
        console.log(error);
    }
}
start();
