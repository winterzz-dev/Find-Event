import { createContext } from "react";

// const noop = () => { };

export const SettingsContext = createContext({
  city_id: null,
  country_id: null,
  user_id: null,
  user_token: null
});
