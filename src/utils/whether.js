const request=require('request')
const whether = (latitude, longitude, callback)=>{

    const url='http://api.weatherstack.com/current?access_key=9826fd3ecbebb667b9cfbbca4dbd56cd&query='+latitude+','+longitude+'&units=f'
    const location =request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('unable toopen weather app!')
        }else if(response.body.error){
            callback(undefined,'location not found!')
        }
        else{
            callback(undefined,response.body.current.temperature)
        }
    })
}

module.exports=whether