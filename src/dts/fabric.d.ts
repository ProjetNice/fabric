import type { AlignMethod } from 'app'
import type { FabricObject, Point, TPointerEventInfo, TPointerEvent, Rect } from '@fabric'
import type { FabricObjectProps as FabricObjectPropsOrigin } from 'fabric/src/shapes/Object/types/FabricObjectProps'
import type { GroupOwnProps } from 'fabric/src/shapes/Group'

export declare module 'fabric' {
  export declare type ObjectRef = Pick<
    FabricObject,
    | 'id'
    | 'name'
    | 'hideOnLayer'
    | 'originX'
    | 'originY'
    | 'top'
    | 'left'
    | 'width'
    | 'height'
    | 'scaleX'
    | 'scaleY'
    | 'flipX'
    | 'flipY'
    | 'opacity'
    | 'angle'
    | 'skewX'
    | 'skewY'
    | 'hoverCursor'
    | 'moveCursor'
    | 'padding'
    | 'borderColor'
    | 'borderDashArray'
    | 'cornerColor'
    | 'cornerStrokeColor'
    | 'cornerStyle'
    | 'cornerDashArray'
    | 'centeredScaling'
    | 'centeredRotation'
    | 'fill'
    | 'fillRule'
    | 'globalCompositeOperation'
    | 'backgroundColor'
    | 'selectionBackgroundColor'
    | 'stroke'
    | 'strokeWidth'
    | 'strokeDashArray'
    | 'strokeDashOffset'
    | 'strokeLineCap'
    | 'strokeLineJoin'
    | 'strokeMiterLimit'
    | 'shadow'
    | 'borderScaleFactor'
    | 'minScaleLimit'
    | 'selectable'
    | 'evented'
    | 'visible'
    | 'hasControls'
    | 'hasBorders'
    | 'perPixelTargetFind'
    | 'includeDefaultValues'
    | 'lockMovementX'
    | 'lockMovementY'
    | 'lockRotation'
    | 'lockScalingX'
    | 'lockScalingY'
    | 'lockSkewingX'
    | 'lockSkewingY'
    | 'lockScalingFlip'
    | 'excludeFromExport'
    | 'objectCaching'
    | 'noScaleCache'
    | 'strokeUniform'
    | 'dirty'
    | 'paintFirst'
    | 'activeOn'
    | 'colorProperties'
    | 'inverted'
    | 'absolutePositioned'
    | 'text'
    | 'charSpacing'
    | 'lineHeight'
    | 'fontSize'
    | 'fontWeight'
    | 'fontFamily'
    | 'fontStyle'
    | 'pathSide'
    | 'pathAlign'
    | 'underline'
    | 'overline'
    | 'linethrough'
    | 'textAlign'
    | 'direction'
  > &
    Pick<Rect, 'rx' | 'ry'>

  export declare class Canvas {
    _objects: FabricObject[]
    ref: {
      zoom: Ref<number>
      objects: ComputedRef<FabricObject[]>
    }
    forEachObject(
      callback: (object: FabricObject, index: number, array: FabricObject[]) => any,
    ): void
    getObjects(...types: string[]): FabricObject[]
    absolutePan(point: Point, skipSetCoords?: boolean): void
    relativePan(point: Point, skipSetCoords?: boolean): void
    zoomToPoint(point: Point, value: number, skipSetCoords?: boolean): void
  }

  export declare class ActiveSelection {
    multiSelectAdd(...targets: FabricObject[]): void
    getObjects(...types: string[]): FabricObject[]
    forEachObject(
      callback: (object: FabricObject, index: number, array: FabricObject[]) => any,
    ): void
  }

  declare type AlignFunction = {
    [K in AlignMethod]: () => void
  }

  export declare interface Object extends AlignFunction {
    align(method: AlignMethod): void
  }

  export declare class Group {
    id: string
    name: string
    canvas: Canvas | undefined
    group: this | undefined
    _objects: FabricObject[]
    setDirty(): void
    updateLayout(): void
    forEachObject(
      callback: (object: FabricObject, index: number, array: FabricObject[]) => any,
    ): void
    getObjects(): FabricObject[]
    onActiveTarget(target: FabricObject): void
    addDeselectedEvent(object: FabricObject): void
    doubleClickHandler(e: TPointerEventInfo<TPointerEvent>): void
  }

  export declare class Object {
    group: Group | undefined
    id: string
    name: string
    ref: ObjectRef
    getParent<T extends boolean = false>(
      strict?: T,
    ): T extends true ? Group | undefined : Group | Canvas | StaticCanvas
    /** 不发送 object:added 事件 */
    noEventObjectAdded: boolean
    getWidthHeight(noFixed?: boolean): Point
    getHeight(): number
    getWidth(): number
    getLeftTop(): Point
    getLeft(): number
    getTop(): number
    setHeight(height: number): void
    setWidth(width: number): void
    setAngle(angle: number): void
    setLeftTop(point: Point): void
    setLeft(left: number): void
    setTop(top: number): void
    toObject(propertiesToInclude?: any[]): any
    _type: string
    type: string
    isType<T = boolean>(...types: string[]): this is T
    /** 在图层上隐藏 */
    hideOnLayer: boolean
  }

  type ExportedKeys =
    | 'crossOrigin'
    | 'offsetX'
    | 'offsetY'
    | 'patternTransform'
    | 'repeat'
    | 'source'
    | 'fit'
  export declare type PatternOptions = Partial<Pick<Pattern, ExportedKeys>>

  export declare class Pattern {
    constructor(options?: PatternOptions)
    /** 契合度 */
    fit: 'fill' | 'padding' | 'clip' | 'repeat'
  }

  export declare class StaticCanvas {
    _objects: FabricObject[]
    getObjects(): FabricObject[]
  }

  export declare interface FabricObjectProps extends FabricObjectPropsOrigin {
    id: string
    name: string
  }

  export declare interface GroupProps extends FabricObjectProps, GroupOwnProps {}
}

export declare namespace fabric {
  export * from 'fabric'
}
