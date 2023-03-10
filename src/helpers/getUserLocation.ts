export const getUserLocation = async ():Promise<[number,number]> => {
     return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(({coords})=>{
                resolve([coords.longitude,coords.latitude]);
            },
            (error)=>{
                console.log(error);
                alert("No se pudo obtener la geolocacion");
                reject();
            }
        );
     })

}