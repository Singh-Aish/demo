'use strict';
angular.module('myApp.directives', [])
    .directive('msg', function() {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs) {
                var key = attrs.key;
                if (attrs.keyExpr) {
                    scope.$watch(attrs.keyExpr, function(value) {
                        key = value;
                        element.text($.i18n.prop(value));
                    });
                }
                scope.$watch('language()', function(value) {
                    element.text($.i18n.prop(key));
                });
            }
        };
    })
    .directive('ngConfirmClick', function() {
        return {
            priority: -1,
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function(e) {
                    var message = attrs.ngConfirmClick;
                    if (message && !confirm(message)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        };
    })
    .directive('modalBox', function() {
        return {
            restrict: 'C',
            link: function(scope, element) {
                scope.dismiss      = function() {
                    element.modal('hide');
                };
                scope.dismissModal = function(inputClass) {
                    $('.' + inputClass).modal('hide');
                };
            }
        };
    })
    .directive('preventResize', function($document, $window) {
        return {
            restrict: 'EAC',
            //element,Attribute or class
            link: function(scope, ele, attrs) {
            }
        };
    })
    .directive('focus', function($timeout, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.focus, function(newValue, oldValue) {
                    if (newValue) {
                        element[0].focus();
                    }
                });
                element.bind('blur', function(e) {
                    $timeout(function() {
                        scope.$apply(attrs.focus + '=false');
                    }, 0);
                });
                element.bind('focus', function(e) {
                    $timeout(function() {
                        scope.$apply(attrs.focus + '=true');
                    }, 0);
                });
            }
        };
    })
    .directive('appVersion', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    })
    .directive('strip', function() {
        return {
            restrict: 'EA',
            link: function(scope, element, attrs, input) {
                var tmp       = document.createElement('DIV');
                tmp.innerHTML = input.replace(/(?:\r\n|\r|\n)/g, '<br />');
                element.text(tmp.innerText);
            }
        };
    })
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
    .directive('dateNow', ['$filter', function($filter) {
        return {
            link: function($scope, $element, $attrs) {
                $element.text($filter('date')(new Date(), $attrs.dateNow));
            }
        };
    }])
    .directive('jqdatepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {mindate: "=", maxdate: '='},
            link: function(scope, element, attrs, controller) {
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: scope.mindate,
                    maxDate: scope.maxdate,
                    onSelect: function(date) {
                        scope.$apply(function() {
                            controller.$setViewValue(date);
                        });

                    }
                });
            }
        };
    })
    .directive('dateofbirth', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element) {
                var start = new Date();
                start.setFullYear(start.getFullYear() - 70);
                var end   = new Date();
                end.setFullYear(end.getFullYear() - 18);
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getFullYear() + ':' + end.getFullYear()
                });

            }

        }
    })
    .directive('issuedate', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element) {
                var start = new Date();
                start.setFullYear(start.getFullYear() - 50);
                var end   = new Date();
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getFullYear() + ':' + end.getFullYear()
                });

            }

        }

    })
    .directive('expiredate', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element) {
                var start = new Date();
                var end   = new Date();
                end.setFullYear(end.getFullYear() + 50);
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getFullYear() + ':' + end.getFullYear()
                });

            }

        }

    })
    .filter('range', function() {
        return function(input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i <= max; i = i + 2000) {

                var j = '$ ' + i;
                input.push(j);
            }
            return input;
        };
    })
    .directive('reportdate', function(){
        return{
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element){
                var start = new Date();
                start.setMonth(start.getMonth() - 2);
                var end = new Date();
                element.datepicker({
                    dateFormat: 'mm-dd-yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: start,
                    maxDate: end,
                    yearRange: start.getMonth() + ':' + end.getMonth()
                });

            }

        }

    })
    .directive('myModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss = function() {
                element.modal('hide');
            };
        }
    }
})
    .directive("passwordVerify", function() {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function(scope, element, attrs, ctrl) {
                scope.$watch(function() {
                    var combined;

                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function(value) {
                    if (value) {
                        ctrl.$parsers.unshift(function(viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordVerify", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordVerify", true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    })

.directive('alphanumericonly', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attr, ngModel) {

                var validator = function(value) {
                    if (/^[a-zA-Z0-9]*$/.test(value)) {
                        ngModel.$setValidity('alphanumericonly', true);
                        return value;
                    } else {
                        ngModel.$setValidity('alphanumericonly', false);
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
.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           // this next if is necessary for when using ng-required on your input. 
           // In such cases, when a letter is typed first, this parser will be called
           // again, and the 2nd time, the value will be undefined
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});