var IRIS_ROOT = env.IRIS_ROOT || 'http://54.193.154.148:32779';

angular.module('app', ['ui.router', 'ui.ace', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  }).state('configure', {
    url: '/configure',
    templateUrl: 'templates/configure.html',
    controller: 'ConfigureCtrl'
  }).state('test', {
    url: '/tests/:id',
    templateUrl: 'templates/test.html',
    controller: 'TestCtrl'
  });

  $urlRouterProvider.otherwise('/');

})

.controller('HomeCtrl', function($scope) {
})

.controller('ConfigureCtrl', function($scope, $http) {
  $scope.files = {};
  $scope.tasks = [];

  $scope.deleteTask = function(i) {
    $scope.tasks.splice(i, 1);
  };

  $scope.addTask = function() {
    if (!$scope.nextTask) {
      return;
    }
    $scope.tasks.push({
      title: $scope.nextTask
    });
    $scope.nextTask = '';
  };

  $scope.submit = function() {
    var payload = {
      tasks: $scope.tasks,
      config: $scope.files
    };
    $http.post(IRIS_ROOT + '/tasks', payload).then(function(res) {
      alert('jobs done my friend');
    });
  };

})

.controller('TestCtrl', function($scope, $stateParams) {
  var id = $stateParams.id;

  $scope.test = {
    name: 'User login',
    link: 'http://box123.todocker.com/',
    tasks: ['asdf', 'asddasd', 'asd'].map(function(task) {
      return {
        title: task,
        status: ['pass', 'fail', null][Math.floor(Math.random() * 3)]
      };
    }),
    comments: [['bob', 'test'], ['asdf', 'test2']].map(function(d) {
      return {
        username: d[0],
        comment: d[1]
      };
    })
  };

  $scope.markTask = function(task, status) {
    if (task.status === status) {
      task.status = null;
    } else {
      task.status = status;
    }
  };

  $scope.identiconify = function(seed) {
    var sha = new jsSHA('SHA-256', 'TEXT');
    sha.update(seed);
    var hash = sha.getHash('HEX');
    var identicon = new Identicon(hash, 50).toString();
    return 'data:image/png;base64,' + identicon;
  };

  $scope.user = {
    username: 'simplyianm'
  };

})

.controller('SuiteCtrl', function($scope) {
  $scope.tasks = ['button blue', 'creates a user'].map(function(e) {
    return {
      title: e,
      status: ['pass', 'fail', null][Math.floor(Math.random() * 3)]
    };
  });
});
