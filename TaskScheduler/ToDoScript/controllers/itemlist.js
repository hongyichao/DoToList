﻿var itemList = angular.module('itemListModule', []);

itemList.controller('itemListCtrl', ['$scope', 'itemReq', function ($scope, itemReq) {
    
    $scope.selectedItems = [{}];
    $scope.myData = [
        //{ "projectName": "My Angular Project 1", taskDesc: "to do 1", hours: "3", start: "2014-11-12", end: "2015-01-15" }
    ];
    $scope.totalItems = $scope.myData.length;
    $scope.pagingOptions = { pageSizes: [10, 20, 30], pageSize: 10, currentPage: 1 };
    $scope.filterOptions = { filterText: '', useExternalFilter: false };

    $scope.itemGridOptions = {
        data: 'myData',
        selectedItems : $scope.selectedItems,
        enableRowSelection: true,
        multiSelect: false,
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
            { displayName: 'Project Name', field: 'ProjectName' },
            { displayName: 'Task Name', field: 'TaskName' },
            { displayName: 'Assign To', field: 'By' },
            { displayName: 'Start Time', field: 'StartTime', cellFilter: "date:'yyyy-MM-dd'" },
            { displayName: 'End Time', field: 'EndTime', cellFilter: "date:'yyyy-MM-dd'" },
            { displayName: 'Total Hours', field: 'TotalHours' },
            { displayName: 'Hours Per Day', field: 'HoursPerDay' }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };

    $scope.populateGridData = function(newPageSize, newCurrentPage)
    {
        itemReq.getItems({ pageSize: newPageSize, page: newCurrentPage }, function (itemData) {
            $scope.totalItems = itemData.totalItems;
            $scope.myData = itemData.items;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }

    $scope.populateGridData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watchCollection('pagingOptions', function (newOption, oldOption) {
        if(newOption.pageSize!==oldOption.pageSize) {
            $scope.pagingOptions.currentPage = 1;
            $scope.populateGridData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }

        if(newOption.currentPage !== oldOption.currentPage) {
            $scope.populateGridData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    });


}]);