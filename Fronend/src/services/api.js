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
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}: ${response.statusText}`);
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || 'Something went wrong';
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const networkError = new Error('Network error: Unable to connect to server. Please check if backend is running.');
      networkError.type = 'network';
      throw networkError;
    }
    
    // Re-throw if already formatted
    if (error.status || error.data) {
      throw error;
    }
    
    // Handle other errors
    console.error('API Error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
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
    // Convert boolean strings to actual booleans
    const cleanFilters = { ...filters };
    Object.keys(cleanFilters).forEach(key => {
      if (cleanFilters[key] === 'true') cleanFilters[key] = true;
      if (cleanFilters[key] === 'false') cleanFilters[key] = false;
      // Remove empty string filters
      if (cleanFilters[key] === '') delete cleanFilters[key];
    });
    
    const queryParams = new URLSearchParams(
      Object.entries(cleanFilters)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {})
    ).toString();
    
    const response = await apiRequest(`/owner${queryParams ? `?${queryParams}` : ''}`);
    // Ensure payload is always an array
    if (response.payload && !Array.isArray(response.payload)) {
      response.payload = [response.payload].filter(Boolean);
    }
    return response;
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
    // Convert boolean strings to actual booleans
    const cleanFilters = { ...filters };
    Object.keys(cleanFilters).forEach(key => {
      if (cleanFilters[key] === 'true') cleanFilters[key] = true;
      if (cleanFilters[key] === 'false') cleanFilters[key] = false;
      // Remove empty string filters
      if (cleanFilters[key] === '') delete cleanFilters[key];
    });
    
    const queryParams = new URLSearchParams(
      Object.entries(cleanFilters)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {})
    ).toString();
    
    const response = await apiRequest(`/tenant${queryParams ? `?${queryParams}` : ''}`);
    // Ensure payload is always an array
    if (response.payload && !Array.isArray(response.payload)) {
      response.payload = [response.payload].filter(Boolean);
    }
    return response;
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

