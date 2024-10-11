import { test, expect } from "@playwright/test";
import { mount } from "@vue/test-utils";
import TextInput from "../src/components/TextInput.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";

test.describe("TextInput Component", () => {
  test("should render correctly", async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: "Email",
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Enter your email",
        helpText: "Please enter a valid email address.",
        error: "",
      },
    });

    expect(wrapper.html()).toContain("Email");
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find("input").attributes("placeholder")).toBe(
      "Enter your email",
    );
  });

  test("should display error message when validation fails", async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: "Email",
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Enter your email",
        error: "Invalid email format",
      },
    });

    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).text()).toBe(
      "Invalid email format",
    );
  });

  test("should emit input events correctly", async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: "Email",
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Enter your email",
      },
    });

    await wrapper.find("input").setValue("test@example.com");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
      "test@example.com",
    ]);
  });

  test("should apply correct focus state", async () => {
    const wrapper = mount(TextInput, {
      props: {
        label: "Email",
        type: "email",
        id: "email",
        name: "email",
        placeholder: "Enter your email",
      },
    });

    await wrapper.find("input").trigger("focus");
    const input = wrapper.find("input");
    expect(input.element.style.boxShadow).toContain("rgba(59, 130, 246");
  });
});
