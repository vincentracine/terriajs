const create: any = require("react-test-renderer").create;
import React from "react";
import { act } from "react-dom/test-utils";
import Terria from "../../../../../lib/Models/Terria";
import ViewState from "../../../../../lib/ReactViewModels/ViewState";
import { ThemeProvider } from "styled-components";
import { terriaTheme } from "../../../../../lib/ReactViews/StandardUserInterface/StandardTheme";
import Compass from "../../../../../lib/ReactViews/Map/Navigation/Compass";
import { StyledIcon } from "../../../../../lib/ReactViews/Icon";

describe("Compass", function() {
  let terria: Terria;
  let viewState: ViewState;

  let testRenderer: any;

  beforeEach(function() {
    terria = new Terria({
      baseUrl: "./"
    });
    viewState = new ViewState({
      terria: terria,
      catalogSearchProvider: null,
      locationSearchProviders: []
    });
  });

  describe("with basic props", function() {
    it("renders", function() {
      act(() => {
        testRenderer = create(
          <ThemeProvider theme={terriaTheme}>
            <Compass
              onClose={() => {}}
              theme={terriaTheme}
              viewState={viewState}
              terria={terria}
            />
          </ThemeProvider>
        );
      });

      const icons = testRenderer.root.findAllByType(StyledIcon);
      expect(icons.length).toBeTruthy();
    });
  });
});