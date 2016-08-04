'use strict';
angular.module('app')
    .factory('httpInterceptor', function($q, $location, $localStorage) {

        return {
            request: function(config) {
                config.headers = config.headers || {};

                if ($localStorage.token) {

                    config.headers.Authorization = $localStorage.token;

                }

                return config;
                //console.log("Request via Interceptor !!");
                //console.log(config.url); // Contains the data about the request before it is sent.
                //return config || $q.when(config); // Return the config or wrap it in a promise if blank.
            },
            requestError: function(rejection) {


                //console.log(rejection); // Contains the data about the error on the request.
                return $q.reject(rejection); // Return the promise rejection.
            },
            response: function(response) {
                //console.log(response); // Contains the data from the response.
                return response || $q.when(response); // Return the response or promise.
            },
            responseError: function(rejection) {
                switch (rejection.status) {
                    case 0:
                        console.log('No response from server !! Server is off!'); // Contains the data about the error.
                        break;
                    case 401 || 403: //Login Authentication
                        console.log('401 - Authentication error or 403 - Forbidden request, server refuse to respond !!');
                        $location.path('/login');
                        break;
                    case 400:
                        console.log('Bad Request !!');
                        break;
                    case 404:
                        //$location.path('/');
                        console.log('Not found !!');
                        break;
                    case 408:
                        console.log('Request time out !!');
                        break;
                    case 500:
                        console.log('Internal server error !!');
                        break;
                    case 520:
                        console.log('Unknown Error !!');
                        break;
                    default:

                }
                return $q.reject(rejection);
            }
        };
    });

