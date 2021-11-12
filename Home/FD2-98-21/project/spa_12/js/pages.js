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
            <input type="text" id="user-name" class="input__default" value="Sasha"><br>
            <label>Дата последней сигареты:</label>
            <input type="date" id="user-date-last" class="input__date-last"><br>
            <label>Среднее количество сигарет в день, шт.:</label>
            <input type="number" id="user-num-cigarette" class="input__num-cigarette" value="15" min="1" max="100"><br>
            <label>Стоимость одной пачки, руб.:</label>
            <input type="number" id="user-cost-cigarette" class="input__cost-cigarette" value="4" min="1" max="20"><br>
            <label>Количество сигарет в пачке, шт.:</label>
            <input type="number" id="num-cigarette-block" class="input__cigarette-block" value="20" min="1" max="50"><br>
             <br><hr><br>
             <label>Город:</label>
            <select id="type-city">
              <optgroup label="Беларусь">
                <option value="625144/53.9/27.55">Минск</option>
                <option value="627907/52.42/31.0">Гомель</option>
                <option value="629634/52.09/23.69">Брест</option>
                <option value="627904/53.67/23.83">Гродно</option>
                <option value="620127/55.19/30.2">Витебск</option>
                <option value="625665/53.9/30.33">Могилев</option>              
              </optgroup>
              <optgroup label="Россия">
                <option value="1220988/55.73/37.62">Москва</option>
              </optgroup>
            </select> <br>
            <label>Футбольная лига:</label>
            <select id="type-futbol">
              <optgroup label="Англия">
                <option value="eng.1">Премьер-лига</option>
                <option value="eng.2">Чемпионшип</option>
                <option value="eng.3">Англия - Лига 1</option>
                <option value="eng.4">Англия - Лига 2</option>
                <option value="eng.5">Национальная лига</option>
              </optgroup>
              <optgroup label="Испания">
                <option value="esp.1">Ла лига</option>
                <option value="esp.2">Ла лига 2</option>
              </optgroup>
              <optgroup label="Италия">
                <option value="ita.1">Серия А</option>
                <option value="ita.2">Серия B</option>
              </optgroup>
              <optgroup label="Германия">
                <option value="ger.1">Бундеслига</option>
                <option value="ger.2">Вторая Бундеслига</option>
              </optgroup>
              <optgroup label="Франция">
                <option value="fra.1">Франция - Лига 1</option>
                <option value="fra.2">Франция - Лига 2</option>
              </optgroup>
              <optgroup label="Россия">
                <option value="rus.1">Премьер-лига</option>
              </optgroup>
            </select><br>
            <div class="sound_wrap">
              <label>Звук в приложении:</label>
              <input type="checkbox" id="sound">
            </div>
            <div class="color_wrap">
              <label>Цветовая схема:</label>
              <div class="btn_wrap">
                <button class="color-spa white"></button>
                <button class="color-spa black"></button>
                <button class="color-spa red"></button>
                <button class="color-spa blue"></button>
                <button class="color-spa green"></button>
              </div>
            </div>
            <h4 class="valid-value"></h4>
            <i class="fas fa-user-cog"></i>
            <button id="btn-save" class="data__save" disabled>Сохранить</button>
          </div>
          <button class="about_spa">О приложении</button>
        </main>
        <div class="modal_about_spa modal_closed">Приложение может использоваться как инструмент, помогающий пользователю бросить курить, для получения статистики о периоде без сигарет, состояния организма и различной мотивации для достижения цели. <br><br> Целевая аудитория - люди, пытающиеся избавиться от указанной вредной привычки. <br><br> Курение - социальная проблема общества, как для курящей, так и для некурящей его части. <br><br> Решение отказаться от курения тяжелое, но неизбежное, если Вы хотите быть здоровыми и красивыми. <br><br><strong>!!!Дисклеймер!!!</strong><br>Помните, что данное приложения не предоставляет рекомендаций медицинского характера  и не может использоваться в диагностических целях для получения достоверных результатов!</div>
        <div class="modal-overlay modal_closed"></div>
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
            <input type="text" id="user-name" class="input__default" value="${userName}"><br>       
            <label>Дата последней сигареты:</label>
            <input type="date" id="user-date-last" class="input__date-last" value="${userDate}"><br>
            <label>Среднее количество сигарет в день, шт.:</label>
            <input type="number" id="user-num-cigarette" class="input__num-cigarette" value="${userNumCigarette}" min="1" max="100"><br>
            <label>Стоимость одной пачки, руб.:</label>
            <input type="number" id="user-cost-cigarette" class="input__cost-cigarette" value="${userCostCigarette}" min="1" max="20"><br>
            <label>Количество сигарет в пачке, шт.:</label>
            <input type="number" id="cigarette-in-block" class="input__cigarette-block" value="${cigarettesInBlock}" min="1" max="50"><br>
            <br><hr><br>
            <label>Город:</label>
            <select id="type-city">
              <optgroup label="Беларусь">
                <option value="625144/53.9/27.55">Минск</option>
                <option value="627907/52.42/31.0">Гомель</option>
                <option value="629634/52.09/23.69">Брест</option>
                <option value="627904/53.67/23.83">Гродно</option>
                <option value="620127/55.19/30.2">Витебск</option>
                <option value="625665/53.9/30.33">Могилев</option>              
              </optgroup>
              <optgroup label="Россия">
                <option value="1220988/55.73/37.62">Москва</option>
              </optgroup>
            </select> <br>
            <label>Футбольная лига:</label>
            <select id="type-futbol">
              <optgroup label="Англия">
                <option value="eng.1">Премьер-лига</option>
                <option value="eng.2">Чемпионшип</option>
                <option value="eng.3">Англия - Лига 1</option>
                <option value="eng.4">Англия - Лига 2</option>
                <option value="eng.5">Национальная лига</option>
              </optgroup>
              <optgroup label="Испания">
                <option value="esp.1">Ла лига</option>
                <option value="esp.2">Ла лига 2</option>
              </optgroup>
              <optgroup label="Италия">
                <option value="ita.1">Серия А</option>
                <option value="ita.2">Серия B</option>
              </optgroup>
              <optgroup label="Германия">
                <option value="ger.1">Бундеслига</option>
                <option value="ger.2">Вторая Бундеслига</option>
              </optgroup>
              <optgroup label="Франция">
                <option value="fra.1">Франция - Лига 1</option>
                <option value="fra.2">Франция - Лига 2</option>
              </optgroup>
              <optgroup label="Россия">
                <option value="rus.1">Премьер-лига</option>
              </optgroup>
            </select><br>
            <div class="sound_wrap">
              <label>Звук в приложении:</label>
              <input type="checkbox" id="sound">
            </div>
            <div class="color_wrap">
              <label>Цветовая схема:</label>
              <div class="btn_wrap">
                <button class="color-spa white"></button>
                <button class="color-spa black"></button>
                <button class="color-spa red"></button>
                <button class="color-spa blue"></button>
                <button class="color-spa green"></button>
              </div>
            </div>
            <h4 class="valid-value"></h4>
            <i class="fas fa-user-cog"></i>
            <button id="btn-save" class="data__save">Изменить</button>
          </div>
          <button class="about_spa">О приложении</button>
        </main>
        <div class="modal_about_spa modal_closed">Приложение может использоваться как инструмент, помогающий пользователю бросить курить, для получения статистики о периоде без сигарет, состояния организма и различной мотивации для достижения цели. <br><br> Целевая аудитория - люди, пытающиеся избавиться от указанной вредной привычки. <br><br> Курение - социальная проблема общества, как для курящей, так и для некурящей его части. <br><br> Решение отказаться от курения тяжелое, но неизбежное, если Вы хотите быть здоровыми и красивыми. <br><br><strong>!!!Дисклеймер!!!</strong><br>Помните, что данное приложения не предоставляет рекомендаций медицинского характера  и не может использоваться в диагностических целях для получения достоверных результатов!</div>
        <div class="modal-overlay modal_closed"></div>
        <button id="btn-delete" class="data__delete">Выйти</button>
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
           <p>Каждая секунда улучшает самочувствие и восстанавливает здоровье!<br>Не сдавайтесь!</p>
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Не выкурено сигарет</strong></p>
           <i class="fas fa-smoking"></i>
           <p class="num__cigarette"></p>
           <i class="fas fa-angle-double-down"></i>
           <p class="more__info">не получено никотина: <span class="nicotine"></span>не получено смолы: <span class="resin"></span></p>
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Сэкономлено средств</strong></p>
           <i class="fas fa-ruble-sign"></i>
           <p class="num__money"></p>
           <i class="fas fa-angle-double-down"></i>
           <p class="more__info">дополнительный расход: <span class="month"></span> руб/месяц<span class="year"></span> руб/год</p>
        </div>
        <div class="state__wrap wrap__less">
           <p><strong>Сэкономлено времени</strong></p>
           <i class="fas fa-clock"></i>
           <p class="free__time"></p>
           <i class="fas fa-angle-double-down"></i>
           <p class="more__info">плюс к долголетию: <span class="add__health"></span></p>
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
           <p class="state__heart__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__carbonMonoxide"><strong>Угарный газ</strong><i class="fas fa-bong"></i></i><br><span class="description"></p>
           <p class="state__carbonMonoxide__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__nicotine"><strong>Никотин</strong><i class="fas fa-smoking"></i><br><span class="description"></p>
           <p class="state__nicotine__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__smell"><strong>Обоняние и вкус</strong><i class="fas fa-air-freshener"></i><br><span class="description"></p>
           <p class="state__smell__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__lung"><strong>Работа легких</strong><i class="fas fa-lungs"></i><br><span class="description"></p>
           <p class="state__lung__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__liver"><strong>Работа печени</strong><i class="fas fa-mercury"></i><br><span class="description"></p>
           <p class="state__liver__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__risk__heart"><strong>Риск сердечного приступа</strong><i class="fas fa-user-md"></i><br><span class="description"></p>
           <p class="state__risk__heart__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>
        <div class="state__wrap">
           <p class="state__risk__cancer"><strong>Риск рака</strong><i class="fas fa-skull-crossbones"></i><br><span class="description"></p>
           <p class="state__risk__cancer__chart"></span><span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
        </div>      
      </section>
    `;
  }
};


const Motivation = {
  id: "motivation",
  title: "Мотивация и поддержка",
  render: (className = "container", {userName}) => {
    return `
      <section class="${className}">
        <button id="btn-advice" class="btn-advice">Советы <i class="fas fa-random"></i></button>
        <button id="btn-facts" class="btn-facts">Видео <i class="fas fa-video"></i></button>
        <button id="btn-links" class="btn-chat">Онлайн чат <i class="far fa-comments"></i></button>
        <button class="btn-goals">Цели <i class="far fa-comments"></i></button>
                
        <div class="chat-spa">
            <p><strong>${userName}</strong>, тут вы можете оставить свой отзыв о приложении или поделиться опытом с другими пользователями! Будьте вежливы!</p>
            <div class='chat-border'></div>
            <input type='text' class='message-chat' placeholder="введите сообщение">
            <button class="btn_chat_send"><i class="far fa-envelope"></i></button>
            <button class="btn_chat_update"><i class="fas fa-cloud-upload-alt"></i></button>
        </div>
        
        <div class="advice-spa">
            <p><strong>${userName}</strong>, тут вы можете получить случайные полезные советы и факты как снизить вред от курения и сохранить необходимую мотивацию!</p>
            <div></div>
        </div>
        
        <div class="facts-spa">
            <p><strong>${userName}</strong>, тут вы можете посмотреть случайные видео о вреде курения, последствиях отказа и много другой полезной информации!</p>
            <iframe src="" frameborder="0" class="video-fact"></iframe>
            <p class="fact_none">Факты закончились! Заходите позже!</p>
        </div>
        
        <div class="goals-spa">
            <p><strong>${userName}</strong>, тут вы можете установить цель и следить за прогрессом её достижения!</p>
            <input type='text' class='goals-text' placeholder="MacBook Air">
            <input type='number' class='goals-cost' placeholder="3310">
            <button class="btn_goals_add"><i class="far fa-envelope"></i> добавить</button>
            
            <div class="state__wrap">
               <p class="state__goals__chart"><strong class="state__text__goals"></strong> <span class="chart__wrap"><span class="chart"></span></span><span class="percent"></span></p>
               <p class="state__goals__dicription"><span class="money_now"></span> руб из <span class="money_full"></span> руб <span class="rest_time"></span></p>
            </div>
        </div>
<!--        <p>Ну а тут классически будет страница <strong>Контакты</strong>.</p>-->
      </section>
    `;
  }
};


const Other = {
  id: "other",
  title: "Полезная информация",
  render: (className = "container", ...rest) => {
    return `
      <section class="${className}">
        <button id="btn-futbol" class="btn-futbol">Футбол<i class="fas fa-futbol"></i></button>
        <button id="btn-currency" class="btn-currency">Обмен Валют<i class="fas fa-yen-sign"></i></button>
        <button id="btn-weather" class="btn-weather">Погода<i class="fas fa-cloud-moon-rain"></i></button>
        
        <div class="futbol-season">
          <div class="logo_wrap"></div>  
          <h3>Футбольный сезон:</h3>
          <input type="number" class="input__date-futbol" min="2015"><br>
        </div>       
        <div class="futbol-league">
         <div class="futbol_wrap">
         <button class="btn-futbol-back"><i class="fas fa-chevron-left"></i></button>
         <button class="btn-futbol-foward"><i class="fas fa-chevron-right"></i></button>
          <div class="league"></div>
          <div class="icon"></div>
          <h2 class="team"></h2>
          <h3 class="team-place"></h3>
          <div class="wrap">
            <div class="matches"></div>
            <div class="stats"></div>
          </div>
        </div>
         <div id="loader" style=""><img src="img/loader.gif" height="110" width="auto"></div>
        </div>
        
        <div id="currency-exchange">
          <h3>Онлайн конвертер валют на <input type="date" class="input__date-currency"></h3>
          <input type="number" class="input_sum-currency" value="1">
          <select id="currency-1">
              <option value="byn">BYN</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="rub">RUB</option>
              <option value="pln">PLN</option>
              <option value="uah">UAH</option>
              <option value="btc">BTC</option>
           </select><br>
          <input type="number" class="input_res-currency" value="1">
          <select id="currency-2">
              <option value="usd">USD</option>
              <option value="byn">BYN</option>
              <option value="eur">EUR</option>
              <option value="rub">RUB</option>
              <option value="pln">PLN</option>
              <option value="uah">UAH</option>
              <option value="btc">BTC</option>
           </select><br>
           <button class="btn-clean-currency"><i class="fas fa-eraser"></i>Очистить</button>
           <button class="btn-add-currency"><i class="fas fa-plus"></i>Добавить валюту</button>
           <input type="text" class="input_add-currency" placeholder="KZT">
        </div>
        
        <div class="btn-forecast_wrap">
          <button class="btn-forecast-now">Сегодня</button><br>
          <button class="btn-forecast-3days">Прогноз на 3 дня</button><br>
          <button class="btn-forecast-pollution">Загрязнение воздуха</button>
        </div>  
        
        <div id="forecast-now">
         <div class="forecast_wrap">
            <div class="icon-weather"></div>
            <h1 class="location"></h1>
            <h1 class="temperature"></h1>
            <div class="description"></div>
            <div class="wind"></div>
         </div>
         <div class="forecast-3-days">
             <div class="today"></div>       
             <div class="tomorrow"></div>       
             <div class="after-tomorrow"></div>       
         </div>
         <div id="loader-W" style=""><img src="img/loader.gif" height="110" width="auto"></div>
        </div>
        
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
        <p>Страница не найдена,<br> попробуйте вернуться на <a href="#statistics" class="btn_set">главную</a></p>
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
        <p>Перейдите в раздел <a href="#login" class="btn_set">Настройки</a></p>
      </section>
    `;
  }
};