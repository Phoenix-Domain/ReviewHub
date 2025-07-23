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
const imgStatusMsg = document.querySelector('#imgStatusMsg')

let currentImageData = null;

let clientArray = getClient() || [];

clientArray.forEach(card => createCard(card));



submitBtn.addEventListener('click', e => {
  e.preventDefault();
  const nameVal = name.value.trim();
  const reviewVal = review.value.trim();
  let ratingVal;
  
  ratings.forEach(rating => {
    if(rating.id === "terrible" && rating.checked){
      return ratingVal = 1;
    } else if(rating.id === "poor" && rating.checked){
      return ratingVal = 2;
    } else if(rating.id === "good" && rating.checked){
      return ratingVal = 3;
    } else if(rating.id === "veryGood" && rating.checked){
      return ratingVal = 4;
    } else if(rating.id === "excellent" && rating.checked){
      return ratingVal = 5;
    }
  })

  let client = new MakeClient(nameVal,reviewVal,ratingVal,currentImageData);

  clientArray.push(client);
  saveClient(clientArray);

  createCard(client);

  name.value ="";
  review.value = "";
  image.value = "";
  currentImageData = null;
  imgDisplay.classList.add('hidden');
  displayBox.classList.add('hidden');
  ratings.forEach(rating => rating.checked = false);
});

image.addEventListener('change', e => {
  const file = e.target.files[0]; //Get the selected file

  if(file){
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
    currentImageData = null;
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

  clientRating.textContent = `Rating: ${x.rating}`;

  if(x.image){
    const clientImage = document.createElement('img');
    clientImage.src = x.image;
    clientImage.alt = `${x.name}'s image`;
    clientImage.classList.add('w-16', 'h-16', 'rounded-full', 'mx-auto', 'mb-2', 'object-cover');
    clientCard.append(clientImage);
  }

  clientCard.append(clientReview,clientName,clientRating, delRating);
  clientCard.classList.add('bg-purple-300','w-fit', 'my-3', 'p-4','m-auto','rounded-lg','shadow-lg');

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
