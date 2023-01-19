import axios from 'axios';


const searchAPI = axios.create({
    baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places",
    params:{
        limit:5,
        language:"es",
        access_token:"pk.eyJ1IjoidG9ub3ZhcmVsYSIsImEiOiJjazdhdTlqczUxN3VnM2VwNTFuZTV0cWp6In0.454u4lgDsq-FdCfpv5AmnQ"            
    }
});

export default searchAPI;