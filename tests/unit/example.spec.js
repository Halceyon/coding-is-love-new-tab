import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Weather from '@/components/Weather.vue';

describe('Weather.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Weather, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
