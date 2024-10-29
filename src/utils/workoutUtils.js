export const determineWorkoutPlan = (answers, workoutPlans) => {
  const { goal, skill, style } = answers;
  
  if (goal === "Build Muscle") {
    const styleKey = style?.toLowerCase().replace(/[- ]/g, '');
    return workoutPlans.beginner[styleKey] || workoutPlans.beginner.traditional;
  }
  
  if (goal === "Calisthenics Skills") {
    const skillKey = skill?.replace(/\s+/g, '')?.toLowerCase();
    return workoutPlans.calisthenics[skillKey] || workoutPlans.calisthenics.muscleUp;
  }
  
  return workoutPlans.beginner.traditional;
}; 