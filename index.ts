import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 2121;



//Initializing Db Connection
import connection from './db/conn';

import authenticationRoutes from './routes/authenticationRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();

// setting up cors for angular app on different port
const corsOptions = {
    origin: [
        'http://localhost:4200',
    ],
    allowHeaders: ['Access-Control-Allow-Origin', 'Accept', 'Content-Type'],
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.options('*', cors);

app.use(express.json()); // to support JSON-encoded bodies
app.use(
    express.urlencoded({
        // to support URL-encoded bodies
        extended: true,
    })
);


// setting static
app.use(express.static('public'))


// using routes

app.use('/api/auth',authenticationRoutes);

app.use('/api/employee',employeeRoutes)


app.use('/', express.static('public'));
app.listen(port,()=>{
    console.log(`Started Listing on ${port}`)
})



process.on('uncaughtException',err =>{
    console.log("Error Occurred Exiting...",err)
    connection.close();
    process.exit(1);
})