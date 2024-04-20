import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

import styles from "./City.module.css";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCurrentCity, currentCity, isLoading } = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  // getCurrentCity(id) function is a part of the CitiesContext value object.  
  // So, if we provide getCurrentCity(id) function as a dependensy array for this useEffect():
  //Function will update the state (currentCity) each time it is executed. Then with the currentCity update the entire contextValue object will be recreated -> 
  // -> getCurrentCity(id) function will be recreated -> useEffect will be triggered again -> getCurrentCity(id) will be executed again ->
  // -> INFINITE LOOP!
  // But we can't remove getCurrentCity(id) from the dependensy array
  // So to avoid this, we need to wrap getCurrentCity(id) function in a useCallback hook in the CitiesContext component.
  
  useEffect(function () { 
    getCurrentCity(id);
  }, [id, getCurrentCity]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
          <BackButton />
      </div>
    </div>
  );
}

export default City;
