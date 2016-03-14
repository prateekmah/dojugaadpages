var app = angular.module('postApp',['ui.select2','ngFileUpload']);
//client side controller to handle user problem submission
app.controller('problemController' , function($scope,$http,$window){
	
	console.log('Running');
	 //code to handle tags
	 $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['Technology', 'Music', 'Health', 'Laptop']  // Can be empty list.
    };
//function called when user clicks on submit 
   $scope.savePost = function() {
          
        
		//client side variable to collect the data from the view page
		var Data = {
            'title': $scope.post.title,
            'description': $scope.post.description,
			'quantity': $scope.post.quantity,
			'tags':  $scope.post.tags,
			'email':'abc@gmail.com'
		};
		var data2 = $scope.post;
		console.log(Data);

       //http method description
        $http({
            method: 'post',
            url: '/problem',
            data: Data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
			console.log('success  '+angular.toJson(data));
			alert(data.message);
        });


    };
	
	
});//code ends here


//for file upload

//for file upload

app.controller('UploadController', ['$scope', 'Upload', '$timeout','$http', function ($scope, Upload, $timeout,$http) {
    $scope.submit = function() {
		console.log($scope.files);
		//http method description
       /*  $http({
            method: 'post',
            url: '/upload',
            files :$scope.files,
            headers: {
                'Content-Type': 'multipart/form-data;'
            }
        }).success(function (data) {
			console.log('success  '+angular.toJson(data));
			alert(data.message);
        });
		 */
		 
		 $scope.uploadFiles($scope.files);
     };
	
	
    // for multiple files:
    $scope.uploadFiles = function(files) {
		console.log('running');
        $scope.files = files;
    //    $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/upload',
                data: {file: file}
				
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
										 console.log(file.progress);
            });
        });
    };
	/* $scope.uploadFiles = function(files, errFiles) {
		console.log('running');
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file}
				
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
										 console.log(file.progress);
            });
        });
    } */
}]);

