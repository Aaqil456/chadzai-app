export const questions = [
  {
    id: 1,
    text: "What's your primary fitness goal?",
    options: ["Build Muscle", "Calisthenics Skills"]
  },
  {
    id: 2,
    text: "If choosing Calisthenics, which skill would you like to achieve?",
    options: ["Muscle Up", "Handstand", "Planche", "Front Lever", "Back Lever", "Human Flag"],
    conditional: (answers) => answers.goal === "Calisthenics Skills"
  },
  {
    id: 3,
    text: "If choosing Build Muscle, which training style interests you?",
    options: [
      "Traditional Bodybuilding",
      "Split Training",
      "Pyramid Training",
      "Superset",
      "Drop Set",
      "Giant Set",
      "Rest-Pause",
      "HIT",
      "Periodization",
      "Functional"
    ],
    conditional: (answers) => answers.goal === "Build Muscle"
  }
]; 