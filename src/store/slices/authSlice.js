import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { roles } from "constants/index";

const initialState = {
  users: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "admin@example.com",
      password: "admin123",
      department: "Administration",
      role: [roles.ADMIN],
      position: null
    },
    {
      id: 2,
      firstName: "Yengwe",
      lastName: "Tepula",
      email: "Yengwe.Tepula@ihmafrica.org",
      password: "password123",
      department: "Software",
      role: [roles.USER],
      position: "Software Developer",
      supervisorId: 3
    },
    {
      id: 3,
      firstName: "Terence",
      lastName: "Kaite",
      email: "Terence.Kaite@ihmafrica.org",
      password: "password123",
      department: "Software",
      role: [roles.SUPERVISOR],
      position: "Software Developer",
      supervisorId: 3
    },
    {
      id: 4,
      firstName: "Paul",
      lastName: "Poho",
      email: "Paul.Poho@ihmafrica.org",
      password: "password123",
      department: "Health Informatics",
      role: [roles.SUPERVISOR],
      position: null,
      supervisorId: 4
    },
    {
      id: 5,
      firstName: "Bwalya",
      lastName: "Funkwe",
      email: "Bwalya.Funkwe@ihmafrica.org",
      password: "password123",
      department: "Finance",
      role: [roles.FINANCE],
      position: null,
      supervisorId: 7
    },
    {
      id: 6,
      firstName: "Mundeke",
      lastName: "Shamatanga",
      email: "Mundeke.Shamatanga@ihmafrica.org",
      password: "password123",
      department: "Finance",
      position: null,
      role: [roles.FINANCE, roles.COST_CENTRE_OWNER],
    },
    {
      id: 7,
      firstName: "Juma",
      lastName: "Phiri",
      email: "Juma.Phiri@ihmafrica.org",
      password: "password123",
      department: "Finance",
      role: [roles.FINANCE, roles.SUPERVISOR],
      position: null,
      supervisorId: 7
    },
    {
      id: 8,
      firstName: "Patrick",
      lastName: "Shabangu",
      email: "Patrick@ihmafrica.org",
      password: "password123",
      department: "Health Informatics",
      position: null,
      role: [roles.COST_CENTRE_OWNER],
    },
    {
      id: 9,
      firstName: "Mustafa (Pulak)",
      lastName: "Mahmoud",
      email: "Pulak@ihmafrica.org",
      password: "password123",
      department: "Software",
      role: [roles.COST_CENTRE_OWNER],
      position: "Software Developer",
    },
  ],
  currentUser: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { getState, rejectWithValue }) => {
    const { users } = getState().auth;
    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );
    if (user) {
      return user;
    } else {
      return rejectWithValue("Invalid Credentials");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
    createUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: state.users.length + 1,
      };
      state.users.push(newUser);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = { ...state.currentUser, ...action.payload };
        }
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.currentUser = null;
      });
  },
});

export const {logout, createUser, updateUser, deleteUser } =
  authSlice.actions;
export default authSlice.reducer;
