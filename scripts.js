// Загружаем JSON с приложениями
fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const appList = document.getElementById('app-list');

    data.forEach(app => {
      // Создаем контейнер для приложения
      const appDiv = document.createElement('div');
      appDiv.classList.add('app');

      // Добавляем иконку приложения
      const appIcon = document.createElement('img');
      appIcon.src = app.icon;
      appIcon.alt = `${app.name} icon`;
      appDiv.appendChild(appIcon);

      // Добавляем детали приложения
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

      // Добавляем кнопку скачивания
      const downloadButton = document.createElement('button');
      downloadButton.textContent = 'Скачать';
      downloadButton.onclick = () => window.open(app.downloadLink, '_blank');
      appDiv.appendChild(downloadButton);

      // Добавляем приложение в список
      appList.appendChild(appDiv);
    });
  })
  .catch(error => console.error('Ошибка при загрузке приложений:', error));
