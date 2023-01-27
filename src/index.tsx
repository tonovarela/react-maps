/* eslint import/no-webpack-loader-syntax:off */
import React from "react";
import ReactDOM from "react-dom";
import { MapsApp } from './Maps.app';
//@ts-ignore
import mapboxgl from '!mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1IjoidG9ub3ZhcmVsYSIsImEiOiJjazdhdTlqczUxN3VnM2VwNTFuZTV0cWp6In0.454u4lgDsq-FdCfpv5AmnQ';


if (!navigator.geolocation){
    alert('Geolocation is not supported by this browser.');
    throw new Error('Geolocation is not supported by this browser.');
}

ReactDOM.render(
    <React.StrictMode>
        <MapsApp></MapsApp>
    </React.StrictMode>,
    document.getElementById("root")
);