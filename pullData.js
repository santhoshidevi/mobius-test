angular.module("app")
    .service("pullData", ["$http", "$q", function ($http, $q) {
        async function searchData(obj) {
            console.log("inside searchData function");
            var xmlhr = new XMLHttpRequest();
            //var url = "https://api.github.com/search/users?q=" + obj;
            xmlhr.open("GET", obj, true);
            xmlhr.send();
            xmlhr.onreadystatechange = function (e) {
                if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                    console.log(xmlhr.responseText);
                    var resObj = JSON.parse(xmlhr.responseText);

                    return resObj;
                }
            }
            /* if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                 // xmlhr.onreadystatechange().then(function (e) {
                 //   if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                 console.log(xmlhr.responseText);
                 var displayObj = {};
                 var resObj = JSON.parse(xmlhr.responseText);
                 for (var i = 0; i < 10; i++) {
                     displayObj.push(resObj.items[i]);
                 }
                 return { item_count: resObj.total_count, incomplete_results: resObj.incomplete_results, items: displayObj };
             }
             // });*/
        }
        /* async function readyStateFun(xml) {
             xml.onreadystatechange = function (e) {
                 if (xml.readyState == 4 && xml.status == 200) {
                     console.log(xml.responseText);
                     var resObj = JSON.parse(xml.responseText);
 
                     return resObj;
                 }
             }
             if (xml.readyState != 4)
                 $timeout(function () {
                     console.log("timeout function");
                 }, 5000);
         }*/

        /* async function searchData(obj) {
             // let gitHubRes = await fetch("https://api.github.com/search/users?q=" + obj);
             //let gitHubRes = await searchData1(obj);
             console.log("inside searchData function");
             var xmlhr = new XMLHttpRequest();
             var url = "https://api.github.com/search/users?q=" + obj;
             xmlhr.open("GET", url, true);
             xmlhr.send();
             xmlhr.onreadystatechange = function (e) {
                 if (xmlhr.readyState == 4 && xmlhr.status == 200) {
                     console.log(xmlhr.responseText);
                     var resObj = JSON.parse(xmlhr.responseText);
 
                     return resObj;
                 }
             }
         }
 
         /*function searchData(obj) {
             return new promise((resolve, reject) => {
                 let req = searchData1(obj);
 
                 req.on('response', res => {
                     resolve(res);
                 });
                 req.on('error', err => {
                     reject(err);
                 });
             });
         }*/
        return {
            searchData: searchData
        }

    }]);