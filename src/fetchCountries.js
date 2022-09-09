export function fetchCountries(name) {
  return new Promise((resolve, reject) => {
      fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
       .then(data => data.json())
       .then(data => !data.status ? resolve(data) : reject(new Error(data)));
  })
}