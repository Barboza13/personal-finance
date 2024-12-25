import type { Expense, Income, Record } from '@interfaces/interfaces'

/**
 * Sorts an record by date.
 * @param incomes - The incomes to sort.
 * @param expenses - The expenses to sort.
 * @returns {Record[]} Sorted records.
 */
export const sortRecordsByDate = (incomes?: Income[], expenses?: Expense[]): Record[] => {
  const record: Record[] = []
  record.push(...(incomes || []).map((item) => ({ item, type: 'income' })))
  record.push(...(expenses || []).map((item) => ({ item, type: 'expense' })))

  return record.sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
}
