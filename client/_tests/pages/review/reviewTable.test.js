import ReviewTableComponent from '../../../pages/review/reviewTable'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  reviews: [
    { is_closed: 1, title: 'aa', name: 'a', content: '111', start: '', end: '', updated_time: '' },
    { is_closed: 0, title: 'bb', name: 'b', content: '222', start: '', end: '', updated_time: '' },
    { is_closed: 0, title: 'vv', name: 'c', content: '333', start: '', end: '', updated_time: '' },
  ],
  handleUpdateComment: () => {},
  handleCommentChange: () => {},
  init: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ReviewTableComponent, defaultProps, 'mount')
    expect(wrapper.find('thead').length).toBe(1)
    expect(wrapper.find('tbody').length).toBe(1)
    expect(wrapper.find('th').length).toBe(7)
    expect(wrapper.find('td').length).toBe(21)
  })
})
