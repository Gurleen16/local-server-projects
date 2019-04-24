var express = require('express')
var path = require('path')
var app = express()

//Acces static files
app.use(express.static(path.join(__dirname, 'public1')));

//Bodyparser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Connect with db
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/myDB';

mongoose.connect(mongoDB);

mongoose.connection.on('error', (err) => {
    console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
    console.log('DB connected');
});

var productSchema = new mongoose.Schema({
    productName: String
  })

var product =  mongoose.model('Products', productSchema);

// Add in db
app.post('/addProduct',function (req, res) {
  //console.log(req.body);
  let newProduct = new product({
    productName: req.body.name
  })
  newProduct.save()
   .then(data => {
     console.log(data)
     res.send(data)
   })
   .catch(err => {
     console.error(err)
     res.send(error)
   })

})
//delete product
app.post('/deleteProduct' , function(req,res)
{
  console.log(req.body.productName + "**");
  var myquery = { productName : req.body.productName };
  product.deleteOne(myquery, function(err, obj)
  {
    if (err) throw err;
    console.log("1 document deleted");
  });
})
//Get from DB
app.get('/products',function(req,res){
    product.find({
         // search query
        // productName: 'mlbTvrndc'
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})


//
app.put('/updateProduct',function(req,res){
    console.log(req.body);
    product.findOneAndUpdate(
    {
        productName: req.body.name  // search query
    },
    {
      productName: req.body.nameNew   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
    .then(data => {
        console.log(data)
        res.send(data)
      })
      .catch(err => {
        console.error(err)
        res.send(error)
      })
})
app.get('/test',function(req,res){
    res.send('hello');
})
app.listen(3225);
