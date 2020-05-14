'use strict';

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Subjects", [
      { name: 'Актёрское мастерство' },
      { name: 'Английский язык' },
      { name: 'Арабский язык' },
      { name: 'Биология' },
      { name: 'Бухгалтерский учёт' },
      { name: 'География' },
      { name: 'Дизайн' },
      { name: 'Другие предметы' },
      { name: 'Журналистика' },
      { name: 'ИЗО' },
      { name: 'Инженерия' },
      { name: 'Информатика' },
      { name: 'Испанский язык' },
      { name: 'История' },
      { name: 'Итальянский язык' },
      { name: 'Китайский язык' },
      { name: 'Латынь' },
      { name: 'Литература' },
      { name: 'Логопеды' },
      { name: 'Маркетинг' },
      { name: 'Математика' },
      { name: 'Медицина' },
      { name: 'Менеджмент' },
      { name: 'Музыка' },
      { name: 'Начальная школа' },
      { name: 'Немецкий язык' },
      { name: 'Обществознание' },
      { name: 'Педагогика' },
      { name: 'Подготовка к школе' },
      { name: 'Португальский язык' },
      { name: 'Правоведение' },
      { name: 'Программирование' },
      { name: 'Психология' },
      { name: 'РКИ' },
      { name: 'Рукоделие' },
      { name: 'Русский язык' },
      { name: 'Физика' },
      { name: 'Филология' },
      { name: 'Философия' },
      { name: 'Фотодело' },
      { name: 'Французский язык' },
      { name: 'Химия' },
      { name: 'Хинди' },
      { name: 'Черчение' },
      { name: 'Экономика' },
      { name: 'Японский язык' },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};