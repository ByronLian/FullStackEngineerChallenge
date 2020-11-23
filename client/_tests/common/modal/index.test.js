import React from 'react'
import ModalComponent from '../../../common/modal/index'
import { buildComponent } from '../../tools/helper'

const defaultProps = {
  hidden: false,
  show: false,
  block: true,
  hiddenSaveButton: false,
  init: () => {},
  onSave: () => {},
  size: '',
  buttonText: '',
  title: '',
  disabled: false,
  children: <></>,
}

describe('render', () => {
  test('it should render', () => {
    const wrapper = buildComponent(ModalComponent, defaultProps)
    expect(wrapper.find('Modal').length).toBe(1)
  })
})
