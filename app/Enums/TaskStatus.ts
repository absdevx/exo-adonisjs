/* eslint-disable prettier/prettier */
export enum TaskStatus {
  EN_COURS = "en cours",
  TERMINE = "terminé",
  ANNULE = "annulé",
}

export const TaskStatusList = [
  TaskStatus.ANNULE,
  TaskStatus.EN_COURS,
  TaskStatus.TERMINE,
];

export const TaskStatusLabels = {
  [TaskStatus.EN_COURS]: "En cours",
  [TaskStatus.TERMINE]: "Terminé",
  [TaskStatus.ANNULE]: "Annulé",
};
