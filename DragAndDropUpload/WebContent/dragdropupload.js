$(document).ready(function(){
  $('form input').change(function () {
    $('form p').text(this.files.length + " file(s) selected");
  });
  upload = function(){
	  var file = document.getElementById("file");
	  console.log(file.files[0]);
  }
});