import { PlacesProvider,MapProvider} from "./context";
import { HomePage } from "./pages";
import './styles.css'

export const MapsApp = () => {
  return (
    <PlacesProvider >
      <MapProvider>
      <HomePage></HomePage>
      </MapProvider>
    </PlacesProvider>
  )
};

