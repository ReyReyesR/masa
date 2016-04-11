(function (){
    'user strict';
    
    angular.module('app', [
        'app.course',
        'app.login',
        'app.professor',
        'app.reports',
        'app.section',
        'app.student',
        'ngResource',
        'ui.router'
    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    content: {
                templateUrl: 'partials/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
                }
            }
        })
    })

    .run(function ($rootScope) {
        $rootScope.domainUrl = 'Localhost:3000';
        $rootScope.professorId = '56f5fd3a20047f3c15b05f0e';
    });

})();
