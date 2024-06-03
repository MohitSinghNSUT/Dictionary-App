
// always try to use query selector to select the items

const form=document.querySelector('form');

const res=document.querySelector('.result');
 async function getInfo(word){
    // how to detect if the error would be comming in finding the word;
    try {

        // res.setAttribute("display","block");
        res.style.display="block";
        res.innerHTML=`FETCHING DATA ......... `;
    // we are getting a word and need to find the meanging of it
    // the url=https://api.dictionaryapi.dev/api/v2/entries/en/hello
    if(word.length==0)return;
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response=await fetch(url);
    // to make fetch the data we use Await keyword
    const data=await response.json();
    // to convert the data into json format
    // console.log("Response",data);

    // we need to populate data At Run time
    console.log(data);
    let def=data[0].meanings[0].definitions[0] 

    res.innerHTML=`<p><strong>Word</strong> : ${data[0].word}</p>
    <p><span class="makebolder">Part of Speech</span> : ${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning</strong> : ${def.definition===undefined?"Not Found":def.definition}</p>
    <p><strong>Example</strong> : ${def.example==undefined?"Not Found":def.example}</p>
    `
    // As antonyms and synonyms can be more than  one we need to run a loop to print them
    res.innerHTML+=`<p class="makebolder " >Synonyms : </p> `

    if(data[0].meanings[0].synonyms.length){
        for(let i=0;i<data[0].meanings[0].synonyms.length;i++){
            res.innerHTML+=`<p class="list" > <li> ${data[0].meanings[0].synonyms[i]} </li> </p>`;
        }   
    }
    else{
        res.innerHTML+=`<span> Not Found </span>`
    }

    res.innerHTML+=`<P class="makebolder" >Antonyms : </P> `

    if(data[0].meanings[0].antonyms.length){
        for(let i=0;i<data[0].meanings[0].synonyms.length;i++){
            res.innerHTML+=`<p class="list" ><li> ${data[0].meanings[1].antonyms[i]}</li> </p>`;
        }
    }
    else{
        
        res.innerHTML+=`<span> Not Found </span>`
        }

        res.innerHTML+=` <div> <a href="${data[0].sourceUrls[0]}" target="_blank" class="readmore">Want to Read More </a></div> `

        // to add audio to the page
        // we use 
        res.innerHTML+=`
        <p class="makebolder">Listen</p>
        <audio controls>
        <source src="${data[0].phonetics[0].audio}">
         NOT FOUND
        </audio>
      `

    } catch (error) {
        res.innerHTML=`SORRY WORD CANNOT BE FOUND `
    }
// TRY AND CATCH CAN BE USED TO GET THAT THEIR IS ERROR OR NOT IN GETTING DATA OR NOT

}
const asyncArrowFunction =async()=>{

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // it is used to prevent the default behavior of the reload on submiting the form
    // console.log(form);
    
    // form.element is used to access any element of the form
    // console.log("value",form.elements[0],"  ",form.elements[0].value);

    getInfo(form.elements[0].value);
    // getInfo("hello");
});