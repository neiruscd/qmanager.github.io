// Загружаем JSON с приложениями
fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryElements = document.querySelectorAll('.category');
    let currentType = 'all'; // По умолчанию показываем все типы
    let currentCategory = 'all'; // По умолчанию показываем все категории

    // Функция отображения приложений
    function displayApps() {
      appList.innerHTML = ''; // Очищаем список приложений

      const filteredApps = data.filter(app => {
        const matchesType = currentType === 'all' || app.type === currentType;
        const matchesCategory =
          currentCategory === 'all' || app.category === currentCategory;
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
        appIcon.src = app.icon || 'https://via.placeholder.com/50';
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

    // Обработчик для кнопок iOS и Android
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentType = button.id === 'show-ipa' ? 'ipa' : 'apk';

        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');

        displayApps();
      });
    });

    // Обработчик для хэштегов
    categoryElements.forEach(category => {
      category.addEventListener('click', () => {
        currentCategory = category.dataset.category;

        // Убираем активный класс у всех категорий
        categoryElements.forEach(cat => cat.classList.remove('active'));
        // Добавляем активный класс нажатому хэштегу
        category.classList.add('active');

        displayApps();
      });
    });

    // Изначально отображаем все приложения
    displayApps();
  })
  .catch(error => console.error('Ошибка при загрузке приложений:', error));
