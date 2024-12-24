import type { Expense, Income, Record } from '@interfaces/interfaces'

/**
 * Sorts an record by date.
 * @param incomes - The incomes to sort.
 * @param expenses - The expenses to sort.
 * @returns {Record[]} Sorted records.
 */
export const sortRecordsByDate = (incomes: Income[], expenses: Expense[]): Record[] => {
  const record: Record[] = [
    ...incomes.map((income) => ({ item: income })),
    ...expenses.map((expense) => ({ item: expense })),
  ]

  return record.sort((a, b) => new Date(a.item.date).getTime() - new Date(b.item.date).getTime())
}
