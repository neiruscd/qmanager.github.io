// Загружаем JSON с приложениями
fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');
    const categoryElements = document.querySelectorAll('.category');
    let currentFilter = { type: 'all', category: 'all' }; // Текущий фильтр

    // Функция отображения приложений
    function displayApps(filter) {
      appList.innerHTML = ''; // Очищаем список приложений

      const filteredApps = data.filter(app => {
        const matchesType =
          filter.type === 'all' || app.type === filter.type;
        const matchesCategory =
          filter.category === 'all' || app.category === filter.category;

        return matchesType && matchesCategory;
      });

      if (filteredApps.length === 0) {
        appList.innerHTML = '<p>Приложений не найдено</p>';
        return;
      }

      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt = `${app.name} icon`;
        appDiv.appendChild(appIcon);

        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');

        const appTitle = document.createElement('h2');
        appTitle.textContent = app.name;
        appDetails.appendChild(appTitle);

        const appVersion = document.createElement('p');
        appVersion.classList.add('version');
        appVersion.textContent = app.version;
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

    // Обработчик клика на хэштег
    categoryElements.forEach(categoryElement => {
      categoryElement.addEventListener('click', () => {
        const type = categoryElement.dataset.type || 'all';
        const category = categoryElement.dataset.category || 'all';

        currentFilter = { type, category };

        // Убираем активный класс у всех хэштегов
        categoryElements.forEach(el => el.classList.remove('active'));
        // Добавляем активный класс текущему хэштегу
        categoryElement.classList.add('active');

        displayApps(currentFilter);
      });
    });

    // Поиск приложений
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', e => {
      const searchString = e.target.value.toLowerCase();

      const filteredApps = data.filter(app => {
        const matchesType =
          currentFilter.type === 'all' || app.type === currentFilter.type;
        const matchesCategory =
          currentFilter.category === 'all' || app.category === currentFilter.category;
        const matchesSearch =
          app.name.toLowerCase().includes(searchString) ||
          app.description.toLowerCase().includes(searchString);

        return matchesType && matchesCategory && matchesSearch;
      });

      appList.innerHTML = '';
      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt =active'));
        /
        appDiv.appendChild(appIcon);

        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');

        const appTitle = document.createElement('h2');
        appTitle.textContent = app.name;
        appDetails.appendChild(appTitle);

        const appVersion = document.createElement('p');
        appVersion.classList.add('version');
        appVersion.textContent = app.version;
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
    });

    // Изначально отображаем все приложения
    displayApps(currentFilter);
  })
  .catch(error => console.error('Ошибка при загрузке приложений:', error));
