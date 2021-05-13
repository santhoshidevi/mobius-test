app.controller("userLoginCtrl", ["$scope", "pullData", "$location", "$routeParams", "constSvc", function ($scope, pullData, $location, $routeParams, constSvc) {
    var url = constSvc.loginUrl;
    $scope.userLoginDetails = { "personalDetails": {} };
    $scope.img = "";


    async function searchData(url) {
        console.log("inside searchData function");
        var xmlhr = new XMLHttpRequest();
        //var url = "https://api.github.com/search/users?q=" + obj;
        xmlhr.open("GET", url, true);
        xmlhr.send();
        xmlhr.onreadystatechange = function (e) {
            if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                console.log(xmlhr.responseText);
                var resObj = JSON.parse(xmlhr.responseText);
                $scope.userLoginDetails.personalDetails = angular.copy(resObj);
                console.log($scope.userLoginDetails.personalDetails);
                getImage($scope.userLoginDetails.personalDetails.avatar_url);
            }
        }
    }

    function getImage(filename) {
        fetch(filename).then((resp) => resp.text()).then(function (data) {
            $scope.img = data;
            getBase64Image($scope.img, '', 'png');
            /* var image = new Image();
             image.src = $scope.img;
             document.body.appendChild(image);*/
        });
    }

    function getBase64Image(src, callback, outputFormat) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let dataURL;
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };

        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
        //document.getElementById("dynImg").src = img.src;
        saveImage(img.src);
    }

    function saveImage(base64string) {
        var imageData = base64string.split(',')[1];
        var a = $("<a>").attr("href", "data:Application/base64," + imageData)
            .attr("download", "image.png")
            .appendTo("body");

        a[0].click();

        a.remove();
    }

    function Useronload() {
        //$route.current.params.person="";
        var params = $routeParams;
        var res = searchData(url + params.person.replace(":", ""));

        console.log("res data", res);
    }
    Useronload();
}]);