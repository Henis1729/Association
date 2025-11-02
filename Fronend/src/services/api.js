// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to build headers
const buildHeaders = (customHeaders = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = getAuthToken();
  if (token) {
    headers['x-auth-token'] = token;
  }

  return headers;
};

// Main API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: buildHeaders(options.headers),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API Service Methods
export const authAPI = {
  signup: async (userData) => {
    return apiRequest('/user/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  signin: async (credentials) => {
    return apiRequest('/user/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  sendOTP: async (email, expiryInMinutes = 10) => {
    return apiRequest('/user/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email, expiryInMinutes }),
    });
  },

  verifyOTP: async (email, otp) => {
    return apiRequest('/user/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  },

  forgotPassword: async (password) => {
    return apiRequest('/user/forgot-password', {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
  },

  resetPassword: async (currentPassword, newPassword) => {
    return apiRequest('/user/reset-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, password: newPassword }),
    });
  },

  updateProfile: async (userData) => {
    return apiRequest('/user/update-profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  fetchUsers: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/user${queryParams ? `?${queryParams}` : ''}`);
  },
};

export const ownerAPI = {
  create: async (ownerData) => {
    return apiRequest('/owner', {
      method: 'POST',
      body: JSON.stringify(ownerData),
    });
  },

  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/owner${queryParams ? `?${queryParams}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/owner?_id=${id}`);
  },

  update: async (id, ownerData) => {
    return apiRequest(`/owner?_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(ownerData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/owner?_id=${id}`, {
      method: 'DELETE',
    });
  },
};

export const tenantAPI = {
  create: async (tenantData) => {
    return apiRequest('/tenant', {
      method: 'POST',
      body: JSON.stringify(tenantData),
    });
  },

  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest(`/tenant${queryParams ? `?${queryParams}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/tenant?_id=${id}`);
  },

  update: async (id, tenantData) => {
    return apiRequest(`/tenant?_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(tenantData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/tenant?_id=${id}`, {
      method: 'DELETE',
    });
  },
};

export const roleAPI = {
  getAll: async () => {
    return apiRequest('/role');
  },

  create: async (roleData) => {
    return apiRequest('/role', {
      method: 'POST',
      body: JSON.stringify(roleData),
    });
  },
};

export default {
  authAPI,
  ownerAPI,
  tenantAPI,
  roleAPI,
};

