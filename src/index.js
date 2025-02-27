const ramenMenu = {};

const selectRamen = (ramen) => { 
  const detailImage = document.getElementsByClassName('detail-image')[0];
  const detailName = document.getElementsByClassName('name')[0];
  const detailRestaurant = document.getElementsByClassName('restaurant')[0];
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');
  const editRating = document.getElementById('edit-rating');
  const editComment = document.getElementById('edit-comment');

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
  editRating.value = ramen.rating; 
  editComment.value = ramen.comment; 

  document.getElementById('edit-ramen').dataset.id = ramen.id;
  ramenMenu[ramen.id] = ramen;
};

const addRamen = (ramen) => {
  const ramenMenuDiv = document.getElementById('ramen-menu');
  const img = document.createElement('img');

  img.src = ramen.image;
  img.alt = ramen.name;
  ramenMenuDiv.appendChild(img);

  ramenMenu[ramen.id] = ramen;

  img.addEventListener('click', () => {
    selectRamen(ramenMenu[ramen.id]); 
  });
};

const addClickListener = () => {
  const createButton = document.getElementById('submit-button');

  createButton.addEventListener('click', () => {
    const ramen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ramen),
    })
    .then(response => response.json())
    .then(newRamen => {
      addRamen(newRamen);
      if (Object.keys(ramenMenu).length === 1) {
        selectRamen(newRamen); 
      }
    });

    document.getElementById('new-ramen').reset();
  });
};

const addEditListener = () => {
  const editButton = document.querySelector('#edit-ramen input[type="submit"]');

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const editForm = document.getElementById('edit-ramen');
    const ramenId = editForm.dataset.id;
    const updatedData = {
      rating: document.getElementById('edit-rating').value,
      comment: document.getElementById('edit-comment').value,
    };

    fetch(`http://localhost:3000/ramens/${ramenId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(updatedRamen => {
      ramenMenu[ramenId] = { ...ramenMenu[ramenId], ...updatedData };
      selectRamen(ramenMenu[ramenId]);
    });
  });
};

const addDeleteListener = () => {
  const deleteButton = document.getElementById('delete-ramen');

  deleteButton.addEventListener('click', () => {
    const ramenId = document.getElementById('edit-ramen').dataset.id;

    fetch(`http://localhost:3000/ramens/${ramenId}`, {
      method: 'DELETE',
    })
    .then(() => {
      const ramenMenuDiv = document.getElementById('ramen-menu');
      const ramenMenuImages = ramenMenuDiv.getElementsByTagName('img');

      for (let img of ramenMenuImages) {
        if (img.src === document.getElementsByClassName('detail-image')[0].src) {
          img.remove();
          break;
        }
      }

      delete ramenMenu[ramenId]; 

      const ramenIds = Object.keys(ramenMenu);
      if (ramenIds.length > 0) {
        selectRamen(ramenMenu[ramenIds[0]]);
      }
    });
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(results => {
      results.forEach((ramen, index) => {
        addRamen(ramen);
        ramenMenu[ramen.id] = ramen; 
        if (index === 0) { selectRamen(ramen); } 
      });
    });
};

const main = () => {
  displayRamens();
  addClickListener();
  addEditListener();
  addDeleteListener();
};

window.addEventListener('load', main);