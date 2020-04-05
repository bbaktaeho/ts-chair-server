import { verify, sign } from "jsonwebtoken";
import config from "../../config";
import { Request, Response, NextFunction } from "express";

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */

//  const getTokenFromHeader = (req: Request) => {
//   /**
//    * @TODO Edge and Internet Explorer do some weird things with the headers
//    * So I believe that this should handle more 'edge' cases ;)
//    */
//   if (
//     (req.headers.authorization &&
//       req.headers.authorization.split(" ")[0] === "Token") ||
//     (req.headers.authorization &&
//       req.headers.authorization.split(" ")[0] === "Bearer")
//   ) {
//     return req.headers.authorization.split(" ")[1];
//   }
//   return null;
// };

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  verify(req.body.token, config.jwtSecret, (err: Error, data: any) => {
    if (err) return console.error(err);
    else {
      req.user = data.user;
      next();
    }
  });
};

export default isAuth;
