import { verify, sign } from "jsonwebtoken";
import config from "../../config";
import { Request, Response, NextFunction } from "express";
import User from "../../models/user";

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

const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    verify(
      req.get("token") as string,
      config.jwtSecret,
      async (err: Error, data: any) => {
        if (err) {
          return res
            .status(403)
            .json({ success: false, message: "token is invalid" });
        } else {
          const user = await User.findOne({ where: { id: data.id } });
          if (!user)
            res
              .status(404)
              .json({ success: false, message: "user is not exists" });
          else {
            req.user = data;
            next();
          }
        }
      }
    );
  } catch (err) {
    return res.status(403).json({ success: false, message: err.message });
  }
};

export { jwtVerify };
