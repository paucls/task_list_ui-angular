export interface Task {
  /**
   * Unique identifier
   */
  id?: string;

  /**
   * Task name
   */
  name: string;

  /**
   * User that owns the task
   */
  userId?: string;

  /**
   * Indicates if the task is already done or not.
   */
  done: boolean;
}
