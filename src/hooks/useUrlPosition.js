import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlPosition = () => {
    const [searchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(() => {
        // Your code here
        // This effect will run when the component mounts and whenever the URL changes
        // You can access the current URL using window.location.href or any other method you prefer
        // Update the urlPosition state variable with the desired value based on the URL

        return () => {
            // Cleanup code here (if needed)
            // This function will be called when the component unmounts or before the effect runs again
        };
    }, []);

    return [lat, lng];
};