const request= require('request')
const geocode=(address, callback)=>
{
    var url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoidmlja3lra3VtYXQiLCJhIjoiY2tnejZpc2kyMG9zMTJxcGNmZGN4eXI5OSJ9.F6qql5kBvkV4xBiM4zcqDg&limit=1'
    var location=request({url:url, json:true},(error,response)=>{
        if(error){
            callback('unable to open geolocation!', undefined)
        }else if(response.body.message|| response.body.features.length==0){
            callback(undefined,'location not found!')
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude:  response.body.features[0].center[1],
                location:  response.body.features[0].place_name
        })
    }
    })
}

module.exports=geocode