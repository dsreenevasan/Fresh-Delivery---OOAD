

/*angular.module('myApp', []);*/

'use strict';

var states = [
    {
        name: 'main',
        state:
        {
            url:'/main',
            templateUrl: 'views/base.html',
            data: {
                text: "Main",
                visible: false
            }
        }
    },
    {
        name: 'login',
        state:
        {
            url:'/login',
            templateUrl: 'views/login.html',
            data: {
                text: "Login",
                visible: false
            }
        }
    },
    {
        name: 'signup',
        state:
        {
            url:'/signup',
            templateUrl: 'views/userDetails.html',
            data: {
                text: "Signup",
                visible: false
            }
        }
    }
];

var movies = angular.module('storeApp', [
    'ui.router',
    'ngCookies',
    'ngRoute'
]);
/*.run(
 function($location) {
 $location.path('');
 }
 )*/
movies.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    angular.forEach(states, function(state) {
        $stateProvider.state(state.name, state.state);
    });

    /*$stateProvider
     .state('home', {
     url: '/home',
     /!*views: {
     "main": {
     controller: "MainController",
     templateUrl: 'views/main.html'
     }
     }*!/
     templateUrl: 'views/main.html'
     })

     .state('hello', {
     url: '/hello',
     template: '<h1>Hello</h1>'
     });*/
});



