const dburl= 'mongodb+srv://mayankjha:mayank123@cluster0.ddnge.mongodb.net/edataset?retryWrites=true&w=majority';
const ldb='mongodb://localhost:27017/edataset';
const edata ='mongodb://mayankjha:mayank123@cluster0-shard-00-00.ddnge.mongodb.net:27017,cluster0-shard-00-01.ddnge.mongodb.net:27017,cluster0-shard-00-02.ddnge.mongodb.net:27017/edataset?ssl=true&replicaSet=atlas-bvynoy-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoose = require('mongoose');

const connectionParams={
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    // useCreateIndex:true,
    // useFindAndModify:false
}
mongoose.connect(edata,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })