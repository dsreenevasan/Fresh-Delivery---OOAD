(function () {
    'use strict';

    angular
        .module('storeApp')
        .factory('ConfigService', ConfigService);

    ConfigService.$inject = ['$http','$rootScope'];
    function ConfigService($http,$rootScope) {
        var service={};
        var server = {
            "local": "localhost",
            "port": "2112"
        };
        service.BaseURI = BaseURI;
        return service;

        function BaseURI()
        {
            return "http://"+server.local+":"+server.port;
        }

    }
})();