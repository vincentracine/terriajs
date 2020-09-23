import DiscreteTimeTraits from "./DiscreteTimeTraits";
import objectArrayTrait from "./objectArrayTrait";
import primitiveTrait from "./primitiveTrait";
import TimeVaryingTraits from "./TimeVaryingTraits";
import ShowableTraits from "./ShowableTraits";
import mixTraits from "./mixTraits";
import { ChartItemType } from "../Models/Chartable";

export default class DiscretelyTimeVaryingTraits extends mixTraits(
  TimeVaryingTraits,
  ShowableTraits
) {
  @primitiveTrait({
    name: "Mapping from Continuous Time",
    description:
      "Specifies how a continuous time (e.g. the timeline control) is mapped to a discrete time for this dataset. Valid values are: <br/> * `nearest` - the nearest available discrete time to the current continuous time is used. <br/> * `next` - the discrete time equal to or after the current continuous time is used. <br/> * `previous` - the discrete time equal to or before the current continuous time is used.",
    type: "string"
  })
  fromContinuous: string = "nearest";

  @primitiveTrait({
    type: "boolean",
    name: "Show in chart",
    description: "Whether to plot data availability on a chart."
  })
  showInChartPanel = false;

  @primitiveTrait({
    type: "string",
    name: "Chart type",
    description:
      "Type determines how the data availibility will be plotted on chart. eg: momentLines, momentPoints"
  })
  chartType: ChartItemType = "momentLines";

  // This trait proabably doesn't belong here and should instead be on a new
  //  trait class ChartTraits, however there are complexities to changing
  //  chart-related traits, mixins and interfaces to support this change.
  @primitiveTrait({
    type: "string",
    name: "Chart Disclaimer",
    description: "A HTML string to show above the chart as a disclaimer"
  })
  chartDisclaimer?: string;

  @primitiveTrait({
    type: "string",
    name: "Chart color",
    description:
      "The color to use when the data set is displayed on the chart. The value can be any html color string, eg: 'cyan' or '#00ffff' or 'rgba(0, 255, 255, 1)' for the color cyan."
  })
  chartColor?: string;

  @primitiveTrait({
    type: "boolean",
    name: "Disable date time selector",
    description: "When true, disables the date time selector in the workbench"
  })
  disableDateTimeSelector = false;
}
