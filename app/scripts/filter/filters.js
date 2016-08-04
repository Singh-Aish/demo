'use strict';
angular.module('myApp.filters', [])
    .filter('interpolate', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/gm, version);
        };
    })
    .filter('strip', function() {
        return function(text) {
            return !angular.isUndefinedOrNull(text) ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    })
    .filter('nl2br', function() {
        return function(text) {
            return !angular.isUndefinedOrNull(text) ? text.replace(/(?:\r\n|\r|\n)/g, '<br />') : '';
        };
    })
    .filter('convertBR', function() {
        return function(text) {
            return !angular.isUndefinedOrNull(text) ? text.replace('<BR>', '<br />') : '';
        };
    })
    .filter('YtTime', function() {
        return function(input) {
            var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
            var hours  = 0, minutes = 0, seconds = 0, totalseconds;
            if (reptms.test(input)) {
                var matches = reptms.exec(input);
                if (matches[1])
                    hours = Number(matches[1]);
                if (matches[2])
                    minutes = Number(matches[2]);
                if (matches[3])
                    seconds = Number(matches[3]);
                totalseconds = hours * 3600 + minutes * 60 + seconds;
                var secNum   = parseInt(totalseconds, 10);
                var hrs      = Math.floor(secNum / 3600);
                var mns      = Math.floor((secNum - hrs * 3600) / 60);
                var secs     = secNum - hrs * 3600 - mns * 60;
                if (hrs < 10) {
                    hrs = '0' + hrs;
                }
                if (mns < 10) {
                    mns = '0' + mns;
                }
                if (secs < 10) {
                    secs = '0' + secs;
                }
                return hrs + ':' + mns + ':' + secs;
            }
        };
    })
    .filter('sentenceCase', function() {
        return function(strval) {
            var newstrs  = strval.split('.');
            var finalstr = '';
            //alert(strval);
            for (var i = 0; i < newstrs.length; i++)
                finalstr = finalstr + '.' + newstrs[i].substr(0, 2).toUpperCase() + newstrs[i].substr(2);
            return finalstr.substr(1);
        };
    })
    .filter('titleCase', function() {
        return function(text) {
            return text.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    })
    .filter('minLength', function() {
        return function(input, len, pad) {
            if (input === undefined)
                return 0;
            input = input.toString();
            if (input.length >= len)
                return input;
            else {
                pad = (pad || 0).toString();
                return new Array(1 + len - input.length).join(pad) + input;
            }
        };
    })
    .filter('datetime1', function($filter) {
        return function(input) {
            if (input === null) {
                return '';
            }
            var _date = $filter('date')(new Date(input), 'MM dd yyyy - HH:mm:ss');
            return _date.toUpperCase();
        };
    })
    .filter('dateFormat', function($filter) {
        return function(input) {
            if (input === null) {
                return '';
            }
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
            return _date.toUpperCase();
        };
    })
    .filter('dateFormat1', function($filter) {
        return function(input) {
            if (input === null) {
                return '';
            }
            var _date = $filter('date')(new Date(input), 'MM dd yyyy');
            return _date.toUpperCase();
        };
    })
    .filter('timee', function($filter) {
        return function(input) {
            if (input === '') return '';
            var _date = $filter('date')(new Date(input), 'HH:mm:ss');
            return _date;
        };
    })
    .filter('stripHtml', function() {
        return function(text) {
            return !angular.isUndefinedOrNull(text) ? text.replace(/<(?:.|\n)*?>/gm, '') : '';
        };
    })
    .filter('datetime', function($filter) {
        return function(input) {
            if (input === null) {
                return '';
            }
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy - HH:mm:ss');
            return _date.toUpperCase();
        };
    });