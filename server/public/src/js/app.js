import { fetchAvailabeleTaskSet, fetchTaskSet, finishTask } from './task-manager';

// expose task manager
window.finishTask = finishTask;
window.fetchAvailabeleTaskSet = fetchAvailabeleTaskSet;
window.fetchTaskSet = fetchTaskSet;
