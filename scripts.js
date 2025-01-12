fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryElements = document.querySelectorAll('.category');
    const resetButton = document.getElementById('reset-filters');
    const searchBar = document.getElementById('search-bar');
    const categoriesToggle = document.getElementById('categories-toggle');
    const labelsToggle = document.getElementById('labels-toggle');
    let currentLabel = null; // Переменная для фильтрации по лейблу
    let currentType = 'all';
    let currentCategory = 'all';

   categoriesToggle.addEventListener('change', () => {
     if (categoriesToggle.checked) {
       currentCategory = 'all'; // Показываем все категории
       currentLabel = null; // Сбрасываем лейблы
       displayApps();
       }
     });

    labelsToggle.addEventListener('change', () => {
     if (labelsToggle.checked) {
      currentCategory = 'all'; // Убираем категории
      currentLabel = 'new,update'; // Показываем новинки и обновления
    displayApps();
    }
    });

    // Функция для генерации случайного числа в заданном диапазоне
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Функция для генерации случайного цвета
function getRandomColor() {
  const colors = [
    "rgba(30, 60, 100, 0.5)",
    "rgba(100, 50, 150, 0.6)",
    "rgba(50, 150, 100, 0.7)",
    "rgba(150, 50, 50, 0.6)"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Функция для создания вспышки
function createGlow() {
  const glow = document.createElement("div");
  glow.classList.add("glow");

  // Генерация случайного размера
  const size = getRandom(200, 500);
  glow.style.width = `${size}px`;
  glow.style.height = `${size}px`;

  // Генерация случайной позиции
  glow.style.top = `${getRandom(-30, 120)}%`; // Позиция по вертикали
  glow.style.left = `${getRandom(-30, 130)}%`; // Позиция по горизонтали

  // Установка случайного цвета
  glow.style.backgroundColor = getRandomColor();

  // Установка случайной скорости анимации
  const duration = getRandom(25, 50);
  glow.style.animationDuration = `${duration}s`;

  return glow;
}

// Функция для добавления вспышек в DOM
function initGlows() {
  const header = document.querySelector("header");

  // Количество вспышек
  const glowCount = 5;

  for (let i = 0; i < glowCount; i++) {
    const glow = createGlow();
    header.appendChild(glow);
  }
}

// Инициализация вспышек при загрузке страницы
window.onload = initGlows;

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
