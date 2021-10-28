const LoginWeb = {
  id: "login",
  title: "Авторизация пользователя",
  render: (className = "container") => {
    return `
      <section class="${className}">
        <h3 class="user__content">Дорогой пользователь, введите ваши данные!</h3>
        <main class="modal__content">
          <div class="form-field">
            <label for="user-name">Ваше имя:</label>
            <input type="text" id="user-name" class="input__default" value="Sasha">
          </div>
          <div class="form-field">
            <label>Дата последней сигареты:</label>
            <input type="date" id="user-date-last" class="input__date-last"><br>
            <label>Среднее количество сигарет в день, шт.:</label>
            <input type="number" id="user-num-cigarette" class="input__num-cigarette" value="15"><br>
            <label>Стоимость одной пачки, руб.:</label>
            <input type="number" id="user-cost-cigarette" class="input__cost-cigarette" value="4"><br>
            <label>Количество сигарет в пачке, шт.:</label>
            <input type="number" id="num-cigarette-block" class="input__cigarette-block" value="20"><br>
            <h4 id="valid-value"></h4>
          </div>
        </main>
        <footer class="modal__footer">
          <button id="btn-save" class="data__save">Сохранить</button>
        </footer>
      </section>
    `;
  }
};


const Options = {
  id: "login",
  title: "Настройки пользователя",
  render: (className = "container", {userName, userNumCigarette, userCostCigarette, userDate, cigarettesInBlock}) => {
    return `
      <section class="${className}">
        <h3 class="user__content">Изменить данные пользователя:</h3>
        <main class="modal__content">
          <div class="form-field">
            <label for="user-name">Ваше имя:</label>
            <input type="text" id="user-name" class="input__default" value="${userName}">
          </div>
          <div class="form-field">
            <label>Дата последней сигареты:</label>
            <input type="date" id="user-date-last" class="input__date-last" value="${userDate}"><br>
            <label>Среднее количество сигарет в день, шт.:</label>
            <input type="number" id="user-num-cigarette" class="input__num-cigarette" value="${userNumCigarette}"><br>
            <label>Стоимость одной пачки, руб.:</label>
            <input type="number" id="user-cost-cigarette" class="input__cost-cigarette" value="${userCostCigarette}"><br>
            <label>Количество сигарет в пачке, шт.:</label>
            <input type="number" id="cigarette-in-block" class="input__cigarette-block" value="${cigarettesInBlock}"><br>
            <h4 id="valid-value"></h4>
          </div>
        </main>
        <footer class="modal__footer">
          <button id="btn-save" class="data__save">Изменить</button>
          <button id="btn-delete" class="data__delete">Выйти</button>
        </footer>
      </section>
    `;
  }
};


const Statistics = {
  id: "statistics",
  title: "Основная статистика",
  render: (className = "container", {userName}) => {
    return `
      <section class="${className}">
        <h2>Отлично держитесь, ${userName}:</h2>
        <p class="sum__time__stop"></p>
        <p class="num__cigarette"></p>
        <p class="num__money"></p>
        <p class="free__time"></p>
      </section>
    `;
  }
};


const Health = {
  id: "health",
  title: "Состояние здоровья пользователя",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h2>Состояние здоровья и самочувствие:</h2>
        <p class="state__heart"><strong>Сердце:</strong> <span class="description">пульс уменьшается..</span><span class="percent"></span>%</p>
        <p class="state__carbonMonoxide"><strong>Угарный газ:</strong> выводится из организма..<span class="percent"></span>%</p>
        <p class="state__nicotine"><strong>Никотин:</strong> обогощение кислородом..<span class="percent"></span>%</p>
        <p class="state__lung"><strong>Работа легких:</strong> <span class="description">становится легче дышать..</span><span class="percent"></span>%</p>
        <p class="state__liver"><strong>Работа печени:</strong> восстанавливаются клетки..<span class="percent"></span>%</p>
        <p class="state__risk__heart"><strong>Риск сердечного приступа:</strong> <span class="description">риск снижается..</span><span class="percent"></span>%</p>
      </section>
    `;
  }
};


const Motivation = {
  id: "motivation",
  title: "Мотивация и поддержка",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h2>Контакты</h2>
        <p>Ну а тут классически будет страница <strong>Контакты</strong>.</p>
      </section>
    `;
  }
};


const ErrorPage = {
  id: "error",
  title: "warning",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h2>Ошибка 404</h2>
        <p>Страница не найдена, попробуйте вернуться на <a href="#statistics">главную</a>.</p>
      </section>
    `;
  }
};


const AuthorPage = {
  id: "authorization",
  title: "Требуется авторизация",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <h2>Необходима авторизация пользователя!</h2>
        <p>Перейдите в раздел <a href="#login">Настройки</a>.</p>
      </section>
    `;
  }
};