async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        'Network response unsuccessful fetching JSON data. Check the URL or file path, and please try again.'
      );
    }
    return response.json();
  }
  
  // Organize + Display the JSON data as cards on the DOM
  function renderCards(data) {
    const cardsHtml = data.cards
      ?.map(
        (card) => `
      <div class="card"> 
        <img src="${card.image}" alt="${card.title}" />
        <div class="card-info"> 
          <h2>${card.title}</h2> 
          <p>${card.body}</p> 
          <span> ${card.links.map((link) => `<a href="${link.href}" aria-label="Go to ${link.text}">${link.text}</a>`).join('')} </span>
        </div> 
      </div>
      `
      )
      // Combine array of card elements into a single string
      .join('');
    cardWrapper.innerHTML = cardsHtml;
  }
  
  // Return fetchData() + renderCards() as a single function
  async function fetchDataAndRender() {
    try {
      const data = await fetchData('data.json');
      renderCards(data);
    } catch (e) {
      console.error('Error:', e.message);
      if (cardWrapper.innerHTML === '') {
        cardWrapper.innerHTML =
          'Oops, sorry! Looks like there was an error loading the data. Please try again.';
      }
    }
  }
  const cardWrapper = document.querySelector('.card-wrapper');
  
  // Render the cards on page load
  fetchDataAndRender();