import { useReducer } from 'react';

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map
}
const initialState: MapState = {
  isMapReady: false,
  map: undefined,

}
interface Props {
  children: JSX.Element | JSX.Element[]
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);
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
