var ALPACA = {

  deleteAlpaca: function(name) {
    var request = new XMLHttpRequest();
    request.open('POST', '/api/v1/alpaca/remove/' + name + '/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();

    request.onreadystatechange = function() {
      if (request.status === 200 && request.readyState === 4) {
        var element = document.getElementById(name);

        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }
  },

  detailsAlpaca: function(name) {
    window.location.href = "/alpacadescription/" + name + "/";
  },

  // TODO: write thing.

  updateRelations: function(name, data) {
    var request = new XMLHttpRequest();
    request.open('PATCH', '/api/v1/alpaca/remove/' + name + '/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);

    request.onreadystatechange = function() {
      if (request.status === 200 && request.readyState === 4) {
        var element = document.getElementById(name);

        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    }
  }
}
