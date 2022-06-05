import { shallowMount } from '@vue/test-utils'
import Header from './Header.vue'

describe('Header', () => {
    it('renders correctly `BAR ADVISOR`', () => {
      const wrapper = shallowMount(Header)
      expect(wrapper.find('h1').text()).toEqual('Bar Advisor')
    })
  })