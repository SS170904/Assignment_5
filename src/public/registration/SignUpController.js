(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['RegistrationService','$state' ];
function SignUpController(RegistrationService, $state ) {
  var signUpCtrl = this;
  signUpCtrl.notAvlDishMsg = "";

  signUpCtrl.ValidateFavDish = function() {
    if (signUpCtrl.user.favDish){
      var favDish = signUpCtrl.user.favDish;
      RegistrationService.CheckIfDishValid(favDish)
      .then (function(data){
          if (data)
          {
              signUpCtrl.notAvlDishMsg ="";
          }
          else {
              signUpCtrl.notAvlDishMsg ="Does not Exists!";
          }
      });
    }
  }

  signUpCtrl.submit = function()
    {
        var favDish = signUpCtrl.user.favDish;
        RegistrationService.CheckIfDishValid(favDish)
        .then (function(data){
            if (data)
            {
              //save data
                signUpCtrl.notAvlDishMsg ="";


                var userDetailArray = [{
                  name: signUpCtrl.user.firstname + ' ' +  signUpCtrl.user.lastname,
                  email: signUpCtrl.user.email,
                  phone: signUpCtrl.user.phone,
                  favdish: favDish,
                  menuItemName: data.data.name,
                  menuItemShortName: data.data.short_name,
                  menuItemDescription:data.data.description,
                  menuImgPresent:data.data.image_present
                }];

                //RegistrationService.AddUserData(pName, pEmail, pPhoneNo,pMenuItem,pMenuItemName,pMenuItemDescription,pMenuItemImagePresent)
                RegistrationService.AddUserData(userDetailArray)
                $state.go('public.thankYouSignUp')


            }
            else {
              signUpCtrl.notAvlDishMsg = " No such menu number exists."
            }

            /*
            var pName = signUpCtrl.user.firstname + ' ' +  signUpCtrl.user.lastname ;
            var pEmail = signUpCtrl.user.email;
            var pPhoneNo = signUpCtrl.user.phone;
            var pMenuItem =  favDish;
            var pMenuItemName =  data.name;
            var pMenuItemImagePresent =  data.image_present;
            var pMenuItemDescription =  data.description;
             */
        });
    }
};

})();
