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
      var $option = $('<option value="' + response[i].first_name + ' ' +
      response[i].last_name + '">' + response[i].first_name + ' ' +
      response[i].last_name +' </option>'  );

      $("#ownerSelect").append($option);
    }
  }//end of succes
  });//end of ajax

}


// function addPet(){
//   console.log('enter pet registration');
//   //created an object to store owner input
//   var objectToSend = {
//     : $('#firstName').val(),
//     lastName: $('#lastName').val()
//   };
//   console.log(objectToSend);
// }
