'use strict';
angular.module('myApp.validations', [])
    .directive('alphanumeric', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attr, ngModel) {

                var validator = function(value) {
                    if (/^[a-zA-Z0-9\s]*$/.test(value)) {
                        ngModel.$setValidity('alphanumeric', true);
                        return value;
                    } else {
                        ngModel.$setValidity('alphanumeric', false);
                        return undefined;
                    }
                };
                //For DOM -> model validation
                ngModel.$parsers.unshift(validator);
                //For model -> DOM validation
                ngModel.$formatters.unshift(validator);
            }
        };
    })