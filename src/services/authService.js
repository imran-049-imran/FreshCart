// src/services/authService.js
import axiosInstance from '../config/axios.config';

class AuthService {
    async register(userData) {
        try {
            console.log('📝 Registering user:', userData.email);
            const response = await axiosInstance.post('/auth/register', {
                fullName: userData.fullName,
                email: userData.email,
                password: userData.password,
                role: userData.role || 'CUSTOMER'
            });

            console.log('✅ Registration successful:', response.data);

            // Store token if present
            if (response.data.token) {
                localStorage.setItem('hotel_jwt', response.data.token);
                console.log('✅ Token stored');
            }

            return response.data;
        } catch (error) {
            const errData = error.response && error.response.data;
            console.error('❌ Registration error:', errData || error.message);
            throw error;
        }
    }

    async login(credentials) {
        try {
            console.log('🔐 Logging in user:', credentials.email);
            const response = await axiosInstance.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });

            console.log('✅ Login successful:', response.data);

            // Store token if present
            if (response.data.token) {
                localStorage.setItem('hotel_jwt', response.data.token);
                console.log('✅ Token stored');
            }

            return response.data;
        } catch (error) {
            const errData = error.response && error.response.data;
            console.error('❌ Login error:', errData || error.message);
            throw error;
        }
    }

    logout() {
        console.log('🚪 Logging out - clearing token');
        localStorage.removeItem('hotel_jwt');
    }

    getCurrentUser() {
        const token = localStorage.getItem('hotel_jwt');
        if (!token) {
            console.log('ℹ️ No token found');
            return null;
        }

        try {
            // Decode JWT token
            const parts = token.split('.');
            if (parts.length !== 3) {
                console.error('❌ Invalid token format');
                return null;
            }

            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
            );

            const decoded = JSON.parse(jsonPayload);
            console.log('✅ Decoded token:', decoded);

            // Check if token is expired
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                console.log('⚠️ Token expired');
                this.logout();
                return null;
            }

            return decoded;
        } catch (error) {
            console.error('❌ Error decoding token:', error);
            this.logout();
            return null;
        }
    }

    isAuthenticated() {
        const token = localStorage.getItem('hotel_jwt');
        if (!token) return false;

        // Check if token is valid and not expired
        const user = this.getCurrentUser();
        return !!user;
    }

    getToken() {
        return localStorage.getItem('hotel_jwt');
    }

    // Helper method to check token expiration
    isTokenExpired() {
        const user = this.getCurrentUser();
        return !user;
    }
}

export default new AuthService();