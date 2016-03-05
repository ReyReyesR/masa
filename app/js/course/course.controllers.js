(function(){
    'use strict';

    angular
        .module('app.course')
        .controller('listarMateriaCtrl',listarMateriaCtrl)
        .controller('crearMateriaCtrl', crearMateriaCtrl)



    listarMateriaCtrl.$inject = 
    ['$scope', '$rootScope', '$location', 'courses', '$modal'];
    function listarMateriaCtrl($scope, $rootScope, $location, courses, $modal) {
        var vm = this;
        var array = [];

        courses.query( 
            function (successResult){
                vm.course = successResult;
            }, 
            function (){
                console.log("Error al obtener los datos.");

            });
                
        vm.eliminarMateriaModal = function (index) {
            $rootScope.index = index;
            $rootScope.botonOk = true;
            $rootScope.otroBotonOk = false;
            $rootScope.botonCancelar = true;
            $rootScope.rsplice = false;
            $rootScope.mensaje = "¿Seguro que desea eliminar la materia?";

            $scope.modalInstance = $modal.open({
                animation: $rootScope.animationsEnabled,
                templateUrl: '/partials/course/modal/delete_course_modal.html',
                scope: $scope,
                size: 'sm',
                resolve: {
                  items: function () {
                    return "";
                  }
                }
            });
            
        };
        
        vm.eliminarMateria = function (index) {
            $rootScope.botonOk = false;
            $rootScope.otroBotonOk = true;
            $rootScope.botonCancelar = false;
            $rootScope.urlLo = 'listarMateria';
            var name = vm.course[index].name;
            
            courses.delete({ id: vm.course[index]._id }, 
                function () {
                    $rootScope.rsplice = true;
                    $rootScope.mensaje = "Materia " + name + " eliminada";
                },
                function () {
                    $rootScope.mensaje = "Error eliminando la materia" + name;
                });   
        };

        vm.eliminarMateriaSplice = function(index, rsplice) {
            if(rsplice){
                vm.course.splice(index, 1);
                $rootScope.rsplice = false;
            }
        };

        vm.modificarMateria = function (index) {
            $location.url('modificarMateria');  
        };

        $scope.ok = function (urlLo) {
            $location.url(urlLo);
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened = true;
        };

        return vm;        
    };
    
    crearMateriaCtrl.$inject = 
    ['$scope','$rootScope', '$modal', '$location', 'courses'];
    function crearMateriaCtrl($scope, $rootScope, $modal, $location, courses) {
       
        var vm = this;
        vm.submitted = false;
        vm.mayorque = false;
        $rootScope.mensaje = "";

        vm.submit = function() {

            if (vm.data_input_form.$valid){
                vm.course = {
                    "code": vm.course.code,
                    "name": vm.course.name,
                    "credits": vm.course.credits,
                    "description" : vm.course.description,
                };

                $scope.modalInstance = $modal.open({
                    animation: $rootScope.animationsEnabled,
                    templateUrl: 
                    '/partials/course/modal/create_course_modal.html',
                    scope: $scope,
                    size: 'sm',
                    resolve: {
                        items: function () {
                            return $rootScope.items;
                        }
                    }
                });

                courses.save(vm.course,
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Materia " + vm.course.name + " creada";
                    },
                    function(){
                        $rootScope.botonOk = true;
                        $rootScope.urlLo = 'listarMateria';
                        $rootScope.mensaje = 
                        "Error creando la materia " + vm.course.name;
                    });
            }else{

                vm.submitted = true;
            }
        }

        $scope.ok = function (urlLo) {
            $location.url(urlLo);
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.cancel = function () {
            $scope.modalInstance.dismiss('cancel');
        };

        $rootScope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $rootScope.opened = true;
        };
        
        return vm;        
    };   
})();