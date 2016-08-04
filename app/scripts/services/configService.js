/**
 * Created by jatin on 9/2/16.
 */
angular.module('app')
    .service('configService', function($http, $q, CONFIG, Upload) {
        return {
            getJobCategories: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'jobCategory/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getUserRoles: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'userRole/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getMenus: function(query,callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'userRole/menuList'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getAccessLevel: function(roleId,callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'userRole/' + roleId + '/AccessLevelList'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeUserRole: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'userRole/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addPermission: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'userRole/addPermission'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addUserRole: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'userRole/add'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateUserRole: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'userRole/update'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getLeaveTypes: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'leaveType/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeLeaveType: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'leaveType/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            getLeaveRule: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'leaveRule/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getLeaveRuleRecord: function(id, type, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'leaveRule/getRecord/' + id + '/' + type
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            changeStatus: function(id, status, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'leaveRule/' + id + '/' + status + '/changeStatus'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            getTaxes: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'tax/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeTax: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'tax/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getBonus: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'bonus/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeBonus: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'bonus/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getOverTime: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'overTime/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeOverTime: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'overTime/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getShift: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'shift/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeShift: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'shift/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getPayGrades: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'payGrade/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removePayGrade: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'payGrade/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getAllowance: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'allowance/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeAllowance: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'allowance/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            addEmployee: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/add', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            updateEmployee: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/update', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            getEmployee: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getRecord: function(modelName, id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + modelName + '/' + id + '/getRecord'
                }).then(function(result) {

                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getEventByType: function(type, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/'  + type + '/getEventByType'
                }).then(function(result) {

                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getTaskByEvent: function(type, event, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/'  + type + '/' + event + '/getTaskByEvent'
                }).then(function(result) {

                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeContactDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/addEmployeeContactDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateEmployeeContactDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/updateEmployeeContactDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeReportingDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/addEmployeeReportingDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeJobDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/addEmployeeJobDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeBoardingDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/addEmployeeBoardingDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeEducationDetail: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/addEducationDetail', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            updateEmployeeEducationDetail: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/updateEducationDetail', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            educationList: function(id , query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + id +  '/educationList?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeEmployeDetail: function(modalName, id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + modalName + '/' +  id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEmployeeCompanyDetail: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/addCompanyDetail', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            companyList: function(id , query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + id +  '/companyList?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateEmployeeCompanyDetail: function(data, callback) {
                Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'employee/updateCompanyDetail', //webAPI exposed to upload the file
                    data: data //pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            familyList: function(id , query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + id +  '/familyList?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            reportingList: function(id , query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + id +  '/reportingList?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getPayGrade: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/getPayGrade'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getBonusType: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/getBonusType'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getAllowanceType: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/getAllowanceType'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getPayGradeRange: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/getPayGradeRange' + '/' + id
                }).then(function(result) {

                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addEarningDetail: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/addEmployeeEarningDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            earningList: function(id , query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/' + id +  '/earningList?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateEarningRecord: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/updateEarningDetail'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getLeaveRecord: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'applyLeave/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getLeaveRules: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'applyLeave/getLeaveRules'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            getJobCategory: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'jobCategory/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getLeaves: function(id , status , callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'applyLeave/'  + id + '/' + status + '/getLeaves'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            approveRejectLeave: function(id , status , callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'applyLeave/'  + id + '/' + status + '/approveRejectLeave'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            applyLeave: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'applyLeave/add'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            addAttendance: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'attendance/add'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getEmployees: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'employee/getEmployees'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getEmployeeAttendance: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'attendance/getEmployeeAttendance'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getAllEmployees: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'employee/getAllEmployees'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

            addComplianceDetail: function(data, callback) {
                     Upload.upload({
                    method: 'POST',
                    url: CONFIG.appUrl + 'compliance/add', //webAPI exposed to upload the file
                    data: data//pass file as data, should be user ng-model
                }).success(function(result) { //upload function returns a promise
                    console.log(result);
                    callback(null, result);
                }).error(function(err) {
                    callback(true, err);
                });
            },
            addEvent: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'event/add'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            updateEvent: function(data, callback) {
                return $http({
                    method: 'POST',
                    data: data,
                    url: CONFIG.appUrl + 'event/update'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getEvents: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'event/list?' + query
                }).then(function(result) {
                     console.log(result);
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeEvent: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'event/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getEventRecords: function(callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'event/allEvents'

                }).then(function(result) {
                    console.log(result);
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getTaskDetail: function(id,callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'task/'+ id + '/getRecord',
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            getTasks: function(query, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'task/list?' + query
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },
            removeTask: function(id, callback) {
                return $http({
                    method: 'GET',
                    url: CONFIG.appUrl + 'task/' + id + '/remove'
                }).then(function(result) {
                    callback(null, result.data);
                }, function(error) {
                    callback(error.data);
                });
            },

        }
    })