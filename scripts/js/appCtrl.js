(function ()
{
    angular.module("app", ["fnc", "layout", "states"])
    .controller("appCtrl", ["$scope", "$rootScope", "layout", "fnc", "$location", "$window", function ($scope, $rootScope, layout, fnc, $location, $window)
    {     

        $scope.SessionInit = function (SessionParams)
        {            
            $scope.session = SessionParams;
        };
       
        $scope.gotoUrl = function (url)
        {
            if(!fnc.isNull(url)){
                //console.log($scope.session.url_path+ '/' + url);
                $window.location.href = $scope.session.url_path+ '/' + url;
            }
        };  

        //CALCULA TAMAÑO DE VISTA
        $(".body-content").css('height', $(window).height());
    }]);
}());