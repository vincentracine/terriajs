import React from "react";
import { removeMarker } from "../../Models/LocationMarkerUtils";
import { reaction, runInAction } from "mobx";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
// import { ThemeContext } from "styled-components";

import SearchBox from "../Search/SearchBox";
// import SidebarSearch from "../Search/SidebarSearch";
import LocationSearchResults from "../Search/LocationSearchResults";
import Icon, { StyledIcon } from "../Icon";

import Box from "../../Styled/Box";
import Text from "../../Styled/Text";
import Spacing from "../../Styled/Spacing";
import { RawButton } from "../../Styled/Button";

import { addMarker } from "../../Models/LocationMarkerUtils";

export function SearchInDataCatalog({ viewState, handleClick }) {
  const locationSearchText = viewState.searchState.locationSearchText;
  return (
    <RawButton
      fullWidth
      onClick={() => {
        const { searchState } = viewState;
        // Set text here as a separate action so that it doesn't get batched up and the catalog
        // search text has a chance to set isWaitingToStartCatalogSearch
        searchState.setCatalogSearchText(searchState.locationSearchText);

        viewState.searchInCatalog(searchState.locationSearchText);
        handleClick && handleClick();
      }}
    >
      <Box paddedRatio={2} rounded charcoalGreyBg>
        <StyledIcon styledWidth={"14px"} glyph={Icon.GLYPHS["dataCatalog"]} />
        <Spacing right={2} />
        <Text textAlignLeft textLight large fullWidth>
          <Trans
            i18nKey="search.searchInDataCatalog"
            locationSearchText={locationSearchText}
          >
            Search <strong>{{ locationSearchText }}</strong> in the Data
            Catalogue
          </Trans>
        </Text>
        <StyledIcon glyph={Icon.GLYPHS.right2} styledWidth={"14px"} light />
      </Box>
    </RawButton>
  );
}
SearchInDataCatalog.propTypes = {
  handleClick: PropTypes.func.isRequired,
  viewState: PropTypes.object.isRequired
};

export class SearchBoxAndResultsRaw extends React.Component {
  componentDidMount() {
    this.subscribeToProps();
  }

  componentDidUpdate() {
    this.subscribeToProps();
  }

  componentWillUnmount() {
    this.unsubscribeFromProps();
  }

  subscribeToProps() {
    this.unsubscribeFromProps();

    // TODO(wing): why is this a reaction here and not in viewState itself?
    // Close the search results when the Now Viewing changes (so that it's visible).
    this._nowViewingChangeSubscription = reaction(
      () => this.props.terria.workbench.items,
      () => {
        this.props.viewState.searchState.showLocationSearchResults = false;
      }
    );
  }

  unsubscribeFromProps() {
    if (this._nowViewingChangeSubscription) {
      this._nowViewingChangeSubscription();
      this._nowViewingChangeSubscription = undefined;
    }
  }
  changeSearchText(newText) {
    runInAction(() => {
      this.props.viewState.searchState.locationSearchText = newText;
    });

    if (newText.length === 0) {
      removeMarker(this.props.terria);
      runInAction(() => {
        this.toggleShowLocationSearchResults(false);
      });
    }
    if (
      newText.length > 0 &&
      !this.props.viewState.searchState.showLocationSearchResults
    ) {
      runInAction(() => {
        this.toggleShowLocationSearchResults(true);
      });
    }
  }
  search() {
    this.props.viewState.searchState.searchLocations();
  }
  toggleShowLocationSearchResults(bool) {
    runInAction(() => {
      this.props.viewState.searchState.showLocationSearchResults = bool;
    });
  }
  startLocationSearch() {
    this.toggleShowLocationSearchResults(true);
  }
  render() {
    const { t } = this.props;
    const viewState = this.props.viewState;
    const searchState = viewState.searchState;
    const locationSearchText = searchState.locationSearchText;

    return (
      <Text textDarker>
        <Box fullWidth>
          <SearchBox
            onSearchTextChanged={this.changeSearchText.bind(this)}
            onDoSearch={this.search.bind(this)}
            onFocus={this.startLocationSearch.bind(this)}
            searchText={searchState.locationSearchText}
            placeholder={t("search.placeholder")}
          />
          {/* Results */}
          <If
            condition={
              searchState.locationSearchText.length > 0 &&
              searchState.showLocationSearchResults
            }
          >
            <Box
              positionAbsolute
              fullWidth
              column
              css={`
                top: 100%;
                background-color: ${props => props.theme.greyLightest};
              `}
            >
              {/* search {searchterm} in data catalog */}
              {/* ~TODO: Put this back once we add a MobX DataCatalogSearch Provider~ */}
              {/* TODO2: Implement a more generic MobX DataCatalogSearch */}
              {searchState.catalogSearchProvider && (
                <Box column paddedRatio={2}>
                  <SearchInDataCatalog
                    viewState={viewState}
                    handleClick={() => {
                      this.toggleShowLocationSearchResults(false);
                    }}
                  />
                </Box>
              )}
              <For
                each="search"
                of={this.props.viewState.searchState.locationSearchResults}
              >
                <LocationSearchResults
                  key={search.searchProvider.name}
                  terria={this.props.terria}
                  viewState={this.props.viewState}
                  search={search}
                  locationSearchText={locationSearchText}
                  onLocationClick={result => {
                    addMarker(this.props.terria, result);
                    result.clickAction();
                    runInAction(() => {
                      searchState.showLocationSearchResults = false;
                    });
                  }}
                  isWaitingForSearchToStart={
                    searchState.isWaitingToStartLocationSearch
                  }
                />
              </For>
            </Box>
          </If>
        </Box>
      </Text>
    );
  }
}

SearchBoxAndResultsRaw.propTypes = {
  terria: PropTypes.object.isRequired,
  viewState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation()(observer(SearchBoxAndResultsRaw));