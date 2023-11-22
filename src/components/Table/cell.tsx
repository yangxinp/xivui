import { VNode, h, mergeProps } from 'vue'
import { TableColumnData } from './_store'
import { unitOn } from '../../utils'

export const CellRender = ({
  tag,
  column,
  props,
  side,
  offset,
  shimLeft = 0,
  shimRight = 0,
  children
}: {
  tag: string,
  column: TableColumnData,
  props?: any,
  side?: boolean,
  offset?: number,
  shimLeft?: number,
  shimRight?: number,
  children?: VNode
}) => {
  const isFixLeft = column.fixed === 'left'
  const isFixRight = column.fixed === 'right'
  const isOffset = typeof offset === 'number'

  return h(tag, mergeProps(props, {
    class: [
      column.align ? 'is-' + column.align : '',
      {
        'front-fixed': isFixLeft,
        'front-fixed-last': isFixLeft && side,
        'behind-fixed-first': isFixRight && side,
        'behind-fixed': isFixRight,
      },
    ],
    style: {
      'left': (isFixLeft && isOffset) ? unitOn(offset + shimLeft) : undefined,
      'right': (isFixRight && isOffset) ? unitOn(offset + shimRight) : undefined
    }
  }), children)
}