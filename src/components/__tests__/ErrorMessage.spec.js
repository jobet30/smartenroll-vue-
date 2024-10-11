import { test, expect } from "@playwright/test";
import { mount } from "@vue/test-utils";
import ErrorMessage from "../src/components/ErrorMessage.vue";

test.describe("ErrorMessage Component", () => {
  test("should display the error message", async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "This is an error!",
      },
    });

    expect(wrapper.text()).toContain("This is an error!");
  });

  test("should have proper styling", async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "This is an error!",
      },
    });

    const container = wrapper.find(".error-container");
    expect(container.exists()).toBe(true);
    expect(container.element.style.borderLeft).toContain(
      "solid rgb(248, 113, 113)",
    );
  });

  test("should display icon alongside error message", async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "This is an error!",
      },
    });

    const icon = wrapper.find(".error-icon");
    expect(icon.exists()).toBe(true);
  });

  test("should apply fade-in animation", async () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: "This is an error!",
      },
    });

    const container = wrapper.find(".error-container");
    expect(container.element.style.animation).toContain("fadeIn");
  });
});
