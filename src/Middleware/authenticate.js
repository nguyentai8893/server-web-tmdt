const authenticate = async (req, res, next) => {
	if (!req.cookies.user) {
		return res.json({ status: false, msg: 'k có cookie' });
	}
	next();
};
// Middleware để kiểm tra và phân quyền dựa trên session
function authorize(role) {
	return function (req, res, next) {
		const user = req.session.user;
		console.log(user.role);
		if (!user || user.role !== role) {
			return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
		}
		next();
	};
}
module.exports = { authenticate, authorize };
