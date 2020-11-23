import ToastComponent from '../../common/toast'
import { buildComponent } from '../tools/helper'

const defaultProps = {
  setShowToast: () => {},
  showToast: true,
  message: 'Updated',
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ToastComponent, defaultProps)
    expect(wrapper.find('Toast').length).toBe(1)
  })
})