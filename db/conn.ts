import { connect,connection } from 'mongoose';

connect('mongodb://localhost:27017/mbassignment',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}
)
connection
    .once("open", function() {
        console.log("Db Connected");
    })
    .on("error", function(error) {
        console.log("Error Occurred :", error);
    });

export default connection;
