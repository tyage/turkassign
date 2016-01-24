import { fetchAvailableTaskSet, fetchTaskSet, finishTask } from './task-manager';

// expose task manager
window.finishTask = finishTask;
window.fetchAvailableTaskSet = fetchAvailableTaskSet;
window.fetchTaskSet = fetchTaskSet;
