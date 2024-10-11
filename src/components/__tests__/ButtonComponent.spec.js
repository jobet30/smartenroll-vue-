import { test, expect } from "@playwright/test";
import { mount } from "@vue/test-utils";
import CustomButton from "../src/components/CustomButton.vue";

test.describe("CustomButton Component", () => {
  test("should render correctly with default props", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "Click Me",
      },
    });

    expect(wrapper.html()).toContain("Click Me");
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").attributes("type")).toBe("button");
    expect(wrapper.find("button").classes()).toContain("bg-blue-500");
  });

  test("should render with specified color and size", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "Submit",
        color: "green",
        size: "large",
      },
    });

    expect(wrapper.find("button").classes()).toContain("bg-green-500");
    expect(wrapper.find("button").classes()).toContain("px-5");
    expect(wrapper.find("button").classes()).toContain("py-3");
  });

  test("should show loading spinner when loading", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "Loading",
        isLoading: true,
      },
    });

    expect(wrapper.find("span.animate-spin").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("");
  });

  test("should emit click event when clicked", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "Click Me",
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()["click"]).toBeTruthy();
  });

  test("should not emit click event when disabled", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "Disabled",
        disabled: true,
      },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()["click"]).toBeUndefined();
  });

  test("should display icon correctly", async () => {
    const wrapper = mount(CustomButton, {
      props: {
        label: "With Icon",
        icon: "check",
      },
      slots: {
        icon: '<svg class="w-4 h-4" fill="none" stroke="currentColor"><path d="M12 2v20m10-10H2" /></svg>',
      },
    });

    expect(wrapper.find("span.mr-2").exists()).toBe(true);
    expect(wrapper.find("svg").exists()).toBe(true);
  });
});
