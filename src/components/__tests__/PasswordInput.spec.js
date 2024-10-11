import { test, expect } from "@playwright/test";
import { mount } from "@vue/test-utils";
import PasswordInput from "../src/components/PasswordInput.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";

test.describe("PasswordInput Component", () => {
  test("should render correctly", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: "Password",
        id: "password",
        name: "password",
        modelValue: "",
        error: "",
      },
    });

    expect(wrapper.html()).toContain("Password");
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
  });

  test("should sanitize input correctly", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: "Password",
        id: "password",
        name: "password",
        modelValue: "",
        error: "",
      },
    });

    await wrapper.find("input").setValue("passw@rd!");

    expect(wrapper.vm.modelValue).toBe("password");
  });

  test("should toggle password visibility", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: "Password",
        id: "password",
        name: "password",
        modelValue: "",
        error: "",
      },
    });

    expect(wrapper.find("input").attributes("type")).toBe("password");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("text");
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("input").attributes("type")).toBe("password");
  });

  test("should display strength indicator correctly", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: "Password",
        id: "password",
        name: "password",
        modelValue: "",
        error: "",
      },
    });

    await wrapper.find("input").setValue("12345");
    expect(wrapper.vm.strength).toBe("weak");

    await wrapper.find("input").setValue("12345678");
    expect(wrapper.vm.strength).toBe("medium");

    await wrapper.find("input").setValue("StrongPassword123!");
    expect(wrapper.vm.strength).toBe("strong");
  });

  test("should display error message", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        label: "Password",
        id: "password",
        name: "password",
        modelValue: "",
        error: "Password is required",
      },
    });

    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).text()).toBe(
      "Password is required",
    );
  });
});
