import express from 'express';
import logging from '../config/logging';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
      logging.info('Server', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
          logging.info('Server', `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
      })
      
      next();
}