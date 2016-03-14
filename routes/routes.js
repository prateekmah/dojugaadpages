module.exports = function(app,db) {

//Server Side post request function 	
app.post('/problem', function(req,res){
	

        
		//Getting the values into Post variable from the client side controller
		var Post={
            "title": req.body.title,
			"description" : req.body.description,
			"quantity":req.body.quantity,
			"tags" : req.body.tags,
			"email":req.body.email
		};

       
         //inserting the Post data in postData Collection    
         db.postData.insert(Post, function (err, doc) {
            var result={
				Operation:"insert post",
			}            
		   if(!err){
			  result ={				  
				 isDMLSuccessful:true,
                 data:doc,
                 message:'Post inserted successfully'       				 
			  }
			}else{
				 result ={
				 isDMLSuccessful:false,                 
                 message:'Unexpected Error'       				 
			  }
				console.log('not inserted');
			}
			res.json(result);
        });

       
		 
	});
	//code to test the get request
	/* app.get('/problem', function(req,res){
       console.log('recieved req');
       res.send('inside get');  
		 
	}); */
	
	app.post('/upload', function(req,res){
			var multiparty = require('multiparty');
			var form = new multiparty.Form();
 
    form.parse(req, function(err, fields, files) {
		console.log('path' + files.file[0].path);
		var file = files.file[0];
		var path = file.path ;
		
/* 		var mongo = require('mongodb');
		var Grid = require('gridfs-stream');
 
// create or use an existing mongodb-native db instance 
		var db = new mongo.Db('mydb', new mongo.Server("127.0.0.1", 27017));
		
 */		
 var mongo = require('mongodb');
		var Grid = require('gridfs-stream');
		var fs = require('fs');
 var MongoClient=mongo.MongoClient,

server=mongo.Server;

var mongoclient=new MongoClient(new server('localhost',27017));

mongoclient.connect('mongodb://localhost:27017/mydb',function(err,db)
{
		var gfs = Grid(db, mongo);
 
// streaming to gridfs 
		console.log(file.originalFilename);
		var writestream = gfs.createWriteStream({
		filename: file.originalFilename
		
		});
		fs.createReadStream(path).pipe(writestream);
		console.log('success' + path);
// streaming from gridfs 
var readstream = gfs.createReadStream({
  filename: file.originalFilename
});
 
//error handling, e.g. file does not exist 
readstream.on('error', function (err) {
  console.log('An error occurred!', err);
  throw err;
});
 
readstream.pipe(res);
			
	});
	});	
	});

}//code ends here
