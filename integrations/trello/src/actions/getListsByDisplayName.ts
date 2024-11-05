import { wrapActionAndInjectServices } from 'src/utils'

export const getListsByDisplayName = wrapActionAndInjectServices<'getListsByDisplayName'>({
  async action({ input }, { listQueryService }) {
    const { boardId, listName } = input

    const matchingLists = await listQueryService.getListsByDisplayName(boardId, listName)
    return { lists: matchingLists }
  },
  errorMessage: 'Failed to retrieve the lists',
})
