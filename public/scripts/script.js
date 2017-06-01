$(onReady);

function onReady() {
  $('#ownerRegister').on('click', registerOwner);
  $('#addPet').on('click', addPet);
  ownerSelect();
}


//created an on click event for owner registration button
function registerOwner(){
  console.log('owner registration');


  //created an object to store owner input
  var objectToSend = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val()
  };
  console.log(objectToSend);



  $.ajax({
    type: 'POST',
    url: '/addOwner',
    data: objectToSend,
    success: function(response) {
  console.log('back from the server with response', response);
}// end success

  });// end ajax call

  $.ajax({
    type: 'GET',
    url: '/addOwner',
    success: function(response){
    console.log('back from server with good news!', response);

    }
  });
} // end registerOwner function

function ownerSelect() {
  $.ajax({
    type: 'GET',
    url: '/addOwner',
    success: function(response){
    console.log('back from server with good news!', response);


    for (var i = 0; i < response.length; i++) {
      var resFirstName =  response[i].first_name;
      var resLastName =  response[i].last_name;
      var $option = $('<option value="' + resFirstName + ' ' +
      resLastName + '">' + resFirstName + ' ' +
      resLastName +' </option>'  );

      $("#ownerSelect").append($option);
    }
  }//end of succes
  });//end of ajax

}

//create object to send pet information
var petToSend = {
  name: $('#petName').val(),
  color: $('#petColor').val(),
  breed: $('#petBreed').val()
};

function addPet(){
  console.log('enter pet registration');
  //created an object to store owner input
  $.ajax({
    type: 'POST',
    url: '/addPet',
    data: petToSend,
    success: function(response){
      console.log('back from the server with pet', response);
    }
  });

}
