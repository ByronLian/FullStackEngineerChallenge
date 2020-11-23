import EmployeeTableComponent from '../../../../pages/admin/employee/employeeTable'
import { buildComponent } from '../../../tools/helper'

const defaultProps = {
  users: [
    { id: 1, first_name: 'A', last_name: 'user', email: 'a@test.com', role: 'user', active: 1 },
    { id: 2, first_name: 'B', last_name: 'user', email: 'b@test.com', role: 'user', active: 0 },
    { id: 3, first_name: 'C', last_name: 'user', email: 'c@test.com', role: 'user', active: 1 },
  ],
  handleUserUpdated: () => {},
  handleInputChange: () => {},
  init: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(EmployeeTableComponent, defaultProps, 'mount')
    expect(wrapper.find('thead').length).toBe(1)
    expect(wrapper.find('tbody').length).toBe(1)
    expect(wrapper.find('th').length).toBe(5)
    expect(wrapper.find('td').length).toBe(15)
  })
})
