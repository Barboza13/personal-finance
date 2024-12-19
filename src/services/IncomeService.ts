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
   * Get income by index.
   * @param incomeIndex The index of income to be sought.
   * @returns {Income | null} Returns the entry if found or null if not found.
   */
  getIncomeByIndex(incomeIndex: number): Income | null {
    const income = this.incomes.find((_, index) => index === incomeIndex)
    return income ?? null
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
   * Update income through your index.
   * @param income Income to updated.
   * @param index Index of income to updated.
   */
  updateIncome(income: Income, index: number): void {
    this.incomes[index] = income
    localStorage.setItem(this.INCOME_KEY, JSON.stringify(this.incomes))
  }

  /**
   * Delete income through your index.
   * @param incomeIndex Income index.
   */
  deleteIncome(incomeIndex: number): void {
    this.incomes = this.incomes.filter((income, index) => index != incomeIndex)
    localStorage.setItem(this.INCOME_KEY, JSON.stringify(this.incomes))
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
