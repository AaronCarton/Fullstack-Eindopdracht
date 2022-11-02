export const countDuplicates = (arr: string[]) => {
  return Object.entries(
    arr.reduce(
      (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
      {} as Record<string, number>,
    ),
  )
}
