import { Component, signal, computed } from '@angular/core';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: 'Incantesimi' | 'Creature' | 'Storia e Luoghi' | 'Pozioni';
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css' 
})

export class AppComponent {
  // Database delle domande categorizzate su Harry Potter
  questions: Question[] = [
    { id: 1, text: "Qual è il Patronus di Hermione Granger?", options: ["Lontra", "Gatto", "Lepre", "Cigno"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 2, text: "Come si chiama la prigione dei maghi?", options: ["Azkaban", "Nurmengard", "Argo", "Gringott"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 3, text: "Quale pozione conferisce una fortuna sfacciata?", options: ["Polisucco", "Felix Felicis", "Veritaserum", "Amortentia"], correctAnswer: 1, category: 'Pozioni' },
    { id: 4, text: "Chi è il custode delle chiavi e dei luoghi a Hogwarts?", options: ["Argus Gazza", "Rubeus Hagrid", "Albus Silente", "Severus Piton"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 5, text: "Quale creatura si nasconde nella Camera dei Segreti?", options: ["Un Acromantula", "Un Basilisco", "Un Molliccio", "Un Ippogrifo"], correctAnswer: 1, category: 'Creature' },
    { id: 6, text: "Qual è il nome completo di Voldemort da ragazzo?", options: ["Tom Marvolo Riddle", "Gellert Grindelwald", "Lucius Malfoy", "Sirius Black"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 7, text: "Quanti sono i Doni della Morte?", options: ["Sette", "Tre", "Quattro", "Cinque"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 8, text: "Di quale casa di Hogwarts fa parte Luna Lovegood?", options: ["Grifondoro", "Serpeverde", "Tassorosso", "Corvonero"], correctAnswer: 3, category: 'Storia e Luoghi' },
    { id: 9, text: "Qual es l'incantesimo per disarmare un avversario?", options: ["Avada Kedavra", "Crucio", "Expelliarmus", "Stupeficium"], correctAnswer: 2, category: 'Incantesimi' },
    { id: 10, text: "Come si chiama la civetta di Harry Potter?", options: ["Grattastinchi", "Edvige", "Crosta", "Leopold"], correctAnswer: 1, category: 'Creature' },
    { id: 11, text: "Quale binario si prende a King's Cross per Hogwarts?", options: ["Binario 8", "Binario 9", "Binario 9 e 3/4", "Binario 10"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 12, text: "Chi uccide formalmente Albus Silente?", options: ["Draco Malfoy", "Lord Voldemort", "Severus Piton", "Bellatrix Lestrange"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 13, text: "Qual è la forma del Patronus di Harry?", options: ["Cervo", "Cane", "Lupo", "Fenice"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 14, text: "Chi è il padrino di Harry Potter?", options: ["Remus Lupin", "Sirius Black", "Rubeus Hagrid", "Arthur Weasley"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 15, text: "Quale animale rappresenta la casa di Tassorosso?", options: ["Leone", "Tasso", "Aquila", "Serpente"], correctAnswer: 1, category: 'Creature' },
    { id: 16, text: "Quale pozione costringe a dire la verità?", options: ["Felix Felicis", "Veritaserum", "Polisucco", "Soluzione Amore"], correctAnswer: 1, category: 'Pozioni' },
    { id: 17, text: "Chi è lo Spirito Guida (Fantasma) di Grifondoro?", options: ["Il Barone Sanguinario", "Il Frate Grasso", "Nick-Quasi-Senza-Testa", "La Dama Grigia"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 18, text: "Come si chiama la gatta di Argus Gazza?", options: ["Mrs. Purr", "Zanna", "Norberto", "Grattastinchi"], correctAnswer: 0, category: 'Creature' },
    { id: 19, text: "Chi ha scritto 'Storia di Hogwarts'?", options: ["Bathilda Bagshot", "Gilderoy Allock", "Newt Scamander", "Adalbert Incant"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 20, text: "In cosa si trasforma il Molliccio di Remus Lupin?", options: ["Un Dissennatore", "La Luna Piena", "Un Lupo Mannaro", "Una Bara"], correctAnswer: 1, category: 'Creature' },
    { id: 21, text: "Quale pozione usa Harry per battere lumacorno al primo giorno?", options: ["Distillato della Morte Vivente", "Elisir di Lunga Vita", "Polisucco", "Felix Felicis"], correctAnswer: 0, category: 'Pozioni' },
    { id: 22, text: "Chi era l'erede di Serpeverde che aprì la camera 50 anni prima?", options: ["Lucius Malfoy", "Tom Riddle", "Rubeus Hagrid", "Sirius Black"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 23, text: "Come si chiama lo sport più famoso del mondo magico?", options: ["Quidditch", "Gobbiglie", "Quadball", "Volovolo"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 24, text: "Quale nucleo si trova dentro la bacchetta di Harry?", options: ["Criniera di Unicorno", "Corda di Cuore di Drago", "Piuma di Fenice", "Capello di Veela"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 25, text: "Chi è il primo Horcrux distrutto da Harry?", options: ["Il diario di Tom Riddle", "L'anello di Gaunt", "Il medaglione", "La coppa"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 26, text: "Qual è il vero mestiere dei genitori di Hermione Granger?", options: ["Medici", "Dentisti", "Insegnanti", "Avvocati"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 27, text: "Come si chiama il villaggio magico vicino a Hogwarts?", options: ["Diagon Alley", "Hogsmeade", "Godric's Hollow", "Little Whinging"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 28, text: "Quale drago affronta Harry nella prima prova del Torneo Tremaghi?", options: ["Ungaro Spinato", "Dorsorugoso Norvegese", "Petardo Cinese", "Galles Verde"], correctAnswer: 0, category: 'Creature' },
    { id: 29, text: "Di chi è l'elfo domestico Dobby all'inizio?", options: ["Dei Black", "Dei Malfoy", "Dei Lestrange", "Di Silente"], correctAnswer: 1, category: 'Creature' },
    { id: 30, text: "Quale incantesimo fa levitare gli oggetti?", options: ["Alohomora", "Wingardium Leviosa", "Lumox", "Nox"], correctAnswer: 1, category: 'Incantesimi' },
    { id: 31, text: "Chi è Lunastorta tra i Malandrini?", options: ["James Potter", "Sirius Black", "Peter Minus", "Remus Lupin"], correctAnswer: 3, category: 'Storia e Luoghi' },
    { id: 32, text: "Chi è Ramososo tra i Malandrini?", options: ["James Potter", "Sirius Black", "Peter Minus", "Remus Lupin"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 33, text: "Chi è Felpato tra i Malandrini?", options: ["James Potter", "Sirius Black", "Peter Minus", "Remus Lupin"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 34, text: "Chi è Codaliscia tra i Malandrini?", options: ["James Potter", "Sirius Black", "Peter Minus", "Remus Lupin"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 35, text: "Qual è la parola d'ordine per aprire la Mappa del Malandrino?", options: ["Giuro solennemente di non avere buone intenzioni", "Fatto il misfatto", "Alohomora", "Apritevi sesamo"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 36, text: "Qual è la formula per chiudere la Mappa del Malandrino?", options: ["Fatto il misfatto", "Nox", "Sparisci", "Chiuditi"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 37, text: "Chi sostituisce Cornelius Caramell come Ministro della Magia?", options: ["Rufus Scrimgeour", "Pius O'Toole", "Kingsley Shacklebolt", "Dolores Umbridge"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 38, text: "Come si chiama la pozione d'amore più potente del mondo?", options: ["Amortentia", "Felix Felicis", "Polisucco", "Veritaserum"], correctAnswer: 0, category: 'Pozioni' },
    { id: 39, text: "Quale dei fratelli Weasley studia i draghi in Romania?", options: ["Charlie", "Bill", "Percy", "Ron"], correctAnswer: 0, category: 'Creature' },
    { id: 40, text: "Chi sposa Fleur Delacour?", options: ["Bill Weasley", "Charlie Weasley", "Harry Potter", "Cedric Diggory"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 41, text: "In quale libro/anno compare per la prima volta Luna Lovegood?", options: ["Il calice di fuoco", "L'ordine della Fenice", "Il principe mezzosangue", "Il prigioniero di Azkaban"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 42, text: "Chi custodisce la spada di Grifondoro nella camera blindata di Bellatrix?", options: ["Un falso magico", "Un elfo domestico", "Un Dissennatore", "Un drago"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 43, text: "Quante palle ci sono in una partita di Quidditch?", options: ["Tre", "Quattro", "Cinque", "Sette"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 44, text: "Quale palla fa terminare la partita si catturata?", options: ["Pluffa", "Bolide", "Boccino d'Oro", "Lenza"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 45, text: "Quanti punti vale la cattura del Boccino d'Oro?", options: ["50", "150", "100", "200"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 46, text: "Chi è l'insegnante di Divinazione a Hogwarts?", options: ["Sibilla Cooman", "Minerva McGranitt", "Pomona Sprite", "Aurora Sinistra"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 47, text: "Quale Animagus è Rita Skeeter?", options: ["Uno scarabeo", "Un gatto", "Un topo", "Un cane"], correctAnswer: 0, category: 'Creature' },
    { id: 48, text: "Qual è il secondo nome di Harry Potter?", options: ["James", "Albus", "Sirius", "Arthur"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 49, text: "Cosa usa Silente per spegnere i lampioni nella prima scena?", options: ["Deluminatore", "Bacchetta di Sambuco", "Ricordella", "Giratempo"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 50, text: "Quale creatura tira le carrozze di Hogwarts?", options: ["Ippogrifi", "Thestral", "Centauri", "Ippocampo"], correctAnswer: 1, category: 'Creature' },
    { id: 51, text: "Chi è lo sposo di Cho Chang secondo i libri?", options: ["Harry Potter", "Cedric Diggory", "Dudley Dursley", "Michael Corner"], correctAnswer: 3, category: 'Storia e Luoghi' },
    { id: 52, text: "Quale Horcrux viene distrutto con la zanna di Basilisco?", options: ["Il Diario", "L'Anello", "Il Medaglione", "La Coppa"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 53, text: "Quale creatura affronta Remus Lupin sul treno?", options: ["Un Dissennatore", "Un Molliccio", "Un Lupo Mannaro", "Un Avvincino"], correctAnswer: 0, category: 'Creature' },
    { id: 54, text: "Quale pozione deve bere Lupin?", options: ["Pozione Antilupo", "Felix Felicis", "Essenza di Dittamo", "Soluzione Rinvigorente"], correctAnswer: 0, category: 'Pozioni' },
    { id: 55, text: "Come si chiama l'albero violento di Hogwarts?", options: ["Salice Schiaffeggiatore", "Platano Picchiatore", "Quercia Ruggente", "Pino Pungente"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 56, text: "Di cosa è fatta la bacchetta di sambuco?", options: ["Crine di Unicorno", "Piuma di Thestral", "Cuore di Drago", "Piuma di Fenice"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 57, text: "Qual è la forma del Patronus di Severus Piton?", options: ["Cerva", "Cervo", "Lupo", "Pipistrello"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 58, text: "Chi è il Principe Mezzosangue?", options: ["Voldemort", "Silente", "Severus Piton", "Lumacorno"], correctAnswer: 2, category: 'Storia e Luoghi' },
    { id: 59, text: "In quale negozio si nasconde Draco?", options: ["Borgin e Burkes", "Serrature e Chiavi", "Il Calderone Inox", "Mondomago"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 60, text: "Quale orecchio perde George Weasley?", options: ["Sinistro", "Destro", "Nessuno", "Entrambi"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 61, text: "Chi ferisce George Weasley?", options: ["Severus Piton", "Voldemort", "Bellatrix", "Lucius"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 62, text: "Quale incantesimo colpisce George per errore?", options: ["Sectumsempra", "Avada Kedavra", "Crucio", "Diffindo"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 63, text: "Come si chiama il cane a tre teste di Hagrid?", options: ["Fuffi", "Zanna", "Norberto", "Aragog"], correctAnswer: 0, category: 'Creature' },
    { id: 64, text: "Quale animale era Norberto?", options: ["Dorsorugoso Norvegese", "Ungaro Spinato", "Petardo Cinese", "Galles Verde"], correctAnswer: 0, category: 'Creature' },
    { id: 65, text: "Chi è il proprietario del medaglione originario?", options: ["Merope", "Salazar Serpeverde", "Smith", "Tom Riddle"], correctAnswer: 1, category: 'Storia e Luoghi' },
    { id: 66, text: "Quale fantasma infesta il bagno delle ragazze?", options: ["Mirtilla Malcontenta", "La Dama Grigia", "Il Barone Sanguinario", "Peeves"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 67, text: "Quale incantesimo allontana i Dissennatori?", options: ["Expecto Patronum", "Riddikulus", "Stupeficium", "Impedimenta"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 68, text: "Chi vince la Coppa del Mondo nel 4° libro?", options: ["Irlanda", "Bulgaria", "Inghilterra", "Perù"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 69, text: "Chi cattura il boccino d'oro alla finale?", options: ["Viktor Krum", "Ludo Bagman", "Cedric", "Harry"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 70, text: "Chi si è mascherato da Alastor Moody?", options: ["Bartemius Crouch Jr.", "Igor Karkaroff", "Peter Minus", "Severus Piton"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 71, text: "Come muore Bartemius Crouch Sr.?", options: ["Ucciso dal figlio", "Ucciso da Voldemort", "Ucciso da Dissennatore", "Malattia"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 72, text: "Quale creatura distrugge la gamba di Moody?", options: ["Non viene distrutta", "Dissennatore", "Lupo mannaro", "Horcrux"], correctAnswer: 0, category: 'Creature' },
    { id: 73, text: "Qual è il numero di Grimmauld Place?", options: ["Numero 12", "Numero 10", "Numero 4", "Numero 7"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 74, text: "Chi è l'elfo domestico della famiglia Black?", options: ["Kreacher", "Dobby", "Winky", "Hokey"], correctAnswer: 0, category: 'Creature' },
    { id: 75, text: "Chi uccide Sirius Black?", options: ["Bellatrix Lestrange", "Lucius Malfoy", "Lord Voldemort", "Severus Piton"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 76, text: "In cosa si trasforma la coppa di Tassorosso?", options: ["Un Horcrux", "Un Portachiavi", "Una Passaporta", "Calice"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 77, text: "Chi distrugge la tazza di Tassorosso?", options: ["Hermione Granger", "Ron Weasley", "Harry Potter", "Neville Paciock"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 78, text: "Quale oggetto distrugge la coppa?", options: ["Zanna di Basilisco", "Spada Grifondoro", "Ardemonio", "Idolo"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 79, text: "Qual è il negozio di scherzi dei gemelli Weasley?", options: ["Tiri Vispi Weasley", "Scherzi da Maghi", "Zonko", "Emporio Mago"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 80, text: "Dove si trova l'ingresso per Diagon Alley?", options: ["Dietro il Paiolo Magico", "Sotto metropolitana", "King's Cross", "Nocturn Alley"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 81, text: "Quale stanza appare solo quando serve?", options: ["Stanza delle Necessità", "Camera Segreti", "Ufficio Preside", "Torre Astronomia"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 82, text: "Chi rivela a Voldemort la profezia?", options: ["Severus Piton", "Peter Minus", "Lucius Malfoy", "Bellatrix Lestrange"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 83, text: "Chi distrugge Nagini?", options: ["Neville Paciock", "Ron Weasley", "Hermione Granger", "Harry Potter"], correctAnswer: 0, category: 'Creature' },
    { id: 84, text: "Quale arma taglia la testa a Nagini?", options: ["La spada di Grifondoro", "Zanna Basilisco", "Incantesimo taglio", "Bacchetta sambuco"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 85, text: "Qual è il nome della madre di Voldemort?", options: ["Merope Gaunt", "Lily Potter", "Petunia", "Hepzibah Smith"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 86, text: "Come si inviano i messaggi segreti nell'Ordine?", options: ["Fanny", "Gufo", "Patrono", "Lettera Volante"], correctAnswer: 2, category: 'Incantesimi' },
    { id: 87, text: "Qual è l'indirizzo dei Dursley?", options: ["Privet Drive 4", "Grimmauld Place 12", "Spinner's End", "Godric's Hollow"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 88, text: "Quale regalo fa Hagrid a Harry?", options: ["Edvige", "Nimbus 2000", "Mappa Malandrino", "Un libro"], correctAnswer: 0, category: 'Creature' },
    { id: 89, text: "Quale incantesimo cancella la memoria?", options: ["Oblivion", "Alohomora", "Sectumsempra", "Crucio"], correctAnswer: 0, category: 'Incantesimi' },
    { id: 90, text: "Chi viene pietrificato dal Basilisco?", options: ["Justin e Nick", "McGranitt", "Allock", "Piton"], correctAnswer: 0, category: 'Creature' },
    { id: 91, text: "Come si chiama il fratello di Albus Silente?", options: ["Aberforth", "Gellert", "Aurelius", "Percival"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 92, text: "Chi gestisce la Gringott?", options: ["I Folletti", "Gli Elfi Domestici", "I Centauri", "I Maghi Oscuri"], correctAnswer: 0, category: 'Creature' },
    { id: 93, text: "Quale incantesimo repara gli occhiali?", options: ["Reparo", "Oculus Reparo", "Diffindo", "Tergeo"], correctAnswer: 1, category: 'Incantesimi' },
    { id: 94, text: "Di chi era originariamente Grattastinchi?", options: ["Nessuno, comprato al serraglio", "Ron", "Ginny", "Gemelli"], correctAnswer: 0, category: 'Creature' },
    { id: 95, text: "Qual è il drago più grande al mondo?", options: ["Dorsorugoso Norvegese", "Panciaferrato Ucraino", "Ungaro Spinato", "Dente di Vipera"], correctAnswer: 1, category: 'Creature' },
    { id: 96, text: "Chi estrae la spada dal cappello?", options: ["Harry Potter", "Neville Paciock", "Albus Silente", "Ron Weasley"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 97, text: "In quale animale si trasforma la McGranitt?", options: ["Gatto tigrato", "Cane", "Civetta", "Topo"], correctAnswer: 0, category: 'Creature' },
    { id: 98, text: "Quale Dono apparteneva ai Gaunt?", options: ["Pietra Resurrezione", "Mantello Invisibilità", "Bacchetta Sambuco", "Diario"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 99, text: "Chi rompe l'armadio svanitore?", options: ["Peeves", "Draco Malfoy", "Harry Potter", "Montague"], correctAnswer: 0, category: 'Storia e Luoghi' },
    { id: 100, text: "Qual è l'ultima parola di Voldemort?", options: ["Avada Kedavra", "Harry", "Piton", "Morirai"], correctAnswer: 0, category: 'Incantesimi' }

  ];

  // Gestione dello stato tramite Angular Signals
  currentQuestionIndex = signal<number>(0);
  selectedAnswer = signal<number | null>(null);
  score = signal<number>(0);
  quizComplete = signal<boolean>(false);
  
  // Timer Signals
  timeLeft = signal<number>(15);
  timerInterval: any;

  // Sistema di Vite e Difficoltà
  lives = signal<number>(3);
  maxLives = signal<number>(3); 
  gameStarted = signal<boolean>(false);
  currentDifficulty = signal<string>('Mago');

  // Pool di domande per scorrimento infinito
  endlessQuestions: Question[] = [];

  // Registro storico risposte per calcolare i grafici statistici
  gameHistory = signal<{ correct: boolean; category: string; timeTaken: number }[]>([]);

  // Signals derivati (Computed)
  currentQuestion = computed(() => this.endlessQuestions[this.currentQuestionIndex()]);
  isGameOver = computed(() => this.lives() <= 0);

  // Calcola dinamicamente il tempo (riduce di 1s ogni 5 risposte esatte, minimo 3)
  dynamicBaseTime = computed(() => {
    let startingTime = this.currentDifficulty() === 'Babbano' ? 20 : this.currentDifficulty() === 'Auror' ? 8 : 15;
    let speedBonus = Math.floor(this.score() / 5);
    let finalTime = startingTime - speedBonus;
    return finalTime < 3 ? 3 : finalTime;
  });

  // Metriche calcolate reattivamente ad ogni clic dell'utente
  averageResponseTime = computed(() => {
    const history = this.gameHistory();
    if (history.length === 0) return 0;
    const totalTime = history.reduce((sum, item) => sum + item.timeTaken, 0);
    return Math.round((totalTime / history.length) * 10) / 10;
  });

  accuracyPercentage = computed(() => {
    const history = this.gameHistory();
    if (history.length === 0) return 0;
    return Math.round((this.score() / history.length) * 100);
  });

  categoryStats = computed(() => {
    const history = this.gameHistory();
    const categories = ['Incantesimi', 'Creature', 'Storia e Luoghi', 'Pozioni'];
    
    return categories.map(cat => {
      const catItems = history.filter(item => item.category === cat);
      const total = catItems.length;
      const correct = catItems.filter(item => item.correct).length;
      const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
      return { name: cat, percent, total };
    });
  });

  Math = Math;

  constructor() {
    this.generateEndlessPool();
  }

  generateEndlessPool(): void {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
    this.endlessQuestions = [...this.endlessQuestions, ...shuffled];
  }

  selectDifficulty(level: string): void {
    this.currentDifficulty.set(level);
    if (level === 'Babbano') { this.maxLives.set(5); this.lives.set(5); } 
    else if (level === 'Mago') { this.maxLives.set(3); this.lives.set(3); } 
    else if (level === 'Auror') { this.maxLives.set(1); this.lives.set(1); }
    this.gameStarted.set(true);
    this.startTimer();
  }

  startTimer(): void {
    this.clearIntervals();
    this.timeLeft.set(this.dynamicBaseTime());
    
    this.timerInterval = setInterval(() => {
      if (this.timeLeft() > 0 && this.selectedAnswer() === null) {
        this.timeLeft.update(time => time - 1);
      } else if (this.timeLeft() === 0 && this.selectedAnswer() === null) {
        this.selectedAnswer.set(-1); 
        this.clearIntervals();
        this.saveAnswerToHistory(false, this.dynamicBaseTime());
        this.handleWrongAnswer();
      }
    }, 1000);
  }

  clearIntervals(): void {
    if (this.timerInterval) { clearInterval(this.timerInterval); }
  }

  selectAnswer(index: number): void {
    if (this.selectedAnswer() !== null || this.timeLeft() === 0 || this.isGameOver()) return; 
    this.selectedAnswer.set(index);
    this.clearIntervals(); 

    const isCorrect = index === this.currentQuestion().correctAnswer;
    const timeTaken = this.dynamicBaseTime() - this.timeLeft();
    
    this.saveAnswerToHistory(isCorrect, timeTaken);

    if (isCorrect) {
      this.score.update(prev => prev + 1); 
    } else {
      this.handleWrongAnswer();
    }
  }

  saveAnswerToHistory(correct: boolean, timeTaken: number): void {
    this.gameHistory.update(history => [
      ...history, 
      { correct, category: this.currentQuestion().category, timeTaken }
    ]);
  }

  handleWrongAnswer(): void {
    this.lives.update(l => l - 1);
    if (this.isGameOver()) {
      this.clearIntervals();
      this.quizComplete.set(true);
    }
  }

  nextQuestion(): void {
    if (this.isGameOver()) {
      this.clearIntervals();
      this.quizComplete.set(true);
      return;
    }
    if (this.currentQuestionIndex() >= this.endlessQuestions.length - 5) {
      this.generateEndlessPool();
    }
    this.currentQuestionIndex.update(idx => idx + 1);
    this.selectedAnswer.set(null); 
    this.startTimer(); 
  }

  restartQuiz(): void {
    this.clearIntervals();
    this.endlessQuestions = []; 
    this.generateEndlessPool(); 
    this.gameHistory.set([]); 
    this.currentQuestionIndex.set(0);
    this.selectedAnswer.set(null);
    this.score.set(0);
    this.quizComplete.set(false);
    this.gameStarted.set(false); 
  }
}
