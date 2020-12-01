import React from "react";
import { configure, shallow } from "enzyme"; // enzyme
import Adapter from "enzyme-adapter-react-16"; // enzyme

import Containers from "../src/components/tabs/Containers";

configure({ adapter: new Adapter() }); // enzyme

function shallowSetup() {
  const props = {
    runningList: [
      {
        block: "0B/0B",
        ID: "a802306eeac3",
        CPUPerc: "0.17%",
        MemPerc: "0.11%",
        MemUsage: "2.195MiB/1.944GiB",
        Name: "blissful_matsumoto",
        NetIO: "796B/0B",
        PIDs: "5",
      },
    ],
    stoppedList: [
      {
        Name: "zealous",
        ID: "c902ec744095",
        Img: "84c5f6e03bf0",
        Created: "2 days ago",
        name: "zealous_pare",
      },
    ],
  };
  const enzymeWrapper = shallow(<Containers {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe("Running containers are being rendered", () => {
  const { enzymeWrapper } = shallowSetup();
  it("Should render <div> tag that has class renderContainers in Running", () => {
    expect(enzymeWrapper.type()).toEqual("div");
    expect(enzymeWrapper.hasClass("renderContainers")).toEqual(true);
  });

  it("Should render the correct number of containers", () => {
    expect(enzymeWrapper.find(".containers").children().length).toEqual(1);
    expect(enzymeWrapper.find(".stopped-containers").children().length).toEqual(
      1
    );
  });
});

describe("It should render the exited containers", () => {
  const { enzymeWrapper } = shallowSetup();
  it("Should render <div> tag in Stopped", () => {
    expect(enzymeWrapper.type()).toEqual("div");
  });

  it("Should have className run-btn in Stopped component", () => {
    expect(
      enzymeWrapper.find(".stopped-button").props().children[0].props.className
    ).toEqual("run-btn");
  });

  it("ClassName run-btn in Stopped component have onClick function", () => {
    expect(
      enzymeWrapper.find(".stopped-button").props().children[0].props.onClick
    ).toBeDefined();
  });

  it("Should have className stop-btn in Stopped component", () => {
    expect(
      enzymeWrapper.find(".stopped-button").props().children[1].props.className
    ).toEqual("stop-btn");
  });

  it("ClassName stop-btn in Stopped component have onClick function", () => {
    expect(
      enzymeWrapper.find(".stopped-button").props().children[1].props.onClick
    ).toBeDefined();
  });
});
