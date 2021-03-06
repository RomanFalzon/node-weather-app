console.log('js loaded');



const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#main-location');
const messageTwo = document.querySelector('#maintemp');

//messageOne.textContent = 'Malta';
//messageTwo.textContent = '20';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.temp.toFixed(1);
             
            }
        });
    });
});