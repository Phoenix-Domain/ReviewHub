import './style.css';

class MakeClient{
  constructor(name,review,rating,image = null){
    this.name = name;
    this.review = review;
    this.rating = rating;
    this.image = image;
  }
}


const name = document.querySelector('#name');
const review = document.querySelector('#review');
const image = document.querySelector('#image');
const displayBox = document.querySelector('#displayBox');
const imgDisplay = document.querySelector('#imgDisplay');
const ratings = document.querySelectorAll('.ratings');
const testimonials = document.querySelector('#testimonials');
const submitBtn = document.querySelector('#submitBtn');
const imgStatusMsg = document.querySelector('#imgStatusMsg');
const toggleBtn = document.querySelector('#toggleBtn');
const colorModeSym = document.querySelector('#colorModeSym');
const body = document.body;

let currentImageData = null;

let clientArray = getClient() || [];

if(clientArray.length <= 0){

}else{
  clientArray.forEach(card => createCard(card));
}




submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameVal = name.value.trim();
  const reviewVal = review.value.trim();
  const ratingVal = checkRating(ratings);
  

  let client = new MakeClient(nameVal,reviewVal,ratingVal,currentImageData);

  if(nameVal && reviewVal && ratingVal){
    clientArray.push(client);
    saveClient(clientArray);

    createCard(client);
  }else{
    alert('Please fill in all fields');
  }

  resetVal();
});

image.addEventListener('change', e => {
  const file = e.target.files[0]; //Get the selected file

  if(file && file.type.startsWith('image/')){
    //Create a fileReader
    const reader = new FileReader();

    reader.onload = e => {
      currentImageData = e.target.result;
      imgDisplay.src = e.target.result;
      imgDisplay.classList.add('block', 'w-50','h-50','rounded-full');
      displayBox.classList.remove('hidden'); 
    }

    reader.onerror = e => {
      alert(`Error reading file: ${e.target.error}`)
      imgDisplay.style.display = 'none';
      currentImageData = null;
    }

    reader.onprogress = e => {
      if(e.lengthComputable){
        const percent = (e.loaded/e.total) * 100;
        imgStatusMsg.textContent = `Loading: ${percent.toFixed(2)}%`
      }
    }
    reader.readAsDataURL(file);
  } else{
    alert('Please upload a valid image file')
    currentImageData = null;
  }
});

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  if(body.classList.contains('dark')){
    colorModeSym.textContent = '🌙';
  } else if(!body.classList.contains('dark')){
    colorModeSym.textContent = '☀️';
  }
})



function createCard(x){
  const clientReview = document.createElement('q');
  const clientName = document.createElement('p');
  const clientRating = document.createElement('p');
  const delRating = document.createElement('button');
  const clientCard = document.createElement('article');

  clientReview.textContent = x.review;
  clientReview.classList.add('text-left','my-2','italic');

  delRating.textContent = 'Delete';
  delRating.classList.add('bg-blue-800', 'text-white', 'px-5', 'py-2', 'rounded-full', 'hover:bg-purple-800', 'block', 'mt-5');
  delRating.addEventListener('click', () => {
    deleteItem(clientCard);
    clientArray = clientArray.filter(card => card!==x);
    saveClient(clientArray);
  })

  clientName.textContent = ` - ${x.name}`;
  clientName.classList.add('text-right','mb-2','font-bold');

  checkStars(x,clientRating);

  if(x.image){
    const clientImage = document.createElement('img');
    clientImage.src = x.image;
    clientImage.alt = `${x.name}'s image`;
    clientImage.classList.add('w-16', 'h-16', 'rounded-full', 'mx-auto', 'mb-2', 'object-cover');
    clientCard.append(clientImage);
  }

  clientCard.append(clientReview,clientName,clientRating, delRating);
  clientCard.classList.add('bg-purple-300','w-full', 'my-3', 'p-4','m-auto','rounded-lg','shadow-lg','max-w-sm');

  testimonials.append(clientCard);
}

function deleteItem(item){
  item.remove();
}

function saveClient(x){
  localStorage.setItem('Client', JSON.stringify(x));
};

function getClient(){
  return JSON.parse(localStorage.getItem('Client'))
}

function checkRating(x){
  let value = null;
  x.forEach(rating => {
    if(rating.checked){
      if(rating.id === 'terrible') value = 1;
      if(rating.id === 'poor') value = 2;
      if(rating.id === 'good') value = 3;
      if(rating.id === 'veryGood') value = 4;
      if(rating.id === 'excellent') value = 5;
    };
  });
  return value;
}

function resetVal(){
  name.value ="";
  review.value = "";
  image.value = "";
  currentImageData = null;
  imgDisplay.classList.add('hidden');
  displayBox.classList.add('hidden');
  ratings.forEach(rating => rating.checked = false);
}

function checkStars(x,y){
  if(x.rating === 1){
    y.textContent = `⭐ ☆ ☆ ☆ ☆`;
  } else if(x.rating === 2){
    y.textContent = `⭐ ⭐ ☆ ☆ ☆ `;
  } else if(x.rating === 3){
    y.textContent = `⭐ ⭐ ⭐ ☆ ☆`;
  } else if(x.rating === 4){
    y.textContent = `⭐ ⭐ ⭐ ⭐ ☆`;
  } else if(x.rating === 5){
    y.textContent = `⭐ ⭐ ⭐ ⭐ ⭐`;
  }
}