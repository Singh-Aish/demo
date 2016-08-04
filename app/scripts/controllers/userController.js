'use strict';
angular.module('app')
    .controller('userController', function($scope, $rootScope,$stateParams, $timeout, $state, dataService, AUTH_EVENTS, toastr) {
        //console.log('User Controller is called !!');
        $scope.formData = {};
        $scope.doLogin  = function() {
            //if($scope.formData.length<2){
            //    toastr.error('missing credentioals');
            //}
            dataService.login($scope.formData, function(err, data) {
                if (!err) {
                    $timeout(function() {
                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        $state.go('dashboard');
                    }, 250);
                } else {
                    toastr.error(err.message, 'Error');
                    $scope.formData.email = '';
                    $scope.focusEmail     = true;
                }
            });
        };





        $scope.forgotPassword = function (forgotPassword) {

            if (!forgotPassword) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            dataService.forgotPassword($scope.formData, function (err, data) {
                if (!err) {
                    toastr.success('A Link has been send to to your Email Id!', 'Success');
                  //  $state.go('reset-password');
                } else {
                    toastr.error(err.message, 'Error');
                    $scope.formData.email = '';
                    $scope.focusEmail = true;
                }
            });
        };

        $scope.changePassword = function () {

            $scope.formData.token=$stateParams.token;
            $scope.formData.email=$stateParams.email;
            console.log($scope.formData.email);
            dataService.changePassword($scope.formData, function (err, data) {
                if (!err) {
                    console.log(data);
                    if (data.user) {
                        //toastr.success('Your password has been changes successfully', 'Success');
                        $state.go('login');
                    } else {
                        toastr.success('Your password has been changed successfully', 'Success');
                        $state.go('login');
                    }
                }
            })
        };

    });

