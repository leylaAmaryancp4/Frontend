
import jwt from "jsonwebtoken"; 
// Get JWT secret safely 
function getJwtSecret() { 
  const secret = process.env.JWT_SECRET; 
  if (typeof secret !== "string" || !secret) {
     throw new Error("JWT_SECRET is not defined or not a string");
     }
      return secret; } 
      
      // Authentication middleware 
      export const authenticate = (req, res, next) => {
        let token = req.cookies?.token;
      if(!token)
        { const authHeader = req.headers.authorization; 
        
          if (authHeader) { 
            token = authHeader.split(" ")[1];
          }
        }

          try { const decoded = jwt.verify(token, getJwtSecret()); 
            req.user = decoded; 
            
            // attach user info to request 
            next();
           }
            catch { res.status(403).json({ message: "Invalid token" }); } };