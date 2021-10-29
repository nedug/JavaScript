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
        <div class="state__wrap wrap__less">
           <p><strong>Вы уже не курите</strong></p>
           <i class="fas fa-smoking-ban"></i>
           <p class="sum__time__stop"></p>
           <i class="fas fa-angle-double-down"></i>
           
           <p class="more__info">дополнительная инфа</p>
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Не выкурено сигарет</strong></p>
           <i class="fas fa-smoking"></i>
           <p class="num__cigarette"></p>
           <i class="fas fa-angle-double-down"></i>
           
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Сэкономлено средств</strong></p>
           <i class="fas fa-ruble-sign"></i>
           <p class="num__money"></p>
           <i class="fas fa-angle-double-down"></i>
           
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Сэкономлено времени</strong></p>
           <i class="fas fa-clock"></i>
           <p class="free__time"></p>
           <i class="fas fa-angle-double-down"></i>
           
        </div>        
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
        <div class="state__wrap">
           <p class="state__heart"><strong>Сердце</strong><i class="fas fa-heartbeat"></i><br><span class="description"></p>
           <p class="state__heart__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__carbonMonoxide"><strong>Угарный газ</strong><i class="fas fa-bong"></i></i><br><span class="description"></p>
           <p class="state__carbonMonoxide__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__nicotine"><strong>Никотин</strong><i class="fas fa-smoking"></i><br><span class="description"></p>
           <p class="state__nicotine__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__smell"><strong>Обоняние и вкус</strong><i class="fas fa-air-freshener"></i><br><span class="description"></p>
           <p class="state__smell__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__lung"><strong>Работа легких</strong><i class="fas fa-lungs"></i><br><span class="description"></p>
           <p class="state__lung__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__liver"><strong>Работа печени</strong><i class="fas fa-mercury"></i><br><span class="description"></p>
           <p class="state__liver__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__risk__heart"><strong>Риск сердечного приступа</strong><i class="fas fa-user-md"></i><br><span class="description"></p>
           <p class="state__risk__heart__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>
        <div class="state__wrap">
           <p class="state__risk__cancer"><strong>Риск рака</strong><i class="fas fa-skull-crossbones"></i><br><span class="description"></p>
           <p class="state__risk__cancer__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span>%</p>
        </div>      
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