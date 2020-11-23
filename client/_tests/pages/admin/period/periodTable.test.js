import PeriodTableComponent from '../../../../pages/admin/period/periodTable'
import { buildComponent } from '../../../tools/helper'

const defaultProps = {
  periods: [
    { id: 1, title: '2020 1H', start: '', end: '' },
    { id: 2, title: '2020 2H', start: '', end: '' },
    { id: 3, title: '2021 1H', start: '', end: '' },
  ],
  handleUpdatePeriod: () => {},
  handleInputChange: () => {},
  init: () => {},
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(PeriodTableComponent, defaultProps, 'mount')
    expect(wrapper.find('thead').length).toBe(1)
    expect(wrapper.find('tbody').length).toBe(1)
    expect(wrapper.find('th').length).toBe(4)
    expect(wrapper.find('td').length).toBe(12)
  })
})
