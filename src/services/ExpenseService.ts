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
   * @returns {string} message.
   */
  saveExpense(expense: Expense): string {
    let newExpenses = JSON.stringify([...this.expenses, expense])
    localStorage.setItem(this.EXPENSE_KEY, newExpenses)
    this.getDataFromLocalStorage()

    return '¡Registro guardado exitosamente!'
  }

  /**
   * Update expense through your index.
   * @param expense Expense to updated.
   * @param index Index of expense to updated.
   * @returns {string} message.
   */
  updateExpense(expense: Expense, index: number): string {
    this.expenses[index] = expense
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(this.expenses))

    return '¡Registro actualizado exitosamente!'
  }

  /**
   * Delete expense through your index.
   * @param expenseIndex Expense index.
   * @returns {string} message.
   */
  deleteExpense(expenseIndex: number): string {
    this.expenses = this.expenses.filter((expense, index) => index != expenseIndex)
    localStorage.setItem(this.EXPENSE_KEY, JSON.stringify(this.expenses))
    this.getDataFromLocalStorage()

    return '¡Registro eliminado exitosamente!'
  }

  /**
   * Get data from localStorage.
   */
  getDataFromLocalStorage(): void {
    this.expenses = JSON.parse(localStorage.getItem(this.EXPENSE_KEY) ?? '[]')
  }
}

export default ExpenseService
