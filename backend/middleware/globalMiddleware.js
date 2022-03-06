import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default function runAllGlobalMiddleware(app, express) {
  // set up all standard GLOBAL middleware for the express backend
  const __dirname = path.resolve();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
    })
  );
}
