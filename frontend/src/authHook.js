import create from 'zustand';

const useStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    setAuth: (user, isAuthenticated) =>
      set((state) => ({
        ...state, // Spread the existing state
        user: user, // Update the user property
        isAuthenticated: isAuthenticated, // Update the isAuthenticated property
      })),
  }));
  
  export default useStore;
  