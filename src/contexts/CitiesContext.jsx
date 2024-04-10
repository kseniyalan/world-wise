import { createContext, useContext, useState, useEffect } from 'react';

const BASE_URL = "http://localhost:8000";

// Create a new context
const CitiesContext = createContext();

// Create a custom hook to access the context
export const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CityContext was used outside the CitiesProvider")
    return context;
};

// Create a provider component
export const CitiesProvider = ({ children }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/cities`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
            console.error("Error fetching cities", error);
        } finally {
            setIsLoading(false);
        }
      }
      fetchCities();
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, isLoading }}>
            {children}
        </CitiesContext.Provider>
    );
};