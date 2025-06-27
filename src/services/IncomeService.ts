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
   * @returns {string} message.
   */
  saveIncome(income: Income): string {
    let newIncomes = JSON.stringify([...this.incomes, income])
    localStorage.setItem(this.INCOME_KEY, newIncomes)
    this.getDataFromLocalStorage()

    return '¡Registro guardado exitosamente!'
  }

  /**
   * Update income through your index.
   * @param income Income to updated.
   * @param index Index of income to updated.
   * @returns {string} message.
   */
  updateIncome(income: Income, index: number): string {
    this.incomes[index] = income
    localStorage.setItem(this.INCOME_KEY, JSON.stringify(this.incomes))

    return '¡Registro actualizado exitosamente!'
  }

  /**
   * Delete income through your index.
   * @param incomeIndex Income index.
   * @returns {string} message.
   */
  deleteIncome(incomeIndex: number): string {
    this.incomes = this.incomes.filter((income, index) => index != incomeIndex)
    localStorage.setItem(this.INCOME_KEY, JSON.stringify(this.incomes))
    this.getDataFromLocalStorage()

    return '¡Registro eliminado exitosamente!'
  }

  /**
   * Get data from localStorage.
   */
  getDataFromLocalStorage(): void {
    this.incomes = JSON.parse(localStorage.getItem(this.INCOME_KEY) ?? '[]')
  }
}

export default IncomeService
