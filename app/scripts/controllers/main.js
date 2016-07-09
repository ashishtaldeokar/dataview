'use strict';

/**
 * @ngdoc function
 * @name dataviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dataviewApp
 */
angular.module('dataviewApp')
  .controller('MainCtrl', function ($filter,$rootScope,$scope,$http) {
    console.log("here");
    var header= [];
    var j = 0;
    $http.get("http://52.66.64.197:3000/api/leads").then(function(response){
      $scope.data = response.data;
      $scope.$broadcast("gotdata",response.data);

      for(var i = 0; i < $scope.data.length ; i++)
      {
        if($scope.data[i]['condition'] == null)
          $scope.data[i]['condition'] == 'no data';
        j = 0;
        if($scope.data[i]['condition_type'] == null)
          $scope.data[i]['condition_type'] = "no data";
        if($scope.data[i]['condition_name'] == null)
          $scope.data[i]['condition_name'] = "no data";
        angular.forEach($scope.data[i],function(value,key){
          if(key == 'condition'){
            $scope.data[i].condition_type = value[0].type;
            $scope.data[i].condition_name = value[0].name;
          }
          if(key == 'created'){
            var d = new Date(value);
            $scope.data[i].created = $filter('date')(d, 'short');
          }

        });
        delete $scope.data[i].condition;

      }
      for(var i = 0 ; i < $scope.data.length; i++){
        j = 0;
        angular.forEach($scope.data[i],function(value,key){
          header[j] = key;
          j++;
        });
      }
      $scope.head = header;
    });
    var chartData = generateChartData();

function generateChartData() {
  var chartData = [];
  var firstDate = new Date( 2012, 0, 1 );
  firstDate.setDate( firstDate.getDate() - 500 );
  firstDate.setHours( 0, 0, 0, 0 );

  for ( var i = 0; i < 500; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + i );

    var value = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;

    chartData.push( {
      date: newDate,
      value: value
    } );
  }
  return chartData;
}

var chartData = [{date : [],value : [4]}];
chartData[0].date.push(new Date (2016,0,1));
chartData.push({date :new Date (2016,0,2), value : [6]});
$scope.$on("gotdata",function(event,data){
  var chartData = [];
  for(var i = 0; i < data.length;i++){
    var d = new Date(data[i].created);
      chartData.push({date : [new Date(d.getYear(),d.getMonth(),d.getDate())],value : [i+1]});
  }
  console.log(chartData);
  var temp = [];
  for(var i = 0; i < chartData.length; i++){
    if(i == 0)
      temp.push(chartData[i]);
    else{
      console.log(temp)
      var flag = false;
      for(var j = 0; j < temp.length; j++){
        console.log(i+"-->"+j);
        if(temp[j].date[0].toString() == chartData[i].date[0].toString()){
          temp[j].value[0]++;
          flag = true;
        }
      }
      if (flag == false){
        temp.push({date : chartData[i].created , value : [0]});
      }
    }
  }
  console.log(temp)
  chartData = temp;
  var chart = AmCharts.makeChart( "chartdiv", {

    type: "stock",
    "theme": "light",

    dataSets: [ {
      color: "#b0de09",
      fieldMappings: [ {
        fromField: "value",
        toField: "value"
      } ],
      dataProvider: chartData,
      categoryField: "date"
    } ],

    panels: [ {
      showCategoryAxis: true,
      title: "Value",
      eraseAll: false,
      allLabels: [ {
        x: 0,
        y: 115,
        text: "Click on the pencil icon on top-right to start drawing",
        align: "center",
        size: 16
      } ],

      stockGraphs: [ {
        id: "g1",
        valueField: "value",
        useDataSetColors: false
      } ],


      stockLegend: {
        valueTextRegular: " ",
        markerType: "none"
      },

      drawingIconsEnabled: true
    } ],

    chartScrollbarSettings: {
      graph: "g1"
    },
    chartCursorSettings: {
      valueBalloonsEnabled: true
    },
    periodSelector: {
      position: "bottom",
      periods: [ {
        period: "DD",
        count: 10,
        label: "10 days"
      }, {
        period: "MM",
        count: 1,
        label: "1 month"
      }, {
        period: "YYYY",
        count: 1,
        label: "1 year"
      }, {
        period: "YTD",
        label: "YTD"
      }, {
        period: "MAX",
        label: "MAX"
      } ]
    }
  } );
});


  });
