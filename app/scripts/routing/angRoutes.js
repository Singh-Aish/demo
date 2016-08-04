'use strict';
angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null;
};
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('httpInterceptor');
        //$breadcrumbProvider.setOptions({
        //    prefixStateName: 'login', // template: 'bootstrap2' //bootstrap3
        //});

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'userController',
                data: {freeRoute: true}
            })
            .state('forgot-password', {
                url: '/forgotPassword',
                templateUrl: 'views/forgot-password.html',
                controller: 'userController',
                data: {freeRoute: true}
            })
            .state('reset-password', {
                url: "/password-reset/:token/:email",
                templateUrl: 'views/reset-password.html',
                controller: 'userController',
                data: {freeRoute: true}
            })
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/dashboard.html',
                data: {authenticatedRoute: true}
            })

            //Job category
            .state('jobCategory', {
                url: '/jobCategory',
                templateUrl: 'views/config/jobCategory/list.html',
                controller: 'jobCategoryController',
                data: {authenticatedRoute: true}
            })
            .state('addJobCategory', {
                url: '/addJobCategory',
                templateUrl: 'views/config/jobCategory/add.html',
                controller: 'jobCategoryController',
                data: {authenticatedRoute: true}
            })
            .state('editJobCategory', {
                url: '/editJobCategory/:id',
                templateUrl: 'views/config/jobCategory/edit.html',
                controller: 'jobCategoryController',
                data: {authenticatedRoute: true}
            })
            .state('detailJobCategory', {
                url: '/detailJobCategory/:id',
                templateUrl: 'views/config/jobCategory/detail.html',
                controller: 'jobCategoryController',
                data: {authenticatedRoute: true}
            })

            //Leave Type
            .state('leaveType', {
                url: '/leaveType',
                templateUrl: 'views/config/leaveType/list.html',
                controller: 'leaveTypeController',
                data: {authenticatedRoute: true}
            })
            .state('addLeaveType', {
                url: '/addLeaveType',
                templateUrl: 'views/config/leaveType/add.html',
                controller: 'leaveTypeController',
                data: {authenticatedRoute: true}
            })
            .state('editLeaveType', {
                url: '/editLeaveType/:id',
                templateUrl: 'views/config/leaveType/edit.html',
                controller: 'leaveTypeController',
                data: {authenticatedRoute: true}
            })
            .state('detailLeaveType', {
                url: '/detailLeaveType/:id',
                templateUrl: 'views/config/leaveType/detail.html',
                controller: 'leaveTypeController',
                data: {authenticatedRoute: true}
            })

            //Leave Rules
            .state('leaveRule', {
                url: '/leaveRule',
                templateUrl: 'views/config/leaveRule/list.html',
                controller: 'leaveRuleController',
                data: {authenticatedRoute: true}
            })
            .state('addLeaveRule', {
                url: '/addLeaveRule',
                templateUrl: 'views/config/leaveRule/add.html',
                controller: 'leaveRuleController',
                data: {authenticatedRoute: true}
            })
            .state('editLeaveRule', {
                url: '/editLeaveRule/:id',
                templateUrl: 'views/config/leaveRule/edit.html',
                controller: 'leaveRuleController',
                data: {authenticatedRoute: true}
            })
            .state('detailLeaveRule', {
                url: '/detailLeaveRule/:id',
                templateUrl: 'views/config/leaveRule/detail.html',
                controller: 'leaveRuleController',
                data: {authenticatedRoute: true}
            })

            //Tax
            .state('tax', {
                url: '/tax',
                templateUrl: 'views/config/tax/list.html',
                controller: 'taxController',
                data: {authenticatedRoute: true}
            })
            .state('addTax', {
                url: '/addTax',
                templateUrl: 'views/config/tax/add.html',
                controller: 'taxController',
                data: {authenticatedRoute: true}
            })
            .state('editTax', {
                url: '/editTax/:id',
                templateUrl: 'views/config/tax/edit.html',
                controller: 'taxController',
                data: {authenticatedRoute: true}
            })
            .state('detailTax', {
                url: '/detailTax/:id',
                templateUrl: 'views/config/tax/detail.html',
                controller: 'taxController',
                data: {authenticatedRoute: true}
            })

            //shift
            .state('shift', {
                url: '/shift',
                templateUrl: 'views/config/shift/list.html',
                controller: 'shiftController',
                data: {authenticatedRoute: true}
            })
            .state('addShift', {
                url: '/addShift',
                templateUrl: 'views/config/shift/add.html',
                controller: 'shiftController',
                data: {authenticatedRoute: true}
            })
            .state('editShift', {
                url: '/editShift/:id',
                templateUrl: 'views/config/shift/edit.html',
                controller: 'shiftController',
                data: {authenticatedRoute: true}
            })
            .state('detailShift', {
                url: '/detailShift/:id',
                templateUrl: 'views/config/shift/detail.html',
                controller: 'shiftController',
                data: {authenticatedRoute: true}
            })

            //bonus
            .state('bonus', {
                url: '/bonus',
                templateUrl: 'views/config/bonus/list.html',
                controller: 'bonusController',
                data: {authenticatedRoute: true}
            })
            .state('addBonus', {
                url: '/addBonus',
                templateUrl: 'views/config/bonus/add.html',
                controller: 'bonusController',
                data: {authenticatedRoute: true}
            })
            .state('editBonus', {
                url: '/editBonus/:id',
                templateUrl: 'views/config/bonus/edit.html',
                controller: 'bonusController',
                data: {authenticatedRoute: true}
            })
            .state('detailBonus', {
                url: '/detailBonus/:id',
                templateUrl: 'views/config/bonus/detail.html',
                controller: 'bonusController',
                data: {authenticatedRoute: true}
            })

            //Over Time
            .state('overTime', {
                url: '/overTime',
                templateUrl: 'views/config/overTime/list.html',
                controller: 'overTimeController',
                data: {authenticatedRoute: true}
            })
            .state('addOverTime', {
                url: '/addOverTime',
                templateUrl: 'views/config/overTime/add.html',
                controller: 'overTimeController',
                data: {authenticatedRoute: true}
            })
            .state('editOverTime', {
                url: '/editOverTime/:id',
                templateUrl: 'views/config/overTime/edit.html',
                controller: 'overTimeController',
                data: {authenticatedRoute: true}
            })
            .state('detailOverTime', {
                url: '/detailOverTime/:id',
                templateUrl: 'views/config/overTime/detail.html',
                controller: 'overTimeController',
                data: {authenticatedRoute: true}
            })

            //Pay Grade
            .state('payGrade', {
                url: '/payGrade',
                templateUrl: 'views/config/payGrade/list.html',
                controller: 'payGradeController',
                data: {authenticatedRoute: true}
            })
            .state('addPayGrade', {
                url: '/addPayGrade',
                templateUrl: 'views/config/payGrade/add.html',
                controller: 'payGradeController',
                data: {authenticatedRoute: true}
            })
            .state('editPayGrade', {
                url: '/editPayGrade/:id',
                templateUrl: 'views/config/payGrade/edit.html',
                controller: 'payGradeController',
                data: {authenticatedRoute: true}
            })
            .state('detailPayGrade', {
                url: '/detailPayGrade/:id',
                templateUrl: 'views/config/payGrade/detail.html',
                controller: 'payGradeController',
                data: {authenticatedRoute: true}
            })

            //Pay Grade
            .state('allowance', {
                url: '/allowance',
                templateUrl: 'views/config/allowance/list.html',
                controller: 'allowanceController',
                data: {authenticatedRoute: true}
            })
            .state('addAllowance', {
                url: '/addAllowance',
                templateUrl: 'views/config/allowance/add.html',
                controller: 'allowanceController',
                data: {authenticatedRoute: true}
            })
            .state('editAllowance', {
                url: '/editAllowance/:id',
                templateUrl: 'views/config/allowance/edit.html',
                controller: 'allowanceController',
                data: {authenticatedRoute: true}
            })
            .state('detailAllowance', {
                url: '/detailAllowance/:id',
                templateUrl: 'views/config/allowance/detail.html',
                controller: 'allowanceController',
                data: {authenticatedRoute: true}
            })
            //User Role
            .state('userRole', {
                url: '/userRole',
                templateUrl: 'views/config/userRole/list.html',
                controller: 'userRoleController',
                data: {authenticatedRoute: true}
            })
            .state('addUserRole', {
                url: '/addUserRole',
                templateUrl: 'views/config/userRole/add.html',
                controller: 'userRoleController',
                data: {authenticatedRoute: true}
            })
            .state('editUserRole', {
                url: '/editUserRole/:id',
                templateUrl: 'views/config/userRole/edit.html',
                controller: 'userRoleController',
                data: {authenticatedRoute: true}
            })
            .state('detailUserRole', {
                url: '/detailUserRole/:id',
                templateUrl: 'views/config/userRole/detail.html',
                controller: 'userRoleController',
                data: {authenticatedRoute: true}
            })
            //Employee
            .state('employee', {
                url: '/employee',
                templateUrl: 'views/employee/list.html',
                controller: 'employeeController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployee', {
                url: '/addEmployee',
                templateUrl: 'views/employee/add.html',
                controller: 'employeeController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployee', {
                url: '/editEmployee/:id',
                templateUrl: 'views/employee/edit.html',
                controller: 'employeeController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeContactDetail', {
                url: '/addEmployeeContactDetail/:id',
                templateUrl: 'views/employee/addContactDetail.html',
                controller: 'employeeContactController',
                data: {authenticatedRoute: true}
            })
            .state('employeeContactDetail', {
                url: '/employeeContactDetail/:id',
                templateUrl: 'views/employee/contactDetail.html',
                controller: 'employeeContactController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeContactDetail', {
                url: '/editEmployeeContactDetail/:id',
                templateUrl: 'views/employee/editContactDetail.html',
                controller: 'employeeContactController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeJobDetail', {
                url: '/addEmployeeJobDetail/:id',
                templateUrl: 'views/employee/addJobDetail.html',
                controller: 'employeeJobController',
                data: {authenticatedRoute: true}
            })
            .state('employeeJobDetail', {
                url: '/employeeJobDetail/:id',
                templateUrl: 'views/employee/jobDetail.html',
                controller: 'employeeJobController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeJobDetail', {
                url: '/editEmployeeJobDetail/:id',
                templateUrl: 'views/employee/editJobDetail.html',
                controller: 'employeeJobController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeEducationDetail', {
                url: '/addEmployeeEducationDetail/:id',
                templateUrl: 'views/employee/addEducationDetail.html',
                controller: 'employeeEducationController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeEducationDetail', {
                url: '/editEmployeeEducationDetail/:id',
                templateUrl: 'views/employee/editEducationDetail.html',
                controller: 'employeeEducationController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeCompanyDetail', {
                url: '/addEmployeeCompanyDetail/:id',
                templateUrl: 'views/employee/addCompanyDetail.html',
                controller: 'employeeCompanyController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeCompanyDetail', {
                url: '/editEmployeeCompanyDetail/:id',
                templateUrl: 'views/employee/editCompanyDetail.html',
                controller: 'employeeCompanyController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeFamilyDetail', {
                url: '/addEmployeeFamilyDetail/:id',
                templateUrl: 'views/employee/addFamilyDetail.html',
                controller: 'employeeFamilyController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeFamilyDetail', {
                url: '/editEmployeeFamilyDetail/:id',
                templateUrl: 'views/employee/editFamilyDetail.html',
                controller: 'employeeFamilyController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeReportingDetail', {
                url: '/addEmployeeReportingDetail/:id',
                templateUrl: 'views/employee/addReportingDetail.html',
                controller: 'employeeReportingController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeReportingDetail', {
                url: '/editEmployeeReportingDetail/:id',
                templateUrl: 'views/employee/editReportingDetail.html',
                controller: 'employeeReportingController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeLicenseDetail', {
                url: '/addEmployeeLicenseDetail/:id',
                templateUrl: 'views/employee/addLicenseDetail.html',
                controller: 'employeeLicenseController',
                data: {authenticatedRoute: true}
            })
            .state('employeeLicenseDetail', {
                url: '/employeeLicenseDetail/:id',
                templateUrl: 'views/employee/licenseDetail.html',
                controller: 'employeeLicenseController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeLicenseDetail', {
                url: '/editEmployeeLicenseDetail/:id',
                templateUrl: 'views/employee/editLicenseDetail.html',
                controller: 'employeeLicenseController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeEarningDetail', {
                url: '/addEmployeeEarningDetail/:id',
                templateUrl: 'views/employee/addEarningDetail.html',
                controller: 'employeeEarningController',
                data: {authenticatedRoute: true}
            })
            .state('employeeEarningDetail', {
                url: '/employeeEarningDetail/:id',
                templateUrl: 'views/employee/earningDetail.html',
                controller: 'employeeEarningController',
                data: {authenticatedRoute: true}
            })
            .state('editEmployeeEarningDetail', {
                url: '/editEmployeeEarningDetail/:id',
                templateUrl: 'views/employee/editEarningDetail.html',
                controller: 'employeeEarningController',
                data: {authenticatedRoute: true}
            })
            .state('addEmployeeBoardingDetail', {
                url: '/addEmployeeBoardingDetail/:id',
                templateUrl: 'views/employee/addBoardingDetail.html',
                controller: 'employeeBoardingController',
                data: {authenticatedRoute: true}
            })

            //LMS
            .state('leaveManagement',{
                url: '/leaveManagement',
                templateUrl: 'views/lms/leaveManagement.html',
                controller: 'applyLeaveController',
                data: {authenticatedRoute: true}
            })
            .state('attendance',{
                url: '/attendance',
                templateUrl: 'views/attendance/attendance.html',
                controller: 'attendanceController',
                data: {authenticatedRoute: true}
            })

            //statutory compliance
            .state('addComplianceDetail', {
                url: '/addComplianceDetail',
                templateUrl: 'views/compliance/add.html',
                controller: 'complianceDetailController',
                data: {authenticatedRoute: true}
            })

            // //shift management
            // .state('shiftManagement', {
            //     url: '/shiftManagement',
            //     templateUrl: 'views/sms/list.html',
            //     controller: 'attendanceController',
            //     data: {authenticatedRoute: true}
            // })

            //event
            .state('event', {
                url: '/event',
                templateUrl: 'views/config/event/list.html',
                controller: 'eventController',
                data: {authenticatedRoute: true}
            })
            .state('addEvent', {
                url: '/addEvent',
                templateUrl: 'views/config/event/add.html',
                controller: 'eventController',
                data: {authenticatedRoute: true}
            })
            .state('editEvent', {
                url: '/editEvent/:id',
                templateUrl: 'views/config/event/edit.html',
                controller: 'eventController',
                data: {authenticatedRoute: true}
            })
            .state('detailEvent', {
                url: '/detailEvent/:id',
                templateUrl: 'views/config/event/detail.html',
                controller: 'eventController',
                data: {authenticatedRoute: true}
            })
            //task
            .state('task', {
                url: '/task',
                templateUrl: 'views/config/task/list.html',
                controller: 'taskController',
                data: {authenticatedRoute: true}
            })
            .state('addTask', {
                url: '/addTask',
                templateUrl: 'views/config/task/add.html',
                controller: 'taskController',
                data: {authenticatedRoute: true}
            })
            .state('editTask', {
                url: '/editTask/:id',
                templateUrl: 'views/config/task/edit.html',
                controller: 'taskController',
                data: {authenticatedRoute: true}
            })
            .state('detailTask', {
                url: '/detailTask/:id',
                templateUrl: 'views/config/task/detail.html',
                controller: 'taskController',
                data: {authenticatedRoute: true}
            })


        ;
    })
    .run(function($rootScope, $state, $stateParams, AUTH_EVENTS, dataService, $window) {

        $rootScope.$state = $state;
        $rootScope.online = navigator.onLine;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //console.log('Tostate-' + JSON.stringify(toState) + '\nToParams-' + JSON.stringify(toParams) +
            //    '\nFromState-' + JSON.stringify(fromState) + '\nFromParams-' + JSON.stringify(fromParams));
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            var isAuthenticated = dataService.isAuthenticatedFleet();
            if (!angular.isUndefinedOrNull(toState.data)) {
                var isAuthAction = (toState.data.authenticatedRoute === true),
                    isFreeAction = (toState.data.freeRoute === true);

                if (isAuthAction) {
                    // If the route needs authentication and user is not logged in
                    if (!isAuthenticated) {
                        event.preventDefault();  // Stop the state change
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);    // Navigating to Login Page
                    } else {
                        $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);
                        //event.preventDefault();
                    }
                } else if (isFreeAction) {
                    if (isAuthenticated) {
                        $rootScope.$broadcast(AUTH_EVENTS.alreadyAuthenticated);    // Navigating to Login Page
                        event.preventDefault();  // Stop the state change
                    }
                } else {
                    console.log('Data param is not mentioned !!');
                }
            }
        });

    });

