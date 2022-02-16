import { createSelector } from "reselect";

// action types

export const LIGHT_MODE = "LIGHT_MODE";
export const DARK_MODE = "DARK_MODE";

// action creators

export const setLightMode = () => ({
  type: LIGHT_MODE,
});

export const setDarkMode = () => ({
  type: DARK_MODE,
});

// reducer

export const initialState = {
  theme: "light",
};

const ThemeReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case LIGHT_MODE: {
      return {
        theme: "light",
      };
    }
    case DARK_MODE: {
      return {
        theme: "dark",
      };
    }
    default: {
      return state;
    }
  }
};

export const selectThemeState = (state) => state.entities.theme;

export const themeSelector = createSelector([selectThemeState], (theme) => theme);

export default ThemeReducer;
