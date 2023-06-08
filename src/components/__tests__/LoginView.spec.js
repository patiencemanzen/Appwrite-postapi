import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import LoginPage from "../../views/LoginView.vue";

describe("Loginpage Tests", () => {
  const wrapper = mount(LoginPage);

  it("Socialite btns", () => {
    expect(wrapper.find(".socialites").exists()).toBeTruthy();
  });
});
