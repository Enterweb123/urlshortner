const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connectDB = require('./config/db.js');
connectDB();

// getting models
const UrlModel = require('./models/UrlModel.js');

// middle ware for set a detault folders
app.use(express.static('public'));
// set varialbe value - setter getter
// app.set('title','mohan');
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
// app.use(bodyParser.json())

app.get("/", async (req, res) => {

    try {
        const result = await UrlModel.find();
        res.render('home', {
            urlResult: result
        })
    } catch (error) {
        console.log(error);
    }

});

app.post("/create", async (req, res) => {

    try {
        const user = new UrlModel({
            longUrl: req.body.longurl,
            shortUrl: generateURL(),
        });

        const data = await user.save();
        console.log(data);
        res.redirect('/')
    }
    catch (error) {
        console.log(error);
        // return res.json({msg: error.message });
    }
});

app.get('/:urlId', async(req, res) => {
    try {
        
        const urlShort= await UrlModel.findOne({shortUrl : req.params.urlId});

        try {
            const updateData = await UrlModel.findByIdAndUpdate(urlShort._id,{
                $inc:{clickCount:1}
            }) 
        } catch (error) {
            console.log(error);
        }
        
        res.redirect(urlShort.longUrl)

    } catch (error) {
        console.log(error);
    }    
})

app.get('/delete/:urlId', async(req, res) => {
    try {
        const deleteResponce= await UrlModel.findByIdAndDelete(req.params.urlId);
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }    
})

app.listen(4000, () => {
    console.log("server is live on port 4000");
});

const generateURL = () => {
    var rndResult = "";
    var charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charectersLength = charecters.length;

    for (var i = 0; i < 5; i++) {
        rndResult += charecters.charAt(
            Math.floor(Math.random() * charectersLength)
        );
    }
    return rndResult;
}