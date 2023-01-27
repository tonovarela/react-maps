import { createContext } from "react";
import {  Feature } from '../../interfaces/responseSearch';

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  places:Feature[],
  isLoadingPlaces:boolean,
  searchPlacesByTerm: (term: string) => Promise<Feature[]>;
  
}
export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);


