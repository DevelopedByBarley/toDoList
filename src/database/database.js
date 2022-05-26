async function Connection() {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.DATABASE_URL);
    mongoose.connection
        .on('error', err => console.log(err))
        .once('open', () => console.log('Mongoose is connected!'));
}

module.exports = Connection;