var ALPACA = {

  deleteAlpaca: function (name) {
    var request = new XMLHttpRequest();
    request.open('POST', '/api/v1/alpaca/remove/'+ name +'/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();

    request.onreadystatechange = function () {
      if (request.status === 200 && request.readyState === 4) {
        var element = document.getElementById(name);

        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }
  },

  detailsAlpaca: function (name) {
    window.location.href="/alpacadescription/" + name + "/";
  }
}

function formNewAlpaca() {
  var formData = JSON.stringify($("#formAddAlpaca").serializeArray());

  $.ajax({
  type: "POST",
  url: "api/v1/alpaca/new",
  data: formData,
  success: function(){},
  dataType: "json",
  contentType : "application/json"
  });
}

$('#dobpicker.input-group.date').datepicker({
    format: "dd/mm/yyyy",
    startView: 2,
    todayBtn: true,
});
