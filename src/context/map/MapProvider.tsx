import { useReducer, useContext, useEffect } from 'react';

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from '../';

export interface MapState {
  isMapReady: boolean;
  map?: Map,
  markers: Marker[]
}
const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
}
interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);
  const { places } = useContext(PlacesContext);


  useEffect(() => {
    state.markers.forEach(marker => {
      marker.remove();
    })
    const newMarkers = places.map(({ center, text_es, place_name_es }) => {
      const [lng, lat] = center;
      const popup = new Popup().setHTML(`<h6>${text_es}</h6><p>${place_name_es}</p>`)
      return new Marker({
        color: "#61DAFB"
      })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map!);
    })
    dispatch({type:'setMarkers',payload:newMarkers})
    //Limpiar las polilynes

  }, [places])

  const myLocationPopUp = new Popup().setHTML(`<h4>Aqui estoy</h4>`)

  const setMap = (map: Map) => {
    new Marker({
      color: "#61DAFB"
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopUp)
      .addTo(map);


    dispatch({ type: 'setMap', payload: map })

  }
  return (
    <MapContext.Provider value={{ ...state, setMap }} >
      {children}
    </MapContext.Provider>
  )
}
