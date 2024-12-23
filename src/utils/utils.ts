import type { Expense, Income } from '@interfaces/interfaces'

/**
 * Sorts an record by date.
 * @param record record of income or expense.
 * @returns {string[]} sorted record.
 */
export const sortRecordByDate = (record: Income[] | Expense[]): Income[] | Expense[] => {
  return record.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
