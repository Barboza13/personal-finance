import type { Expense } from '@interfaces/interfaces'

class ExpenseService {
  private readonly EXPENSE_KEY: string = 'expense'
  private expenses: Expense[] = []

  constructor() {
    this.getDataFromLocalStorage()
  }

  /**
   *  Get expenses list.
   * @returns {Expense[]} A expense array.
   */
  getExpenses(): Expense[] {
    return this.expenses
  }

  /**
   * Get expense by index.
   * @param expenseIndex The index of expense to be sought.
   * @returns {Expense | null} Returns the entry if found or null if not found.
   */
  getExpenseByIndex(expenseIndex: number): Expense | null {
    const expense = this.expenses.find((_, index) => index === expenseIndex)
    return expense ?? null
  }

  /**
   * Save new expense.
   * @param expense The expense to save.
   */
  saveExpense(expense: Expense): void {
    let newExpenses = JSON.stringify([...this.expenses, expense])
    localStorage.setItem(this.EXPENSE_KEY, newExpenses)
    this.getDataFromLocalStorage()
  }

  /**
   * Update expense through your index.
   * @param expense Expense to updated.
   * @param index Index of expense to updated.
   */
  updateExpense(expense: Expense, index: number): void {
    this.expenses[index] = expense
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(this.expenses))
  }

  /**
   * Delete expense through your index.
   * @param expenseIndex Expense index.
   */
  deleteExpense(expenseIndex: number): void {
    this.expenses = this.expenses.filter((expense, index) => index != expenseIndex)
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(this.expenses))
    this.getDataFromLocalStorage()
  }

  /**
   * Get data from localStorage.
   */
  getDataFromLocalStorage(): void {
    this.expenses = JSON.parse(localStorage.getItem(this.EXPENSE_KEY) ?? '[]')
  }
}

export default ExpenseService
