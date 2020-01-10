class User {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.level = 0;
		this.rightAnswers = [];
	}
	getFullName() {
		return `Player ${this.firstName} ${this.lastName}`;
	}
	setLevel(level) {
		this.level = level;
	}
}

class Task {
	constructor(level, question, countAnswers) {
		this.level = level;
		this.question = question;
		this.countAnswers = countAnswers;
		this.answersArr = [];
		this.rightAnswer;
	}
}
const taskArr = [
	{
		level: 1,
		question:
			'У мамы Альфреда четверо детей. Девочек зовут Эйприл, Джун и Джули. Как зовут сына?',
		countAnswers: 4,
		answersArr: ['Альфред', 'Август', 'Марк', 'Джимми'],
		rightAnswer: 'Альфред',
	},
	{
		level: 1,
		question:
			'Меня называют золотым и я уместен в неловких ситуациях. Если ты меня назовешь, я исчезну. Кто я?',
		countAnswers: 4,
		answersArr: ['Слово', 'Сокровище', 'Молчание', 'Домашний лес'],
		rightAnswer: 'Молчание',
	},
	{
		level: 1,
		question:
			'Я сильнее, чем Чак Норрис, я злее черта, у бедняков я есть, богатые во мне нуждаются. Если ты будешь меня есть, ты умрешь. Кто я?',
		countAnswers: 4,
		answersArr: ['Ничто', 'Долг', 'Ураган', 'Камень'],
		rightAnswer: 'Ничто',
	},
	{
		level: 1,
		question:
			'Человек, который его делает, делает его не для себя. Человек, который его покупает, в нем не нуждается. Тот, кто будет им пользоваться, не узнает об этом. О чем речь?',
		countAnswers: 4,
		answersArr: ['Гроб', 'Wi-Fi', 'Татуировка', 'Свадебное платье'],
		rightAnswer: 'Гроб',
	},
	{
		level: 1,
		question:
			'Внутри зеленого дома - белый дом. Внутри белого дома - красный дом. Внутри красного дома - множество деток. Что это?',
		countAnswers: 4,
		answersArr: ['Госпиталь', 'Детский сад', 'Теплица', 'Арбуз'],
		rightAnswer: 'Арбуз',
	},
	{
		level: 1,
		question:
			'По сколько штук каждого вида животных Моисей взял с собой в ковчег?',
		countAnswers: 4,
		answersArr: [
			'Неисчислимое множество',
			'Нисколько',
			'Каждой твари по паре',
			'По три штуки',
		],
		rightAnswer: 'Каждой твари по паре',
	},
	{
		level: 1,
		question: 'Что ты можешь поймать, но не можешь  бросить?',
		countAnswers: 4,
		answersArr: ['Футбольный мяч', 'Друга/Подругу', 'Фрисби', 'Простуду'],
		rightAnswer: 'Простуду',
	},
	{
		level: 1,
		question: 'Почему белые медведи не едят пингвинов?',
		countAnswers: 4,
		answersArr: [
			'Не нравится вкус',
			'Медведи-пацифисты',
			'Они никогда не встречаются',
			'Пингвины быстро бегают',
		],
		rightAnswer: 'Они никогда не встречаются',
	},
];

class Model {
	constructor() {
		this.userArr = [];
	}
	createNewUser(firstName, lastName, level) {
		const newUser = new User(firstName, lastName);
		newUser.setLevel(level);
		this.userArr.push(newUser);
	}
	createArrOfQuestion(level) {
		taskArr.forEach(element => {
			if (level === element.level) {
				const arrOfQuestion = [];
				arrOfQuestion.push(element);
				return arrOfQuestion;
			}
		});
	}
	checkAnswer(answer, question) {
		if (answer === question.rightAnswer) {
			console.log('Green Button');
			console.log('Record number answer in person');
		} else {
			console.log('Red button');
			console.log('Indicate right answer');
		}
	}
}

class Controller {
	constructor() {}
}

class View {
	constructor() {}
}
