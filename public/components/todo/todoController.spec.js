describe('Todo Controller', function() {
    var $controller, $scope, todoController, todoService;

    var todoList = [
        { id: '1', text: 'Buy a pony' },
        { id: '2', text: 'Win Bingo' },
        { id: '3', text: 'Dive into the ocean' }
    ];

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('components.todoController'));
    beforeEach(angular.mock.module('components.todoService'));

    beforeEach(inject(function(_$controller_, _Todos_) {
        $controller = _$controller_;
        todoService = _Todos_;

        var fakeHttpPromise = {
            success: function(data) {
            }
        };

        spyOn(todoService, 'get').and.returnValue(fakeHttpPromise);
        spyOn(todoService, 'create').and.returnValue(fakeHttpPromise);
        spyOn(todoService, 'delete').and.returnValue(fakeHttpPromise);

        $scope = {};
        todoController = $controller('todoController', { $scope: $scope, Todos: todoService });
    }))

    it('should be defined', function() {
        expect(todoController).toBeDefined();
    });

    it('should initialize with a call to Todos.get()', function() {
        expect(todoService.get).toHaveBeenCalled();
    })

    it('should call Todos.create()', function() {
        $scope.formData = {
            text: 'Buy a pony'
        };
        $scope.createTodo();
        expect(todoService.create).toHaveBeenCalled();
    });

    it('should call Todos.delete()', function() {
        $scope.deleteTodo('1');
        expect(todoService.delete).toHaveBeenCalled();
    });
});