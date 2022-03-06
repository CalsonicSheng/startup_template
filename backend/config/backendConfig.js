import mongoose from 'mongoose';
import { config } from 'dotenv';

// dotenv.config is to load all the environment variables and make these accessible in the current file from the DEFAULT ".env" file
// use "process.env" prefix to access/use/call any env variable
config();

// the backend database sever needs to be connect first before make our express server app to activly listen on request
// this is because express later needs to conduct lots db related operation for most requests receives
async function runbackendConfig(app) {
  try {
    // mongoose will check the connection string for authentication to see if this match with any available project cluster user
    const result = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`backend mongoDB altas is connected at host ${result.connection.host}`);

    app.listen(process.env.PORT, function () {
      console.log(`backend server is setup and running in ${process.env.NODE_ENV} and actively listening on port ${process.env.PORT} for activity`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default runbackendConfig;
