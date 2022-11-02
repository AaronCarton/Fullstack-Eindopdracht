export const DuplicateItemToString = (arr: string[]) => {
  return Object.entries(arr.reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {}))
}
