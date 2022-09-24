import {useQuery} from '@tanstack/react-query'
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'
import styles from "./entur.module.scss"
import nb from 'date-fns/locale/nb';
const getDepartures = async () => {
    const query ={"operationName":"getStopPlacesWithDepartures","variables":{"ids":["NSR:StopPlace:59600"]},"query":"query getStopPlacesWithDepartures($ids: [String]!) {\n  stopPlaces(ids: $ids) {\n    id\n    name\n    description\n    latitude\n    longitude\n    transportMode\n    transportSubmode\n    estimatedCalls(\n      numberOfDepartures: 200\n      timeRange: 172800\n      numberOfDeparturesPerLineAndDestinationDisplay: 20\n      arrivalDeparture: departures\n    ) {\n      aimedDepartureTime\n      cancellation\n      date\n      destinationDisplay {\n        frontText\n        __typename\n      }\n      expectedDepartureTime\n      quay {\n        id\n        name\n        publicCode\n        __typename\n      }\n      serviceJourney {\n        id\n        journeyPattern {\n          line {\n            publicCode\n            transportMode\n            __typename\n          }\n          __typename\n        }\n        transportSubmode\n        __typename\n      }\n      situations {\n        summary {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"}
const data = await  axios.post("https://api.entur.io/journey-planner/v3/graphql", query, {headers: {"Sec-Fetch-Dest": "empty",
"Sec-Fetch-Mode": "cors",
"Sec-Fetch-Site": "cross-site"}})

return data.data

}

const Entur = () => {
    const {data, isLoading} = useQuery(['departures'], getDepartures, {
        // Refetch the data every second
        refetchInterval: 45000,
      });

    if(isLoading) return <div>Loading...</div>
    const departures = data.data.stopPlaces[0].estimatedCalls;
   
    return (
        <div className={styles.departureGrid}>
            {departures.slice(0,5).map((departure, index) => {
                return (
                    <div key={index} className={styles.departureCard}>
                        <span>{departure.serviceJourney.journeyPattern.line.publicCode}</span>
                        <div className={styles.info}>
                        <p> {departure.destinationDisplay.frontText}</p>
                        <p className={styles.departureTime}>{formatDistanceToNow(new Date(departure.expectedDepartureTime), {locale: nb})}</p>
                    </div>
                    </div>
                )
            })}
        </div>
    )
    
}

export default Entur;