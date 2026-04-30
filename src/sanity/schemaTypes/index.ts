import { type SchemaTypeDefinition } from 'sanity'
import { portfolioItem } from './portfolioItem'
import { serviceItem } from './serviceItem'
import { newsPost } from './newsPost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItem, serviceItem, newsPost],
}
