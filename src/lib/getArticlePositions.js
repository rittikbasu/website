export function getArticlePositions(totalArticles) {
  const firstColumn = Math.min(Math.ceil(totalArticles / 3), totalArticles)
  let remainingItems = totalArticles - firstColumn
  const secondColumn = Math.min(Math.ceil(remainingItems / 2), remainingItems)
  const thirdColumn = remainingItems - secondColumn

  const result = []

  if (firstColumn > 0) {
    result.push([...Array(firstColumn).keys()].map((x) => x + 1))
  }

  if (secondColumn > 0) {
    result.push([...Array(secondColumn).keys()].map((x) => x + firstColumn + 1))
  }

  if (thirdColumn > 0) {
    result.push(
      [...Array(thirdColumn).keys()].map(
        (x) => x + firstColumn + secondColumn + 1
      )
    )
  }

  const columns = result
  const numRows = columns[0].length
  const positions = {}
  let count = 0
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < columns.length; j++) {
      count += 1
      const value = columns[j][i]
      if (value === undefined) break
      positions[count] = value
    }
  }

  return positions
}
