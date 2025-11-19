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

  return record.sort(
    (left, right) => new Date(left.item.date).getTime() - new Date(right.item.date).getTime(),
  )
}

/**
 * Sorts an record by highest amount.
 * @param record record to sort.
 * @returns record sorted by highest amount.
 */
export const sortRecordsByHighestAmount = (record: Record[]): Record[] => {
  return record.sort((a, b) => b.item.amount - a.item.amount)
}

/**
 * Sorts an record by lowest amount.
 * @param record record to sort.
 * @returns record sorted by lowest amount.
 */
export const sortRecordsByLowestAmount = (record: Record[]): Record[] => {
  return record.sort((a, b) => a.item.amount - b.item.amount)
}

/**
 * Sorts an record by descending.
 * @param record record to sort.
 * @returns record sorted by descending.
 */
export const sortRecordsDescending = (record: Record[]): Record[] => {
  return record.sort((a, b) => new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
}

/**
 * Sorts an record by ascending.
 * @param record record to sort.
 * @returns reord sorted by ascending.
 */
export const sortRecordsAscending = (record: Record[]): Record[] => {
  return record.sort((a, b) => new Date(a.item.date).getTime() - new Date(b.item.date).getTime())
}
