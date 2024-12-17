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
   * Save new expense.
   * @param expense The expense to save.
   */
  saveExpense(expense: Expense): void {
    let newExpenses = JSON.stringify([...this.expenses, expense])
    localStorage.setItem(this.EXPENSE_KEY, newExpenses)

    this.getDataFromLocalStorage()
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
