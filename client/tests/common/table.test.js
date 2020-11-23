import React from 'react'
import TableComponent from '../../common/table'
import { shallow } from 'enzyme'

function renderTable(args) {
  const defaultProps = {
    classes: ['md_col', 'lg_col', ''],
    titles: ['A', 'B', 'C'],
    rows: [
      ['c1', 'c2', 'c3'],
      ['c4', 'c5', 'c6'],
    ],
  }

  const props = { ...defaultProps, ...args }
  return shallow(<TableComponent {...props} />)
}

it('should render TableComponent', () => {
  const wrapper = renderTable()
  expect(wrapper.find('thead').length).toBe(1)
  expect(wrapper.find('tbody').length).toBe(1)
})
