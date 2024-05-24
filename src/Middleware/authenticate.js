const authenticate = async (req, res, next) => {
	console.log(req.cookies);
	if (!req.cookies.user) {
		return res.json({ status: false, msg: 'k có cookie' });
	}
	next();
};
// Middleware để kiểm tra và phân quyền dựa trên cookie
const authenticated = async (req, res, next) => {
	if (!req.cookies.user) {
		return res.json({ status: false, msg: 'Không có cookie' });
	}
	// Nếu cookie tồn tại, tiếp tục xử lý yêu cầu
	next();
};

// Middleware để phân quyền dựa trên session
function authorize(role) {
	return function (req, res, next) {
		const user = req.cookies.user;
		if (!user || user.role !== role) {
			return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
		}
		next();
	};
}
module.exports = { authenticate, authorize, authenticated };
