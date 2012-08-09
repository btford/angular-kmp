function AppCtrl ($scope) {

  $scope.S = 'ABC ABCDAB ABCDABCDABDE';
  $scope.W = 'ABCDABD';

  $scope.reset = function () {
    $scope.m = 0;
    $scope.i = 0;
    $scope.ret = false;
    $scope.table();
  };

  $scope.table = function () {
    var pos = 2, // the current position we are computing in T
      cnd = 0; // the zero-based index in W of the next character of the current candidate substring
    $scope.T = [-1, 0];

    while (pos < $scope.W.length) {
      if ($scope.W[pos - 1] === $scope.W[cnd]) {
        cnd += 1;
        $scope.T[pos] = cnd;
        pos += 1;
      } else if (cnd > 0) {
        cnd = $scope.T[cnd];
      } else {
        $scope.T[pos] = 0;
        pos += 1;
      }
    }
  }

  $scope.next = function () {
    if ($scope.ret) {
      return;
    }
    if ($scope.m + $scope.i < $scope.S.length) {
      if ($scope.W[$scope.i] === $scope.S[$scope.m + $scope.i]) {
        if ($scope.i === $scope.W.length - 1) {
          $scope.ret = $scope.m;
          return;
        } else {
          $scope.i += 1;
        }
      } else {
        $scope.m += $scope.i - $scope.T[$scope.i];
        if ($scope.T[$scope.i] > -1) {
          $scope.i = $scope.T[$scope.i];
        } else {
          $scope.i = 0;
        }
      }
    } else {
      $scope.ret = $scope.S.length;
    }
  };

  $scope.reset();
}
