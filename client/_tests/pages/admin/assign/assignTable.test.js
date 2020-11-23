import AssignTableComponent from '../../../../pages/admin/assign/assignTable'
import { buildComponent } from '../../../tools/helper'

const defaultProps = {
  reviews: [
    { is_closed: 1, title: 'aa', name: 'a', content: '111', start: '', end: '', updated_time: '' },
    { is_closed: 0, title: 'bb', name: 'b', content: '222', start: '', end: '', updated_time: '' },
    { is_closed: 0, title: 'vv', name: 'c', content: '333', start: '', end: '', updated_time: '' },
  ],
  users: [
    { id: 1, first_name: 'A', last_name: 'user', email: 'a@test.com', role: 'user', active: 1 },
    { id: 2, first_name: 'B', last_name: 'user', email: 'b@test.com', role: 'user', active: 0 },
    { id: 3, first_name: 'C', last_name: 'user', email: 'c@test.com', role: 'user', active: 1 },
  ],
  handleSelectAuditor: () => {},
  handleAssignUser: () => {},
  init: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(AssignTableComponent, defaultProps, 'mount')
    expect(wrapper.find('thead').length).toBe(1)
    expect(wrapper.find('tbody').length).toBe(1)
    expect(wrapper.find('th').length).toBe(8)
    expect(wrapper.find('td').length).toBe(24)
  })
})
