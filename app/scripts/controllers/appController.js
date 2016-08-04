'use strict';
/*global token */
angular.module('app')
    .controller('AppController', function ($scope, $rootScope, $location, $state, $localStorage, CONFIG, dataService, AUTH_EVENTS) {
        $scope.appName = CONFIG.appName;
        $scope.appConfig = CONFIG;
        $scope.$state = $state;
        $scope.userData = $localStorage.userData;
        // Form data for the login modal3
        $scope.loginData = {};
        $scope.activeWhen = function (value) {
            return value ? 'active' : '';
        };
        $scope.path = function () {
            return $location.url();
        };

        $scope.appName = CONFIG.appName;
        $scope.isExpanded = false;
        $scope.userLoggedIn = false;

        $scope.logout = function () {
            dataService.logout(function(error, result){
                if (!error) {
                    $scope.isExpanded = false;
                    $scope.userLoggedIn = false;
                    $localStorage.$reset();
                    $localStorage.$reset();
                    //delete $localStorage;
                    $state.go('login');
                }
            });

        };
        $scope.signInSuccessful = function () {
            $scope.isExpanded = true;
            $scope.userLoggedIn = true;
            $scope.userData = $localStorage.userData;
        };

        /* Display the signInModal method */
        $scope.notLoggedIn = function () {
            $state.go('login');
        };
        $scope.navigateDashboard = function () {
            $scope.isExpanded = true;
            $scope.userLoggedIn = true;
        };
        $rootScope.$on(AUTH_EVENTS.notAuthenticated, $scope.notLoggedIn);
        $rootScope.$on(AUTH_EVENTS.loginSuccess, $scope.signInSuccessful);
        $rootScope.$on(AUTH_EVENTS.alreadyAuthenticated, $scope.navigateDashboard);

    });
