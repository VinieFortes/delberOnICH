import kaboom from "kaboom"
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue ,query ,orderByChild} from "firebase/database";

const firebaseConfig = {
	databaseURL: "https://delbergame-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);

const database = getDatabase();


kaboom({backgroundAudio: true})

const FLOOR_HEIGHT = 48
const JUMP_FORCE = 800
let SPEED = 480

setBackground(141, 183, 255)
loadSound("OtherworldlyFoe", "/sprites/sound.mp3")
loadSound("fim", "/sprites/fimSound.mp3")
loadSound("rank", "/sprites/musicRank.mp3")
loadSprite('ich', "sprites/ich.png")
loadSprite('hell', "sprites/hell.png")
loadSprite('maconha', "sprites/enime1.png")
loadSprite('cerveja', "sprites/enime2.png")
loadSprite('ufjf',"sprites/ufjf.png" )
loadSprite('sp', "sprites/enime3.png")
loadSprite('pais', "sprites/enime4.png")
loadSpriteAtlas("sprites/delber_walk.png", {
	'delber_walk': {
		x: -1.5,
		y: 0,
		width: 46,
		height: 48,
		sliceX: 2,
		anims: {
			'walk': {from: 1, to: 0, loop: true, speed: 5},
			'stoped': {from: 1, to: 0, loop: false, speed: 100},
		}
	}
})
loadSpriteAtlas("sprites/dance.png", {
	'delber_dance': {
		x: 0,
		y: 0,
		width: 361,
		height: 50,
		sliceX: 6,
		anims: {
			'dance': {from: 5, to: 0, loop: true, speed: 10},
			'stoped': {from: 1, to: 0, loop: false, speed: 100},
		}
	}
})
loadSpriteAtlas("sprites/fim.png", {
	'delber_calvo': {
		x: 0,
		y: 0,
		width: 362,
		height: 55,
		sliceX: 6,
		anims: {
			'fim': {from: 0, to: 5, loop: true, speed: 5},
			'stoped': {from: 1, to: 0, loop: false, speed: 100},
		}
	}
})

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {

	const FLOOR_HEIGHT = 48
	const JUMP_FORCE = 600
	let SPEED = 200

	const GAME_WIDTH = 600;
	const GAME_HEIGHT = 400;

// Define a escala do jogo
	const GAME_SCALE = 1;

// Define as dimensões do canvas
	const canvas = document.querySelector("canvas");
	canvas.width = GAME_WIDTH * GAME_SCALE;
	canvas.height = GAME_HEIGHT * GAME_SCALE;

// Define as dimensões do jogo
	 kaboom({
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
		scale: GAME_SCALE,
		canvas: canvas,
		fullscreen: true,
		background: [141, 183, 255]
	});

	loadSound("OtherworldlyFoe", "/sprites/sound.mp3")
	loadSound("fim", "/sprites/fimSound.mp3")
	loadSound("rank", "/sprites/musicRank.mp3")
	loadSprite('ich', "sprites/ich.png")
	loadSprite('hell', "sprites/hell.png")
	loadSprite('maconha', "sprites/enime1.png")
	loadSprite('cerveja', "sprites/enime2.png")
	loadSprite('ufjf',"sprites/ufjf.png" )
	loadSprite('sp', "sprites/enime3.png")
	loadSprite('pais', "sprites/enime4.png")
	loadSpriteAtlas("sprites/delber_walk.png", {
		'delber_walk': {
			x: -1.5,
			y: 0,
			width: 46,
			height: 48,
			sliceX: 2,
			anims: {
				'walk': {from: 1, to: 0, loop: true, speed: 5},
				'stoped': {from: 1, to: 0, loop: false, speed: 100},
			}
		}
	})
	loadSpriteAtlas("sprites/dance.png", {
		'delber_dance': {
			x: 0,
			y: 0,
			width: 361,
			height: 50,
			sliceX: 6,
			anims: {
				'dance': {from: 5, to: 0, loop: true, speed: 10},
				'stoped': {from: 1, to: 0, loop: false, speed: 100},
			}
		}
	})
	loadSpriteAtlas("sprites/fim.png", {
		'delber_calvo': {
			x: 0,
			y: 0,
			width: 362,
			height: 55,
			sliceX: 6,
			anims: {
				'fim': {from: 0, to: 5, loop: true, speed: 5},
				'stoped': {from: 1, to: 0, loop: false, speed: 100},
			}
		}
	})


	scene("menuMobile", () =>{
		// onUpdate(() => setCursor("default"))
		//
		const fonts = [
			"monospace",
			"4x4",
			"unscii",
			"FlowerSketches",
			"apl386",
			"Sans-Serif",
		]
		let curFont = 0
		let curSize = 18
		const pad = 12

		const input = add([
			pos(210, 40),
			anchor('center'),
			text("Delber on I.C.H !!!", {
				// What font to use
				font: fonts[curFont],
				// It'll wrap to next line if the text width exceeds the width option specified here
				width: 400,
				// The height of character
				size: curSize,
				// Text alignment ("left", "center", "right", default "left")
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
				// Transform each character for special effects
				transform: (idx, ch) => ({
					color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
					pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
					scale: wave(1, 1.2, time() * 3 + idx),
					angle: wave(-9, 9, time() * 3 + idx),
				}),
			})
		])

		function addButton(txt, p, f) {

			// add a parent background object
			const btn = add([
				rect(240, 80, { radius: 8 }),
				pos(p),
				area(),
				scale(1),
				anchor("center"),
				outline(4),
			])

			// add a child object that displays the text
			btn.add([
				text(txt),
				anchor("center"),
				color(0, 0, 0),
			])

			// onHoverUpdate() comes from area() component
			// it runs every frame when the object is being hovered
			btn.onHoverUpdate(() => {
				const t = time() * 10
				btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
				btn.scale = vec2(1.2)
				setCursor("pointer")
			})

			// onHoverEnd() comes from area() component
			// it runs once when the object stopped being hovered
			btn.onHoverEnd(() => {
				btn.scale = vec2(1)
				btn.color = rgb()
			})

			// onClick() comes from area() component
			// it runs once when the object is clicked
			btn.onClick(f)

			return btn

		}

		addButton("Jogar", vec2(200, 100), () => {
			go("gameMobile")
		})
		addButton("Ranking", vec2(200, 200), () => go('rankMobile'))
		addButton("Créditos", vec2(200, 300), () => debug.log("tudo feito por mim !"))

	})

	scene("gameMobile", () =>{
		const music = play("OtherworldlyFoe")
		volume(0.5)
		music.loop = true;


		add([
			sprite("ich", {width: width(), height: height()})
		])

		setGravity(2500)

		const player = add([
			sprite("delber_walk", {anim: 'walk'}),   // sprite() component makes it render as a sprite
			pos(80, 40),   // pos() component gives it position, also enables movement
			area(),
			scale(1),
			body(),
			offscreen({ destroy: true }),
		])

		// floor
		add([
			rect(width(), FLOOR_HEIGHT),
			outline(4),
			pos(0, height()),
			anchor("botleft"),
			area(),
			body({ isStatic: true }),
			color(128, 128, 128),
		])


		function jump() {
			if (player.isGrounded()) {
				player.jump(JUMP_FORCE)
			}
		}


		onClick(jump)

		// lose if player collides with any game obj with tag "tree"
		player.onCollide("enime", () => {
			// go to "lose" scene and pass the score
			go("loseMobile", score)
			music.paused = true;

		})


		function spawnEnimes() {
			const enimes = ['maconha', 'cerveja', 'sp', 'pais'];
			const randomElement = enimes[Math.floor(Math.random() * enimes.length)];
			// add tree obj
			add([
				sprite(randomElement, {width: 32, height: 32}),
				area({scale: 0.6}),
				move(LEFT, SPEED),
				pos(width(), height() - FLOOR_HEIGHT),
				anchor("botleft"),
				offscreen({ destroy: true }),
				"enime"
			])

			// wait a random amount of time to spawn next tree
			dropEnimesFunc(1)

		}

		function dropEnimesFunc(level){
			switch (level){
				case 1:
					wait(rand(1, 3), spawnEnimes);
					return;
				case 2:
					wait(rand(1.1, 3), spawnEnimes);
					return;
				case 3:
					wait(rand(1.2, 3), spawnEnimes);
					return;
			}
		}

		// start spawning trees
		spawnEnimes()

		let score = 0

		const scoreLabel = add([
			text(score),
			color(255,0,0),
			pos(24, 24),
		])

		// increment score every frame
		onUpdate(() => {
			score++
			scoreLabel.text = score

			if(score > 1000 && SPEED < 550){
				SPEED = 250;
				music.speed = 1.2;
			}
			else if(score > 3000 && SPEED < 700){
				SPEED = 350;
				dropEnimesFunc(2)
				music.speed = 1.5;
			}
			else if(score > 5000 && SPEED < 900){
				SPEED = 400;
				dropEnimesFunc(3)
				music.speed = 1.8;
			}
		})
	})

	scene("loseMobile", (scoree)=> {
		function writeUserData(name, score) {
			const db = getDatabase();
			set(ref(db, 'users/' + name), {
				username: name,
				score: score
			});
		}

		add([
			sprite("hell", {width: GAME_WIDTH, height: GAME_HEIGHT})
		])

		const music = play("fim")
		volume(0.5)
		music.loop = true;

		function addButton(txt, p, f) {

			// add a parent background object
			const btn = add([
				rect(350, 80, {radius: 8}),
				pos(p),
				area(),
				scale(0.4),
				anchor("center"),
				outline(4),
			])

			// add a child object that displays the text
			btn.add([
				text(txt),
				anchor("center"),
				color(0, 0, 0),
			])

			// onHoverUpdate() comes from area() component
			// it runs every frame when the object is being hovered
			btn.onHoverUpdate(() => {
				const t = time() * 10
				btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
				btn.scale = vec2(1.2)
				setCursor("pointer")
			})

			// onHoverEnd() comes from area() component
			// it runs once when the object stopped being hovered
			btn.onHoverEnd(() => {
				btn.scale = vec2(1)
				btn.color = rgb()
			})

			// onClick() comes from area() component
			// it runs once when the object is clicked
			btn.onClick(f)

			return btn

		}

		addButton("Jogar Novamente", vec2(150, 150), () => {
			music.paused = true;
			go("gameMobile")
		})
		addButton("Menu", vec2(300, 150), () => {
			music.paused = true;
			go('menuMobile')
		})

		const fonts = [
			"monospace",
			"4x4",
			"unscii",
			"FlowerSketches",
			"apl386",
			"Sans-Serif",
		]
		let curFont = 0
		let curSize = 18
		const pad = 24

		const input = add([
			pos(0, 40),
			text("Você Perdeu !!", {
				font: fonts[curFont],
				width: 400,
				size: curSize,
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
			})
		])
		const descricao = add([
			pos(0, 70),
			text('Delber ficou calvo !!', {
				width: 400,
				size: curSize,
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
			})
		])

		const score = add([
			pos(0, 100),
			text('Sua pontuação : ' + scoree, {
				width: 400,
				size: curSize,
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
			})
		])
	})
		scene('rankMobile', () =>{
			const music = play("rank")
			volume(0.5)
			music.loop = true;
			// function addButton(txt, p, f) {
			//
			// 	// add a parent background object
			// 	const btn = add([
			// 		rect(350, 80, { radius: 8 }),
			// 		pos(p),
			// 		area(),
			// 		scale(1),
			// 		anchor("center"),
			// 		outline(4),
			// 	])
			//
			// 	// add a child object that displays the text
			// 	btn.add([
			// 		text(txt),
			// 		anchor("center"),
			// 		color(0, 0, 0),
			// 	])
			//
			// 	// onHoverUpdate() comes from area() component
			// 	// it runs every frame when the object is being hovered
			// 	btn.onHoverUpdate(() => {
			// 		const t = time() * 10
			// 		btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
			// 		btn.scale = vec2(1.2)
			// 		setCursor("pointer")
			// 	})
			//
			// 	// onHoverEnd() comes from area() component
			// 	// it runs once when the object stopped being hovered
			// 	btn.onHoverEnd(() => {
			// 		btn.scale = vec2(1)
			// 		btn.color = rgb()
			// 	})
			//
			// 	// onClick() comes from area() component
			// 	// it runs once when the object is clicked
			// 	btn.onClick(f)
			//
			// 	return btn
			//
			// }
			//
			// addButton("Jogar", vec2(200, 100), () => {
			// 	music.paused = true;
			// 	go("game")
			// })

			const fonts = [
				"monospace",
				"4x4",
				"unscii",
				"FlowerSketches",
				"apl386",
				"Sans-Serif",
			]
			let curFont = 0
			let curSize = 12
			const pad = 24

			const input = add([
				pos(0,20),
				text("Melhores Jogadores", {
					// What font to use
					font: fonts[curFont],
					// It'll wrap to next line if the text width exceeds the width option specified here
					width: 400,
					// The height of character
					size: curSize,
					// Text alignment ("left", "center", "right", default "left")
					align: "center",
					lineSpacing: 8,
					letterSpacing: 4,
					// Transform each character for special effects
					transform: (idx, ch) => ({
						color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
						pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
						scale: wave(1, 1.2, time() * 3 + idx),
						angle: wave(-9, 9, time() * 3 + idx),
					}),
				})
			])

			const txt = add([
				text("", { size: 20, width: 500, align: "left" }),
				pos(10, 80),
				anchor("topleft"),
				color(0, 0, 0),
			])

			const db = getDatabase();
			const topUserPostsRef = query(ref(db, 'users/'), orderByChild('score'));

			onValue(topUserPostsRef, (snapshot) => {
				const data = snapshot.val();
				if(data){
					const sortedUsers = Object.keys(data).sort((a, b) => data[b].score - data[a].score)
						.reduce((obj, key) => {
							obj[key] = data[key];
							return obj;
						}, {});
					Object.keys(sortedUsers).forEach((key, index) =>{
						txt.text += `${index + 1} - ${sortedUsers[key].username}: ${sortedUsers[key].score}\n\n`
					})
				}else{
					txt.text = ''
				}

			});
	 	})

	go('menuMobile')


} else {
	scene("menu", () =>{
		onUpdate(() => setCursor("default"))

		const fonts = [
			"monospace",
			"4x4",
			"unscii",
			"FlowerSketches",
			"apl386",
			"Sans-Serif",
		]
		let curFont = 0
		let curSize = 92
		const pad = 24

		const input = add([
			pos(pad),
			text("Delber on I.C.H !!!", {
				// What font to use
				font: fonts[curFont],
				// It'll wrap to next line if the text width exceeds the width option specified here
				width: width() - pad * 2,
				// The height of character
				size: curSize,
				// Text alignment ("left", "center", "right", default "left")
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
				// Transform each character for special effects
				transform: (idx, ch) => ({
					color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
					pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
					scale: wave(1, 1.2, time() * 3 + idx),
					angle: wave(-9, 9, time() * 3 + idx),
				}),
			})
		])

		const player = add([
			sprite("delber_dance", {anim: 'dance'}),   // sprite() component makes it render as a sprite
			pos(center()),   // pos() component gives it position, also enables movement
			area(),
			scale(3),
			body()
		])

		add([
			sprite('ufjf', {width: 128}),
			pos(width() - 500, height() - 100)
		])

		function addButton(txt, p, f) {

			// add a parent background object
			const btn = add([
				rect(240, 80, { radius: 8 }),
				pos(p),
				area(),
				scale(1),
				anchor("center"),
				outline(4),
			])

			// add a child object that displays the text
			btn.add([
				text(txt),
				anchor("center"),
				color(0, 0, 0),
			])

			// onHoverUpdate() comes from area() component
			// it runs every frame when the object is being hovered
			btn.onHoverUpdate(() => {
				const t = time() * 10
				btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
				btn.scale = vec2(1.2)
				setCursor("pointer")
			})

			// onHoverEnd() comes from area() component
			// it runs once when the object stopped being hovered
			btn.onHoverEnd(() => {
				btn.scale = vec2(1)
				btn.color = rgb()
			})

			// onClick() comes from area() component
			// it runs once when the object is clicked
			btn.onClick(f)

			return btn

		}



		addButton("Jogar", vec2(200, 100), () => {
			go("game")
		})
		addButton("Ranking", vec2(200, 200), () => go('rank'))
		addButton("Créditos", vec2(200, 300), () => debug.log("tudo feito por mim !"))

	})

	scene("game", () =>{
		const music = play("OtherworldlyFoe")
		volume(0.5)
		music.loop = true;

		add([
			sprite("ich", {width: width(), height: height()})
		])

		setGravity(2500)

		const player = add([
			sprite("delber_walk", {anim: 'walk'}),   // sprite() component makes it render as a sprite
			pos(80, 40),   // pos() component gives it position, also enables movement
			area(),
			scale(3),
			body(),
			offscreen({ destroy: true }),
		])

		// floor
		add([
			rect(width(), FLOOR_HEIGHT),
			outline(4),
			pos(0, height()),
			anchor("botleft"),
			area(),
			body({ isStatic: true }),
			color(128, 128, 128),
		])


		function jump() {
			if (player.isGrounded()) {
				player.jump(JUMP_FORCE)
			}
		}


		// jump when user press space
		onKeyPress("space", jump)
		onClick(jump)

		// lose if player collides with any game obj with tag "tree"
		player.onCollide("enime", () => {
			// go to "lose" scene and pass the score
			go("lose", score)
			music.paused = true;

		})


		function spawnEnimes() {
			const enimes = ['maconha', 'cerveja', 'sp', 'pais'];
			const randomElement = enimes[Math.floor(Math.random() * enimes.length)];
			// add tree obj
			add([
				sprite(randomElement, {width: 70, height: 70}),
				area({scale: 0.8}),
				move(LEFT, SPEED),
				pos(width(), height() - FLOOR_HEIGHT),
				anchor("botleft"),
				offscreen({ destroy: true }),
				"enime"
			])

			// wait a random amount of time to spawn next tree
			dropEnimesFunc(1)

		}

		function dropEnimesFunc(level){
			switch (level){
				case 1:
					wait(rand(1, 3), spawnEnimes);
					return;
				case 2:
					wait(rand(1.5, 3), spawnEnimes);
					return;
				case 3:
					wait(rand(2, 3), spawnEnimes);
					return;
			}
		}

		// start spawning trees
		spawnEnimes()

		let score = 0

		const scoreLabel = add([
			text(score),
			color(255,0,0),
			pos(24, 24),
		])

		// increment score every frame
		onUpdate(() => {
			score++
			scoreLabel.text = score

			if(score > 1000 && SPEED < 550){
				SPEED = 550;
				music.speed = 1.2;
			}
			else if(score > 3000 && SPEED < 700){
				SPEED = 700;
				dropEnimesFunc(2)
				music.speed = 1.5;
			}
			else if(score > 5000 && SPEED < 900){
				SPEED = 900;
				dropEnimesFunc(3)
				music.speed = 1.8;
			}
		})
	})

	scene("lose", (scoree)=> {
		function writeUserData( name, score) {
			const db = getDatabase();
			set(ref(db, 'users/' + name), {
				username: name,
				score: score
			});
		}

		add([
			sprite("hell", {width: width(), height: height()})
		])

		const music = play("fim")
		volume(0.5)
		music.loop = true;
		function addButton(txt, p, f) {

			// add a parent background object
			const btn = add([
				rect(350, 80, { radius: 8 }),
				pos(p),
				area(),
				scale(1),
				anchor("center"),
				outline(4),
			])

			// add a child object that displays the text
			btn.add([
				text(txt),
				anchor("center"),
				color(0, 0, 0),
			])

			// onHoverUpdate() comes from area() component
			// it runs every frame when the object is being hovered
			btn.onHoverUpdate(() => {
				const t = time() * 10
				btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
				btn.scale = vec2(1.2)
				setCursor("pointer")
			})

			// onHoverEnd() comes from area() component
			// it runs once when the object stopped being hovered
			btn.onHoverEnd(() => {
				btn.scale = vec2(1)
				btn.color = rgb()
			})

			// onClick() comes from area() component
			// it runs once when the object is clicked
			btn.onClick(f)

			return btn

		}

		addButton("Jogar Novamente", vec2(200, 100), () => {
			music.paused = true;
			go("game")
		})
		addButton("Menu", vec2(200, 200), () => {
			music.paused = true;
			go('menu')
		})
		addButton("Créditos", vec2(200, 300), () => debug.log("tudo feito por mim !"))

		const fonts = [
			"monospace",
			"4x4",
			"unscii",
			"FlowerSketches",
			"apl386",
			"Sans-Serif",
		]
		let curFont = 0
		let curSize = 92
		const pad = 24

		const input = add([
			pos(pad),
			text("Você Perdeu !!", {
				font: fonts[curFont],
				width: width() - pad * 2,
				size: curSize,
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
			})
		])
		const descricao = add([
			pos(pad, 150),
			text('Delber ficou calvo !!', {
				width: width() - pad * 2,
				align: "center",
			})
		])

		const score = add([
			pos(pad, 250),
			text('Sua pontuação : ' + scoree, {
				width: width() - pad * 2,
				align: "center",
			})
		])

		const textbox = add([
			rect(480, 200, { radius: 32 }),
			anchor("center"),
			pos(center().x - 250, height() - 300),
			outline(4),
		])

		const txt = add([
			text("", { size: 30, width: 440, align: "center" }),
			pos(textbox.pos),
			anchor("center"),
			color(0, 0, 0),
		])

		txt.text = 'Hi ! Coloque seu nome no campo acima e pressione ENTER para salvar seu score !'

		const player = add([
			sprite("delber_calvo", {anim: 'fim'}),   // sprite() component makes it render as a sprite
			pos(center()),   // pos() component gives it position, also enables movement
			area(),
			scale(8),
		])

		const body = add([
			rect(500, 60),
			pos((center().x - 200), 400),
			color(255, 255, 255),
			outline(1, rgb(0, 0, 0)),
		]);

		const inputName = add([
			pos((center().x) - 190, 430),
			color(0, 0, 0),
			scale(1),
			anchor("left"),
			text(""),
			"input",
			{
				focused: true,
				maxLength: 10,
			},
		]);
		inputName.text = ''

		onCharInput( (char) => {
			// adicionar caracteres ao texto do input
			inputName.text += char;
		});
		onKeyPress((key) => {
			if (key === "enter") {
				// acessar o texto digitado
				const text = inputName.text;
				writeUserData(text, scoree)
				debug.log('Score Salvo com Sucesso !')

			} else if (key === "backspace") {
				// remover o último caractere do texto do input
				if (inputName.text.length > 0) {
					inputName.text = inputName.text.slice(0, -1);
				}
			}
		});


	})

	scene('rank', () =>{

		const music = play("rank")
		volume(0.5)
		music.loop = true;
		function addButton(txt, p, f) {

			// add a parent background object
			const btn = add([
				rect(350, 80, { radius: 8 }),
				pos(p),
				area(),
				scale(1),
				anchor("center"),
				outline(4),
			])

			// add a child object that displays the text
			btn.add([
				text(txt),
				anchor("center"),
				color(0, 0, 0),
			])

			// onHoverUpdate() comes from area() component
			// it runs every frame when the object is being hovered
			btn.onHoverUpdate(() => {
				const t = time() * 10
				btn.color = hsl2rgb((t / 10) % 1, 0.6, 0.7)
				btn.scale = vec2(1.2)
				setCursor("pointer")
			})

			// onHoverEnd() comes from area() component
			// it runs once when the object stopped being hovered
			btn.onHoverEnd(() => {
				btn.scale = vec2(1)
				btn.color = rgb()
			})

			// onClick() comes from area() component
			// it runs once when the object is clicked
			btn.onClick(f)

			return btn

		}

		addButton("Jogar", vec2(200, 100), () => {
			music.paused = true;
			go("game")
		})

		const fonts = [
			"monospace",
			"4x4",
			"unscii",
			"FlowerSketches",
			"apl386",
			"Sans-Serif",
		]
		let curFont = 0
		let curSize = 92
		const pad = 24

		const input = add([
			pos(pad),
			text("Melhores Jogadores", {
				// What font to use
				font: fonts[curFont],
				// It'll wrap to next line if the text width exceeds the width option specified here
				width: width() - pad * 2,
				// The height of character
				size: curSize,
				// Text alignment ("left", "center", "right", default "left")
				align: "center",
				lineSpacing: 8,
				letterSpacing: 4,
				// Transform each character for special effects
				transform: (idx, ch) => ({
					color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
					pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
					scale: wave(1, 1.2, time() * 3 + idx),
					angle: wave(-9, 9, time() * 3 + idx),
				}),
			})
		])

		const textbox = add([
			rect(width() / 2, height(), { radius: 32 }),
			anchor("center"),
			pos(center().x, height() - 350),
			outline(4),
		])

		const txt = add([
			text("", { size: 30, width: 500, align: "left" }),
			pos(700, 180),
			anchor("topleft"),
			color(0, 0, 0),
		])

		const db = getDatabase();
		const topUserPostsRef = query(ref(db, 'users/'), orderByChild('score'));

		onValue(topUserPostsRef, (snapshot) => {
			const data = snapshot.val();
			if(data){
				const sortedUsers = Object.keys(data).sort((a, b) => data[b].score - data[a].score)
					.reduce((obj, key) => {
						obj[key] = data[key];
						return obj;
					}, {});
				Object.keys(sortedUsers).forEach((key, index) =>{
					txt.text += `${index + 1} - ${sortedUsers[key].username}: ${sortedUsers[key].score}\n\n`
				})
			}else{
				txt.text = ''
			}

		});
	})

	go("menu")
}

