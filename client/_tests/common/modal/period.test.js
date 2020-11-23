import ModalPeriodComponent from '../../../common/modal/period'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  period: {},
  handleInputChange: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ModalPeriodComponent, defaultProps)
    expect(wrapper.find('FormGroup').length).toBe(3)
  })
})
