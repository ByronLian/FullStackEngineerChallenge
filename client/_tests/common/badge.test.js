import BadgeComponent from '../../common/badge'
import { buildComponent } from '../tools/helper'

const defaultProps = {
  isClosed: true,
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(BadgeComponent, defaultProps)
    expect(wrapper.find('Badge').length).toBe(1)
  })
})
