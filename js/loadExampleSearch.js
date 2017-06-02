$(function() {
    var queryURL = 'http://niche-recruiting-autocomplete.appspot.com/search/?query=';
    var avoidCache = '&sid=' + Math.random(); //Added to end of url to prevent cached results
    var userErrorMessage = $('#userErrorMessage');

    function LoadExampleSearch() {
        var responseListTemplate = $('#responseListTemplate').html();
        var render = Handlebars.compile(responseListTemplate);
        var responseList = $('#response ul');
        var userInput = $('#userInput');

        userInput.on('change textInput input', function() {
            responseList.show();
            responseList.html('');
            var searchTerm = (userInput.val());

            if (checkSearchTerm(searchTerm)) {
                var newQueryURL = queryURL + searchTerm + avoidCache;
            }

            JSONPUtil.LoadJSONP(newQueryURL, function(response) {
                var firstTenResults = response.results.slice(0, 10); //Takes only first ten items from response
                var results = render(firstTenResults);
                responseList.html(results);
            });

        });
    }

    //Checks the user input for callback or echo and provides a user error when necessary
    function checkSearchTerm(searchTerm) {
        userErrorMessage.html('')
        var searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower.indexOf('callback') >= 0 || searchTermLower.indexOf('echo') >= 0) {
            userErrorMessage.html('Your search cannot contain the words callback or echo');
            userErrorMessage.show();
            return false;
        } else {
            userErrorMessage.hide();
            return true;
        }
    }

    $(LoadExampleSearch);
});
