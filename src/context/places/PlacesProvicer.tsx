import { PlacesContext } from "./PlacesContext";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];

}

interface  Props {
    children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
}



export const PlacesProvider = ({children}:Props) => {
    return (
        <PlacesContext.Provider value={INITIAL_STATE}>
            {children}
        </PlacesContext.Provider>
    )
};

