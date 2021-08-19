
const fetchWeather = address => {
  /*
  returns a promise object which resolves with a string value,
  either an error message or forcast description
  */

  const url = `/weather?address=${address}`;
  
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      let result;
      if (data.error) {
        result = data.error;
      } else {
        result = data.forcast;
      }
      return result;
    });
};


// the form element
document.querySelector('#weather').addEventListener('submit', evt => {
  evt.preventDefault();
  const address = evt.target.querySelector('input').value;

  // div where the error message or forecast will be inserted
  const resultElement = document.querySelector('#result');
  // the user sees 'Loading...' after submitting the form
  // before it will be replaced by either the forcast info or
  // the error message
  resultElement.textContent = 'Loading...';
  fetchWeather(address)
    .then(result => resultElement.textContent = result)
    .catch(e => console.log(e))
});


