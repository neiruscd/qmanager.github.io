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
        const matchesSearch =
          app.name.toLowerCase().includes(searchTerm);
        return matchesType && matchesCategory && matchesSearch;
      });

      if (filteredApps.length === 0) {
        appList.innerHTML = '<p>Приложений не найдено</p>';
        return;
      }

      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appHeader = document.createElement('div');
        appHeader.classList.add('app-header');

        const glassContainer = document.createElement('div');
        glassContainer.classList.add('glass-container');
        
        // const appVersion = document.createElement('p');
        // appVersion.classList.add('version');
        // appVersion.textContent = app.version;
        
        const appIcon = document.createElement('img');
        appIcon.src = app.icon || 'https://via.placeholder.com/50';
        appIcon.alt = `${app.name} icon`;
        glassContainer.appendChild(appIcon);

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container')
        
        const appTitle = document.createElement('h2');
        appTitle.textContent = app.name;
        // appHeader.appendChild(appTitle);
        glassContainer.appendChild(titleContainer);

        const appVersion = document.createElement('p');
        appVersion.classList.add('version');
        appVersion.textContent = app.version;
        titleContainer.appendChild(appVersion);
        glassContainer.appendChild(appVersion);

        appHeader.appendChild(titleContainer);

        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');
        appDetails.appendChild(appHeader);
        // appDetails.appendChild(titleContainer);
        
        const appDescription = document.createElement('p');
        appDescription.classList.add('app-description'); // Добавляем уникальный класс
        appDescription.textContent = app.description;
        appDetails.appendChild(appDescription);

        appDiv.appendChild(glassContainer);

        const appMetaContainer = document.createElement('div');
        appMetaContainer.classList.add('app-meta-container');

        const appType = document.createElement('span');
        appType.classList.add('app-meta', 'app-type', app.type);
        appType.textContent = `Тип файла: ${app.type.toUpperCase()}`;
        appMetaContainer.appendChild(appType);

        const appAuthor = document.createElement('span');
        appAuthor.classList.add('app-meta', 'app-author');
        if (app.author) {
          const authorLink = document.createElement('a');
          authorLink.href = `#`; // Здесь можно добавить ссылку, если нужно
          authorLink.textContent = `Автор : ${app.author}`;
          authorLink.style.textDecoration = 'none';
          authorLink.style.color = 'inherit';
          appAuthor.appendChild(authorLink);
        } else {
          appAuthor.textContent = `Автор : неизвестен`;
        }
          appMetaContainer.appendChild(appAuthor);

        if (app.label) {
          const appLabel = document.createElement('span');
          appLabel.classList.add('app-meta', 'app-label' , app.label);
          appLabel.textContent =
            app.label === 'new' ? '🔥 Новинка' : app.label === 'update' ? '🔄 Обновление' : '';
          appMetaContainer.appendChild(appLabel);
        }
        
        appDetails.appendChild(appMetaContainer);
// конец нового блока 
        
        appDiv.appendChild(appDetails);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Скачать';
        downloadButton.classList.add('download-btn');
        downloadButton.onclick = () => window.open(app.downloadLink, '_blank');
        appHeader.appendChild(downloadButton);
        glassContainer.appendChild(downloadButton);

        appList.appendChild(appDiv);
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentType = button.id === 'show-all' ? 'all' : button.id === 'show-ipa' ? 'ipa' : 'apk';
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
