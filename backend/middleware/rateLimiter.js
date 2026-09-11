import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for auth-sensitive routes (login, register, OTP, password reset).
 * Limits each IP to 50 requests per 15-minute window.
 */
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    }
});
