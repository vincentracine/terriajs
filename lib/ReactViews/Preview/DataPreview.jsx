"use strict";
import React from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Chart from "../Custom/Chart/Chart";
import Description, { getMetaDescriptionSummary } from "./Description";
import GroupPreview from "./GroupPreview";
import InvokeFunction from "../Analytics/InvokeFunction";
import MappablePreview from "./MappablePreview";
import ObserveModelMixin from "../ObserveModelMixin";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import Styles from "./data-preview.scss";

/**
 * Data preview section, for the preview map see DataPreviewMap
 */
const DataPreview = createReactClass({
  displayName: "DataPreview",
  mixins: [ObserveModelMixin],

  propTypes: {
    terria: PropTypes.object.isRequired,
    viewState: PropTypes.object,
    previewed: PropTypes.object,
    location: PropTypes.object.isRequired
  },

  backToMap() {
    this.props.viewState.explorerPanelIsVisible = false;
  },

  render() {
    const previewed = this.props.previewed;
    const appBaseUrl = this.props.terria.configParameters.appBaseUrl;
    const pathname = this.props.location && this.props.location.pathname;
    const pathForCanonical =
      pathname && pathname.charAt(0) === "/" ? pathname.slice(1) : pathname;
    let chartData;
    if (previewed && !previewed.isMappable && previewed.tableStructure) {
      chartData = previewed.chartData();
    }
    return (
      <div className={Styles.preview}>
        <If condition={previewed}>
          <Helmet>
            <title>
              {previewed.name} - {this.props.terria.appName}
            </title>
            <meta
              name="description"
              content={getMetaDescriptionSummary(previewed)}
            />
            <If condition={appBaseUrl && pathForCanonical}>
              <link rel="canonical" href={`${appBaseUrl}${pathForCanonical}`} />
            </If>
          </Helmet>
        </If>
        <Choose>
          <When condition={previewed && previewed.isMappable}>
            <div className={Styles.previewInner}>
              <MappablePreview
                previewed={previewed}
                terria={this.props.terria}
                viewState={this.props.viewState}
              />
            </div>
          </When>
          <When condition={chartData}>
            <div className={Styles.previewInner}>
              <h3 className={Styles.h3}>{previewed.name}</h3>
              <p>This file does not contain geospatial data.</p>
              <div className={Styles.previewChart}>
                <Chart
                  data={chartData}
                  axisLabel={{ x: previewed.xAxis.units, y: undefined }}
                  height={250 - 34}
                />
              </div>
              <Description item={previewed} />
            </div>
          </When>
          <When
            condition={previewed && typeof previewed.invoke !== "undefined"}
          >
            <InvokeFunction
              previewed={previewed}
              terria={this.props.terria}
              viewState={this.props.viewState}
            />
          </When>
          <When condition={previewed && previewed.isGroup}>
            <div className={Styles.previewInner}>
              <GroupPreview
                previewed={previewed}
                terria={this.props.terria}
                viewState={this.props.viewState}
              />
            </div>
          </When>
          <Otherwise>
            <div className={Styles.placeholder}>
              <p>Select a dataset to see a preview</p>
              <p>- OR -</p>
              <button className={Styles.btnBackToMap} onClick={this.backToMap}>
                Go to the map
              </button>
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
});

module.exports = withRouter(DataPreview);
