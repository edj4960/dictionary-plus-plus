// import unirest from "unirest";

const headers = {
  "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
	"x-rapidapi-key": "3da7f73713msh6b76f78932ceea3p15acc7jsnf894af7ecab1",
	"useQueryString": true
}

document.getElementById("wordSubmit").addEventListener("click", function(event) {
  event.preventDefault()
  const word = document.getElementById("wordInput").value
  if (word == "")
    return;

  fetch("https://rapidapi.p.rapidapi.com/language/v1/entries/en/" + word, {
    method: "GET",
    headers: headers
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    var res = ""

    if (json.entries.length === 0) {
      alert("Please enter a valid word")
      return;
    }

    var entry = json.entries[0]

    res += "<div class='section-box'>"
    res += "<h2>Pronunciations</h2>"
    res += "<div class='info-box'>"
    for (let j=0; j < entry.pronunciations.length; j++) {
      let pro = entry.pronunciations[j]
      res += "<p>" + pro.transcriptions[0].transcription + "</p>"
      if(pro['audio']) {
        res += "<audio controls>"
        res += '<source src="' + pro.audio.url + '" type="audio/mpeg">'
        res += "</audio>"
      }
    }
    res += "</div></div>"

    res += "<div class='section-box'>"
    res += "<h2>Interpretations</h2>"
    res += "<div class='info-box'>"
    for (let j=0; j < entry.lexemes.length; j++) {
      let interp = entry.lexemes[j]
      res += "<h3>" + interp.partOfSpeech + "</h3>"

      res += "<div class='detail'>"
      res += "<h4>Definition</h4>"
      res += "<p>" + interp.senses[0].definition + "</p>"
      res += "</div>"

      if (interp.senses[0]['usageExamples']) {
        res += "<div class='detail'>"
        res += "<h4>Example</h4>"
        res += "<p>" + interp.senses[0].usageExamples[0] + "</p>"
        res += "</div>"
      }

      if (interp['synonymSets']) {
        res += "<div class='detail'>"
        res += "<h4>Synonyms</h4>"
        res += "<p>"
        for (let k=0; k<interp.synonymSets.length; k++) {
          let syn = interp.synonymSets[k]
          res += syn.synonyms[0] + "  "
        }
        res += "</p>"
        res += "</div>"
      }
    } 
    res += "</div></div>"

    document.getElementById("results").innerHTML = res
  })
  .catch(err => console.log(err))
  

})