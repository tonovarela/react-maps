import { useContext, useState } from 'react';
import { PlacesContext, MapContext } from '../context'
import { LoadingBox } from './LoadingBox';
import { Feature } from '../interfaces/responseSearch';





export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetwenPoints } = useContext(MapContext);

  const [activeID, setActiveID] = useState('');

  const gotoUbication = (place: Feature) => {
    setActiveID(place.id);
    console.log(place.geometry.coordinates.join(","));
    const [lng, lat] = place.center;
    map?.flyTo({ zoom: 14, center: [lng, lat] });
  }



  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center

    getRouteBetwenPoints(userLocation, [lng, lat]);    
  }





  if (isLoadingPlaces) {
    return <LoadingBox></LoadingBox>
  }
  if (places.length === 0) {
    return <></>
  }

  return (

    <ul className="list-group mt-3">
      {
        places.map(place => (
          <li key={place.id} className={`${activeID == place.id ? 'active' : ''}  list-group-item list-group-item-action pointer`}  >
            <h6 onClick={()=>{gotoUbication(place)}}>{place.place_name_es}</h6>
            <p style={{ fontSize: '12px' }}>
              {place.text_es}
            </p>
            <button className={`btn btn-sm ${activeID == place.id ? 'btn-outline-light ' : 'btn-outline-primary '} `}
              onClick={() => {                
                getRoute(place);
              }}>Direcciones</button>
          </li>
        ))


      }


    </ul>
  )
}
