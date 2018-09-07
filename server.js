const express=require('express');
const hbs=require('hbs');
var fs=require('fs');
const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname + 'views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    // return 'test';
       return new Date().getFullYear();
})

hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})

app.set('view engine','hbs');

//app.use is express middleware
// app.use(express.static(__dirname + '/public'));  //we  comment it b/c it shows us help.html instead of maintenance.hbs that's we put after maintenance logger
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`
    console.log(log)
    // console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            console.log('Unable to append in server.log.');
         }
    })
    next();
}
)

app.use((req,res,next)=>{
res.render('maintenance.hbs')
})

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>')
    // res.send({
    //     name:"Umar Aslam Nawab",
    //     likes:[
    //         'writting',
    //         'coding',
    //     ]
    // })
   res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomePage:'Welcome to Home page',
    currentYear:new Date().getFullYear(),
   })

})


app.get('/about',(req,res)=>{
    // res.send('Hello About');
   res.render('about.hbs',{
       pageTitle:"About Page",
       welcomePage:"Welcome to About page",
       currentYear:new Date().getFullYear(),
   })


})

//also try this to see the diffrence

//bad - send back json with error message
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Unable to handle this request"
    })
})

app.listen(port,()=>{
    console.log(`Server is up at port ${port} `);
})

// app.listen(port,()=>{
//     console.log(`Server is up at port 3000 ${port}`)
// })