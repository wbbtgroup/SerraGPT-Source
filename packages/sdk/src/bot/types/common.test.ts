import { MakeChannel, MakeIntegration } from '../../integration/types/generic'
import { test } from 'vitest'
import * as utils from '../../utils/type-utils'
import { BaseBot, MakeBot } from './generic'
import * as types from './common'

type FooBarBazIntegration = MakeIntegration<{
  actions: {
    doFoo: {
      input: {
        inputFoo: string
      }
      output: {
        outputFoo: string
      }
    }
    doBar: {
      input: {
        inputBar: number
      }
      output: {
        outputBar: number
      }
    }
    doBaz: {
      input: {
        inputBaz: boolean
      }
      output: {
        outputBaz: boolean
      }
    }
  }
  events: {
    onFoo: {
      eventFoo: string
    }
    onBar: {
      eventBar: number
    }
    onBaz: {
      eventBaz: boolean
    }
  }
  channels: {
    channelFoo: MakeChannel<{
      messages: {
        messageFoo: {
          foo: string
        }
      }
    }>
    channelBar: MakeChannel<{
      messages: {
        messageBar: {
          bar: number
        }
      }
    }>
    channelBaz: MakeChannel<{
      messages: {
        messageBaz: {
          baz: boolean
        }
      }
    }>
  }
}>

type FooBot = MakeBot<{
  integrations: {
    fooBarBaz: FooBarBazIntegration
  }
}>
type EmptyBot = MakeBot<{
  integrations: {}
  events: {}
  states: {}
}>

test('EnumerateActions should enumerate actions', () => {
  type Actual = types.EnumerateActions<FooBot>
  type Expected = {
    'fooBarBaz:doFoo': FooBarBazIntegration['actions']['doFoo']
    'fooBarBaz:doBar': FooBarBazIntegration['actions']['doBar']
    'fooBarBaz:doBaz': FooBarBazIntegration['actions']['doBaz']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateActions should return empty object if TBot is EmptyBot', () => {
  type Actual = types.EnumerateActions<EmptyBot>
  type Expected = {}

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateActions should return record if TBot is BaseBot', () => {
  type Actual = types.EnumerateActions<BaseBot>
  type Expected = { [key: string]: { input: any; output: any } }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateActionInputs should enumerate action inputs', () => {
  type Actual = types.EnumerateActionInputs<FooBot>
  type Expected = {
    'fooBarBaz:doFoo': FooBarBazIntegration['actions']['doFoo']['input']
    'fooBarBaz:doBar': FooBarBazIntegration['actions']['doBar']['input']
    'fooBarBaz:doBaz': FooBarBazIntegration['actions']['doBaz']['input']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateActionOutputs should enumerate action inputs', () => {
  type Actual = types.EnumerateActionOutputs<FooBot>
  type Expected = {
    'fooBarBaz:doFoo': FooBarBazIntegration['actions']['doFoo']['output']
    'fooBarBaz:doBar': FooBarBazIntegration['actions']['doBar']['output']
    'fooBarBaz:doBaz': FooBarBazIntegration['actions']['doBaz']['output']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateEvents should enumerate events', () => {
  type Bot = MakeBot<{
    integrations: {
      fooBarBaz: FooBarBazIntegration
    }
    events: {
      onQux: {
        eventQux: null
      }
    }
  }>
  type Actual = types.EnumerateEvents<Bot>
  type Expected = {
    'fooBarBaz:onFoo': FooBarBazIntegration['events']['onFoo']
    'fooBarBaz:onBar': FooBarBazIntegration['events']['onBar']
    'fooBarBaz:onBaz': FooBarBazIntegration['events']['onBaz']
    onQux: Bot['events']['onQux']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateEvents with only integration events should enumerate only integration events', () => {
  type Bot = MakeBot<{
    integrations: {
      fooBarBaz: FooBarBazIntegration
    }
    events: {}
  }>
  type Actual = types.EnumerateEvents<Bot>
  type Expected = {
    'fooBarBaz:onFoo': FooBarBazIntegration['events']['onFoo']
    'fooBarBaz:onBar': FooBarBazIntegration['events']['onBar']
    'fooBarBaz:onBaz': FooBarBazIntegration['events']['onBaz']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateEvents with only bot events should enumerate only bot events', () => {
  type Bot = MakeBot<{
    integrations: {}
    events: {
      onQux: {
        eventQux: null
      }
    }
  }>
  type Actual = types.EnumerateEvents<Bot>
  type Expected = {
    onQux: Bot['events']['onQux']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateEvents should return empty object if TBot is EmptyBot', () => {
  type Actual = types.EnumerateEvents<EmptyBot>
  type Expected = {}

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateEvents should return record if TBot is BaseBot', () => {
  type Actual = types.EnumerateEvents<BaseBot>
  type Expected = { [key: string]: any }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateChannels should enumerate channels', () => {
  type Actual = types.EnumerateChannels<FooBot>
  type Expected = {
    'fooBarBaz:channelFoo': FooBarBazIntegration['channels']['channelFoo']
    'fooBarBaz:channelBar': FooBarBazIntegration['channels']['channelBar']
    'fooBarBaz:channelBaz': FooBarBazIntegration['channels']['channelBaz']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateChannels should return empty object if TBot is EmptyBot', () => {
  type Actual = types.EnumerateChannels<EmptyBot>
  type Expected = {}

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateChannels should return record if TBot is BaseBot', () => {
  type Actual = types.EnumerateChannels<BaseBot>
  type Expected = BaseBot['integrations'][string]['channels']

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateMessages should enumerate messages', () => {
  type Actual = types.EnumerateMessages<FooBot>
  type Expected = {
    'fooBarBaz:channelFoo:messageFoo': FooBarBazIntegration['channels']['channelFoo']['messages']['messageFoo']
    'fooBarBaz:channelBar:messageBar': FooBarBazIntegration['channels']['channelBar']['messages']['messageBar']
    'fooBarBaz:channelBaz:messageBaz': FooBarBazIntegration['channels']['channelBaz']['messages']['messageBaz']
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateMessages should return empty object if TBot is EmptyBot', () => {
  type Actual = types.EnumerateMessages<EmptyBot>
  type Expected = {}

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('EnumerateMessages should return record if TBot is BaseBot', () => {
  type Actual = types.EnumerateMessages<BaseBot>
  type Expected = BaseBot['integrations'][string]['channels'][string]['messages']

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('GetMessages should return union of all channels per message', () => {
  type Bot = MakeBot<{
    integrations: {
      toto: MakeIntegration<{
        channels: {
          a: MakeChannel<{
            messages: {
              a: null
              x: string
            }
          }>
          b: MakeChannel<{
            messages: {
              b: null
              x: number
            }
          }>
          c: MakeChannel<{
            messages: {
              c: null
              x: boolean
            }
          }>
        }
      }>
    }
  }>
  type Actual = types.GetMessages<Bot>
  type Expected = {
    x: string | number | boolean // if we don't know the channel, x could be any of these types
    a: null
    b: null
    c: null
  }

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})

test('GetMessages should return record if TBot is BaseBot', () => {
  type Actual = types.GetMessages<BaseBot>
  type Expected = BaseBot['integrations'][string]['channels'][string]['messages']

  type _assertion = utils.AssertAll<
    [
      //
      utils.AssertExtends<Actual, Expected>,
      utils.AssertExtends<Expected, Actual>,
      utils.AssertTrue<utils.IsEqual<Actual, Expected>>
    ]
  >
})
