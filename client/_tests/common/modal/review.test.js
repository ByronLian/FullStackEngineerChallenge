import ModalReviewComponent from '../../../common/modal/review'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  review: {},
  disabled: false,
  handleCommentChange: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ModalReviewComponent, defaultProps)
    expect(wrapper.find('h5').length).toBe(1)
    expect(wrapper.find('FormGroup').length).toBe(1)
  })
})
