/**
 * Created by jatin on 9/2/16.
 */
angular.module('app')
    .controller('jobCategoryController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getJobCategories(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(categoryValid) {
            if (!categoryValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('JobCategory', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('jobCategory');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('jobCategory');
            }
            common.getRecord('JobCategory', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(categoryValid) {
            if (!categoryValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('JobCategory', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go('jobCategory');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeJobCategory(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('jobCategory', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('userRoleBackUpController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.formData    = {};
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getUserRoles(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(categoryValid) {
            if (!categoryValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('UserRole', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('userRole');
                }
            });

        };

        $scope.savePermission = function() {

            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }

            var permissionArray = [];

            console.log($scope.formData);
            angular.forEach($scope.formData, function(value, key) {

                permissionArray.push({menu: key, role: $stateParams.id, permission: value});

            });

            configService.addPermission(permissionArray, function(error, data) {

                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }
            common.getRecord('UserRole', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getRoleData = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }
            common.getRecord('UserRole', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.data = data;

                }
            });
        };

        $scope.updateRecord = function(categoryValid) {
            if (!categoryValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('UserRole', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go('userRole');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeUserRole(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('userRole', {}, {reload: true});
                    }
                });
            });

        };

        $scope.getJobCategory = function() {
            var query = serialize({fields: 'selectCase'});
            configService.getJobCategory(query, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.jobCategory = data.values;
                console.log($scope.jobCategory);
            });
        }

        $scope.getMenus = function() {
            var filter = serialize($scope.filterObj);
            configService.getMenus(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                var menus = data;

                for (var i = 0; i < menus.length; i++) {

                    menus[i]['child'] = [];

                    for (var j = 0; j < menus.length; ++j) {
                        //leaveStatusDetail.push({name:leaveRules[i].leaveType.name,id:leaveRules[i].leaveType._id,status:appiledLeaves[j]._id.status,total:appiledLeaves[j].total});

                        if (menus[i]._id == menus[j].parent) {

                            //  menus[i]['child'][menus[j]._id] = menus[j].name;

                            menus[i]['child'].push({name: menus[j].name, id: menus[j]._id, parent: menus[j].parent});

                            //  delete menus[j];
                            //   menus[i].push({name:menus[j].name,id:menus[j]._id});

                        }

                    }
                }

                var menuDetail = menus;
                var menuData   = [];

                for (var i = 0, j = 0; i < menuDetail.length; i++) {

                    if (menuDetail[i].parent == undefined) {

                        menuData[j] = menuDetail[i];

                        j++;

                    }
                }
                $scope.menuDetail = menuData;

            });
        };

        $scope.checkModelData = function(parentId, status) {
            angular.forEach($scope.menuDetail, function(value, key) {
                if (value._id == parentId) {
                    angular.forEach(value.child, function(cvalue, ckey) {
                        console.log(cvalue.id);
                        $scope.formData[cvalue.id] = status;
                    });
                }
            });
        }

        $scope.getAccessLevel = function() {

            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }
            configService.getAccessLevel($stateParams.id, function(error, data) {

                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else if (data.length) {

                    for (var i = 0; i < data.length; i++) {

                        var result = data[i];

                        $scope.formData[result.menu] = result.permission;
                    }
                }

            });
        }

    })

    .controller('userRoleController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.formData = {};

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getUserRoles(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(userRoleValid) {
            if (!userRoleValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            var permissionArray = [];

            if ($scope.formData.permission != undefined) {
                angular.forEach($scope.formData.permission, function(value, key) {

                    permissionArray.push({menu: key, permission: value});

                });

            }
            ;

            $scope.formData.permissionArray = permissionArray;

            configService.addUserRole($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go('userRole');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }
            common.getRecord('UserRole', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;
                    configService.getAccessLevel($stateParams.id, function(error, data) {

                        if (error) {
                            toastr.error(error.message, 'Error');
                            return false;
                        } else if (data.length) {
                            $scope.formData.permission = {};

                            for (var i = 0; i < data.length; i++) {

                                var result = data[i];

                                $scope.formData.permission[result.menu] = result.permission;

                            }
                        }

                    });

                }
            });
        };

        $scope.getRoleData = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('userRole');
            }
            common.getRecord('UserRole', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.data = data;

                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeUserRole(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('userRole', {}, {reload: true});
                    }
                });
            });

        };

        $scope.getJobCategory = function() {
            var query = serialize({fields: 'selectCase'});
            configService.getJobCategory(query, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.jobCategory = data.values;
                console.log($scope.jobCategory);
            });
        }

        $scope.getMenus = function() {
            var filter = serialize($scope.filterObj);
            configService.getMenus(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.menuDetail = data;

            });
        };

        $scope.updateRecord = function(userRoleValid) {
            if (!userRoleValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            var permissionArray = [];

            console.log('hi');

            console.log($scope.formData);
            console.log('bye');

            if ($scope.formData.permission != undefined) {
                angular.forEach($scope.formData.permission, function(value, key) {

                    permissionArray.push({menu: key, permission: value});

                });

            }
            ;

            $scope.formData.permissionArray = permissionArray;

            configService.updateUserRole($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');

                    $state.go('userRole');
                }
            });
        };

    })

    .controller('leaveTypeController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getLeaveTypes(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items   = data.values;
                $scope.disable = data.disable;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(leaveTypeValid) {
            if (!leaveTypeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('LeaveType', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('leaveType');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('leaveType');
            }
            common.getRecord('LeaveType', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(leaveTypeValid) {
            if (!leaveTypeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('LeaveType', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('leaveType');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeLeaveType(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('leaveType', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('leaveRuleController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getLeaveRule(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };
        
           $scope.getLeaveType = function() {
            var query = serialize({fields: 'selectCase'});
            configService.getLeaveTypes(query, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.leaveTypes = data.values;
                console.log($scope.leaveTypes);
            });
        }

  

        $scope.save = function(shiftValid) {
            if (!shiftValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('LeaveRule', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('leaveRule');
                }
            });

        };

        $scope.getRecord = function(type) {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('leaveRule');
            }
            configService.getLeaveRuleRecord($stateParams.id, type, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(shiftValid) {
            if (!shiftValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('LeaveRule', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('leaveRule');
                }
            });
        };

        $scope.changeStatus = function(id, status) {
            var warningText = '';
            if (status == 1) {
                warningText = 'enable';
            }
            else {
                warningText = 'disable';
            }
            $confirm({text: 'Are you sure you want to ' + warningText + '?'}).then(function() {
                configService.changeStatus(id, status, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Leave Rule ' + warningText + 'ed successfully.', 'Success');
                        $scope.getRecords();
                    }
                });
            });

        };
  })

     
    .controller('taxController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getTaxes(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(taxValid) {
            if (!taxValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('Tax', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('tax');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('tax');
            }
            common.getRecord('Tax', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(taxValid) {
            if (!taxValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('Tax', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('tax');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeTax(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('tax', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('bonusController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getBonus(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(taxValid) {
            if (!taxValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('Bonus', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('bonus');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('bonus');
            }
            common.getRecord('Bonus', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(bonusValid) {
            if (!bonusValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('Bonus', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    console.log('test');
                    $state.go('bonus');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeBonus(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('bonus', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('overTimeController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getOverTime(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(taxValid) {
            if (!taxValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('OverTime', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('overTime');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('overTime');
            }
            common.getRecord('OverTime', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(bonusValid) {
            if (!bonusValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('OverTime', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('overTime');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeOverTime(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('overTime', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('shiftController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.timeFrom = ['1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM'];
        $scope.timeTo   = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'];

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getShift(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(shiftValid) {
            if (!shiftValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('Shift', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('shift');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('shift');
            }
            common.getRecord('Shift', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(shiftValid) {
            if (!shiftValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('Shift', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('shift');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeShift(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('shift', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('payGradeController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getPayGrades(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(payGradeValid) {

            if (!payGradeValid) {
                toastr.error('Invalid Form Dataa', 'Error');
                return false;
            }
            common.addRecords('PayGrade', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('payGrade');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('payGrade');
            }
            common.getRecord('PayGrade', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(categoryValid) {
            if (!categoryValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('PayGrade', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go('payGrade');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removePayGrade(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('payGrade', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('allowanceController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getAllowance(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(allowanceValid) {

            if (!allowanceValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('Allowance', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('allowance');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('allowance');
            }
            common.getRecord('Allowance', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(allowanceValid) {
            if (!allowanceValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('Allowance', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go('allowance');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeAllowance(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('allowance', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('employeeController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};

        $scope.models = {
            selected: null,
            lists: {"A": [], "B": []}
        };

        // Generate initial model
        for (var i = 1; i <= 3; ++i) {
            $scope.models.lists.A.push({label: "Item A" + i});
            $scope.models.lists.B.push({label: "Item B" + i});
        }

        // Model to JSON for demo purpose
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.sortList = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getEmployee(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items         = data.values;
                console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.addEmployee($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Employee details updated Successfully" !', 'Success');
                    $state.go('addEmployeeContactDetail', {id: data._id});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('Employee', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(employeeValid) {
            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEmployee($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Employee details updated Successfully" !', 'Success');
                    $state.go('employee');
                }
            });
        };

        $scope.uncheckAll = function() {
            $scope.pushArray = {checkbox: []};
        };

        $scope.pageChanged = function() {
            $scope.filterObj.page = $scope.currentPage;
            $scope.uncheckAll();
            $scope.getRecords();
        };

        $scope.search = function() {
            //$scope.filterObj[$scope.search.field] = $scope.search.keyword;
            $scope.filterObj['searchKey']   = $scope.search.key;
            $scope.filterObj['searchField'] = $scope.search.keyword;
            $scope.pageChanged();
        };

        $scope.resetSearch = function() {
            delete $scope.filterObj['searchField'];

        };

        $scope.reset = function() {
            delete $scope.search.keyword;
            $scope.resetSearch();
            $scope.pageChanged();
        };

    })

    .controller('employeeContactController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl = CONFIG.imageUrl;

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.addEmployeeContactDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("employeeContactDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEmployeeContactDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("employeeContactDetail", {id: $scope.formData.employee});
                }
            });
        };

    })

    .controller('employeeBoardingController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        $scope.formData = {};

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }
        $scope.save     = function(boardingValid) {

            if (!boardingValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }



            configService.addEmployeeBoardingDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeBoardingDetail", {id:$scope.employeeId}, {reload: true});
                }
            });

        };

        $scope.getEventByType = function(type) {

            $scope.tasks = [];

            configService.getEventByType(type, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.events = data;

                }
            });
        };

        $scope.getTaskByEvent = function() {

            var type  = $scope.formData.type;
            var event = $scope.formData.event;

            if (event === undefined) {
                $scope.tasks = [];
                return false;
            } else {
                configService.getTaskByEvent(type, event, function(error, data) {
                    if (error) {
                        toastr.error(error.message, 'Error');
                        return false;
                    } else {
                        $scope.tasks = data;

                    }
                });
            }

        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEmployeeContactDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("employeeContactDetail", {id: $scope.formData.employee});
                }
            });
        };

    })

    .controller('employeeJobController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }
        $scope.imageUrl = CONFIG.imageUrl;

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.addEmployeeJobDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("employeeJobDetail", {id: data.employee});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeJobDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getJobRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeJobDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('EmployeeJobDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("employeeJobDetail", {id: $scope.formData.employee});
                }
            });
        };

        $scope.getJobCategory = function() {
            var query = serialize({fields: 'selectCase'});
            configService.getJobCategory(query, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.jobCategory = data.values;
                console.log($scope.jobCategory);
            });
        }

    })

    .controller('employeeEducationController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };
         $scope.formatString = function(format) {
                    var month  = parseInt(format.substring(0, 2));
                    var day = parseInt(format.substring(3, 5));
                    var year   = parseInt(format.substring(6, 10));
                     var date  = new Date(year, month - 1, day);
                    return date;
                };


          $scope.dateComp       = function(durationFrom, durationTo) {
                    var date1           = new Date($scope.formatString(durationFrom));
                    var date2           = new Date($scope.formatString(durationTo));


                    var timeDiff        = date2.getTime() - date1.getTime();

                    console.log(timeDiff);
                    if(timeDiff<1)
                    {
                         alert('Please Enter valid date');
                                    $scope.formData.durationTo = '';
                    }
                               
        }
        ;
        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.educationList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.addEmployeeEducationDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeEducationDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeEducationDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.updateEmployeeEducationDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("addEmployeeEducationDetail", {id: $scope.formData.employee});
                }
            });
        };

        $scope.removeRecord = function(id, employeeId) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEmployeDetail('EmployeeEducationDetail', id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go("addEmployeeEducationDetail", {id: employeeId}, {reload: true});

                    }
                });
            });

        };

    })

    .controller('employeeCompanyController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.companyList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.formData.durationTo = new Date();
                $scope.durationTo          = new Date();

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.addEmployeeCompanyDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeCompanyDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeCompanyDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.updateEmployeeCompanyDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("addEmployeeCompanyDetail", {id: $scope.formData.employee});
                }
            });
        };

        $scope.removeRecord = function(id, employeeId) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEmployeDetail('EmployeeCompanyDetail', id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go("addEmployeeCompanyDetail", {id: employeeId}, {reload: true});

                    }
                });
            });

        };

    })

    .controller('employeeFamilyController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.familyList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('EmployeeFamilyDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeFamilyDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeFamilyDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            common.updateRecord('EmployeeFamilyDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("addEmployeeFamilyDetail", {id: $scope.formData.employee});
                }
            });
        };

        $scope.removeRecord = function(id, employeeId) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEmployeDetail('EmployeeFamilyDetail', id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go("addEmployeeFamilyDetail", {id: employeeId}, {reload: true});

                    }
                });
            });

        };

    })

    .controller('employeeReportingController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };
      $scope.formatString = function(format) {
                    var month  = parseInt(format.substring(0, 2));
                    var day = parseInt(format.substring(3, 5));
                    var year   = parseInt(format.substring(6, 10));
                     var date  = new Date(year, month - 1, day);
                    return date;
                };


          $scope.dateComp       = function(durationFrom, durationTo) {
                    var date1           = new Date($scope.formatString(durationFrom));
                    var date2           = new Date($scope.formatString(durationTo));


                    var timeDiff        = date2.getTime() - date1.getTime();

                    console.log(timeDiff);
                    if(timeDiff<1)
                    {
                         alert('Please Enter valid date');
                                    $scope.formData.durationTo = '';
                    }
                               
        }
        ;
        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.reportingList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.addEmployeeReportingDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeReportingDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeReportingDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getContactRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeContactDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            common.updateRecord('EmployeeReportingDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("addEmployeeReportingDetail", {id: $scope.formData.employee});
                }
            });
        };

        $scope.removeRecord = function(id, employeeId) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEmployeDetail('EmployeeReportingDetail', id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go("addEmployeeReportingDetail", {id: employeeId}, {reload: true});

                    }
                });
            });

        };

    })

    .controller('employeeLicenseController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.companyList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('EmployeeLicenseDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("employeeLicenseDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeLicenseDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getLicenseRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeLicenseDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            common.updateRecord('EmployeeLicenseDetail', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("employeeLicenseDetail", {id: $scope.formData.employee});
                }
            });
        };

    })

    .controller('employeeEarningController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getPayGrade = function() {
            configService.getPayGrade(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.payGrades = data;

                }
            });
        };

        $scope.getBonusType = function() {
            configService.getBonusType(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.Bonuses = data;

                }
            });
        };

        $scope.getAllowanceType = function() {
            configService.getAllowanceType(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.Allowances = data;

                }
            });
        };

        $scope.getPayGradeRange = function(payGradeId) {

            configService.getPayGradeRange(payGradeId, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.ctc = data;

                }
            });
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.earningList($scope.employeeId, filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.addEarningDetail($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');

                    $state.go("addEmployeeEarningDetail", {id: data.employee}, {reload: true});
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('EmployeeEarningDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.getLicenseRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            configService.getRecord('EmployeeLicenseDetail', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(contactDetailValid) {
            if (!contactDetailValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEarningRecord($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records updated successfully !', 'Success');
                    $state.go("addEmployeeEarningDetail", {id: $scope.formData.employee}, {reload: true});
                }
            });
        };

        $scope.removeRecord = function(id, employeeId) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEmployeDetail('EmployeeEarningDetail', id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go("addEmployeeEarningDetail", {id: employeeId}, {reload: true});

                    }
                });
            });

        };

        $scope.formDat = {
            "projectID": "26", "projectName": "project one", "projectDescription": "blah",
            "users": [{"userFullName": "Ian", "userID": "2"},
                {"userFullName": "Kevin", "userID": "33"},
                {"userFullName": "Peter", "userID": "32"}]
        };

        $scope.formData = {};

        $scope.formData.users = [];

        $scope.collaborators = [
            {"userID": "2", "userFullName": "Ian"},
            {"userID": "33", "userFullName": "Kevin"},
            {"userID": "32", "userFullName": "Peter"},
            {"userID": "31", "userFullName": "Tom"}
        ];

    })

    .controller('applyLeaveControllerbackUp', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        $scope.open = function() {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.field.opened = true;
        };

        $scope.filterObj = {};
        $scope.formData  = {};

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getLeaveRecord(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    delete $scope.leaveRules;
                    delete $scope.employeeDetail;
                    return false;
                } else {
                    $scope.statusType     = {0: "Pending", 1: "Approved", 2: "Rejected"};
                    var leaveStatusDetail = {};
                    var appiledLeaves     = data.records;
                    $scope.employeeDetail = data.employeeDetail;

                    configService.getLeaveRules(function(err, result) {
                        if (err) {
                            toastr.error(err.message, 'Error');
                            return false;
                        } else {

                            var leaveRules = result;

                            for (var i = 0; i < leaveRules.length; i++) {

                                for (var j = 0; j < appiledLeaves.length; ++j) {
                                    //leaveStatusDetail.push({name:leaveRules[i].leaveType.name,id:leaveRules[i].leaveType._id,status:appiledLeaves[j]._id.status,total:appiledLeaves[j].total});

                                    if (leaveRules[i].leaveType._id == appiledLeaves[j]._id.leaveType) {
                                        leaveStatusDetail[leaveRules[i].leaveType._id]                              = {};
                                        leaveStatusDetail[leaveRules[i].leaveType._id][appiledLeaves[j]._id.status] = appiledLeaves[j].total;
                                    }
                                    if (leaveRules[i].leaveType._id == appiledLeaves[j]._id.leaveType && appiledLeaves[j]._id.status != '2') {

                                        leaveRules[i].leaveNumber = leaveRules[i].leaveNumber - appiledLeaves[j].total;

                                    }

                                }
                            }

                            $scope.leaveRules = leaveRules;

                        }
                        $scope.leaveStatusDetail = leaveStatusDetail;
                        console.log(appiledLeaves);
                        console.log(leaveStatusDetail);
                    });
                }
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            configService.applyLeave($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $scope.formData = {};
                    //$('#lm_leave_modal1').modal('hide');

                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('Employee', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    // $modalInstance.dismiss('cancel');
                    /* $scope.formData.durationFrom='';
                     $scope.formData.durationTo='';
                     $scope.formData.day='';
                     $scope.formData.description=''; */

                }
            });
        };

        $scope.updateRecord = function(employeeValid) {
            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEmployee($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('employee');
                }
            });
        };

        $scope.uncheckAll = function() {
            $scope.pushArray = {checkbox: []};
        };

        $scope.pageChanged = function() {
            $scope.uncheckAll();
            $scope.getRecords();
        };

        $scope.search = function() {
            //$scope.filterObj[$scope.search.field] = $scope.search.keyword;
            $scope.filterObj['searchKey']   = $scope.search.key;
            $scope.filterObj['searchField'] = $scope.search.keyword;
            $scope.pageChanged();
        };

        $scope.resetSearch = function() {
            delete $scope.filterObj['searchField'];

        };

        $scope.reset = function() {
            delete $scope.search.keyword;
            $scope.resetSearch();
            $scope.pageChanged();
        };

        $scope.getLeaveRules = function() {

            configService.getLeaveRules(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;

            });
        };
        $scope.dayDiff       = function(durationFrom, durationTo) {

            //alert(durationFrom + 'abc' + durationTo);
            var date2           = new Date($scope.formatString(durationTo));
            var date1           = new Date($scope.formatString(durationFrom));
            var timeDiff        = Math.abs(date2.getTime() - date1.getTime());
            $scope.formData.day = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

            var day         = $scope.formData.day;
            var leaveNumber = $scope.leaveNumber;
            console.log(leaveNumber + ' ' + day);
            if (leaveNumber < day) {
                alert('No of applied leaves is greater than leaves in account');
                $scope.formData.durationTo = '';
            }
        };

        $scope.formatString = function(format) {
            var month = parseInt(format.substring(0, 2));
            var day   = parseInt(format.substring(3, 5));
            var year  = parseInt(format.substring(6, 10));
            var date  = new Date(year, month - 1, day);
            return date;
        };

        $scope.$watch('durationFrom', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.$watch('durationTo', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.leaveTypeDetail = function(id, name, leaveNumber) {

            $scope.formData.leaveType = id;
            $scope.leaveName          = name;
            $scope.leaveNumber        = leaveNumber;

        };

        //$scope.leaveBalance = function(day)
        //{
        //    var leaveNumber = $scope.leaveNumber;
        //    console.log(leaveNumber+ ' ' + day);
        //    if(leaveNumber < day)
        //    {
        //        alert('No of applied leaves is greater than leaves in account');
        //        $scope.formData.durationTo =  $scope.formData.durationFrom;
        //    }
        //};

        $scope.getLeaves          = function(id, status) {
            configService.getLeaves(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.approveLeaves = data;

            });
        };
        $scope.approveRejectLeave = function(id, status, employeeId, currentStatus) {
            configService.approveRejectLeave(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    configService.getLeaves(employeeId, currentStatus, function(error, data) {
                        if (error) {
                            toastr.error(error.message, 'Error');
                            return false;
                        }

                        $scope.approveLeaves = data;
                        $scope.getRecords();

                    });
                }

            });
        };

    })

    .controller('applyLeaveController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        $scope.open = function() {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.field.opened = true;
        };

        $scope.filterObj = {};
        $scope.formData  = {};

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getLeaveRecord(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    delete $scope.leaveRules;
                    delete $scope.employeeDetail;
                    return false;
                } else {
                    $scope.statusType     = {0: "Pending", 1: "Approved", 2: "Rejected"};
                    var leaveStatusDetail = {};
                    var appiledLeaves     = data.records;
                    $scope.employeeDetail = data.employeeDetail;

                    configService.getLeaveRules(function(err, result) {
                        if (err) {
                            toastr.error(err.message, 'Error');
                            return false;
                        } else {

                            var leaveRules = result;

                            for (var i = 0; i < leaveRules.length; i++) {
                                leaveStatusDetail[leaveRules[i].leaveType._id] = {};

                                for (var j = 0; j < appiledLeaves.length; ++j) {
                                    //leaveStatusDetail.push({name:leaveRules[i].leaveType.name,id:leaveRules[i].leaveType._id,status:appiledLeaves[j]._id.status,total:appiledLeaves[j].total});

                                    if (leaveRules[i].leaveType._id == appiledLeaves[j]._id.leaveType) {

                                        leaveStatusDetail[leaveRules[i].leaveType._id][appiledLeaves[j]._id.status] = appiledLeaves[j].total;
                                    }
                                    if (leaveRules[i].leaveType._id == appiledLeaves[j]._id.leaveType && appiledLeaves[j]._id.status != '2') {

                                        leaveRules[i].leaveNumber = leaveRules[i].leaveNumber - appiledLeaves[j].total;

                                    }

                                }
                            }

                            $scope.leaveRules = leaveRules

                        }
                        $scope.leaveStatusDetail = leaveStatusDetail;
                        // console.log(appiledLeaves);
                        //  console.log(leaveStatusDetail);
                    });
                }
            });
        };

        $scope.save = function(employeeValid) {

            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }

            $scope.formData.employee = $scope.employeeDetail._id;

            configService.applyLeave($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $scope.formData = {};
                    $scope.getRecords();
                    //$('#lm_leave_modal1').modal('hide');

                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('Employee', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {

                    // $modalInstance.dismiss('cancel');
                    /* $scope.formData.durationFrom='';
                     $scope.formData.durationTo='';
                     $scope.formData.day='';
                     $scope.formData.description=''; */

                }
            });
        };

        $scope.updateRecord = function(employeeValid) {
            if (!employeeValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEmployee($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Records added successfully !', 'Success');
                    $state.go('employee');
                }
            });
        };

        $scope.uncheckAll = function() {
            $scope.pushArray = {checkbox: []};
        };

        $scope.pageChanged = function() {
            $scope.uncheckAll();
            $scope.getRecords();
        };

        $scope.search = function() {
            //$scope.filterObj[$scope.search.field] = $scope.search.keyword;
            $scope.filterObj['searchKey']   = $scope.search.key;
            $scope.filterObj['searchField'] = $scope.search.keyword;
            $scope.pageChanged();
        };

        $scope.resetSearch = function() {
            delete $scope.filterObj['searchField'];

        };

        $scope.reset = function() {
            delete $scope.search.keyword;
            $scope.resetSearch();
            $scope.pageChanged();
        };

        $scope.getLeaveRules = function() {

            configService.getLeaveRules(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;

            });
        };
        $scope.dayDiff       = function(durationFrom, durationTo) {

            if (durationTo < durationFrom) {
                alert('End Date should be greater than Start Date');
                $scope.formData.durationTo = '';
            }

            //alert(durationFrom + 'abc' + durationTo);
            var date2           = new Date($scope.formatString(durationTo));
            var date1           = new Date($scope.formatString(durationFrom));
            var timeDiff        = Math.abs(date2.getTime() - date1.getTime());
            $scope.formData.day = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            var leaveNumber     = $scope.leaveNumber;
            var day             = $scope.formData.day;

            if (leaveNumber < day) {
                alert("No of applied leaves is greater than leaves in account");
                $scope.formData.durationTo = '';

            }

        };

        $scope.formatString = function(format) {
            var month = parseInt(format.substring(0, 2));
            var day   = parseInt(format.substring(3, 5));
            var year  = parseInt(format.substring(6, 10));
            var date  = new Date(year, month - 1, day);
            return date;
        };

        $scope.$watch('durationFrom', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.$watch('durationTo', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.leaveTypeDetail = function(id, name, leaveNumber) {

            $scope.formData.leaveType = id;
            $scope.leaveName          = name;
            $scope.leaveNumber        = leaveNumber;
        };

        $scope.getLeaves          = function(id, status) {
            configService.getLeaves(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.approveLeaves = data;

            });
        };
        $scope.approveRejectLeave = function(id, status, employeeId, currentStatus) {
            configService.approveRejectLeave(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    configService.getLeaves(employeeId, currentStatus, function(error, data) {
                        if (error) {
                            toastr.error(error.message, 'Error');
                            return false;
                        }

                        $scope.approveLeaves = data;
                        $scope.getRecords();

                    });
                }

            });
        };

        /* $scope.checkLeaves = function(day){

         var leaveNumber = $scope.leaveNumber;
         console.log(leaveNumber+ ' ' + day);
         if(leaveNumber < day){
         alert('No of applied leaves is greater than leaves in account');
         $scope.formData.durationTo =  ' ';
         }

         };


         $scope.checkErr = function(durationFrom, durationTo){
         //alert(durationFrom + ' '+ durationTo);
         if(durationTo < durationFrom){
         alert('End Date should be greater than Start Date');
         $scope.formData.durationTo =  $scope.formData.durationFrom;
         }

         };*/

    })

    .controller('attendanceController', function($scope, $filter, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG, _) {

        $scope.formData = {};

        $scope.formData.punchIn  = new Date();
        $scope.formData.punchOut = new Date();
        $scope.options           = {
            timeFormat: 'H:i'
        };

        $scope.calculateTime = function(punchIn, punchOut) {

            //alert(punchIn + '' + punchOut);
            var valuestart = new Date(punchIn).getTime();
            var valuestop  = new Date(punchOut).getTime();
            var timeDiff   = valuestop - valuestart;
            var diffHrs    = Math.floor((timeDiff % 86400000) / 3600000);
            var diffMins   = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
            if (diffHrs < 0) {
                diffHrs = 24 + diffHrs;
            }
            if (diffMins < 0) {
                diffMins = 60 + diffMins;
            }
            $scope.formData.hours = diffHrs + ':' + diffMins;

            if (diffHrs >= 9) {
                var over                 = diffHrs - 9;
                $scope.formData.overTime = over + ':' + diffMins;
            }
            else {
                $scope.formData.overTime = '0';
            }

        };

        $scope.open = function() {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.field.opened = true;
        };

        $scope.filterObj = {};
        $scope.formData  = {};

        $scope.formData.date = $filter('date')(new Date(), "MM-dd-yyyy");

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getLeaveRecord(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    delete $scope.leaveRules;
                    delete $scope.employeeDetail;
                    return false;
                } else {

                    var appiledLeaves     = data.records;
                    $scope.employeeDetail = data.employeeDetail;

                    configService.getLeaveRules(function(err, result) {
                        if (err) {
                            toastr.error(err.message, 'Error');
                            return false;
                        } else {

                            var leaveRules = result;

                            for (var i = 0; i < leaveRules.length; i++) {

                                for (var j = 0; j < appiledLeaves.length; ++j) {

                                    console.log(appiledLeaves);

                                    if (leaveRules[i].leaveType._id == appiledLeaves[j]._id) {

                                        leaveRules[i].leaveNumber = leaveRules[i].leaveNumber - appiledLeaves[i].total;

                                    }

                                }
                            }

                            $scope.leaveRules = leaveRules;

                        }

                    });
                }
            });
        };

        $scope.save = function(attendanceValid) {

            if (!attendanceValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            else if ($scope.employeeSelected == undefined) {

                toastr.error('Employee Does Not Exist', 'Error');
                return false;

            } else {

                $scope.formData.employee = $scope.employeeSelected.originalObject._id;

                configService.addAttendance($scope.formData, function(error, data) {
                    if (error) {
                        toastr.error(data.message, 'Error');
                        return false;
                    }
                    if (data) {
                        toastr.success('Records added successfully !', 'Success');
                        $state.go('attendance', {}, {reload: true});

                    }
                });

            }

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('employee');
            }
            common.getRecord('Employee', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {

                    // $modalInstance.dismiss('cancel');
                    /* $scope.formData.durationFrom='';
                     $scope.formData.durationTo='';
                     $scope.formData.day='';
                     $scope.formData.description=''; */

                }
            });
        };

        $scope.uncheckAll = function() {
            $scope.pushArray = {checkbox: []};
        };

        $scope.pageChanged = function() {
            $scope.uncheckAll();
            $scope.getRecords();
        };

        $scope.search = function() {
            //$scope.filterObj[$scope.search.field] = $scope.search.keyword;
            $scope.filterObj['searchKey']   = $scope.search.key;
            $scope.filterObj['searchField'] = $scope.search.keyword;
            $scope.pageChanged();
        };

        $scope.resetSearch = function() {
            delete $scope.filterObj['searchField'];

        };

        $scope.reset = function() {
            delete $scope.search.keyword;
            $scope.resetSearch();
            $scope.pageChanged();
        };

        $scope.getLeaveRules = function() {

            configService.getLeaveRules(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;

            });
        };
        $scope.dayDiff       = function(durationFrom, durationTo) {

            //alert(durationFrom + 'abc' + durationTo);
            var date2           = new Date($scope.formatString(durationTo));
            var date1           = new Date($scope.formatString(durationFrom));
            var timeDiff        = Math.abs(date2.getTime() - date1.getTime());
            $scope.formData.day = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

        };

        $scope.formatString = function(format) {
            var year  = parseInt(format.substring(0, 4));
            var month = parseInt(format.substring(5, 7));
            var day   = parseInt(format.substring(8, 10));
            var date  = new Date(year, month - 1, day);
            return date;
        };

        $scope.$watch('durationFrom', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.$watch('durationTo', function(newval, oldval) {
            if ($scope.durationTo < $scope.durationFrom) {
                $scope.durationTo = '';
            }
            ;
        });

        $scope.leaveTypeDetail = function(id, name) {

            $scope.formData.leaveType = id;
            $scope.leaveName          = name;

        };

        $scope.getLeaves          = function(id, status) {
            configService.getLeaves(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.approveLeaves = data;

            });
        };
        $scope.approveRejectLeave = function(id, status, employeeId, currentStatus) {
            configService.approveRejectLeave(id, status, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    configService.getLeaves(employeeId, currentStatus, function(error, data) {
                        if (error) {
                            toastr.error(error.message, 'Error');
                            return false;
                        }

                        $scope.approveLeaves = data;

                    });
                }

            });
        };

        $scope.getJobCategory = function() {
            var query = serialize({fields: 'selectCase'});
            configService.getJobCategory(query, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.example8data = data.values;

            });
        }

        $scope.getJobCategory();

        $scope.getAllEmployees = function() {

            configService.getAllEmployees(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.allEmployees = data;

            });
        }

        $scope.getAllEmployees();

        $scope.attendanceFilter = {};

        $scope.example8model = [];
        //$scope.example8data = [ {_id: 1, name: "David"}, {_id: 2, name: "Jhon"}, {_id: 3, name: "Danny"}];

        $scope.example8settings = {displayProp: 'name', idProp: '_id'};

        $scope.selectRoleText = {buttonDefaultText: 'Select Role'};

        $scope.attendanceFilter.employeemodal = [];

        $scope.employeesetting = {displayProp: 'name', idProp: '_id'};

        $scope.employeeText = {buttonDefaultText: 'Select Employee'};

        $scope.getEmployees = function() {

            configService.getEmployees($scope.example8model, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {

                    $scope.employees = [];

                    for (var i = 0; i < data.length; i++) {

                        $scope.employees.push(data[i].employee);
                        //console.log(data[i].employee);

                    }

                }
            });

        };

        $scope.currentPage                = 1;
        var sortBy                        = 'employee', sortType = 'asc', limit = 2;
        $scope.attendanceFilter.filterObj = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};

        $scope.getEmployeeAttendance = function() {

            configService.getEmployeeAttendance($scope.attendanceFilter, function(error, data) {
                if (error) {
                    toastr.error(data.message, 'Error');
                    return false;
                }
                if (data) {

                    $scope.items = data.values;
                    //console.log($scope.items);
                    $scope.totalRecords  = data.total;
                    $scope.size          = limit;
                    $scope.maxSize       = 5;
                    $scope.countingIndex = ($scope.currentPage - 1) * limit;

                }
            });

        }

        $scope.pageChanged = function() {
            $scope.attendanceFilter.filterObj.page = $scope.currentPage;
            $scope.getEmployeeAttendance();
        };

    })

    .controller('complianceDetailController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm, CONFIG) {

        if ($stateParams.id != undefined) {
            $scope.employeeId = $stateParams.id;
        }

        $scope.imageUrl    = CONFIG.imageUrl;
        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.save = function(complianceValid) {

            if (!complianceValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            else if ($scope.employeeSelected == undefined) {

                toastr.error('Employee Does Not Exist', 'Error');
                return false;

            } else {

                $scope.formData.employee = $scope.employeeSelected.originalObject._id;

                configService.addComplianceDetail($scope.formData, function(error, data) {
                    if (error) {
                        toastr.error(data.message, 'Error');
                        return false;
                    }
                    if (data) {
                        toastr.success('Records added successfully !', 'Success');
                        $state.go('addComplianceDetail', {}, {reload: true});

                    }
                });

            }

        };

        $scope.getAllEmployees = function() {

            configService.getAllEmployees(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.allEmployees = data;

            });
        }

        $scope.getAllEmployees();

    })

    .controller('eventController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getEvents(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.save = function(eventValid) {
            if (!eventValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.addEvent($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('event');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('event');
            }
            common.getRecord('Event', $stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(eventValid) {
            if (!eventValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            configService.updateEvent($scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('event');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeEvent(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('event', {}, {reload: true});
                    }
                });
            });

        };

    })

    .controller('taskController', function($scope, $state, $stateParams, configService, serialize, common, toastr, $confirm) {

        $scope.currentPage = 1;
        var sortBy         = 'name', sortType = 'asc', limit = 50;
        $scope.filterObj   = {page: $scope.currentPage, sortBy: sortBy, sortType: sortType};
        $scope.sortList    = function(inputSort) {
            if (sortBy === inputSort) {
                sortType = sortType === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy = inputSort;
            }
            $scope.filterObj.sortBy   = sortBy;
            $scope.filterObj.sortType = sortType;
            $scope.pageChanged();
        };

        $scope.getRecords = function() {
            var filter = serialize($scope.filterObj);
            configService.getTasks(filter, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                $scope.items = data.values;
                //console.log($scope.items);
                $scope.totalRecords  = data.total;
                $scope.size          = limit;
                $scope.maxSize       = 5;
                $scope.countingIndex = ($scope.currentPage - 1) * limit;
            });
        };

        $scope.getEvents = function() {

            configService.getEventRecords(function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }

                console.log(data);

                $scope.events = data;

            });
        };

        $scope.getEventByType = function(type) {

            configService.getEventByType(type, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.events = data;

                }
            });
        };

        $scope.save = function(eventValid) {
            if (!eventValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.addRecords('Task', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record added successfully !', 'Success');
                    $state.go('task');
                }
            });

        };

        $scope.getRecord = function() {
            if ($stateParams.id === undefined) {
                toastr.error('Invalid Record', 'Error');
                $state.go('task');
            }
            configService.getTaskDetail($stateParams.id, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                } else {
                    $scope.formData = data;

                }
            });
        };

        $scope.updateRecord = function(eventValid) {
            if (!eventValid) {
                toastr.error('Invalid Form Data', 'Error');
                return false;
            }
            common.updateRecord('Task', $scope.formData, function(error, data) {
                if (error) {
                    toastr.error(error.message, 'Error');
                    return false;
                }
                if (data) {
                    toastr.success('Record updated successfully !', 'Success');
                    $state.go('task');
                }
            });
        };

        $scope.removeRecord = function(id) {

            $confirm({text: 'Are you sure you want to delete?'}).then(function() {
                configService.removeTask(id, function(err, resonse) {
                    if (err) {
                        toastr.error(err.message, 'Error');
                    } else {
                        toastr.success('Record removed successfully.', 'Success');
                        $state.go('task', {}, {reload: true});
                    }
                });
            });

        };

    })
