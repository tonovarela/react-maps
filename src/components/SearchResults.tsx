import { useContext } from 'react';
import { PlacesContext } from '../context'
import { LoadingBox } from './LoadingBox';
import { Feature } from '../interfaces/responseSearch';
import { MapContext } from '../context/map/MapContext';




export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const  {map} = useContext(MapContext)

  const gotoUbication = (place: Feature) => {
    console.log(place.geometry.coordinates.join(","));
    const [lng,lat] = place.center;
    map?.flyTo({zoom:14,center:[lng,lat]});
  }


  if (isLoadingPlaces) {
    return <LoadingBox></LoadingBox>
  }
  if (places.length == 0) {
    return <></>
  }

  return (

    <ul className="list-group mt-3">
      {
        places.map(place => (
          <li key={place.id} className="list-group-item list-group-item-action">
            <h6>{place.place_name_es}</h6>
            <p className="text-muted" style={{ fontSize: '12px' }}>
              {place.text_es}
            </p>
            <button className="btn btn-outline-primary btn-sm" onClick={() => { gotoUbication(place) }}>Direcciones</button>
          </li>
        ))


      }


    </ul>
  )
}
