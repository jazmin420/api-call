
const inputWord = async ()=> {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "fetching data......"
try {
  const word = document.querySelector('input').value;
  const response =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await response.json();
  
  
  let definitions = data[0].meanings[0].definitions[0];
  resultDiv.innerHTML = `
      <h2><strong>Word: </strong>${data[0].word}</h2>
      <p>${data[0].meanings[0].definitions[0].definition}</p>
      <p>${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning: </strong>${definitions.definition === undefined ? "not found" : definitions.definition  }</p>
      <p><strong>Example: </strong>${definitions.example === undefined ? "not found" : definitions.example}</p>
      <p><strong>Antonyms: </strong></p>     
`
if(definitions.antonyms.length === 0){
  resultDiv.innerHTML += `<span>Not found</span>`
}
else {
for(let i=0;i<definitions.antonyms.length;i++){
  resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
}
}

// read more
resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`

} 

catch (error) {
  resultDiv.innerHTML = `<p>Sorry, the word is not found</p>`
}
// console.log(data);
}

