export interface Income {
  name: string
  amount: number
  date: string
}

export interface Expense {
  name: string
  amount: number
  date: string
}

export interface Record {
  item: Income | Expense
}

export interface Link {
  link: string
  text: string
}
