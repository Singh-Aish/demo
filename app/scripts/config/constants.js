'use strict';
var baseUrl=window.location.protocol+'//'+window.location.hostname;

angular.module('myApp.constants', [])
    .constant('CONFIG', {
        appName: 'NetworC - HRM',
        appTitle: '...',
        limit: 25,
        offset: 0,
        appUrl: baseUrl+':1336/api/',
        imageUrl: baseUrl+':1336/',

    })
     .value('version', '1.0.0')
    .constant('extension', '.json')
    .constant('AUTH_EVENTS', {
        // Broadcast when user logs in successfully
        loginSuccess: 'auth-login-success',
        // Broadcast when user login fails
        loginFailed: 'auth-login-failed',
        // Broadcast when an authenticatedRoute is navigated to, and the user is not logged in - opens the signInModal
        notAuthenticated: 'auth-not-authenticated',
        //Broadcast when user is already authenticated and tried to access free route it would be navigated to dashboard page
        alreadyAuthenticated: 'auth-authenticated'
    })
;
