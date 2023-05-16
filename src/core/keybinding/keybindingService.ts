import mousetrap, { ExtendedKeyboardEvent } from 'mousetrap'
import { createDecorator } from '@/core/instantiation/instantiation'
import { isArray, isFunction, isObject, isString } from 'lodash'
import { registerSingleton } from '@/core/instantiation/extensions'

export const IKeybindingService = createDecorator<KeybindingService>('keybindingServices')

type Callback = (e: ExtendedKeyboardEvent, combo: string) => boolean | void

export class KeybindingService extends mousetrap {
  declare readonly _serviceBrand: undefined

  constructor() {
    super()
  }

  /**
   * Overwrites default Mousetrap.bind method to optionally accept
   * an object to bind multiple key events in a single call
   *
   * You can pass it in like:
   *
   * Mousetrap.bind({
   *     'a': function() { console.log('a'); },
   *     'b': function() { console.log('b'); }
   * });
   *
   * And can optionally pass in 'keypress', 'keydown', or 'keyup'
   * as a second argument
   *
   */
  override bind(keys: string | string[], callback: Callback, action?: string): this
  override bind(keys: { [key: string]: Callback }, action?: string): this
  override bind(
    keys: string | string[] | { [key: string]: Callback },
    callbackOrAction?: string | Callback,
    action?: string,
  ) {
    if ((isString(keys) || isArray(keys)) && isFunction(callbackOrAction)) {
      return super.bind(keys, callbackOrAction, action)
    }

    if (isObject(keys) && !isArray(keys) && (!callbackOrAction || isString(callbackOrAction))) {
      for (const key in keys) {
        super.bind(key, keys[key], callbackOrAction)
      }
    }

    return this
  }
}

registerSingleton(IKeybindingService, KeybindingService)
