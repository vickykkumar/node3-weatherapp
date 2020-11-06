const path=require('path')
const express=require('express')
const hbs=require('hbs')
const whether =require('./utils/whether.js')
const geocode=require('./utils/geocode.js')

const app=express()


const pathDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../template/views')
const partialPath=path.join(__dirname,'../template/header')


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(pathDirectory))




app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'vicky'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather-app/about',
        name:'vicky'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'weather-app/help',
        name:'vicky'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'address not available!'
        })
    }
    geocode(encodeURIComponent(req.query.address),(error,data)=>{
        if(error)
        {
            return res.send({
                error: error
            })
        }
        whether(data.longitude,data.latitude,(error,forecastdata)=>{
            if(error)
            {
                return res.send({
                    error: error
                })
            }
            res.send({
                location : data.location,
            forcastdata:forecastdata})
        
        })
    
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'donar',
        name:'donar',
        errormessage: '404 not found'
    })
})

app.listen(3000,()=>{
    console.log('port is working')
})