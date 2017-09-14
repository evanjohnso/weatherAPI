var apiKey = require('./../.env').apiKey;


export let weather = {

	// start code
	    function promise() {
	      console.log('insdie first promise');
	      return new Promise(function(resolve, reject) {
	        let request = new XMLHttpRequest();
	        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
	        request.onload = function() {
	          if (this.status === 200) {
	            console.log('successful first promise');
	            console.log(request.response);
	            resolve(request.response); //this should be returned to the next promise
	          } else {
	            reject(Error(request.statusText));
	          }
	        };
	        request.open("GET", url, true);
	        request.send();
	      });

	    }

	    function promiseTwo(previousPromiseData) {
	      console.log(previousPromiseData);
	      let previousPromise = JSON.parse(previousPromiseData);
	      let lat = previousPromise.coord.lat;
	      let lon = previousPromise.coord.lon;
	      console.log(lat);
	      console.log(lon);
	      return new Promise(function(resolve, reject) {
	        console.log('inside second promise');
	        let request = new XMLHttpRequest();

	        let url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

	        request.onload = function() {
	          if (this.status === 200) {
	            console.log('inside the second promise');
	            console.log('this is the data from the most recent ajax call' + request.response);
	            console.log('this is the sunrise at dallas' + moment.unix(previousPromise.sys.sunrise).format('hh:mm a'));
	            console.log('this is the sunset at dallas' + moment.unix(previousPromise.sys.sunset).format('hh:mm a'))
	            resolve(previousPromise, request.response);
	          } else {
	            reject(Error(request.statusText));
	          }
	        };
	        request.open("GET", url, true);
	        request.send();
	      });

	    }
	    // Promise.all(promise, promiseTwo);
	    promise().then(promiseTwo);



	    // promise().then(promiseTwo) {
	    //   let body = JSON.parse(response);
	      // let sunriseUnix = body.sys.sunrise;
	      // let sunsetUnix = body.sys.sunset;
	    //   let weatherIcon = body.weather.icon;
	    //   let icon = ("<img src='http://openweathermap.org/img/w/" + body.weather[0].icon + ".png'>");
	      // let sunrise = moment.unix(sunriseUnix).format('hh:mm a');
	      // let sunset = moment.unix(sunsetUnix).format('hh:mm a');
	    //   let lat = body.coord.lat;
	    //   let lon = body.coord.lon;
	    //   $('#showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
	    //   $('#showTemp').text(`The temperature is ${body.main.temp.toFixed(0)} degrees Farenheit.`);
	    //   $('#minTemp').text(`The Low today is ${body.main.temp_min.toFixed(0)} degrees Farenheit.`);
	    //   $('#maxTemp').text(`The High today is ${body.main.temp_max.toFixed(0)} degrees Farenheit.`);
	    //   $('#showSunrise').text(`The Sunrise today in ${city} is ${sunrise}.`);
	    //   $('#showSunset').text(`The Sunset today in ${city} is ${sunset}.`);
	    //   $('#visibility').text(`Visibility is ${body.visibility}`);
	    //   $('#cityCoords').text(`Your city is ${city} and Longitude/Latitude coordinates are ${body.coord.lon} : ${body.coord.lat}`);
	    //   $('#weatherIcon').html(icon);
	    //     }, function(error) {
	    //     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
	    //     });
	    //   });
	    });
	  });

}
