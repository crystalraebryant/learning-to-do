describe('Todo Service', function() {
    var Todos, $q, $httpBackend;

    var RESPONSE_LIST = {
        "todos":
            [
                { 'id': '1', 'text': 'Buy a pony'},
                { 'id': '2', 'text': 'Conquer the world'},
                { 'id': '3', 'text': 'Bing watch LOTR Extended editions'}
            ]
    };

    var RESPONSE_SINGLE = {
        'id': '2',
        'text': 'Conquer the world'
    };

    beforeEach(angular.mock.module('components.todoService'));

    beforeEach(inject(function(_Todos_, _$q_, _$httpBackend_) {
        Todos = _Todos_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function() {
        expect(Todos).toBeDefined();
    });

    var result;

    beforeEach(function() {
        // Initialize our local result object to an empty object before each test
        result = {};

        // Spy on our service call but allow it to continue to its implementation
        spyOn(Todos, "get").and.callThrough();
        spyOn(Todos, "delete").and.callThrough();
        spyOn(Todos, "create").and.callThrough();
    });

    it('should return a list of todos when get() is called', function() {
        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.whenGET("/api/todos").respond(RESPONSE_LIST);

        expect(Todos.get).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Todos.get()
            .then(function(res) {
                result = res;
            });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Todos.get).toHaveBeenCalled();
        expect(result.data.todos).toEqual(RESPONSE_LIST.todos);
    });

    it('should return a list of todos when delete(id) is called', function() {
        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.whenDELETE("/api/todos/1").respond(RESPONSE_LIST);

        expect(Todos.delete).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Todos.delete('1')
            .then(function(res) {
                result = res;
            });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Todos.delete).toHaveBeenCalled();
        expect(result.data.todos).toEqual(RESPONSE_LIST.todos);
    });

    it('should return a list of todos when create() is called', function () {
        // Declare the endpoint we expect our service to hit and provide it with our mocked return values
        $httpBackend.whenPOST("/api/todos").respond(RESPONSE_LIST);

        expect(Todos.create).not.toHaveBeenCalled();
        expect(result).toEqual({});

        Todos.create()
            .then(function (res) {
                result = res;
            });

        // Flush pending HTTP requests
        $httpBackend.flush();

        expect(Todos.create).toHaveBeenCalled();
        expect(result.data.todos).toEqual(RESPONSE_LIST.todos);
    });
});