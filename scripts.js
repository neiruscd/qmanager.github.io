fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryElements = document.querySelectorAll('.category');
    const resetButton = document.getElementById('reset-filters');
    const searchBar = document.getElementById('search-bar');
    const toggleCategories = document.getElementById('toggle-categories');
    const toggleLabels = document.getElementById('toggle-labels');
    let currentLabel = null; // Переменная для фильтрации по лейблу
    let currentType = 'all';
    let currentCategory = 'all';

toggleCategories.addEventListener('change', () => {
  if (toggleCategories.checked) {
    currentCategory = 'all';
    currentLabel = null; // Убираем фильтр по лейблу
    displayApps();
  }
});

toggleLabels.addEventListener('change', () => {
  if (toggleLabels.checked) {
    currentCategory = 'all'; // Убираем категорию
    currentLabel = 'new,update'; // Устанавливаем фильтр по лейблу
    displayApps();
  }
});


    function displayApps() {
      const searchTerm = searchBar.value.toLowerCase();
      appList.innerHTML = '';

const filteredApps = data.filter(app => {
  const matchesType = currentType === 'all' || app.type === currentType;

  // Проверка на совпадение категории
  const matchesCategory =
    currentCategory === 'all' || app.category.split(',').includes(currentCategory);

  // Проверка на совпадение лейбла
  const matchesLabel =
    !currentLabel || currentLabel.split(',').includes(app.label);

  const matchesSearch = app.name.toLowerCase().includes(searchTerm);

  return matchesType && matchesCategory && matchesLabel && matchesSearch;
});

      if (filteredApps.length === 0) {
        appList.innerHTML = '<p>Приложений не найдено</p>';
        return;
      }

      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        // Создаем стеклянный контейнер
        const glassContainer = document.createElement('div');
        glassContainer.classList.add('glass-container');

        // Иконка приложения
        const appIcon = document.createElement('img');
        appIcon.src = app.icon || 'https://via.placeholder.com/50';
        appIcon.alt = `${app.name} icon`;
        glassContainer.appendChild(appIcon);

        // Контейнер для текста (заголовок и версия)
        const textContainer = document.createElement('div');
        textContainer.classList.add('glass-text-container');

        const appTitle = document.createElement('h2');
        appTitle.textContent = app.name;
        textContainer.appendChild(appTitle);

        const appVersion = document.createElement('p');
        appVersion.classList.add('version');
        appVersion.textContent = app.version;
        textContainer.appendChild(appVersion);

        glassContainer.appendChild(textContainer);

        // Кнопка скачать
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Скачать';
        downloadButton.classList.add('download-btn');
        downloadButton.onclick = () => window.open(app.downloadLink, '_blank');
        glassContainer.appendChild(downloadButton);

        // Добавляем стеклянный контейнер в карточку
        appDiv.appendChild(glassContainer);

        // Подробности приложения
        const appDetails = document.createElement('div');
        appDetails.classList.add('app-details');

        const appDescription = document.createElement('p');
        appDescription.classList.add('app-description');
        appDescription.textContent = app.description;
        appDetails.appendChild(appDescription);

        const appMetaContainer = document.createElement('div');
        appMetaContainer.classList.add('app-meta-container');

        const appType = document.createElement('span');
        appType.classList.add('app-meta', 'app-type', app.type);
        appType.textContent = `Тип файла: ${app.type.toUpperCase()}`;
        appMetaContainer.appendChild(appType);

// Добавляем автора как обычный текст
       const appAuthor = document.createElement('span');
       appAuthor.classList.add('app-meta', 'app-author');

// Проверяем, указан ли автор
       if (app.author) {
         appAuthor.textContent = `Автор: ${app.author}`;
       } else {
         appAuthor.textContent = `Автор неизвестен`;
         appAuthor.classList.add('unknown'); // Добавляем стиль для неизвестного автора
       }

       appMetaContainer.appendChild(appAuthor);

        if (app.label) {
          const appLabel = document.createElement('span');
          appLabel.classList.add('app-meta', 'app-label', app.label);
          appLabel.textContent =
            app.label === 'new' ? '🔥 Новинка' : app.label === 'update' ? '🔄 Обновление' : '';
          appMetaContainer.appendChild(appLabel);
        }

        appDetails.appendChild(appMetaContainer);
        appDiv.appendChild(appDetails);

        // Добавляем карточку приложения в список
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
    // Убираем активность со всех категорий
    categoryElements.forEach(cat => cat.classList.remove('active'));

    // Устанавливаем активность только на выбранной категории
    category.classList.add('active');

    // Обновляем текущую категорию
    currentCategory = category.dataset.category;

    // Если выбрана "все", сбрасываем категорию
    if (currentCategory === 'all') {
      currentCategory = 'all';
    }

    displayApps(); // Обновляем список приложений
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
