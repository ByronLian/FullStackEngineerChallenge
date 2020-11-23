import ModalEmployeeComponent from '../../../common/modal/employee'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  user: {},
  handleInputChange: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ModalEmployeeComponent, defaultProps)
    expect(wrapper.find('FormLabel').length).toBe(4)
  })
})
