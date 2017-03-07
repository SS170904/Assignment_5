(function () {
"use strict";

angular.module('public')
.controller('myInfoController', myInfoController);

myInfoController.$inject = ['UserInfo', 'ApiPath'];
function myInfoController(UserInfo, ApiPath) {

  var myInfoCtrl = this;
  myInfoCtrl.UserNotRegistered = false;
  myInfoCtrl.BasePath = ApiPath;

  if (UserInfo)
  {
    myInfoCtrl.UserNotRegistered = false;
    myInfoCtrl.User = UserInfo;
  }
  else {
    myInfoCtrl.UserNotRegistered = true;
    myInfoCtrl.User = [];
  }

}
}) ();
