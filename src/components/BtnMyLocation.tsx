import { useContext } from "react"
import { MapContext, PlacesContext } from "../context";




export const BtnMyLocation = () => {
    const {map,isMapReady}  = useContext(MapContext);
    const  {userLocation} =  useContext(PlacesContext);

  const handledClick = ()=> {
   if (!isMapReady){
        return;
    }
    if (!userLocation){
      return
    }
    map?.flyTo({zoom:14,center:userLocation})

  }
  return (
    <button className="btn btn-primary" style={ {
        position:"fixed",
        top:"20px",
        right:"20px",
        zIndex:999
    }}  onClick={handledClick}>
   Mi ubicación
    </button>
  )
}
