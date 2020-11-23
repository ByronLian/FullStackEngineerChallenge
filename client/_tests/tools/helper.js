import React from 'react'
import { shallow, mount, render } from 'enzyme'

export const buildComponent = (Component, props = {}, type = 'shallow') => {
  switch (type) {
    case 'render': {
      return render(<Component {...props} />)
    }

    case 'mount': {
      return mount(<Component {...props} />)
    }

    default: {
      return shallow(<Component {...props} />)
    }
  }
}
