import  {builder}  from './utils/apiResponse.js';
const shortening_form = document.getElementById('shortening--form')
const shortened_wrapper = document.getElementById('shortened--wrapper')
let count = 1
let shortenedArr = []
shortening_form.addEventListener('submit',async function(event){
    event.preventDefault()
    const link_form = document.getElementById('origin-link')
    const shortUrl  = await builder(link_form.value)
    if(typeof shortUrl == 'undefined'){
        // error handling here
        alert("please enter an actual url")
    }else if(typeof shortUrl == 'string'){

        shortenedArr.push([link_form.value , shortUrl , count])
        let shortenedHtml = shortenedArr.map((el) =>{
            return `<div class="shortened-link--wrapper">
                    <p class="short__long--str">${el[0]}</p>
                    <form class="shortened--form" id="shortened--form" >
                        <input type="hidden" id="shortened--value" value="${el[1]}">
                        <p class="short__srt--str">${el[1]}</p>
                        <button class="copy copy-btn" value="copy-${el[2]}" type="submit">Copy</button>
                    </form>
                </div>`
        }).join('')

         count += 1
         shortened_wrapper.innerHTML = shortenedHtml
            document.querySelectorAll('.copy-btn').forEach(btn => {
                    btn.addEventListener('click', function () {
                        console.log(this.value); 
                        this.innerHTML = "Copied!"
                        btn.classList.add('copied')
                    });
                });
        
    }
})

shortened_wrapper.addEventListener('submit',async function(event){
    event.preventDefault()
    const shortened_value = document.getElementById('shortened--value')
    try {
        await navigator.clipboard.writeText(shortened_value.value);
        document.querySelectorAll('.copy-btn').forEach(btn => {
                console.log(btn.classList)
                // if(btn.classList.contains('copied')){
                //         btn.classList.remove('copied')   
                //     }
                }
                
                )
                    
               
    
        } catch (err) {
            console.error('Failed to copy text: ', err);
    }
   
} )
