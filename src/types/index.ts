// Строка уровня образования
export type Degree = {
    id: number,
    name: string,
}

// Строка сотрудника
export type Employee = {
    id: number,
    name: string,
    degree: number,
}
