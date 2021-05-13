"use strict";
var app = angular.module("app", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './htm/home.htm',
            controller: 'mainCtrl'
        })
        .when("/:person/user.login", {
            templateUrl: "./htm/userLogin.htm",
            controller: "userLoginCtrl"
        })

});
app.controller("mainCtrl", ["$scope", "$q", "pullData", function ($scope, $q, pullData) {
    var initModels = { "searchStr": "", "displayData": [] };
    $scope.initModels = angular.copy(initModels);


    $scope.initModels.search = function (str) {
        //if (event.keyCode == 13) {
        getData(str);
        console.log("inside search function function");
        //}
    }

    async function getData(obj) {
        console.log("inside getdata function");
        var xmlhr = new XMLHttpRequest();
        var url = "https://api.github.com/search/users?q=" + obj;
        xmlhr.open("GET", url, true);
        xmlhr.send();
        xmlhr.onreadystatechange = function (e) {
            if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                console.log(xmlhr.responseText);
                var resObj = JSON.parse(xmlhr.responseText);
                assignData(resObj);
            }
        }

    }
    $scope.initModels.personDetails = function (person) {
        window.location.href += ":" + person.login + "/user.login";
    }

    /*sync function getData(obj) {
        console.log("inside getdata function");
        var work = "resolve";
        var promise = $q(function (resolve, reject) {
            var response = pullData.searchData(obj);
            var obj = response.total_count;
            assignData(response);
            // if (work === "resolve") {
            //     resolve('response 1!');
            // } else {
            //     reject('Oops... something went wrong');
            // }
        });
        promise.then(function (data) {
            console.log("error");
            alert(data)

        })
        //var response = await pullData.searchData(obj);
        // var obj = await response.total_count;
        //await assignData(response);
    }
    // await new promise((resolve, reject => pullData.searchData(obj)));
    // console.log("inside getdata function");*/


    function assignData(res) {
        var displayObj = [];
        if (res) {
            for (var i in res.items) {
                if (i < 10) {
                    displayObj.push(res.items[i])
                }
            }
            $scope.initModels.displayData = angular.copy([{ count: res.total_count, items: displayObj }]);
            console.log($scope.initModels.displayData);
            displayObj = [];
        }
    }

    $scope.$watch('initModels.displayData', function () {
        console.log("initModels.displayData is changed");
        console.log(initModels.displayData);
    })


    function Onload() {

    }
    Onload();
}]);