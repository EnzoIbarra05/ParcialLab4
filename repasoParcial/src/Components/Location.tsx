import MenuOptions from "./MenuOptions"
import "./estilos/Location.css"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '90%',
  height: '500px',
  margin: "0 auto",
};

const center = {
  lat: -34.6037,  // Ejemplo: Obelisco
  lng: -58.3816,
};


export default function Location (){
    return(<>
    <MenuOptions></MenuOptions>
    <div className="container">
    <div className="donde">
       <h2>Donde estamos?</h2>  
    </div> 

   <LoadScript googleMapsApiKey="AIzaSyCtxc40crt0znwL9-eyqyQxjO5IS7s1tfY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
    </div>
    </>)
}