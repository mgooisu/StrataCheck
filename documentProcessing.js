var fs = require('fs');




var doc = loadDocument("TestDocument.txt")

var words = doc.split(/[\s]/)
var keywords = ["project", "strata","contract"]
var keywordLocations = []
//Finding Keywords
for(i = 0; i < words.length; i++){
    var word = words[i];
    keywords.forEach(keyword =>{
        if(word.includes(keyword)){
            keywordLocations[i] = i
        }
    })
}

//Constructing sentences containing those keywords
var sentences = []
keywordLocations.forEach(loc =>{
    //We find the starting point of the sentence by stepping back through each word until a full stop or the start of the document is found
    var sentenceStart = findStartOfSentence(loc);
   // console.log("Start of sentence containing keyword %s is at position %d",words[loc],sentenceStart);
    
    // We find the ending point of the sentence in a similar way, with the starting sentence as a starting point
    var sentenceEnd = findEndOfSentence(sentenceStart);
    //console.log("End of sentence containing keyword %s is at position %d",words[loc],sentenceEnd);
    
    var sentence = "";
    for(i = sentenceStart; i< sentenceEnd; i++){
        sentence += words[i] + " "
    }
    if(!sentences.includes(sentence)){
        sentences[sentences.length+1] = sentence
    }
})

console.log("Sentences containing key words: %s",keywords.toString());
sentences.forEach(sentence =>{
    console.log(sentence);
})

/**
 * Simple File reading - TestDocument would be replaced with the pdf for the body corporate document
 * Function is blocking - Will need to be updated with one that makes use of promises or streams
*/
function loadDocument(doc){
    return fs.readFileSync(doc,'utf-8',(err,data) => {
        if(err){
            console.error(err)
            return
        }
        return data;
    })
}

/**
 * Find the start of the sentence from a given word and a list of words
 */
function findStartOfSentence(loc){
    for(i = loc-1; i > 0; i--){
        if(words[i].includes(".") || words[i].includes("?") || words[i].includes("!")|| words[i] == undefined) return i+1
    }
    return 0
}

/**
 * Find the end of the sentence from a given start index and a list of words
 */
 function findEndOfSentence(start){
    for(i = start; i < words.length; i++){
        if(words[i].includes(".") || words[i].includes("?") || words[i].includes("!")) return i+1
    }
    return words.length
}