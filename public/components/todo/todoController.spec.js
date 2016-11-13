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

        spyOn(todoService, 'get').and.callFake(function() {
            return {
                success: function() {
                    return todoList;
                }
            };
        });

        var $scope = {};
        todoController = $controller('todoController', { $scope: $scope, Todos: todoService });
    }))

    it('should be defined', function() {
        expect(todoController).toBeDefined();
    });
});