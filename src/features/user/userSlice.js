import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUserRequest,
  getBookmarkRequest,
  addBookmarkRequest,
  removeBookmarkRequest,
  followUserRequest,
  unfollowUserRequest,
  updateProfileRequest,
} from "requests";
import toast from "react-hot-toast";
import { fetchSearchedUser } from "utilities";

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await getAllUserRequest();

      if (status === 200) {
        return data.users;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const getBookmarks = createAsyncThunk(
  "user/getBookmark",
  async (token, { rejectWithValue }) => {
    try {
      const { data, status } = await getBookmarkRequest(token);

      if (status === 200) {
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const addBookmark = createAsyncThunk(
  "user/addBookmark",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await addBookmarkRequest(arg);

      if (status === 200) {
        toast.success("Post added to bookmark");
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "user/removeBookmark",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await removeBookmarkRequest(arg);

      if (status === 200) {
        toast.success("Post removed from bookmark");
        return data.bookmarks;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await followUserRequest(arg);

      if (status === 200) {
        toast.success(`${data.followUser.username} followed`);
        return data;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await unfollowUserRequest(arg);

      if (status === 200) {
        toast.success(`${data.followUser.username} unfollowed`);
        return data;
      }
    } catch {
      return rejectWithValue([], "Error occured. Try again later.");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (arg, { rejectWithValue }) => {
    try {
      const { data, status } = await updateProfileRequest(arg);

      if (status === 201) {
        toast.success("Profile updated");
        return data.user;
      }
    } catch {
      return rejectWithValue("Some error occured. Try again");
    }
  }
);

const updateFollowingUser = (users, followingUser) => {
  return [...users].map((user) =>
    user._id === followingUser._id ? followingUser : user
  );
};

const updateFollowedUser = (users, followedUser) => {
  return [...users].map((user) =>
    user._id === followedUser._id ? followedUser : user
  );
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    bookmarks: [],
    searchVal: "",
    searchResult: [],
    isLoading: false,
    error: "",
  },

  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setSearchVal: (state, { payload }) => {
      state.searchVal = payload;
      state.searchResult = fetchSearchedUser(state.users, payload);
    },
  },

  extraReducers: {
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },

    [updateProfile.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) =>
        user.username === payload.username ? payload : user
      );
      state.isLoading = false;
    },

    [updateProfile.rejected]: (state) => {
      state.isLoading = false;
    },

    [getBookmarks.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [addBookmark.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [removeBookmark.fulfilled]: (state, { payload }) => {
      state.bookmarks = payload;
    },

    [followUser.fulfilled]: (state, { payload: { user, followUser } }) => {
      state.users = updateFollowingUser(state.users, user);
      state.users = updateFollowedUser(state.users, followUser);
    },

    [unfollowUser.fulfilled]: (state, { payload: { user, followUser } }) => {
      state.users = updateFollowingUser(state.users, user);
      state.users = updateFollowedUser(state.users, followUser);
    },
  },
});

export const { setLoading, setSearchVal } = userSlice.actions;
export default userSlice.reducer;