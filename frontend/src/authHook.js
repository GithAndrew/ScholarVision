import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user, isAuthenticated) =>
    set((state) => ({
      ...state,
      user: user,
      isAuthenticated: isAuthenticated,
    })),
}));

export const createSchool = create((set) => ({
  schoolID: null,
  setMainSchool: (schoolID) =>
    set((state) => ({
      ...state,
      schoolID: schoolID,
    })),
}));