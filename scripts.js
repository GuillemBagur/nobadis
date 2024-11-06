const selects = document.getElementsByClassName('select');
    const btn = document.getElementById('btn');
    const btnContainer = document.getElementById('btn-container');
    const container = document.getElementById('container');
    const liquidsContainer = document.getElementById('liquids-container');
    const portal = document.getElementById('portal');
    const mainBubbles = document.getElementsByClassName('main-bubble');
    const pickedPortal = document.getElementById('picked-portal');
    const liquidRows = document.getElementsByClassName('liquid-row');
    const ldTheme = document.getElementById('ld-theme');
    const historyContainer = document.getElementById('history-container');
    const history = document.getElementById('history');

    let webUrl;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const deleteSearch = index =>{
      let storedData = JSON.parse(localStorage.getItem('no-badis')) ?? {};
      let history = storedData['history'] ?? [];
      console.log(history, index);
      delete history[index];
      history = history.filter(el => el);
      storedData['history'] = history;
      localStorage.setItem('no-badis', JSON.stringify(storedData));
      loadHistory();
    }


    const loadHistory = () =>{
      const localHistory = JSON.parse(localStorage.getItem('no-badis'))['history'] ?? [];
      history.innerHTML = '';
      for(let search of localHistory){
        history.innerHTML += `<li class="history-search"><a class="white" target="blank" href="${search['url']}">${search['query']}</a><a class="delete-search-btn" onclick="deleteSearch(${localHistory.indexOf(search)})"><i class="icofont-close"></i></a></li>`;
      }
    }

    const toggleHistory = () =>{
      historyContainer.classList.toggle('height-0');
    }

    const links = {
      'YouTube':'https://www.youtube.com/results?search_query=',
      'Twitter':'https://twitter.com/search?src=typed_query&q=',
      'Pinterest':'https://www.Pinterest.es/search/Pinterests/?rs=typed&q='
    };

    const icons = {
      'YouTube':'ui-play',
      'Twitter':'twitter',
      'Pinterest':'pinterest'
    };

    const iconColors = {
      'YouTube':'#FF0000',
      'Twitter':'#1DA1F2',
      'Pinterest':'#E60023'
    };

    const saveHistory = () =>{
      let query = document.getElementById('query').value;
      const search = {
        'query':query,
        'url':links[portal.value]+query.split(' ').join('+')
      };

      let storedData = JSON.parse(localStorage.getItem('no-badis')) ?? {};
      let history = storedData['history'] ?? [];
      history.unshift(search);
      storedData['history'] = history;
      localStorage.setItem('no-badis', JSON.stringify(storedData));
    }

    const loadStoredPrefs = () =>{
      let storedData = JSON.parse(localStorage.getItem('no-badis')) ?? {};
      if(storedData['theme']){
        ldTheme.classList.add('checked');
      }else{
        ldTheme.classList.remove('checked');
      }
      
      changeTheme();
      let savedPortal = storedData['portal'] ?? 'YouTube';
      changePortalVal(savedPortal);
    }

    const changeTheme = () =>{
      if(ldTheme.classList.contains('checked')){
        document.body.style.backgroundColor = 'rgba(0, 0, 0, .87)';
      }else{
        document.body.style.backgroundColor = 'rgba(255, 255, 255, .87)'
      }

      let storedData = JSON.parse(localStorage.getItem('no-badis')) ?? {};
      storedData['theme'] = ldTheme.classList.contains('checked');
      localStorage.setItem('no-badis', JSON.stringify(storedData));
    }

    const savePortal = () =>{
      let storedData = JSON.parse(localStorage.getItem('no-badis')) ?? {};
      storedData['portal'] = portal.value;
      localStorage.setItem('no-badis', JSON.stringify(storedData));
    }

    const activeSelect = el =>{
        el.focus();
    }

    const toggleChecked = el =>{
      const id = el.id;
      const checkbox = document.getElementsByName(id)[0];
      checkbox.checked = !checkbox.checked;
      el.classList.toggle('checked');
    }

    

    ldTheme.addEventListener('click', changeTheme);

    async function changeIcon(){
      const icon = `icofont-${icons[portal.value]}`;
      const color = iconColors[portal.value];
      const bgIcon = document.getElementById('background-icon');
      bgIcon.classList = [];
      bgIcon.classList.add(icon);
      
      for(let bubble of mainBubbles){
        bubble.style.backgroundColor = color;
      }

      liquidsContainer.classList.add('active');
      for(let row of liquidRows){
        row.style.backgroundColor = color;
      }
      await sleep(500);
      container.style.backgroundColor = color;
      liquidsContainer.classList.remove('active');
    }

    const updateQuery = () =>{
      changeIcon();
      let query = document.getElementById('query').value;
      if(query == ""){
        btnContainer.classList.add('disabled');
      }else{
        btnContainer.classList.remove('disabled');
        console.log(query)
        btn.href = links[portal.value]+query.split(' ').join('+');
        webUrl = links[portal.value]+query.split(' ').join('+');
      }
    }

    const changePortalVal = val =>{
      portal.value = val;
      if(!val){
        val = 'YouTube';
      }else{
        savePortal();
      }
      pickedPortal.innerHTML = val;
      for(let select of selects){
        select.blur();
      }
      updateQuery();
    }

    btn.addEventListener('click', saveHistory);

    query.addEventListener('change', updateQuery);
    query.addEventListener('keypress', updateQuery);
    document.addEventListener('DOMContentLoaded', ()=>{
      loadStoredPrefs();
    });