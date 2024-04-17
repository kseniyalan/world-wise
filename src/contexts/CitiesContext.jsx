import { createContext, useContext, useEffect } from 'react';
import { useReducer } from 'react';

const BASE_URL = "http://localhost:8000";

// Create a new context
const CitiesContext = createContext();

// Create a custom hook to access the context
export const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CityContext was used outside the CitiesProvider")
    return context;
};

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: ''
};

// Reducer function
const citiesReducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return {
              ...state,
              isLoading: true
            };
        case "cities/loaded":
            return {
              ...state,
              cities: action.payload,
              isLoading: false
            };
        case "city/loaded":
            return {
              ...state,
              currentCity: action.payload,
              isLoading: false
            };
        case "cities/created":
            return {
              ...state,
              cities: [...state.cities, action.payload],
              currentCity: action.payload,
              isLoading: false
            };
        case "cities/deleted":
            return {
              ...state,
              cities: state.cities.filter((city) => city.id !== action.payload),
              currentCity: {},
              isLoading: false
            };
        case "rejected":
            return {
              ...state,
              isLoading: false,
              error: action.payload
            };
        default:
            throw new Error('Unknown action type in citiesReducer');
    }
};

// Create a provider component
export const CitiesProvider = ({ children }) => {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(citiesReducer, initialState);
  
    useEffect(() => {
      async function fetchCities() {
        dispatch({ type: "loading" });
        try {
          const response = await fetch(`${BASE_URL}/cities`);
          const data = await response.json();
          dispatch({ type: "cities/loaded", payload: data });
        } catch (error) {
          dispatch({ type: "rejected", payload: "There was an error fetching cities" });
        }
      }
      fetchCities();
    }, []);

    async function getCurrentCity(cityId) {
      if (Number(cityId) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${cityId}`);
        const data = await response.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error fetching a city" });
      }
    }

    async function createCity(newCity) {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCity),
        });
        const data = await response.json();
        dispatch({ type: "cities/created", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error creating a city" });
      }
    }

    async function deleteCity(cityId) {
      dispatch({ type: "loading" });
      try {
        await fetch(`${BASE_URL}/cities/${cityId}`, {
          method: "DELETE",
        });
        dispatch({ type: "cities/deleted", payload: cityId });
      } catch (error) {
        dispatch({ type: "rejected", payload: "There was an error deleting a city" });
      }
    }

    return (
        <CitiesContext.Provider value={{ cities, currentCity, isLoading, error, getCurrentCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
};