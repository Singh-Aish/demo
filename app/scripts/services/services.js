'use strict';
angular.module('myApp.services', ['myApp.constants'])
    .service('i18n', function() {
        var self         = this;
        this.setLanguage = function(language) {
            $.i18n.properties({
                name: 'messages',
                path: 'i18n/',
                mode: 'map',
                language: language,
                callback: function() {
                    self.language = language;
                }
            });
        };
        this.setLanguage('en');
    })
    .service('columnize', function() {
        return function(data, cols) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var colIdx  = i % cols;
                arr[colIdx] = arr[colIdx] || [];
                arr[colIdx].push(data[i]);
            }
            return arr;
        };
    })
    .service('serialize', function() {
        return function(obj, prefix) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
                    str.push(typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
            }
            return str.join('&');
        };
    })
    .service('base64', function() {
        var keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv' + 'wxyz0123456789+/' + '=';
        return {
            encode: function(input) {
                var output = '', chr1, chr2, chr3 = '', enc1, enc2, enc3, enc4 = '', i = 0;
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                    enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                    chr1   = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';
                }
                return output;
            },
            decode: function(input) {
                var output = '', chr1, chr2, chr3 = '', enc1, enc2, enc3, enc4 = '', i = 0;
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
                while (i < input.length) {
                    enc1   = keyStr.indexOf(input.charAt(i++));
                    enc2   = keyStr.indexOf(input.charAt(i++));
                    enc3   = keyStr.indexOf(input.charAt(i++));
                    enc4   = keyStr.indexOf(input.charAt(i++));
                    chr1   = enc1 << 2 | enc2 >> 4;
                    chr2   = (enc2 & 15) << 4 | enc3 >> 2;
                    chr3   = (enc3 & 3) << 6 | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 !== 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 !== 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    chr1 = chr2 = chr3 = '';
                    enc1 = enc2 = enc3 = enc4 = '';
                }
                return output;
            }
        };
    })
    .service('caseConversion', function() {
        return {
            toTitleCase: function(input) {
                return input.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            },
            removeDoubleSpace: function(input) {
                return input.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
            }
        };
    })
    .service('dataService', function($http, $q, $localStorage, CONFIG) {
        return {
            login: function(data, callback) {
                $http({
                    method: 'POST',
                    url: CONFIG.appUrl + 'users/login',
                    data: data
                }).then(function(result) {
                    $localStorage.token    = result.data.token;
                    $localStorage.userData = result.data.data;

                    callback(null, result.data);
                }, function(err) {
                    callback(err.data);
                });
            },
            forgotPassword: function (data, callback) {
                $http({
                    method: 'POST',
                    url: CONFIG.appUrl + 'users/emailforgotPassword',
                    data: data
                }).then(function (result) {
                    $localStorage.tokenAccounting = result.data.token;
                    callback(null, result.data);
                }, function (err) {
                    callback(err.data);
                });
            },
            changePassword: function (data, callback) {
                $http({
                    method: 'POST',
                    url: CONFIG.appUrl + 'users/changePassword',
                    data: data
                }).then(function (result) {
                    $localStorage.tokenAccounting = result.data.token;
                    callback(null, result.data);
                }, function (err) {
                    callback(err.data);
                });
            },
            logout: function(callback) {
                $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'users/logout'
                }).then(function(result) {
                    callback(null, result);
                }, function(err) {
                    callback(err);
                });
            },
            isAuthenticatedFleet: function() {
                return $localStorage.token === '' || $localStorage.token === undefined ? false : true;
            },
            getToken: function() {
                return $localStorage.token;
            },
            getList: function(queryString, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'users/list?' + queryString
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            }
        };
    })
    .service('common', function($http, $q, CONFIG) {
        return {
            addRecords: function(modelName, data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/add'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeRecords: function(modelName, data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            activateRecords: function(modelName, data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/activate'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            deActivateRecords: function(modelName, data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/deActivate'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getRecord: function(modelName, id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/' + id + '/getRecord'
                }).then(function(result) {

                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateRecord: function(modelName, data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'tmp/' + modelName + '/update'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            displayMap: function(locationsArr, center, divId) {
                var mapOptions = {
                    zoom: 8,
                    center: new google.maps.LatLng(center.lat, center.long),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map        = new google.maps.Map(document.getElementById(divId), mapOptions);
                google.maps.event.trigger(map, 'resize');
                map.setZoom(map.getZoom());

                var markers = [];

                var infoWindow = new google.maps.InfoWindow();

                var createMarker = function(info) {

                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(info.lat, info.long),
                        title: info.vehicleId
                    });
                    if (info.speed == undefined || info.speed == null || info.speed == "") {
                        info.speed = "0 kmph"
                    }
                    marker.content = '<div class="infoWindowContent">' + info.driverName + '<br/>' + info.speed + '</div>';
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                        infoWindow.open(map, marker);
                    });

                    markers.push(marker);

                }
                for (var i = 0; i < locationsArr.length; i++) {
                    createMarker(locationsArr[i]);
                }
            }

        };
    })

;
