// Установка текущего времени
function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// Загрузка JSON с приложениями
fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    let currentType = 'ipa'; // По умолчанию отображаем IPA
    const appList = document.getElementById('app-list');
    const ipaButton = document.getElementById('show-ipa');
    const apkButton = document.getElementById('show-apk');

    // Фильтрация по типу файла
    function displayApps(type) {
      appList.innerHTML = '';
      data
        .filter(app => app.type === type)
        .forEach(app => {
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

    // Смена типа файлов
    ipaButton.addEventListener('click', () => {
      currentType = 'ipa';
      ipaButton.classList.add('active');
      apkButton.classList.remove('active');
      displayApps('ipa');
    });

    apkButton.addEventListener('click', () => {
      currentType = 'apk';
      apkButton.classList.add('active');
      ipaButton.classList.remove('active');
      displayApps('apk');
    });

    // Изначально отображаем IPA
    displayApps(currentType);

    // Поиск
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', e => {
      const searchString = e.target.value.toLowerCase();
      const filteredApps = data.filter(app =>
        (app.type === currentType) &&
        (app.name.toLowerCase().includes(searchString) || app.description.toLowerCase().includes(searchString))
      );
      appList.innerHTML = '';
      filteredApps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appIcon = document.createElement('img');
        appIcon.src = app.icon;
        appIcon.alt =;
      ipaButton.cl
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
  })
  .catch(error => console.error('Ошибка при загрузке приложений:', error));
