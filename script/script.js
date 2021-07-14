$(document).ready(function () {

    $("#search-button").on("click", function () {

        var searchValue = $('#search-value').val();
        console.log(searchValue);

        getCurrentWeather(searchValue)
        getFiveDay(searchValue)
    })


    function getCurrentWeather(searchValue) {
        console.log("CURRENT WEATHER", searchValue)

        // var apiKey = "1d28bcf0ecf591feaa4ca57cd5b9d768";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=1d28bcf0ecf591feaa4ca57cd5b9d768&units=imperial";
        console.log("QUERY URL", queryUrl)
        $.ajax({
            type: "GET",
            url: queryUrl
        }).then(function (data) {
            console.log(data.coord);

            var coord = {
                lat: data.coord.lat,
                lon: data.coord.lon
            }

            getUVIndex(coord)

            $("#today").empty();
            var cityName = $("<h3>").addClass("card-title").text(data.name)
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " F")
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%")
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "MPH");
            var icon = $("<img>").attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");

            cardBody.append(cityName, icon, temp, humidity, wind);
            card.append(cardBody);
            $("#today").append(card);

        })
    }

    function getUVIndex(coord) {
        console.log("COORDS FROM GET CURRENT WEATHER", coord)
        var queryUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + coord.lat + "&lon=" + coord.lon + "&appid=1d28bcf0ecf591feaa4ca57cd5b9d768&units=imperial";
        $.ajax({
            type: "GET",
            url: queryUrl
        }).then(function (data) {
            console.log(data)

        })
    }

    function getFiveDay(searchValue) {
        console.log("GET FIVE DAY", searchValue)

        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=1d28bcf0ecf591feaa4ca57cd5b9d768&units=imperial";
        console.log("QUERY URL", queryUrl)
        $.ajax({
            type: "GET",
            url: queryUrl
        }).then(function (data) {
            console.log("FIVE DAY DATAAAAA", data)
            $("#forecast").empty();

            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    var column = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card");
                    var cardBody = $("<div>").addClass("card-body")

                    var date = $('<h4>').addClass("card-title").text(data.list[i].dt_txt);
                    var temp = $("<p>").addClass("card-text").text(data.list[i].main.temp + " F");
                    var humidity = $("<p>").addClass("card-text").text(data.list[i].main.humidity);

                    card.append(cardBody)
                    column.append(card)
                    cardBody.append(date, temp, humidity)
                    $("#forecast").append(card);
                }
            }
        })

    }
})
