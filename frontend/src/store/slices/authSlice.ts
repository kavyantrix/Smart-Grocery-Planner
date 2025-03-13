import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/axios';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  phoneNumber?: string;
  address?: string;
  familySize?: number;
  dietaryRestrictions?: string[];
  allergies?: string[];
  settings?: {
    autoOrder: boolean;
    deliveryFrequency: string;
    monthlyBudget: number;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

interface AuthResponse {
  token: string;
  user: User;
}

interface ProfileResponse extends User {}

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ProfileResponse>('/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Fetch profile error:', error.response?.status);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        return rejectWithValue('Unauthorized');
      }
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid credentials');
      }
      return rejectWithValue('Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error: any) {
      if (error.response?.status === 400) {
        return rejectWithValue('Email already exists');
      }
      return rejectWithValue('Registration failed');
    }
  }
);

// Add login and register cases to extraReducers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;