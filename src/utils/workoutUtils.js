export const determineWorkoutPlan = (answers, workoutPlans) => {
  const { goal, skill, style } = answers;
  
  if (goal === "Calisthenics Skills") {
    const skillKey = skill?.replace(/\s+/g, '')?.toLowerCase();
    const plan = workoutPlans.calisthenics[skillKey];
    if (!plan) {
      return `<div class="error-message">Workout plan for ${skill} is not available yet.</div>`;
    }
    return plan;
  }
  
  if (goal === "Build Muscle") {
    const styleKey = style?.toLowerCase().replace(/[- ]/g, '');
    return workoutPlans.beginner[styleKey] || workoutPlans.beginner.traditional;
  }
  
  return workoutPlans.beginner.traditional;
}; 