// middleware/role.middleware.js
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role) {
      return res.status(401).json({ error: 'No role found. Access denied.' });
    }

    // Case-insensitive comparison
    const userRole = user.role.toString().toLowerCase();
    const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole);

    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }

    next();
  };
};