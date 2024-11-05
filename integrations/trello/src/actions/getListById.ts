import { wrapActionAndInjectServices } from 'src/utils'

export const getListById = wrapActionAndInjectServices<'getListById'>({
  async action({ input }, { listRepository }) {
    const { listId } = input

    const list = await listRepository.getListById(listId)
    return { list }
  },
  errorMessage: 'Failed to retrieve the list',
})
