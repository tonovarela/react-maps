import axios from 'axios';


const directionsAPI = axios.create({
    baseURL:"https://api.mapbox.com/directions/v5/mapbox/driving",
    params:{        
        alternatives:false,
        geometries:"geojson",
        overview:"simplified",
        steps:false,        
        access_token:"pk.eyJ1IjoidG9ub3ZhcmVsYSIsImEiOiJjazdhdTlqczUxN3VnM2VwNTFuZTV0cWp6In0.454u4lgDsq-FdCfpv5AmnQ"            
    }
});

export default directionsAPI;