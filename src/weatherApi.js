const _apiKey = 'b88d9f9505db92622e66529d1f1535f2';

export async function getFiveDay(zipcode, country, system) {
  let countryF = country ? country : "US"
  const url = "http://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + "," + countryF + "&units=" + system + "&appid=" + _apiKey;

  return await fetch(url)
    .then(async res => res)
    .then(res => {
      return res.json()
    })
    .catch(err => {
      return console.log(err)
    })
}