import TableComponent from '../../common/table'
import { buildComponent } from '../tools/helper'

const defaultProps = {
  classes: ['md_col', 'lg_col', ''],
  titles: ['A', 'B', 'C'],
  rows: [
    ['c1', 'c2', 'c3'],
    ['c4', 'c5', 'c6'],
  ],
}
describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(TableComponent, defaultProps)
    
    expect(wrapper.find('thead').length).toBe(1)
    expect(wrapper.find('tbody').length).toBe(1)
  })
})
