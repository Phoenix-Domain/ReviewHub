import './style.css';

class MakeClient{
  constructor(name,review,rating){
    this.name = name;
    this.review = review;
    this.rating = rating;
  }
}


const name = document.querySelector('#name');
const review = document.querySelector('#review');
const image = document.querySelector('#image');
const ratings = document.querySelectorAll('.ratings');
const testimonials = document.querySelector('#testimonials');
const submitBtn = document.querySelector('#submitBtn');


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

  let client = new MakeClient(nameVal,reviewVal,ratingVal)
  console.log(client)
})
