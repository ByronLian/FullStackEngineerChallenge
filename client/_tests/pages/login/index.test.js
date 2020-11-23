import LoginComponent from '../../../pages/login/index'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  dispatch: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(LoginComponent, defaultProps)
    expect(wrapper.find('Container').length).toBe(1)
    expect(wrapper.find('Alert').length).toBe(1)
    expect(wrapper.find('FormGroup').length).toBe(3)
  })
})
