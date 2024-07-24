const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
        .then(con => {
            console.log(`MongoDB connected to the host: ${con.connection.host}`);
        })
        .catch(err => {
            console.error(`Error connecting to the database: ${err.message}`);
            process.exit(1); // Exit process with failure
        });
};

module.exports = connectDatabase;
