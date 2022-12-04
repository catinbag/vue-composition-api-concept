const PAGINATION_ITEMS = 10

export async function getPosts({ page, filters } = {}) {
  const url = new URL('https://jsonplaceholder.typicode.com/posts')
  Object.entries({
    page,
    userId: filters.userId
  }).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value)
    }
  })

  const res = await fetch(url).then(r => r.json())

  /* simple pagination patch */
  return res.slice((page - 1) * PAGINATION_ITEMS, page * PAGINATION_ITEMS)
}
