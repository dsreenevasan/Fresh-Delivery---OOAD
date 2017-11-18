(function () {
    'use strict';

    angular
        .module('storeApp')
        .factory('MainService',MainService);

    MainService.$inject = ['$http', '$state', '$rootScope', '$timeout', 'ConfigService'];

    function MainService($http, $state, $rootScope, $timeout, ConfigService){

        var service = {};
        service.GetUser = GetUser;
        service.PostUser = PostUser;
        service.CreateItem = CreateItem;
        service.CreateCustomer = CreateCustomer;
        service.GetItems = GetItems;
        service.PlaceOrder = PlaceOrder;
        return service;

        function GetUser(params){
            console.log(params);
            return $http.post(ConfigService.BaseURI() + '/api/getUser', params).then(handleSuccess, handleRemoteError);
        }

        function PostUser(params) {
            /*console.log(JSON.stringify(params));*/
            return $http.post(ConfigService.BaseURI() + '/api/createUser', params).then(handleSuccess, handleRemoteError);
        }

        function CreateItem(params) {
            console.log(JSON.stringify(params));
            return $http.post(ConfigService.BaseURI() + '/api/createItem', params).then(handleSuccess, handleRemoteError);
        }

        function CreateCustomer(params) {
            console.log(JSON.stringify(params));
            return $http.post(ConfigService.BaseURI() + '/api/createCustomer', params).then(handleSuccess, handleRemoteError);
        }

        function GetItems(params) {
            return $http.get(ConfigService.BaseURI() + '/api/getItems', params).then(handleSuccess, handleRemoteError);
        }

        function PlaceOrder(params){
            console.log("placeOrder");
            return $http.post(ConfigService.BaseURI() + '/api/placeOrder', params).then(handleSuccess, handleRemoteError);
        }

        function handleRemoteError(data) {
            return data.data;
        }

        function handleSuccess(data) {
            return data;
        }

    }

})();
