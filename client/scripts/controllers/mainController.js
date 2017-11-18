(function(){
    'use strict';
    angular
        .module('storeApp')
        .controller('MainController',MainController);
    MainController.$inject = ['$scope', '$state', '$interval', '$timeout', '$anchorScroll', '$location', 'MainService', '$cookieStore', '$route'];
    function MainController($scope, $state, $interval, $timeout, $anchorScroll, $location, MainService, $cookieStore, $route){
        var ctrl = this;
        ctrl.showTable = false;
        ctrl.orderedItems = [];

        $scope.userDetails = $cookieStore.get('userDetails');
        console.log("user details - " + JSON.stringify($scope.userDetails));

        MainService.GetItems().then(function (response) {
            console.log(response);
            if(response.status == 200){
                ctrl.itemsList = response.data.data;
                console.log(ctrl.itemsList);
            }
        });

        ctrl.orderedItemsList = [];

        ctrl.initialise = function(index, item){
            /*console.log(item);*/
            item.amount = 0;
            item.value = 0;
        };

        ctrl.addItem = function(item){
            console.log(item);
            ctrl.showTable = true;
            item.amount++;
            item.value = item.amount * item.price;
            ctrl.orderedItems.push(item);
        };

        ctrl.decreaseItem = function(item){
          if(item.amount > 0){
             item.amount--;
              item.value = item.amount * item.price;
          }
        };

        ctrl.stateChange = function(){
            $state.go('login')
        };

        ctrl.checkout = function(){
            console.log("itemLsit" + ctrl.itemsList);
            var checkOutObj = {
                items: ctrl.orderedItems,
                customer: $scope.userDetails,
                dateOfOrder: new Date(),
                active: 1
            };
            MainService.PlaceOrder(checkOutObj).then(function(response){
                console.log(JSON.stringify(response));
                ctrl.orderDetails = response.data;
            })
        };

        ctrl.logout = function(){
            console.log('logout');
            $cookieStore.put('userDetails', undefined);
            $scope.userDetails = undefined;
            $route.reload();
        }
    }
})();
