const mongoose = require('mongoose');
const MONGODB_URI = process.env.DATABASE;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify:false
}).then(() => console.log('succefully connected to MongoDB')).catch(err => console.log(err));