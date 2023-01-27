/* eslint import/no-webpack-loader-syntax:off */
import { useReducer, useContext, useEffect } from 'react';

//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from '../';
import { directionsAPI } from './../../api';
import { ResponseDirections } from '../../interfaces/responseMapBox';


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
    dispatch({ type: 'setMarkers', payload: newMarkers })
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

  const getRouteBetwenPoints = async (start: [number, number], end: [number, number]) => {
    const respuesta = await directionsAPI.get<ResponseDirections>(`/${start.join(',')};${end.join(',')} `);
    let { distance, geometry } = respuesta.data.routes[0];
    const { coordinates: coords } = geometry
    // let kms = distance / 1000;
    // kms = Math.round(kms * 100);
    // kms /= 100;
    //const minutes = Math.floor(duration / 60);

    const bounds = new LngLatBounds(start, start)
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, { padding: 200 })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }

          }
        ]
      }
    }

    if (state.map?.getLayer('RouteString')) {
      state.map?.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
      
    }
    //state.map?.removeSource('RouteString');
    state.map?.addSource('RouteString', sourceData)
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'white',
        'line-width': 3
      }
    })

    //console.log({ kms, minutes })
    //console.log(respuesta.data);


  }

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetwenPoints }} >
      {children}
    </MapContext.Provider>
  )
}
