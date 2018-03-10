
//const stockApp = require('angular');
const stockApp = angular.module('stockApp', []);

stockApp.controller("userInputController",   function($scope, $http) {
    console.log('This meanns you are connected to the backend');
    $scope.welcome = "Welcome to the world's best stock tracking app";

    //get all the records from the DB
    var getStocks = function()  {
        // $http.get('/getStocks').success(function(response)  {
        //     $scope.storedStocks = response;
        // });
        $http({
            method: 'GET',
            url: '/getStocks'
        }).then(function successCallback(res)   {
            console.log('Successful Callback! ' + res);
             $scope.storedStocks = res;
        }, function errorCallback(err)  {
            console.log('Error Callback!');
        });
    };

    getStocks();

});//end of controller