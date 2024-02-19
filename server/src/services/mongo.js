const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
    console.log('(`--------DEV MESSAGE-------- MongoDB connection started successfully !');
})

mongoose.connection.on('error', (err) => {
    console.log(`--------DEV MESSAGE-------- An error occured during mongoDB connection : ${err}`)
})

async function mongoConnect(){
    await mongoose.connect(process.env.MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}