import type { Income } from '@interfaces/interfaces'

class IncomeService {
  private readonly INCOME_KEY: string = 'income'
  private incomes: Income[] = []

  constructor() {
    this.getDataFromLocalStorage()
  }

  /**
   *  Get incomes list.
   * @returns {Income[]} A incomes array.
   */
  getIncomes(): Income[] {
    return this.incomes
  }

  /**
   * Save new income.
   * @param income The income to save.
   */
  saveIncome(income: Income): void {
    let newIncomes = JSON.stringify([...this.incomes, income])
    localStorage.setItem(this.INCOME_KEY, newIncomes)

    this.getDataFromLocalStorage()
  }

  /**
   * Get data from localStorage.
   */
  getDataFromLocalStorage(): void {
    this.incomes = JSON.parse(localStorage.getItem(this.INCOME_KEY) ?? '[]')
  }
}

export default IncomeService
