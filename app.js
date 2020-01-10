class EventEmmiter {
	constructor() {
		this.events = {};
	}
	on(event, listener) {
		(this.events[event] || (this.events[event] = [])).push(listener);
		return this;
	}
	emitter(event, arg) {
		(this.events[event] || []).slice().forEach(lsn => lsn(arg));
	}
}
class User {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.level = 0;
		this.amountTrueAnswers = 0;
	}
	getFullName() {
		return `Player: ${this.firstName} ${this.lastName}`;
	}
	setLevel(level) {
		if (level === 'EASY') {
			this.level = 1;
		} else if (level === 'MEDIUM') {
			this.level = 2;
		} else if (level === 'HARD') {
			this.level = 3;
		}
	}
	getLevel() {
		return this.level;
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

class Model extends EventEmmiter {
	constructor() {
		super();
		this.userArr = [];
		this.arrOfQuestion = [];
		self = this;
	}
	createNewUser(firstName = 'Неизвестный', lastName = 'Опоссум', level) {
		const newUser = new User(firstName, lastName);
		newUser.setLevel(level);
		this.userArr.push(newUser);
	}
	createArrOfQuestion() {
		taskArr.forEach(element => {
			if (this.userArr[0].getLevel() === element.level) {
				this.arrOfQuestion.push(element);
			}
		});
		this.arrOfQuestion = this.shuffle(this.arrOfQuestion);
		console.log(this.arrOfQuestion);
	}

	checkAnswer(answer, numQuestion) {
		if (answer == this.arrOfQuestion[numQuestion - 1].rightAnswer) {
			this.userArr[0].amountTrueAnswers++;
			this.emitter('trueAnswer', answer);
			console.log('Green Button');
			console.log('Record number answer in person');
		} else {
			this.emitter('falseAnswer', answer);
			this.emitter(
				'trueAnswer',
				this.arrOfQuestion[numQuestion - 1].rightAnswer
			);
			console.log('Red button');
			console.log('Indicate right answer');
		}
	}
	getQuestion(obj) {
		return obj.question;
	}
	getAnswers(obj) {
		return obj.answersArr;
	}
	getRightAnswer(obj) {
		return obj.rightAnswer;
	}

	shuffle(arr) {
		let j, temp;
		for (var i = arr.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}
}

class Controller extends EventEmmiter {
	constructor(model, view) {
		super();
		this.model = model;
		this.view = view;
		this.amountQuestions = 0;
		this.numberQuestion = 0;
		model.on('trueAnswer', answer => {
			this.trueAnswer(answer);
		});
		model.on('falseAnswer', answer => {
			this.falseAnswer(answer);
		});
	}
	start() {
		let formBtn = document.querySelector('.form-login');
		formBtn.addEventListener('click', e => {
			e.preventDefault();
			if (e.target.tagName === 'BUTTON' && this.numberQuestion === 0) {
				let firstName = document.querySelector('#firstName').value;
				if (firstName === '') {
					firstName = 'Неопознанный';
				}
				let lastName = document.querySelector('#lastName').value;
				if (lastName === '') {
					lastName = 'Опоссум';
				}
				let level = document.querySelector('#level').value;
				this.model.createNewUser(firstName, lastName, level);
				this.model.createArrOfQuestion();
				this.getAmountQuestions();
				this.renderQuestion(this.numberQuestion);
			}
			let questionBtn = document.querySelector('.form-test');
			questionBtn.addEventListener('click', e => {
				e.preventDefault();
				if (e.target.classList.contains('answer-1')) {
					this.model.checkAnswer(
						e.target.textContent,
						this.numberQuestion
					);
				} else if (e.target.classList.contains('answer-2')) {
					this.model.checkAnswer(
						e.target.textContent,
						this.numberQuestion
					);
				} else if (e.target.classList.contains('answer-3')) {
					this.model.checkAnswer(
						e.target.textContent,
						this.numberQuestion
					);
				} else if (e.target.classList.contains('answer-4')) {
					this.model.checkAnswer(
						e.target.textContent,
						this.numberQuestion
					);
				} else if (e.target.classList.contains('next')) {
					this.renderQuestion(this.numberQuestion);
					console.log(
						'Теперь ты нажимаешь на клавишу СЛЕДУЮЩИЙ ВОПРОС'
					);
				}
			});
		});
	}
	getAmountQuestions() {
		this.amountQuestions = this.model.arrOfQuestion.length;
	}
	renderQuestion(num) {
		if (num < this.amountQuestions) {
			this.view.setQuestion(this.model.arrOfQuestion[num].question);
			this.view.setAnswer(
				this.model.shuffle(this.model.arrOfQuestion[num].answersArr)
			);
			this.numberQuestion++;
			console.log(this.numberQuestion);
			this.view.enableBtn();
		} else {
			this.finishGame();
		}
	}
	finishGame() {
		let right = this.model.userArr[0].amountTrueAnswers;
		let points = (right * 100) / this.amountQuestions;
		console.log(
			`${this.model.userArr[0].getFullName()} правильно ответил на ${points}% вопросов`
		);
	}
	trueAnswer(answer) {
		let btn = document.querySelectorAll('.answer-btn');
		btn.forEach((element, index) => {
			if (element.textContent === answer) {
				this.view.trueAnswer(index + 1);
			}
		});
		this.view.nextQuestion();
		this.view.disabledBtn();
	}
	falseAnswer(answer) {
		let btn = document.querySelectorAll('.answer-btn');
		btn.forEach((element, index) => {
			if (element.textContent === answer) {
				this.view.falseAnswer(index + 1);
			}
		});
	}
}

class View {
	constructor() {}
	setQuestion(question) {
		let questionDiv = document.querySelector('.question');
		questionDiv.textContent = question;
	}
	setAnswer(answers) {
		answers.forEach((element, index) => {
			let answerBtn = document.querySelector(`.answer-${index + 1}`);
			answerBtn.classList.remove('button-success');
			answerBtn.classList.remove('button-error');
			let nextBtn = document.querySelector('.next');
			nextBtn.classList.remove('button-warning');
			nextBtn.classList.add('pure-button-disabled');
			answerBtn.textContent = element;
		});
	}
	trueAnswer(index) {
		document
			.querySelector(`.answer-${index}`)
			.classList.add('button-success');
	}
	falseAnswer(index) {
		document
			.querySelector(`.answer-${index}`)
			.classList.add('button-error');
	}
	disabledBtn() {
		let answerBtn = document.querySelectorAll('.answer-btn');
		answerBtn.forEach(value => {
			value.classList.add('pure-button-disabled');
		});
	}
	enableBtn() {
		let answerBtn = document.querySelectorAll('.answer-btn');
		console.log(answerBtn);
		answerBtn.forEach(value => {
			value.classList.remove('pure-button-disabled');
		});
	}
	nextQuestion() {
		let nextBtn = document.querySelector('.next');
		nextBtn.classList.add('button-warning');
		nextBtn.classList.remove('pure-button-disabled');
	}
}
const view = new View();
const model = new Model();
const controller = new Controller(model, view);
controller.start();
