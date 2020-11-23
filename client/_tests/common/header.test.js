import HeaderComponent from '../../common/header'
import { buildComponent } from '../tools/helper'

const defaultProps = {}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(HeaderComponent, defaultProps)
    expect(wrapper.find('header').length).toBe(1)
  })
})
