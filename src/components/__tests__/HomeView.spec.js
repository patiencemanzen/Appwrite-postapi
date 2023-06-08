import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Home from "../../views/HomeView.vue";

describe("Homepage Tests", () => {
  const wrapper = mount(Home);

  it("Socialite btns", () => {
    expect(wrapper.find(".socialites").exists()).toBeTruthy();
  });
});
