import { FabricObject, classRegistry, TPointerEventInfo, TPointerEvent, Rect } from '@fabric'
import type { GroupProps } from 'fabric/src/shapes/Group'
import { CommonGroup } from '@/core/canvas/shapes/commonGroup'
import { clone } from 'lodash'

export class Group extends CommonGroup {
  public subTargetCheck = true

  public interactive = false

  constructor(
    objects?: FabricObject[],
    options?: Partial<GroupProps>,
    objectsRelativeToGroup?: boolean,
  ) {
    super(objects, options, objectsRelativeToGroup)

    this.on('mousedblclick', this.doubleClickHandler.bind(this))
  }

  // 双击后启用interactive，离开组后关闭
  public doubleClickHandler(e: TPointerEventInfo<TPointerEvent>) {
    if (
      !this.canvas ||
      !e.target ||
      e.target !== this ||
      !e.subTargets ||
      e.subTargets.length === 0 ||
      this.interactive
    ) {
      return
    }

    const addDeselectedEvent = (target: FabricObject) => {
      target.once('deselected', () => {
        const activeObject = this.canvas?.getActiveObject()
        if (!activeObject || !activeObject.getAncestors(true).includes(this)) {
          // 关闭
          this.set({
            interactive: false,
            objectCaching: true,
          })
        } else {
          // 事件传递
          addDeselectedEvent(activeObject)
        }
      })
    }

    // 启用
    this.set({
      interactive: true,
      objectCaching: false,
    })

    addDeselectedEvent(e.target)

    const index = e.subTargets.indexOf(e.target)
    const prevTarget = e.subTargets[index - 1] ?? e.subTargets[e.subTargets.length - 1]
    this.canvas.setActiveObject(prevTarget)

    this.canvas.requestRenderAll()
  }

  // 空子元素，自动移除组本身
  override _onObjectRemoved(object: FabricObject, removeParentTransform?: boolean): void {
    super._onObjectRemoved(object, removeParentTransform)
    if (this.size() === 0) {
      const parent = this.getParent()
      parent && parent.remove(this)
    }
  }

  override render(ctx: CanvasRenderingContext2D) {
    this._transformDone = true
    super.render(ctx)

    if (this.stroke && this.strokeWidth !== 0) {
      ctx.save()
      this.transform(ctx)
      const obj = clone(this)
      obj.fill = ''
      Rect.prototype._render.call(obj, ctx)
      ctx.restore()
    }

    this._transformDone = false
  }
}

classRegistry.setClass(Group)
