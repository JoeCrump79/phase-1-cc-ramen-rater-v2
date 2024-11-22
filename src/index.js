// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.getElementsByClassName('detail-image')[0];
  const detailName = document.getElementsByClassName('name')[0];
  const detailRestaurant = document.getElementsByClassName('restaurant')[0];
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen')
  ramenForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const ramen = {

      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    }
    console.log(ramen)
    ramenForm.reset()
    const ramenMenuDiv = document.getElementById('ramen-menu')
    const img = document.createElement('img');
    console.log(img)
    img.src = ramen.image
    ramenMenuDiv.appendChild(img)
    img.addEventListener('click', (event) => {
      console.log(event)
      handleClick(ramen)
      console.log('handleClick')
      event.preventDefault()
    })
  })
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => {
      console.log(response)
      if (!response.ok) {
        console.log(response.status)
      }

      return response.json()
    })
    .then(results => {
      const ramenMenuDiv = document.getElementById('ramen-menu')
      results.forEach((ramen, index) => {
        const img = document.createElement('img');
        console.log(img)
        img.src = ramen.image
        ramenMenuDiv.appendChild(img)
        img.addEventListener('click', (event) => {
          console.log(event)
          handleClick(ramen)
          console.log('handleClick')
          event.preventDefault()
        })
        if (index === 0) { handleClick(ramen) }
      }

      )

    })
};

const main = () => {
  console.log('main function called')
  displayRamens();
  addSubmitListener();
};

window.addEventListener('load', main)

//main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
