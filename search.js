const resultsContainer = document.getElementById('results');

const scrape = () => {
    if (!webUrl) {
      return;
    }
  

    $.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(webUrl), function(data) {
        let webToScrape = document.createElement('html');
      let allEls = webToScrape.getElementsByTagName("ytd-video-renderer");
  
      // Creating a list to put inside all the elements that we want
      let textEls = [];
      for(let el of allEls){
        resultsContainer.innerHTML += el;
      }
    });
  }
  