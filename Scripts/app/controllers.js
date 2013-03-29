app.HomeCtrl = function($scope) {
    $scope.title = "Home";
};

app.CalendarCtrl = function ($scope) {
    var dataservice = window.app.dataservice;
    
    $scope.title = "Calendar";
    $scope.items = [];
    $scope.isLoading = true;
    $scope.master = {id:null, title: '', allDay: true};
    $scope.item = {};

    $scope.events = [
        //{ title: 'All Day Event', start: new Date(y, m, 1) },
        //{ title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
        //{ id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
        //{ id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
        //{ title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
        //{ title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
    ];
    
    $scope.calendarOptions = {
        //disableDragging: true,
        //weekends: false,
        height: 450,
        editable: true,
        eventClick: function (event, jsEvent, view) {            
            $scope.item = event;
            $scope.$apply();
        }
    };
    $scope.eventSources = [$scope.events, $scope.eventSource];//[$scope.events];


    $scope.getAllCalendarItems = function () {
        dataservice.getAllCalendarItems()
            .then(function (data) {
                debugger;
                $scope.isLoading = false;
                data.results.forEach(function (item) {
                    $scope.events.push(item);
                });
                
                $scope.$apply();
            })
            .fail(function() { window.alert('query failed'); });
    };
    
    function saveSucceeded(saveResult) {
        saveResult.entities.forEach(function (item) {
            $scope.events.push(item);
            $scope.item = angular.copy($scope.master);
            
            $scope.$apply();
        });
    }

    $scope.getAllCalendarItems();
  
    
    $scope.addCalendarItem = function () {
        dataservice.saveCalendarItem($scope.item,  saveSucceeded);
    };
    
    function handleItemErrors(item) {
        if (!item) { return; }
        var errs = item.entityAspect.getValidationErrors();
        if (errs.length == 0) {
            console.log("No errors for current item");
            return;
        }
        var firstErr = item.entityAspect.getValidationErrors()[0];
        console.log(firstErr.errorMessage);
        item.entityAspect.rejectChanges(); // harsh for demo 
    }

    $scope.clearForm = function() {
        $scope.item = angular.copy($scope.master);
    };

    $scope.dateOptions = {
        dateFormat: 'mm/dd/yy'
    };
};

app.dataservice = (function(breeze) {
    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'api/calendaritems'; // route to the same origin Web Api controller
    // *** Cross origin service example  ***
    //var serviceName = 'http://todo.breezejs.com/api/todos'; // controller in different origin

    var manager = new breeze.EntityManager(serviceName);
   
    return {
        saveCalendarItem: saveCalendarItem,
        getAllCalendarItems: getAllCalendarItems
    };

    function saveCalendarItem(item, saveSucceeded) {
        debugger;
        var temp = Date.parse(item.start);
        
        //item.start = new Date("Wed Feb 20 08:22:36 EST 2013");
        item.allDay = true;
        if (!item.id) {
            manager.createEntity('CalendarItem', item);
        }
        manager.saveChanges().then(saveSucceeded).fail(saveFailed);
    }

    function saveFailed(error) {
        alert('error - see console log');
        console.log(error);
    }
    
    function getAllCalendarItems() {
        var query = breeze.EntityQuery.from("CalendarItems");
        return manager.executeQuery(query);
    }
})(breeze);