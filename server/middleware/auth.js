export const isAuthenticated = function (req, res, next) {
  if (!req.session.userId) {
    return res.status(200).json({ status: 'Not Authenticated' });
  }
  next();
};
