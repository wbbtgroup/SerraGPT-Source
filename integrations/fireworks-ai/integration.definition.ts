import { IntegrationDefinition, z } from '@botpress/sdk'
import { languageModelId } from 'src/schemas'
import llm from './bp_modules/llm'
import stt from './bp_modules/speech-to-text'

export default new IntegrationDefinition({
  name: 'fireworks-ai',
  title: 'Fireworks AI',
  version: '0.4.2',
  readme: 'hub.md',
  icon: 'icon.svg',
  configuration: {
    schema: z.any() as unknown as z.AnyZodObject, // TODO: remove this and bump a major
  },
  entities: {
    modelRef: {
      schema: z.object({
        id: languageModelId,
      }),
    },
    speechToTextModelRef: {
      schema: z.object({
        id: z.string(),
      }),
    },
  },
  secrets: {
    FIREWORKS_AI_API_KEY: {
      description: 'Fireworks AI API key',
    },
  },
})
  .extend(llm, ({ modelRef }) => ({ modelRef }))
  .extend(stt, ({ speechToTextModelRef }) => ({ speechToTextModelRef }))
