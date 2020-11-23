import PageNotFoundComponent from '../../../pages/404/index'
import { buildComponent } from '../../tools/helper'

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(PageNotFoundComponent)
    
    expect(wrapper.find('Container').length).toBe(1)
    expect(wrapper.find('h1').length).toBe(1)
  })
})
