import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from './placesReducer';
import { getUserLocation } from "../../helpers";

import { searchAPI } from "../../api";
import { ResponseSearch, Feature } from '../../interfaces/responseSearch';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces:boolean,
    places:Feature[]
}

interface  Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces:false,
    places:[]
}

export const PlacesProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(placesReducer,INITIAL_STATE);

    useEffect(() => {
      getUserLocation().then(lngLat=>dispatch({type:'setUserLocation',payload:lngLat}))
    }, [])
    
    const searchPlacesByTerm = async(query:string):Promise<Feature[]>=>{
        dispatch({type:"setPlaces",payload:[]})
        if (query.length===0) return [];
        if (!state.userLocation) throw new Error('User location is not set');            

        dispatch({type:"setLoadingPlaces"})
        const resp = await  searchAPI.get<ResponseSearch>(`/${query}.json`,{params:{proximity:state.userLocation.join(",")}});        
        dispatch({type:"setPlaces",payload:resp.data.features})
        return resp.data.features;
    }
    return (
        <PlacesContext.Provider value={{...state,searchPlacesByTerm}}>
            {children}
        </PlacesContext.Provider>
    )
};

