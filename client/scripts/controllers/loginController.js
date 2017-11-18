(function(){
    'use strict';
    angular
        .module('storeApp')
        .controller('LoginController',LoginController);
    LoginController.$inject = ['$scope', '$state', '$interval', '$timeout', '$anchorScroll', '$location', 'MainService', '$cookieStore'];
    function LoginController($scope, $state, $interval, $timeout, $anchorScroll, $location, MainService, $cookieStore){
        var ctrl = this;
        

        ctrl.stateChange = function(){
            $state.go('signup');
        };

        ctrl.userValidation = function(){
            var userObj = {
                username: ctrl.userName,
                password: ctrl.password
            };
            MainService.GetUser(userObj).then(function(response){
                if(response.data != null){
                    $cookieStore.put('userDetails', response.data);
                    $scope.userDetails = $cookieStore.get('userDetails');
                    console.log($scope.userDetails);
                    $state.go('main');
                }
            })
        };
        
        ctrl.signup = function(){
            var customerObj = {
                name: ctrl.name,
                password: ctrl.password,
                phoneNumber: ctrl.contactNumber,
                email: ctrl.mailId,
                address: ctrl.address,
                roles: "customer"
            };

            /*console.log(JSON.stringify(customerObj));*/
            MainService.PostUser(customerObj).then(function(response){
                if(response.status == 200){
                    $state.go('login');
                }
            });
        }
    }
})();
