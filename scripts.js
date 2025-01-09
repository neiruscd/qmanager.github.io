fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryElements = document.querySelectorAll('.category');
    const resetButton = document.getElementById('reset-filters');
    const searchBar = document.getElementById('search-bar');
    let currentType = 'all';
    let currentCategory = 'all';

    function displayApps() {
      const searchTerm = searchBar.value.toLowerCase();
      appList.innerHTML = '';

      const filteredApps = data.filter(app => {
        const matchesType = currentType === 'all' || app.type === currentType;
        const matchesCategory =
          currentCategory === 'all' || app.category === currentCategory;
        const matchesSearch = app.name.toLowerCase().includes(searchTerm);
        return matchesType && matchesCategory && matchesSearch;
      });

      if (filteredApps.length === 0) {
        appList.innerHTML = '<p>Приложений не найдено</p>';
        return;
      }

      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appIcon = document.createElement('img');
        appIcon.src = app.icon || 'https://via.placeholder.com/50';
        appIcon.alt = `${app.name} icon`;
        appDiv.appendChild(appIcon);

        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');

        const appTitle = document.createElement('h2');
        appTitle.textContent = app.name;

        if (app.label) {
          const labelSpan = document.createElement('span');
          labelSpan.textContent =
            app.label === 'new'
              ? '🔥 Новинка'
              : app.label === 'update'
              ? '🔄 Обновление'
              : '';
          labelSpan.style.marginLeft = '8px';
          labelSpan.style.fontStyle = 'italic';
          appTitle.appendChild(labelSpan);
        }

        appDetails.appendChild(appTitle);

        const appVersion = document.createElement('p');
        appVersion.classList.add('version');
        appVersion.textContent =.name.toLowerCase().includes(searchTerm);
        return matchesT
        appDetails.appendChild(appVersion);

        const appDescription = document.createElement('p');
        appDescription.textContent = app.description;
        appDetails.appendChild(appDescription);

        appDiv.appendChild(appDetails);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Скачать';
        downloadButton.onclick = () => window.open(app.downloadLink, '_blank');
        appDiv.appendChild(downloadButton);

        appList.appendChild(appDiv);
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentType =
          button.id === 'show-all' ? 'all' : button.id === 'show-ipa' ? 'ipa' : 'apk';
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayApps();
      });
    });

    categoryElements.forEach(category => {
      category.addEventListener('click', () => {
        currentCategory = category.dataset.category;
        categoryElements.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');
        displayApps();
      });
    });

    resetButton.addEventListener('click', () => {
      currentType = 'all';
      currentCategory = 'all';
      searchBar.value = '';
      filterButtons.forEach(btn => btn.classList.remove('active'));
      document.getElementById('show-all').classList.add('active');
      categoryElements.forEach(cat => cat.classList.remove('active'));
      displayApps();
    });

    searchBar.addEventListener('input', displayApps);

    displayApps();
  })
  .catch(error => console.error('Ошибка при загрузке приложений:', error));
