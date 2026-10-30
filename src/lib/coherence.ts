export type FocusHabits = { attention: number; visualization: number; action: number };

// A transparent self-report average, not a neurological measurement.
export function coherenceScore(habits: FocusHabits) {
  return Math.round((habits.attention + habits.visualization + habits.action) / 3);
}

export function lowestHabit(habits: FocusHabits): keyof FocusHabits {
  return (Object.keys(habits) as Array<keyof FocusHabits>).reduce(
    (lowest, key) => habits[key] < habits[lowest] ? key : lowest,
    "attention",
  );
}